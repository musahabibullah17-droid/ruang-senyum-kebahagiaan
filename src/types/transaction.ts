export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';

export interface Transaction {
  id: string;
  transaction_code: string;
  campaign_id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  payment_method: string | null;
  payment_status: PaymentStatus;
  midtrans_order_id: string;
  midtrans_transaction_id: string | null;
  message: string | null;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface TransactionWithCampaign extends Transaction {
  campaigns: {
    id: string;
    title: string;
    slug: string;
  };
}

export interface CreateDonationPayload {
  campaign_id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  message?: string;
  is_anonymous: boolean;
}
