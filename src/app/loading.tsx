import Logo from "@/components/ui/Logo";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Soft Animated Halo Ripple */}
        <div 
          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-sky-400/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" 
        />
        <div 
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-amber-400/15 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{ animationDelay: '400ms' }}
        />
        <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-sky-100/60 animate-pulse shadow-[0_0_35px_rgba(2,132,199,0.25)]" />

        {/* Animated Icon Only */}
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 animate-icon-pulse">
          <Logo showText={false} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
