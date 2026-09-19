'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Upload, X } from 'lucide-react';
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
      
      // Validation
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
        // Create new
        const { data: newCampaign, error: createError } = await supabase
          .from('campaigns')
          .insert({
            title,
            slug,
            description,
            goal_amount: numericGoal,
            status,
          })
          .select()
          .single();

        if (createError) throw createError;
        campaignId = newCampaign.id;
      } else {
        // Update basic info first
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({
            title,
            slug,
            description,
            goal_amount: numericGoal,
            status,
          })
          .eq('id', campaignId);
          
        if (updateError) throw updateError;
      }

      // Handle Cover Upload
      if (coverFile && campaignId) {
        finalCoverUrl = await uploadImage(coverFile, campaignId) || undefined;
        
        // Update URL
        if (finalCoverUrl) {
          await supabase
            .from('campaigns')
            .update({ cover_image: finalCoverUrl })
            .eq('id', campaignId);
        }
      } else if (!coverPreview && campaignId) {
         // User removed cover
         await supabase
            .from('campaigns')
            .update({ cover_image: null })
            .eq('id', campaignId);
      }

      router.push('/master/campaigns');
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl border border-navy-200 shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">
              Judul Campaign *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Contoh: Bantuan Sembako untuk Lansia"
              required
            />
          </div>

          {/* Goal Amount */}
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">
              Target Donasi (Rp) *
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={goalAmount ? parseInt(goalAmount.replace(/[^0-9]/g, '')).toLocaleString('id-ID') : ''}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="10.000.000"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "DRAFT" | "ACTIVE" | "COMPLETED" | "CLOSED")}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
            >
              <option value="DRAFT">Draf (Sembunyikan)</option>
              <option value="ACTIVE">Aktif (Publish)</option>
              <option value="COMPLETED">Selesai</option>
              <option value="CLOSED">Ditutup</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">
              Foto Utama (Maks 5MB)
            </label>
            {coverPreview ? (
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-navy-200">
                <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeCover}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center aspect-[16/9] w-full border-2 border-dashed border-navy-300 rounded-lg hover:bg-navy-50 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 text-navy-400 mb-2" />
                <span className="text-sm text-navy-500">Klik untuk upload foto</span>
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
      <div>
        <label className="block text-sm font-medium text-navy-900 mb-2">
          Deskripsi Lengkap *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-y"
          placeholder="Ceritakan secara detail mengenai campaign ini..."
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-navy-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium text-navy-600 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
          disabled={loading}
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isEdit ? 'Simpan Perubahan' : 'Buat Campaign'}
        </button>
      </div>
    </form>
  );
}
