'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { generateSlug, cn } from '@/lib/utils';
import { SUPABASE_STORAGE_BUCKET, MAX_IMAGE_SIZE } from '@/lib/constants';
import { Campaign } from '@/types/campaign';

interface CampaignFormProps {
  initialData?: Campaign;
  isEdit?: boolean;
}

export default function CampaignForm({ initialData, isEdit }: CampaignFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [goalAmount, setGoalAmount] = useState(initialData?.goal_amount?.toString() || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');
  
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState(initialData?.cover_image || '');

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview('');
  };

  const uploadImage = async (file: File, campaignId: string): Promise<string | null> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${campaignId}/cover_${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(fileName, file, { upsert: true });

    if (error) {
      console.error('Upload error:', error);
      throw new Error('Gagal mengupload gambar sampul');
    }

    const { data: { publicUrl } } = supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const slug = generateSlug(title);
      
      if (!title || !goalAmount || !description) {
        throw new Error('Harap isi semua field wajib');
      }

      const numericGoal = parseInt(goalAmount.replace(/[^0-9]/g, ''));
      if (isNaN(numericGoal) || numericGoal <= 0) {
        throw new Error('Target donasi tidak valid');
      }

      let campaignId = initialData?.id;
      let finalCoverUrl = initialData?.cover_image;

      if (!isEdit) {
        const { data: newCampaign, error: createError } = await supabase
          .from('campaigns')
          .insert({
            title,
            slug,
            description,
            goal_amount: numericGoal,
            status,
          })
          .select('id')
          .single();

        if (createError) throw createError;
        campaignId = newCampaign.id;
      }

      if (coverFile && campaignId) {
        finalCoverUrl = await uploadImage(coverFile, campaignId) || undefined;
      }

      const updatePayload: Partial<Campaign> = {
        title,
        slug,
        description,
        goal_amount: numericGoal,
        status,
        ...(finalCoverUrl ? { cover_image: finalCoverUrl } : {}),
      };

      if (isEdit && campaignId) {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update(updatePayload)
          .eq('id', campaignId);

        if (updateError) throw updateError;
      } else if (!isEdit && coverFile && finalCoverUrl && campaignId) {
        await supabase
          .from('campaigns')
          .update({ cover_image: finalCoverUrl })
          .eq('id', campaignId);
      }

      router.push('/master/campaigns');
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan saat menyimpan campaign');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="widget-box-2 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          {/* Title */}
          <div className="box-fieldset">
            <label>Judul Campaign *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Bantuan Sembako untuk Lansia Dhuafa"
              required
            />
          </div>

          {/* Goal Amount */}
          <div className="box-fieldset">
            <label>Target Donasi (Rp) *</label>
            <input
              type="text"
              inputMode="numeric"
              value={goalAmount ? parseInt(goalAmount.replace(/[^0-9]/g, '')).toLocaleString('id-ID') : ''}
              onChange={(e) => setGoalAmount(e.target.value)}
              placeholder="10.000.000"
              required
            />
          </div>

          {/* Status */}
          <div className="box-fieldset">
            <label>Status Publikasi</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "DRAFT" | "ACTIVE" | "COMPLETED" | "CLOSED")}
            >
              <option value="DRAFT">Draf (Disembunyikan)</option>
              <option value="ACTIVE">Aktif (Dipublikasikan)</option>
              <option value="COMPLETED">Selesai (Target Tercapai)</option>
              <option value="CLOSED">Ditutup</option>
            </select>
          </div>
        </div>

        <div>
          {/* Cover Image */}
          <div className="box-fieldset">
            <label>Foto Utama / Banner Campaign (Maks 5MB)</label>
            {coverPreview ? (
              <div className="preview-wrapper">
                <img src={coverPreview} alt="Cover Preview" />
                <button
                  type="button"
                  onClick={removeCover}
                  className="btn-remove-img"
                  title="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="upload-box block">
                <Upload className="upload-icon" />
                <div className="upload-text">Klik atau seret foto ke area ini</div>
                <div className="upload-hint">Format didukung: JPG, PNG, WEBP (maksimal 5MB)</div>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="box-fieldset">
        <label>Deskripsi Lengkap & Cerita Campaign *</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={9}
          placeholder="Ceritakan secara detail mengenai latar belakang, tujuan penyaluran, dan rincian penerima manfaat program ini..."
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="tf-btn style-border pd-23"
          disabled={loading}
        >
          <span>Batal</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="tf-btn primary"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          <span>{isEdit ? 'Simpan Perubahan' : 'Terbitkan Campaign'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
