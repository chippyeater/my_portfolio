import { type MouseEvent, useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface NavProjectItem {
  number: string;
  hookTitle: string;
  projectLabel: string;
  link: string;
  nonClickable?: boolean;
}

const NAV_WORK_ITEMS: NavProjectItem[] = [
  {
    number: "01",
    hookTitle: "走出展示柜的桌面小剧场",
    projectLabel: "PopBox · 实体舞台与日常交互",
    link: "/project/popbox",
  },
  {
    number: "02",
    hookTitle: "把分散案卷放进可追溯的推理画布",
    projectLabel: "LogicWeaver · 法律案件事实与证据推理工作台",
    link: "/project/logicweaver",
  },
  {
    number: "03",
    hookTitle: "把生活录像，拆解成可找回的记忆",
    projectLabel: "Lifelog · 引导式回忆辅助系统",
    link: "/project/lifelog",
  },
  {
    number: "04",
    hookTitle: "让重要的事被记住，也被推进",
    projectLabel: "Mesee · 任务记忆增强 Agent 概念设计",
    link: "/project/mesee",
  },
  {
    number: "05",
    hookTitle: "让家具定制从调参数变成表达需求",
    projectLabel: "Resonance · 对话式参数化家具定制",
    link: "/project/resonance",
  },
  {
    number: "06",
    hookTitle: "移动浏览中，Agent 何时介入才合适",
    projectLabel: "硕士毕业设计 · 情境自适应主动交互",
    link: "/project/thesis",
    nonClickable: true,
  },
];

export function MainLayout() {
  const { pathname } = useLocation();
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const [isMobileWorksOpen, setIsMobileWorksOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsWorksOpen(false);
    setIsMobileWorksOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileWorksOpen) return;
    const handleOutsideClick = (event: globalThis.MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileWorksOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileWorksOpen]);

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsWorksOpen(false);
    setIsMobileWorksOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const y = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative w-full bg-[#0d0e12] text-[#161719] selection:bg-[#ccff00] selection:text-black">
      
      {/* Spatial Editorial Floating Header - High contrast dark glass with neon lime accent & blur */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3.5 flex justify-between items-center bg-[#0d0e12]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
        
        {/* Brand Wordmark */}
        <Link
          to="/"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-baseline gap-3 group"
        >
          <span className="text-xl md:text-2xl font-black font-display tracking-tight text-white group-hover:text-[#ccff00] transition-colors">
            CLARA
          </span>
          <span className="text-xs text-white/50 font-medium hidden sm:inline-block">
            Personal Archive
          </span>
        </Link>

        {/* Desktop Navigation Links with Hover Dropdown on Selected Work */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-white/70">
          <Link
            to="/#about"
            onClick={(e) => handleAnchorClick(e, "about")}
            className="hover:text-[#ccff00] transition-colors flex items-center gap-1.5 py-1"
          >
            <span className="text-[#ccff00] font-mono text-[11px] font-bold">01</span>
            <span>About</span>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsWorksOpen(true)}
            onMouseLeave={() => setIsWorksOpen(false)}
          >
            <Link
              to="/#works"
              onClick={(e) => handleAnchorClick(e, "works")}
              aria-expanded={isWorksOpen}
              className={`transition-colors flex items-center gap-1.5 py-1 ${
                isWorksOpen ? "text-[#ccff00]" : "hover:text-[#ccff00]"
              }`}
            >
              <span className="text-[#ccff00] font-mono text-[11px] font-bold">02</span>
              <span>Selected Work</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  isWorksOpen ? "rotate-180 text-[#ccff00]" : "text-white/50"
                }`}
              />
            </Link>

            {/* Hover Bridge + Spatial Dark Frosted Dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3.5 w-[380px] transition-all duration-200 origin-top ${
                isWorksOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1.5 pointer-events-none"
              }`}
            >
              <div className="rounded-2xl bg-[#0d0e12]/95 backdrop-blur-2xl border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono tracking-widest">
                  <span className="text-[#ccff00] font-bold">ARCHIVE INDEX · 06</span>
                  <Link
                    to="/#works"
                    onClick={(e) => handleAnchorClick(e, "works")}
                    className="text-white/55 hover:text-[#ccff00] transition-colors flex items-center gap-1"
                  >
                    <span>全部作品概览</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>

                <div className="p-2 divide-y divide-white/[0.04]">
                  {NAV_WORK_ITEMS.map((item) =>
                    item.nonClickable ? (
                      <div
                        key={item.number}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl select-none cursor-default"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-white/60 font-mono text-[10px] font-bold tabular-nums shrink-0">
                            {item.number}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium text-white/80 truncate tracking-normal">
                              {item.hookTitle}
                            </div>
                            <div className="text-[11px] text-white/40 truncate font-normal tracking-normal mt-0.5">
                              {item.projectLabel}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.number}
                        to={item.link}
                        onClick={() => setIsWorksOpen(false)}
                        className="group/item flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] group-hover/item:bg-[#ccff00] text-[#ccff00] group-hover/item:text-[#0d0e12] font-mono text-[10px] font-bold tabular-nums transition-colors shrink-0">
                            {item.number}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium text-white group-hover/item:text-[#ccff00] transition-colors truncate tracking-normal">
                              {item.hookTitle}
                            </div>
                            <div className="text-[11px] text-white/45 group-hover/item:text-white/65 transition-colors truncate font-normal tracking-normal mt-0.5">
                              {item.projectLabel}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-white/25 group-hover/item:text-[#ccff00] group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0"
                        />
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Actions: Mobile Quick Works Menu + Contact Button */}
        <div className="flex items-center gap-2.5">
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setIsMobileWorksOpen((prev) => !prev)}
              aria-expanded={isMobileWorksOpen}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white/15 bg-white/[0.06] text-white/85 hover:text-[#ccff00] text-xs font-semibold transition-colors"
            >
              <span>Works</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  isMobileWorksOpen ? "rotate-180 text-[#ccff00]" : "text-white/55"
                }`}
              />
            </button>

            {isMobileWorksOpen && (
              <div className="fixed left-4 right-4 top-[68px] rounded-2xl bg-[#0d0e12]/96 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden z-50">
                <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono tracking-widest">
                  <span className="text-[#ccff00] font-bold">SELECTED WORK · 06</span>
                  <Link
                    to="/#works"
                    onClick={(e) => handleAnchorClick(e, "works")}
                    className="text-white/60 hover:text-[#ccff00] transition-colors flex items-center gap-1"
                  >
                    <span>全部作品</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
                <div className="p-2 max-h-[70vh] overflow-y-auto divide-y divide-white/[0.05]">
                  {NAV_WORK_ITEMS.map((item) =>
                    item.nonClickable ? (
                      <div
                        key={item.number}
                        className="flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl select-none cursor-default"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-white/60 font-mono text-[10px] font-bold tabular-nums shrink-0">
                            {item.number}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-white/80 truncate">
                              {item.hookTitle}
                            </div>
                            <div className="text-[10px] text-white/40 truncate mt-0.5">
                              {item.projectLabel}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.number}
                        to={item.link}
                        onClick={() => setIsMobileWorksOpen(false)}
                        className="flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl active:bg-white/[0.08]"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="mt-0.5 px-1.5 py-0.5 rounded bg-white/[0.08] text-[#ccff00] font-mono text-[10px] font-bold tabular-nums shrink-0">
                            {item.number}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-white truncate">
                              {item.hookTitle}
                            </div>
                            <div className="text-[10px] text-white/45 truncate mt-0.5">
                              {item.projectLabel}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight size={13} className="text-white/35 shrink-0" />
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <a 
            href="#contact" 
            onClick={(e) => {
              if (pathname === "/") {
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
      <footer id="contact" className="w-full px-6 md:px-16 pt-14 pb-10 bg-[#161719] text-[#f4f5f7] relative z-10 overflow-hidden">
        
        {/* Soft Organic Atmospheric Glows in Dark Contrast Section */}
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-10 w-[450px] h-[450px] bg-white/[0.02] blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-8 border-b border-white/10 items-end">
            
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-[#ccff00] font-mono font-semibold block mb-3">
                CONTACT · 联系与交流
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial-cn font-bold text-[#f4f5f7] tracking-tight leading-[1.2] mb-4">
                欢迎交流研究、设计与工程实现
              </h2>
              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light leading-relaxed">
                持续整理在人工智能与交互设计学习过程中的研究推演、系统原型与实验片段。如需了解项目细节，欢迎随时联系探讨。
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-[#202227] border border-white/10 tactile-inset-dark relative">
                <div className="washi-tape-lime absolute -top-3 left-8 px-3 py-0.5 text-[#0d0e12] font-bold rounded-xs tracking-wider text-[10px]">
                  BASED IN SHANGHAI
                </div>
                <div className="space-y-2 text-xs text-stone-300 pt-1">
                  <div className="font-medium text-[#f4f5f7] text-sm">
                    同济大学设计创意学院
                  </div>
                  <div className="text-stone-400 leading-relaxed">
                    交互设计硕士在读 · 关注人机协同、主动式智能体与真实场景原型
                  </div>
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between gap-3 text-[11px] text-stone-400">
                    <span>个人联系渠道整理更新中</span>
                    <button
                      type="button"
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-[#ccff00] hover:text-white transition-colors font-mono cursor-pointer shrink-0"
                    >
                      BACK TO TOP ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-stone-400 font-medium">
            <div>
              <span>© {new Date().getFullYear()} Clara</span>
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <span className="font-mono text-[11px] text-[#ccff00]">AI × Interaction Design</span>
              <span>·</span>
              <span>持续记录中</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

