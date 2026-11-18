import { Link, Outlet } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col relative w-full bg-[#0d0e12] text-[#161719] selection:bg-[#ccff00] selection:text-black">
      
      {/* Spatial Editorial Floating Header - High contrast dark glass with neon lime accent & blur */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3.5 flex justify-between items-center bg-[#0d0e12]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300 shadow-2xl">
        
        {/* Brand Wordmark with Neon Lime Dot */}
        <Link to="/" className="flex items-baseline gap-3 group">
          <div className="flex items-center gap-1.5">
            <span className="text-xl md:text-2xl font-black font-display tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
              CLARA.
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          </div>
          <span className="text-xs text-white/50 font-medium hidden sm:inline-block">
            Personal Archive
          </span>
        </Link>

        {/* Navigation Links with Neon Lime Hover & Glow */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-white/70">
          <a href="/#about" className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">01</span>
            <span>About</span>
          </a>
          <a href="/#works" className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">02</span>
            <span>Selected Work</span>
          </a>
        </nav>

        {/* Primary Action Button - Electric Neon Lime High Contrast */}
        <div className="flex items-center gap-3">
          <a 
            href="#contact" 
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] text-[#0d0e12] hover:bg-white text-xs font-bold transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:translate-y-[-1px]"
          >
            <span>Contact</span>
            <ArrowUpRight size={13} className="text-[#0d0e12]" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>

      {/* Editorial Personal Contact Footer */}
      <footer id="contact" className="w-full px-6 md:px-16 pt-14 pb-10 bg-[#161719] text-[#f6f3eb] relative z-10 overflow-hidden">
        
        {/* Soft Organic Atmospheric Glows in Dark Contrast Section */}
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-10 w-[450px] h-[450px] bg-white/[0.02] blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-8 border-b border-white/10 items-end">
            
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-[#ccff00] font-mono font-semibold block mb-3">
                CONTACT · 联系与交流
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#f6f3eb] tracking-tight leading-[1.12] mb-4">
                Clara · <span className="font-serif font-normal text-[#ccff00]">Personal Archive</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light leading-relaxed">
                记录在人工智能与交互设计学习过程中的研究、原型与实验。如需交流项目或研究内容，欢迎通过联系渠道沟通。
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#202227] border border-white/10 shadow-xl relative">
                <div className="washi-tape-lime absolute -top-3 left-8 px-3 py-0.5 text-[#0d0e12] font-bold rounded-xs tracking-wider text-[10px]">
                  CLARA ARCHIVE
                </div>
                <div className="space-y-2 text-xs text-stone-300 pt-1">
                  <div className="font-medium text-[#f6f3eb] text-sm">
                    Clara
                  </div>
                  <div className="text-stone-400 leading-relaxed">
                    上海 · 同济大学设计创意学院（交互设计在读）
                  </div>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-stone-400">
                    个人联系渠道与社交链接整理更新中
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-400 font-medium">
            <div>
              <span>© {new Date().getFullYear()} Clara · Personal Archive</span>
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <span className="text-[#ccff00]">CLARA ARCHIVE</span>
              <span>·</span>
              <span>持续记录中</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

