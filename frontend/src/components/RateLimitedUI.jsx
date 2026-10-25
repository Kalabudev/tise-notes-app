import { ZapIcon, RefreshCw } from "lucide-react";

const RateLimitedUI = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md p-6 shadow-2xl shadow-amber-500/5">
        
        {/* Soft Background Radial Glow */}
        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-amber-500/20 blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: Icon & Content */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            
            {/* Pulsing Icon Badge */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 rounded-full bg-amber-500/20 blur-md animate-pulse" />
              <div className="relative flex items-center justify-center p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                <ZapIcon className="size-8 stroke-[2]" />
              </div>
            </div>

            {/* Warning Message */}
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="text-lg font-bold tracking-tight text-white">
                  Rate Limit Reached
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">
                  429 Too Many Requests
                </span>
              </div>
              <p className="text-sm text-base-content/80">
                You've made too many requests in a short period. Upstash rate limiter is active.
              </p>
              <p className="text-xs text-base-content/50">
                Please wait a few seconds before requesting or refreshing again.
              </p>
            </div>

          </div>

          {/* Right Side: Refresh Action */}
          <button
            onClick={handleReload}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-medium text-sm hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-lg shadow-amber-500/10 active:scale-95"
          >
            <RefreshCw className="size-4" />
            <span>Try Again</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;