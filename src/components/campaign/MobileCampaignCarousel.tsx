'use client';
import { useEffect, useRef, useState } from 'react';
import CampaignCard from './CampaignCard';
import { Campaign } from '@/types/campaign';

export default function MobileCampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync scroll position to active dot
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const scrollPos = scrollRef.current.scrollLeft;
      const child = scrollRef.current.children[0] as HTMLElement;
      if (!child) return;
      // Include gap (16px) in width calculation
      const itemWidth = child.offsetWidth + 16; 
      const index = Math.round(scrollPos / itemWidth);
      setActiveIndex(Math.min(index, campaigns.length - 1));
    };
    
    const el = scrollRef.current;
    el?.addEventListener('scroll', handleScroll, { passive: true });
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [campaigns.length]);

  // Auto slide every 3.5 seconds
  useEffect(() => {
    if (campaigns.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % campaigns.length;
        if (scrollRef.current) {
          const child = scrollRef.current.children[next] as HTMLElement;
          if (child) {
            scrollRef.current.scrollTo({
              left: child.offsetLeft,
              behavior: 'smooth'
            });
          }
        }
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [campaigns.length]);

  return (
    <div className="w-full relative md:hidden">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {campaigns.map(campaign => (
          <div key={campaign.id} className="w-[85vw] max-w-[300px] snap-center shrink-0">
            <CampaignCard campaign={campaign} />
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-2">
        {campaigns.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === activeIndex ? 'bg-primary-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
