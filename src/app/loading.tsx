import Logo from "@/components/ui/Logo";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      
      {/* Container for Animation */}
      <div className="relative flex items-center justify-center w-40 h-40">
        
        {/* Ripple Effects (Using border-radius to match the logo slightly) */}
        <div className="absolute inset-0 rounded-[2rem] bg-sky-400 opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div 
          className="absolute inset-4 rounded-[1.5rem] bg-amber-400 opacity-20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
          style={{ animationDelay: '500ms' }}
        ></div>
        
        {/* Inner Glowing Box */}
        <div className="absolute inset-6 rounded-2xl bg-gradient-to-tr from-sky-100 to-amber-50 opacity-80 animate-pulse shadow-[0_0_40px_rgba(2,132,199,0.3)]"></div>

        {/* Logo Layer */}
        <div className="relative z-10 w-20 h-20 drop-shadow-2xl animate-pulse">
          <Logo showText={false} className="w-full h-full" />
        </div>
      </div>
      
      {/* Text Elements */}
      <div className="mt-12 flex flex-col items-center space-y-4">
        <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-sky-600 to-amber-500 bg-clip-text text-transparent tracking-wide drop-shadow-sm">
          Ruang Senyum Kebahagiaan
        </h3>
        
        {/* Animated Loading Dots with Glassmorphism */}
        <div className="flex items-center space-x-2.5 bg-slate-50/60 backdrop-blur-md border border-slate-200/50 shadow-inner px-5 py-2.5 rounded-full">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Memuat</span>
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce shadow-sm" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce shadow-sm" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce shadow-sm" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>

    </div>
  );
}
