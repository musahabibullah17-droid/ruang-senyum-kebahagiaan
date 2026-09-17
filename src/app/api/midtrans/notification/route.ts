import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const notification = await request.json();

    // 1. Verify Signature Key
    // signature_key = SHA512(order_id + status_code + gross_amount + ServerKey)
    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    const hashString = `${orderId}${statusCode}${grossAmount}${serverKey}`;
    const generatedSignature = crypto
      .createHash('sha512')
      .update(hashString)
      .digest('hex');

    if (generatedSignature !== notification.signature_key) {
      console.error('Invalid signature key for Midtrans notification');
      return NextResponse.json({ error: 'Invalid signature key' }, { status: 403 });
    }

    // 2. Map Midtrans transaction status to our PaymentStatus
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    let paymentStatus = 'PENDING';

    if (transactionStatus === 'capture') {
      // For credit card transaction, we need to check whether transaction is challenge by FDS or not
      if (fraudStatus === 'challenge') {
        paymentStatus = 'PENDING'; // Still need manual approval from merchant dashboard
      } else if (fraudStatus === 'accept') {
        paymentStatus = 'SUCCESS';
      }
    } else if (transactionStatus === 'settlement') {
      paymentStatus = 'SUCCESS';
    } else if (transactionStatus === 'cancel' || transactionStatus === 'deny' || transactionStatus === 'expire') {
      paymentStatus = transactionStatus === 'expire' ? 'EXPIRED' : 'FAILED';
    } else if (transactionStatus === 'pending') {
      paymentStatus = 'PENDING';
    }

    // 3. Update Transaction in DB using Admin Client (Bypass RLS)
    const supabaseAdmin = createAdminClient();

    // First check current status to make this idempotent
    const { data: existingTx, error: checkError } = await supabaseAdmin
      .from('transactions')
      .select('payment_status')
      .eq('midtrans_order_id', orderId)
      .single();

    if (checkError) {
      console.error('Transaction not found for order_id:', orderId);
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Only update if status is different to prevent double triggering functions
    if (existingTx.payment_status !== paymentStatus) {
      const { error: updateError } = await supabaseAdmin
        .from('transactions')
        .update({
          payment_status: paymentStatus,
          payment_method: notification.payment_type,
          midtrans_transaction_id: notification.transaction_id,
        })
        .eq('midtrans_order_id', orderId);

      if (updateError) {
        console.error('Failed to update transaction status:', updateError);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Midtrans Webhook Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
