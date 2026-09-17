export type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CLOSED';

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string | null;
  goal_amount: number;
  current_amount: number;
  status: CampaignStatus;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignImage {
  id: string;
  campaign_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface CampaignWithImages extends Campaign {
  campaign_images: CampaignImage[];
}
