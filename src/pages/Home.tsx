import { useState, useRef, useEffect, useLayoutEffect, MouseEvent } from "react";
import { 
  ArrowRight, ArrowUpRight, ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Photographic & Architectural Spatial Background
import spatialBg from "../assets/images/studio_bokeh_dark_1791717182726.jpg";
import spatialDesk from "../assets/images/spatial_desk_plane_1791717198835.jpg";

// Project visuals
import lifelogOverviewImg from "../assets/images/lifelog/lifelog_overview_diagram.webp";
import thesisConceptImg from "../assets/images/thesis_research_concept_1795349826933.jpg";
import processNotebook from "../assets/images/clara_process_notebook_1791704505546.jpg";

// LogicWeaver 高保真工作台主界面设计稿
const LOGICWEAVER_WORKSPACE_COVER = "/assets/aistudio/____60210af4.png";

type ProjectCategory = "all" | "research" | "product" | "exploration";

interface ProjectItem {
  id: string;
  number: string;
  badgeLabel: string;
  badgeTone: "terracotta" | "cobalt" | "ochre" | "sage" | "ink";
  statusLabel?: string;
  title: string;
  categoryLabel: string;
  year: string;
  whatItIs: string;
  claraContribution: string;
  image: string;
  link: string;
  category: Exclude<ProjectCategory, "all">;
  nonClickable?: boolean;
}

const REAL_PROJECTS: ProjectItem[] = [
  {
    id: "popbox",
    number: "01",
    badgeLabel: "实物原型",
    badgeTone: "terracotta",
    title: "PopBox ｜ 让潮玩，不止于观赏。",
    categoryLabel: "实体装置 · Web 前端 · CoreS3 单角色语音",
    year: "2026.03—2026.06",
    whatItIs: "探索潮玩在摆放观赏之外的互动可能：通过实体舞台装置、M5Stack CoreS3 屏幕语音交互与 Web 端互动页面，让手办角色在对话与日常记录中被重新激活。",
    claraContribution: "参与产品定位、功能讨论与整体交互方案，完成 Web 前端（留言墙、照片墙、静态小故事）及 M5Stack CoreS3 单角色语音对话基础 API 调用。",
    image: "/assets/aistudio/popbox____b906b97a.png",
    link: "/project/popbox",
    category: "product",
  },
  {
    id: "lifelog",
    number: "02",
    badgeLabel: "团队研究项目",
    badgeTone: "cobalt",
    title: "Lifelog｜生活记录驱动的引导式回忆辅助系统",
    categoryLabel: "引导式回忆辅助 · 全链路系统搭建",
    year: "2025.10—2026.08",
    whatItIs: "面向情景记忆障碍人群的辅助系统：从第一人称穿戴式生活音视频中，经全局多模态理解、交互帧实体视觉核验与事件仲裁提炼记忆材料；在 Unity 端结合答题历史逐级提供语言、图像及视频线索并由 LLM 动态引导，同时搭配医生端网页支持任务配置与回忆表现评估。",
    claraContribution: "负责视频理解与后端实现 · 医生端管理与评估网页搭建 · Unity 用户端逻辑搭建（UI 界面修改调整）",
    image: lifelogOverviewImg,
    link: "/project/lifelog",
    category: "research",
  },
  {
    id: "logicweaver",
    number: "03",
    badgeLabel: "团队课程项目 · 原型迭代",
    badgeTone: "ink",
    title: "LogicWeaver ｜ 法律案件事实与证据推理工作台",
    categoryLabel: "Human–AI Interaction / 信息架构 / AI Agent / Vibe Coding",
    year: "2026.03—06 · 团队课程项目 · 后续原型迭代",
    whatItIs: "将分散的案件材料组织为可追溯的事实、关系与假设，让用户在可视化画布中检查证据，并与 AI Agent 协作开展调查和推理。",
    claraContribution: "参与需求分析、信息架构与交互设计；通过 Vibe Coding 推进原型实现，并结合 Agent 运行记录持续优化交互与调查流程。",
    image: LOGICWEAVER_WORKSPACE_COVER,
    link: "/project/logicweaver",
    category: "product",
  },
  {
    id: "thesis",
    number: "04",
    badgeLabel: "在研课题",
    badgeTone: "sage",
    statusLabel: "硕士毕业设计 · 文献研究阶段",
    title: "情境自适应 Agent｜移动信息流中的主动交互研究",
    categoryLabel: "Human–AI Interaction · Proactive Agent · UX Research",
    year: "2026.11 — Present",
    whatItIs: "探索个人 Agent 如何理解移动信息流中不断变化的浏览活动与支持需求，并在帮助价值、打扰成本和用户自主感之间做出适当的介入决策。",
    claraContribution: "围绕移动信息流使用、主动式 Agent 情境理解与介入机制开展文献调研，梳理关键研究问题及后续交互设计方向。",
    image: thesisConceptImg,
    link: "/project/thesis",
    category: "research",
    nonClickable: true,
  },
  {
    id: "mesee",
    number: "05",
    badgeLabel: "交互设计课程 · 高保真设计",
    badgeTone: "cobalt",
    title: "Mesee｜让重要的事被记住，也被推进",
    categoryLabel: "Human–AI Interaction · Mobile UX · Interaction Design",
    year: "2025.09—11",
    whatItIs: "以任务为核心的记忆增强 Agent 概念设计。探索如何从聊天等日常信息中识别待办，在合适的时机提供提醒，并通过记忆画布帮助用户重新找到相关信息。",
    claraContribution: "参与团队产品定义、信息架构、交互流程及低保真、高保真设计。",
    image: "/assets/mesee/mesee_showcase_board.png",
    link: "/project/mesee",
    category: "exploration",
  },
  {
    id: "resonance",
    number: "06",
    badgeLabel: "个人课程作品",
    badgeTone: "terracotta",
    title: "Resonance｜可对话的家具定制",
    categoryLabel: "个人课程作品 · 参数化设计 · 自然语言交互",
    year: "2026.03—2026.06",
    whatItIs: "基于参数化桌子模型，打造可通过自然语言和可视化参数调节进行家具定制的交互原型，让非专业用户也能直观探索不同的设计方案。",
    claraContribution: "独立完成 Web 交互原型，以及 LLM、Rhino.Compute 几何计算与规则反馈的系统整合。",
    image: "/assets/aistudio/2_218f39fc.png",
    link: "/project/resonance",
    category: "product",
  },
];

export function Home() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  
  // 2.5D Spatial Mouse Coordinates for Parallax Layers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!hash) return;
    const targetId = hash.slice(1);
    const scrollToTarget = () => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const y = targetEl.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: Math.max(0, y), left: 0, behavior: "instant" as ScrollBehavior });
      }
    };
    scrollToTarget();
    const rafId = window.requestAnimationFrame(scrollToTarget);
    const timerId = window.setTimeout(scrollToTarget, 80);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timerId);
    };
  }, [hash]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    // Normalize coordinates from -1 to 1 based on center of hero
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    // Smoothly return toward center
    setMousePos({ x: 0, y: 0 });
  };

  const filteredProjects = filter === "all" 
    ? REAL_PROJECTS 
    : REAL_PROJECTS.filter(p => p.category === filter);

  // Parallax Layer Calculations (GSAP/2.5D Multi-depth Formula)
  // Layer 0: Deep Background (-20px to +20px, subtle scroll shift)
  const bgTransform = `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10 + scrollY * 0.15}px, 0px) scale(1.08)`;
  
  // Layer 1: Midground Atmospheric Lights & Desk Surface
  const midTransform = `translate3d(${mousePos.x * -16}px, ${mousePos.y * -14 + scrollY * -0.05}px, 0px)`;
  
  // Layer 2: Main Floating Editorial Typographic Plane
  const floatCardTransform = `perspective(1000px) rotateY(${mousePos.x * 3.5}deg) rotateX(${-mousePos.y * 3}deg) translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 20px)`;
  
  // Layer 3: Foreground Floating Physical Artifact (Highest depth & lift)
  const artifactTransform = `perspective(1000px) rotateY(${mousePos.x * 6 + 1}deg) rotateX(${-mousePos.y * 5}deg) translate3d(${mousePos.x * -24}px, ${mousePos.y * -20 - scrollY * 0.08}px, 50px)`;

  return (
    <div className="w-full text-[#161719] overflow-x-clip selection:bg-[#ccff00] selection:text-black relative">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: SPATIAL HERO / 2.5D CINEMATIC WORKSPACE
          High contrast Charcoal & Electric Neon Lime Palette (#ccff00)
          Photographic Bokeh Depth, Floating Layered Paper Artifacts
         ───────────────────────────────────────────────────────────── */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0d0e12] select-none"
        style={{ perspective: "1200px" }}
      >
        
        {/* ── LAYER 0: Deep Photographic Bokeh Background (Heavily Blurred Architectural Interior) ── */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out z-0 overflow-hidden"
          style={{ transform: bgTransform }}
        >
          <img 
            src={spatialBg} 
            alt="Atmospheric Studio Bokeh Background" 
            className="w-full h-full object-cover opacity-60 filter blur-[1px] brightness-90"
          />
          {/* Spatial vignette & dark graphite wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/60 to-[#0d0e12]/80" />
        </div>

        {/* ── LAYER 1: Electric Neon Lime Glowing Light Strips & Ambient Rays ── */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out z-1"
          style={{ transform: midTransform }}
        >
          {/* Neon Lime #ccff00 Architectural Horizon Edge */}
          <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/60 to-transparent shadow-[0_0_20px_#ccff00]" />
          
          {/* High-energy Neon Lime Ambient Orbs */}
          <div className="absolute top-1/4 -left-20 w-[480px] h-[480px] bg-[#ccff00]/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-[#ccff00]/8 blur-[160px] rounded-full pointer-events-none" />
          
          {/* Subtle warm incandescent counter-glow from physical lamp */}
          <div className="absolute top-1/3 right-1/4 w-[360px] h-[360px] bg-[#ffaa44]/10 blur-[130px] rounded-full pointer-events-none" />
          
          {/* Bottom Desk Surface Plane with Soft Gradient Lift */}
          <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none opacity-40">
            <img 
              src={spatialDesk} 
              alt="Desk Plane Perspective" 
              className="w-full h-full object-cover object-top filter brightness-75 contrast-125 mask-radial"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] to-transparent" />
          </div>
        </div>

        {/* ── LAYER 2 & 3: Floating Foreground Spatial Content Container ── */}
        <div className="relative max-w-7xl mx-auto w-full z-10 py-12 md:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Spatial Column: Hero Headline & Floating Editorial Glass Card */}
            <div 
              className="lg:col-span-7 flex flex-col items-start transition-transform duration-300 ease-out"
              style={{ transform: floatCardTransform }}
            >
              
              {/* Main Expressive Headline: Charcoal Black / Crisp White with Neon Lime Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-editorial-cn font-black tracking-tight leading-[1.18] text-white">
                一些关于
                <span className="font-editorial-cn font-black text-[#ccff00] neon-lime-text-glow mx-1.5 inline-block">
                  技术、人与体验
                </span>
                的探索。
              </h1>

              {/* Refined Spatial Divider Line between Headline and Clara Introduction */}
              <div className="w-full my-6 border-t border-white/15" />

              {/* Spatial Editorial Subtext */}
              <div className="text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed mb-8 space-y-3">
                <p>
                  我是 <strong className="text-white font-medium">Clara</strong>，本科毕业于北京师范大学人工智能专业，目前就读于同济大学设计创意学院，攻读交互设计硕士。
                </p>
                <p>
                  我对人的感知、认知和行为，以及技术如何影响我们的生活与体验很感兴趣。这里记录我的研究、项目和一些持续进行的探索。
                </p>
              </div>

              {/* High Contrast Action Anchors */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a 
                  href="#works" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ccff00] text-[#0d0e12] font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:translate-y-[-2px]"
                >
                  <span>Selected Work · 精选作品</span>
                  <ArrowRight size={14} className="text-[#0d0e12]" />
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium transition-all backdrop-blur-md"
                >
                  <span>About · 了解我的背景</span>
                  <ChevronRight size={14} className="text-[#ccff00]" />
                </a>
              </div>

            </div>

            {/* Right Spatial Column: Floating Tactile Paper Postcard & Photographic Artifact */}
            <div 
              className="lg:col-span-5 relative mt-6 lg:mt-0 transition-transform duration-200 ease-out"
              style={{ transform: artifactTransform }}
            >
              
              {/* Backing Depth Glow & Ambient Occlusion */}
              <div className="absolute inset-0 bg-[#ccff00]/15 blur-3xl rounded-3xl transform scale-95 pointer-events-none" />

              {/* Floating Tangible Paper Card (High contrast crisp white paper hovering against dark void) */}
              <div className="relative p-6 sm:p-7 rounded-3xl bg-[#ffffff] border border-white/90 spatial-card-depth transform rotate-[1.5deg] hover:rotate-0 transition-all duration-500 text-[#161719]">
                
                {/* Neon Lime Washi Tape with Natural Semi-translucent Edge */}
                <div className="absolute -top-3.5 left-8 px-4 py-1 text-[10px] bg-[#ccff00] text-[#0d0e12] font-bold rounded-xs tracking-wider z-20 shadow-[0_2px_8px_rgba(0,0,0,0.25)] border-x-2 border-dashed border-[#0d0e12]/30">
                  个人作品档案
                </div>

                {/* Corner Badge */}
                <div className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-[#161719] text-[#ccff00] text-[9px] font-bold tracking-tight">
                  精选片段
                </div>

                {/* Photographic Process Card */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-black/[0.08] relative group/photo tactile-inset">
                  <img 
                    src={processNotebook} 
                    alt="草图、设备与原型实践" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 text-white text-[10px] backdrop-blur-md font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                    <span>草图、设备与原型实践</span>
                  </div>
                </div>

                {/* Card Editorial Metadata */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-black/[0.08] pb-2.5">
                    <span className="font-bold text-sm text-[#161719]">Clara</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#ccff00] text-[#0d0e12] font-mono font-bold">
                      AI × Interaction Design
                    </span>
                  </div>
                  <p className="text-[#44474f] leading-relaxed text-xs font-light">
                    从问题梳理、用户研究到交互原型，记录不同阶段的设计实践。
                  </p>
                  
                  <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-medium text-[#161719]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                      <span className="font-semibold text-stone-700">状态：持续探索中</span>
                    </div>
                    <span className="font-mono text-[#5e626b] text-[10px]">2025—2026</span>
                  </div>
                </div>

              </div>

              {/* Decorative Geometric Stamp */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 w-20 h-20 rounded-full border-2 border-dashed border-[#ccff00]/60 items-center justify-center text-center p-1.5 text-[9px] font-bold text-[#ccff00] rotate-[-12deg] pointer-events-none backdrop-blur-sm bg-black/40 leading-snug">
                思考<br />制作<br />探索
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          MARQUEE BANNER: Distinct Dark Ribbon with Neon Lime Highlights
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#121318] py-4 overflow-hidden border-y border-white/10 relative flex items-center z-20">
        <div 
          className="whitespace-nowrap flex w-max animate-marquee text-[#f4f5f7] tracking-wide select-none" 
          style={{ fontFamily: 'var(--font-croissant)' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm sm:text-base md:text-lg mx-8 px-2 flex-shrink-0 flex items-center gap-5">
              <span>I want to go to the dock and grab some fries.</span>
              <span className="text-xs text-[#ccff00] font-sans font-bold tracking-normal">去码头整点薯条</span>
              <span className="text-[#ccff00] text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN BODY SECTION WRAPPER: Clean Cool Architectural Light Surface
          Clean seamless transition into editorial content
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#f4f5f7] relative z-10 bg-tactile-paper">

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: ABOUT ME / BACKGROUND & PHILOSOPHY
           ───────────────────────────────────────────────────────────── */}
        <section id="about" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-black/[0.08] relative z-10">
          
          {/* Section Header with Distinct Architectural Chapter Numeral */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-12 pb-4 border-b border-black/[0.08]">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex items-center justify-center min-w-[46px] h-11 px-3 rounded-xl bg-[#161719] text-[#ccff00] font-display text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums tactile-inset-dark shrink-0">
                01
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-bold text-[#161719]">
                About · 背景与经历
              </h2>
            </div>
            <span className="text-xs text-[#5e626b] font-medium">
              教育背景、实习实践与研究轨迹
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Real Personal Background & Experience */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#44474f] font-light leading-relaxed">
              <p>
                我是 <strong className="font-semibold text-[#161719]">Clara</strong>，本科毕业于<strong className="font-medium text-[#161719]">北京师范大学人工智能专业</strong>，目前就读于<strong className="font-medium text-[#161719]">同济大学设计创意学院</strong>交互设计方向（预计 2028 年毕业）。
              </p>
              <p>
                从人工智能技术训练转向交互设计学习的过程中，我逐步将关注点放在人的感知、认知与行为经验上，尝试在具体的问题情境中结合技术实现与人机交互研究。
              </p>

              {/* Structured Experience List */}
              <div className="pt-6 border-t border-black/[0.08] space-y-5">
                <div className="text-xs tracking-wider text-[#5e626b] font-bold">
                  经历与研究概览
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 border-t-2 border-[#161719] pt-3">
                    <div className="text-xs font-mono font-bold text-[#5e626b]">01 · 实习经历</div>
                    <h4 className="font-bold text-[#161719] text-sm font-editorial-cn">
                      中国科学院软件研究所人机交互实验室
                    </h4>
                    <p className="text-xs text-[#5e626b] leading-relaxed">
                      主要负责 Unity / VR 交互系统开发，参与交互原型实现与系统联调。
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t-2 border-[#1d3e6d] pt-3">
                    <div className="text-xs font-mono font-bold text-[#1d3e6d]">02 · 论文经历</div>
                    <h4 className="font-bold text-[#161719] text-sm font-editorial-cn">
                      CHI 学术论文研究参与
                    </h4>
                    <p className="text-xs text-[#5e626b] leading-relaxed">
                      曾参与 CHI 相关人机交互研究论文工作，积累了从实验设计到学术写作的实践经验。
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-black/[0.08] pt-4">
                  <div className="text-xs font-mono font-bold text-[#4e6b56]">03 · 学位研究课题</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#44474f] leading-relaxed">
                    <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] paper-shadow">
                      <span className="font-semibold text-[#161719] block mb-1">本科毕业设计</span>
                      围绕 VR 正念体验中的感官冲突展开研究与交互探索。
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-black/[0.06] paper-shadow">
                      <span className="font-semibold text-[#161719] block mb-1">硕士毕业设计</span>
                      关注移动社交媒体信息流中的情境自适应 Agent 交互机制。
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Personal Profile Card (Real Education, Internship & Research Info) */}
            <div className="lg:col-span-5 relative">
              <div className="pt-8 px-6 pb-6 rounded-3xl bg-white border border-black/[0.08] paper-shadow-lg relative overflow-visible">
                
                {/* Semi-translucent Washi tape without covering content */}
                <div className="washi-tape-blue absolute -top-3.5 left-8 px-4 py-0.5 text-[10px] text-white font-medium rounded-xs tracking-wider z-20">
                  个人档案
                </div>

                <div className="text-xs font-serif text-[#161719] pb-3 mb-4 border-b border-black/[0.08] flex justify-between items-center">
                  <span className="font-bold">CLARA · 个人档案</span>
                  <span className="text-[10px] text-[#5e626b]">背景概览</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">硕士在读 · 预计 2028 年毕业</span>
                    <div className="font-medium text-[#161719]">
                      同济大学设计创意学院 · 交互设计
                    </div>
                  </div>

                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">本科毕业</span>
                    <div className="font-medium text-[#161719]">
                      北京师范大学 · 人工智能
                    </div>
                  </div>

                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">实习经历</span>
                    <div className="font-medium text-[#161719]">
                      中国科学院软件研究所人机交互实验室
                    </div>
                    <div className="text-[#5e626b] text-[11px] mt-0.5">
                      主要负责 Unity / VR 交互系统开发
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.08] space-y-2">
                    <span className="text-[#5e626b] block text-[11px]">研究与论文经历</span>
                    <div className="text-[#44474f] text-[11px] leading-relaxed bg-[#f4f5f7] p-3 rounded-xl border border-black/[0.06] tactile-inset space-y-1.5">
                      <p>· 本科毕设：VR 正念体验中的感官冲突</p>
                      <p>· 硕士毕设：移动信息流中的情境自适应 Agent</p>
                      <p>· 论文经历：参与 CHI 相关研究论文工作</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: SELECTED WORK (Clean Streamlined Editorial Project Cards)
           ───────────────────────────────────────────────────────────── */}
        <section id="works" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10 scroll-mt-20">
          
          {/* Section Header & Stage Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-black/[0.08] gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3.5 mb-2.5">
                <span className="inline-flex items-center justify-center min-w-[46px] h-11 px-3 rounded-xl bg-[#161719] text-[#ccff00] font-display text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums tactile-inset-dark shrink-0">
                  02
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial-cn font-bold text-[#161719] whitespace-nowrap">
                  Selected Work · 精选作品
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5e626b] leading-relaxed">
                聚焦代表性项目入口；具体实现细节、时序流与技术推演可点击进入项目详情。
              </p>
            </div>

            {/* Filter Bar with recessed inset track & elevated active tab */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-black/[0.05] border border-black/[0.08] tactile-inset text-xs font-medium">
              <button 
                onClick={() => setFilter("all")} 
                className={`px-3.5 py-1.5 rounded-full transition-all ${filter === "all" ? "bg-[#161719] text-[#f4f5f7] shadow-[0_2px_5px_rgba(15,23,42,0.2)] font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                全部 ({REAL_PROJECTS.length})
              </button>
              <button 
                onClick={() => setFilter("research")} 
                className={`px-3.5 py-1.5 rounded-full transition-all ${filter === "research" ? "bg-[#1d3e6d] text-white shadow-[0_2px_5px_rgba(29,62,109,0.28)] font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                研究项目
              </button>
              <button 
                onClick={() => setFilter("product")} 
                className={`px-3.5 py-1.5 rounded-full transition-all ${filter === "product" ? "bg-[#161719] text-[#ccff00] shadow-[0_2px_5px_rgba(15,23,42,0.22)] font-bold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                产品与原型
              </button>
              <button 
                onClick={() => setFilter("exploration")} 
                className={`px-3.5 py-1.5 rounded-full transition-all ${filter === "exploration" ? "bg-[#4e6b56] text-white shadow-[0_2px_5px_rgba(78,107,86,0.28)] font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                探索实验
              </button>
            </div>
          </div>

          {/* Streamlined Editorial Project Cards: Full-width Header + Equal-Height Split Body */}
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <article 
                key={project.id}
                id={`work-${project.id}`}
                className={`p-5 sm:p-7 md:p-8 rounded-3xl bg-white border border-black/[0.08] relative overflow-hidden scroll-mt-24 ${
                  project.nonClickable ? "paper-shadow select-none" : "paper-shadow-hover group"
                }`}
              >
                {/* Full-Width Top Header Band (Meta + Title spanning left & right) */}
                <div className="pb-4 mb-5 border-b border-black/[0.08]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 text-xs text-[#5e626b] font-medium">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`font-mono text-sm px-1.5 rounded-xs font-bold tracking-tight ${
                        project.id === "lifelog"
                          ? "bg-[#e0f2fe] text-[#0369a1]"
                          : project.id === "thesis"
                            ? "bg-[#111111] text-[#FF8A00]"
                            : "text-[#161719] bg-[#ccff00]"
                      }`}>{project.number}</span>
                      <span>·</span>
                      <span className={
                        project.id === "lifelog"
                          ? "text-[#0284c7] font-semibold"
                          : project.id === "thesis"
                            ? "text-[#C24E00] font-semibold"
                            : "text-[#1d3e6d] font-semibold"
                      }>
                        {project.categoryLabel}
                      </span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>

                    {project.statusLabel && (
                      <span className={
                        project.id === "thesis"
                          ? "px-2.5 py-0.5 rounded-[2px] bg-[#FF8A00]/20 text-[#111111] border border-[#FF7A00]/65 text-[11px] font-semibold shrink-0"
                          : "px-2.5 py-0.5 rounded-full bg-[#d69836]/15 text-[#9a6715] border border-[#d69836]/30 text-[11px] font-semibold shrink-0"
                      }>
                        {project.statusLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-editorial-cn font-bold text-[#161719] leading-snug">
                    {project.nonClickable ? (
                      <span>{project.title}</span>
                    ) : (
                      <Link
                        to={project.link}
                        className={
                          project.id === "lifelog"
                            ? "hover:text-[#0284c7] transition-colors"
                            : "hover:text-[#1d3e6d] transition-colors"
                        }
                      >
                        {project.title}
                      </Link>
                    )}
                  </h3>
                </div>

                {/* Equal-Height Split Body: Left Visual matches Right Editorial Column */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  
                  {/* Left Visual Preview: Stretches to match right column height on desktop */}
                  <div className={`lg:col-span-5 relative overflow-hidden lg:h-full lg:min-h-[235px] border tactile-inset ${
                    project.id === "lifelog"
                      ? "rounded-2xl aspect-[16/10] lg:aspect-auto border-[#e2e8f0] bg-white"
                      : project.id === "mesee"
                        ? "rounded-2xl aspect-[16/10] lg:aspect-auto border-[#dce6fb] bg-[#eef4ff]"
                        : project.id === "resonance"
                          ? "rounded-2xl min-h-[245px] sm:aspect-[16/10] lg:aspect-auto border-[#3B2014]/15 bg-[#F7F4EC]"
                          : project.id === "thesis"
                            ? "rounded-xl min-h-[250px] sm:aspect-[16/10] lg:aspect-auto border-[#111111]/25 bg-[#F4F4F0]"
                            : project.id === "logicweaver"
                              ? "rounded-2xl aspect-[16/10] lg:aspect-auto border-[#3A444F]/70 bg-[#090C11]"
                              : "rounded-2xl aspect-[16/10] lg:aspect-auto border-black/[0.08] bg-[#f4f5f7]"
                  }`}>
                    {project.id === "resonance" ? (
                      <div className="absolute inset-0 pt-11 px-3 pb-3 flex flex-col justify-between gap-2 bg-[#F7F4EC] text-[#3B2014] select-none">
                        <div className="flex-1 min-h-0 rounded-xl overflow-hidden border border-[#3B2014]/15 bg-[#FAF7F0] flex items-center justify-center p-1.5">
                          <img
                            src={project.image}
                            alt="Resonance 参数化桌子定制界面与三维模型预览"
                            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-103"
                          />
                        </div>
                        <div className="pr-14 grid grid-cols-3 gap-1.5 text-[10px] leading-tight shrink-0">
                          <div className="rounded-lg bg-[#FAF7F0] border border-[#3B2014]/14 px-2 py-1.5">
                            <span className="font-mono text-[9px] text-[#D33A2C] font-bold block">01 表达需求</span>
                            <span className="text-[#3B2014] font-medium truncate block">滑杆 / 自然语言</span>
                          </div>
                          <div className="rounded-lg bg-[#FAF7F0] border border-[#3B2014]/14 px-2 py-1.5">
                            <span className="font-mono text-[9px] text-[#8A7263] font-bold block">02 参数计算</span>
                            <span className="text-[#3B2014] font-medium truncate block">LLM · Rhino 计算</span>
                          </div>
                          <div className="rounded-lg bg-[#FAF7F0] border border-[#3B2014]/14 px-2 py-1.5">
                            <span className="font-mono text-[9px] text-[#8A7263] font-bold block">03 预览反馈</span>
                            <span className="text-[#3B2014] font-medium truncate block">三维桌子与估价</span>
                          </div>
                        </div>
                      </div>
                    ) : project.id === "thesis" ? (
                      <div
                        className="absolute inset-0 pt-11 px-3.5 pb-3 flex flex-col justify-between gap-2 select-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(17,17,17,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.045) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      >
                        {/* Top-right PPT cover index mark */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#111111]">
                          <span className="px-1.5 py-0.5 bg-white border border-[#111111]/25">
                            课题 · 04
                          </span>
                          <span className="w-2.5 h-4 bg-[#FF7A00] block" aria-hidden="true" />
                        </div>

                        {/* Framed Research Poster Plate */}
                        <div className="flex-1 min-h-0 flex items-center justify-center py-0.5">
                          <div className="h-full max-w-full bg-white border border-[#111111] shadow-[4px_4px_0px_#FF7A00] p-1.5 flex items-center justify-center relative">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-auto max-w-full object-contain"
                            />
                            <span className="hidden sm:inline-block absolute -top-2 left-2.5 px-1.5 py-0.5 bg-[#FF7A00] text-[#111111] text-[9px] font-bold tracking-wider">
                              研究概念图
                            </span>
                          </div>
                        </div>

                        {/* Bottom PPT metadata strip */}
                        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#111111]/15 text-[10px] text-[#4A4A4A] shrink-0">
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#111111] truncate">
                            <span className="w-1.5 h-1.5 bg-[#FF7A00] shrink-0" aria-hidden="true" />
                            <span className="truncate">情境自适应 Agent</span>
                          </span>
                          <span className="text-[#6E6E6E] whitespace-nowrap shrink-0">
                            文献调研阶段
                          </span>
                        </div>
                      </div>
                    ) : project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-104 ${
                          project.id === "popbox"
                            ? "object-contain p-3"
                            : project.id === "lifelog" || project.id === "mesee" || project.id === "logicweaver"
                              ? "object-contain pt-10 px-2.5 pb-2.5"
                              : "object-cover"
                        }`}
                      />
                    ) : (
                      /* Structural 3-Pane Workspace Cover Slot until Real Figma Screen is Placed */
                      <div className="absolute inset-0 pt-11 px-3 pb-3 flex flex-col justify-between gap-2 bg-[#090C11] lw-grid-sub select-none">
                        <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
                          <div className="col-span-3 rounded-lg bg-[#141920]/95 border border-[#3A444F]/80 p-2 flex flex-col gap-1.5">
                            <span className="text-[9px] font-mono text-[#A0AAB4] truncate">文件侧栏</span>
                            <div className="h-1.5 w-4/5 rounded-xs bg-[#3A444F]/70" />
                            <div className="h-1.5 w-3/5 rounded-xs bg-[#3A444F]/50" />
                            <div className="h-1.5 w-4/5 rounded-xs bg-[#A8D56C]/40" />
                          </div>
                          <div className="col-span-6 rounded-lg bg-[#141920]/85 border border-[#A8D56C]/35 p-2 flex flex-col justify-between">
                            <span className="text-[9px] font-mono text-[#A8D56C]">中央推理画布</span>
                            <div className="grid grid-cols-2 gap-1.5 my-auto">
                              <div className="p-1.5 rounded bg-[#090C11] border border-[#A8D56C]/50 text-[8px] font-mono text-[#A8D56C]">
                                InfoUnit
                              </div>
                              <div className="p-1.5 rounded bg-[#090C11] border border-[#A79AF4]/50 text-[8px] font-mono text-[#A79AF4]">
                                Hypothesis
                              </div>
                              <div className="col-span-2 p-1.5 rounded bg-[#090C11] border border-[#E5A85F]/45 text-[8px] font-mono text-[#E5A85F] flex justify-between">
                                <span>Relation</span>
                                <span>Evidence Gap</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3 rounded-lg bg-[#141920]/95 border border-[#3A444F]/80 p-2 flex flex-col gap-1.5">
                            <span className="text-[9px] font-mono text-[#A79AF4] truncate">Agent 调查</span>
                            <div className="h-2 w-full rounded-xs bg-[#1D242D] border border-[#3A444F]/70" />
                            <div className="h-5 w-full rounded-xs bg-[#1D242D] border border-[#A79AF4]/35 mt-auto" />
                          </div>
                        </div>
                        <div className="text-[10px] text-[#A0AAB4] font-mono truncate pr-12">
                          高保真工作台占位 · 文件侧栏 / 推理画布 / Agent 面板
                        </div>
                      </div>
                    )}
                    
                    {/* Subtle Stamp on Image Corner */}
                    <div className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-md border text-[11px] font-medium flex items-center gap-1.5 ${
                      project.id === "lifelog"
                        ? "rounded-full bg-white/95 border-[#bae6fd] text-[#0369a1]"
                        : project.id === "thesis"
                          ? "rounded-[2px] bg-[#111111] border-[#111111] text-white"
                          : "rounded-full bg-white/95 border-black/[0.08] text-[#161719]"
                    }`}>
                      <span className={`w-1.5 h-1.5 ${
                        project.id === "lifelog"
                          ? "rounded-full bg-[#16a34a]"
                          : project.id === "thesis"
                            ? "rounded-none bg-[#FF7A00]"
                            : "rounded-full bg-[#161719]"
                      }`} />
                      <span>{project.badgeLabel}</span>
                    </div>

                    {/* Corner Quick Jump (omitted for non-clickable cards) */}
                    {!project.nonClickable && (
                      <Link 
                        to={project.link}
                        aria-label={`查看 ${project.title} 详情`}
                        className={`absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all tactile-inset-dark active:scale-95 group-hover:scale-105 before:content-[''] before:absolute before:-inset-2.5 ${
                          project.id === "lifelog"
                            ? "bg-[#0f172a] text-white hover:bg-[#0284c7]"
                            : "bg-[#161719] text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                        }`}
                        title="查看完整详情"
                      >
                        <ArrowUpRight size={19} />
                      </Link>
                    )}
                  </div>

                  {/* Right Editorial Info: Top summary/contribution + Bottom-aligned CTA */}
                  <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                    <div className="space-y-3.5">
                      {/* What It Is */}
                      <p className="text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
                        {project.whatItIs}
                      </p>

                      {/* Clara's Specific Contribution inside recessed inset box */}
                      <div className={`p-3.5 rounded-xl border text-xs text-[#161719] tactile-inset ${
                        project.id === "lifelog"
                          ? "bg-[#f8fafc] border-[#e2e8f0]"
                          : "bg-[#f4f5f7] border-black/[0.06]"
                      }`}>
                        <span className={`font-bold mr-1.5 ${
                          project.id === "lifelog" ? "text-[#16a34a]" : "text-[#161719]"
                        }`}>我做了什么：</span>
                        <span className="text-[#44474f] leading-relaxed">{project.claraContribution}</span>
                      </div>
                    </div>

                    {/* Card Action Link flush with bottom edge (omitted for non-clickable cards) */}
                    {!project.nonClickable && (
                      <Link
                        to={project.link}
                        className={`pt-3.5 border-t border-black/[0.08] w-full flex items-center justify-between gap-3 group/link transition-colors ${
                          project.id === "lifelog"
                            ? "text-[#161719] hover:text-[#0284c7]"
                            : "text-[#161719] hover:text-[#1d3e6d]"
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                          <span>阅读该项目的完整推演与记录</span>
                          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#5e626b] group-hover/link:text-current transition-colors shrink-0">
                          <span>查看详情</span>
                          <ArrowUpRight
                            size={13}
                            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          />
                        </span>
                      </Link>
                    )}
                  </div>

                </div>
              </article>
            ))}
          </div>

        </section>

      </div>

    </div>
  );
}
