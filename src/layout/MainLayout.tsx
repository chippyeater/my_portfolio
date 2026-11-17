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
            Interaction Design & Agent Prototypes
          </span>
        </Link>

        {/* Navigation Links with Neon Lime Hover & Glow */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-white/70">
          <a href="/#about" className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">01</span>
            <span>关于与理念</span>
          </a>
          <a href="/#works" className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">02</span>
            <span>Selected Work</span>
          </a>
          <a href="/#notebook" className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5">
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">03</span>
            <span>研究笔记</span>
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
            <span>Contact me</span>
            <ArrowUpRight size={13} className="text-[#0d0e12]" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>

      {/* Editorial Grand Colophon Footer */}
      <footer id="contact" className="w-full px-6 md:px-16 pt-16 pb-12 bg-[#161719] text-[#f6f3eb] relative z-10 overflow-hidden">
        
        {/* Soft Organic Atmospheric Glows in Dark Contrast Section */}
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-10 w-[450px] h-[450px] bg-white/[0.02] blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 pb-10 border-b border-white/10">
            
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-[#ccff00] font-mono font-semibold block mb-3">
                COLOPHON & INQUIRY · Contact me
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#f6f3eb] tracking-tight leading-[1.08] mb-5">
                Let's build <br />
                <span className="font-serif font-normal text-[#ccff00]">tangible, thoughtful agents.</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light leading-relaxed">
                我正在持续积累 AI Agent 工程与可验证交互原型的构建能力。如果你对人与智能体协作、具身硬件交互、知识界面架构有共同的探索兴趣，欢迎随时来信。
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#202227] border border-white/10 shadow-xl relative">
                <div className="washi-tape-lime absolute -top-3 left-8 px-3 py-0.5 text-[#0d0e12] font-bold rounded-xs tracking-wider">
                  POSTAL MEMO
                </div>
                <span className="text-xs font-semibold text-stone-400 block mb-2 uppercase tracking-wider">
                  联络邮箱 · INBOX
                </span>
                <div className="text-lg sm:text-xl font-serif text-[#f6f3eb] break-all border-b border-white/15 pb-3 mb-3">
                  [clara.design.ai@placeholder.com]
                </div>
                <div className="text-xs text-stone-400 leading-relaxed">
                  上海 · 人机交互与智能体系统设计研究
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-stone-400 text-[11px] block">研究方向</span>
                  <span className="font-bold text-white">Agent 交互</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-stone-400 text-[11px] block">交叉背景</span>
                  <span className="font-bold text-white">算法与工程</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-stone-400 text-[11px] block">当前阶段</span>
                  <span className="font-bold text-[#ccff00]">在研原型验证</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-400 font-medium">
            <div>
              <span>© {new Date().getFullYear()} Clara · Interaction Design & Autonomous Agent Prototypes</span>
            </div>
            <div className="flex items-center gap-6 text-stone-400">
              <span className="text-[#ccff00]">CLARA ARCHIVE</span>
              <span>·</span>
              <span>持续构建与迭代中</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

