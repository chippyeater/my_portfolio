import { publicAssetUrl } from "../lib/assets";
import { useState, useRef, useEffect, useLayoutEffect, MouseEvent } from "react";
import { 
  ArrowRight, ArrowUpRight, ChevronDown, ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Photographic & Architectural Spatial Background
import spatialBg from "../assets/images/studio_bokeh_dark_1791717182726.jpg";
import spatialDesk from "../assets/images/spatial_desk_plane_1791717198835.jpg";

// Project visuals
import lifelogOverviewImg from "../assets/images/lifelog/lifelog_overview_diagram.webp";
import thesisConceptImg from "../assets/images/thesis_research_concept_1795349826933.jpg";

// LogicWeaver 高保真工作台主界面设计稿
const LOGICWEAVER_WORKSPACE_COVER = publicAssetUrl("assets/aistudio/____60210af4.png");

type ProjectCategory = "all" | "research" | "product" | "exploration";

interface ProjectItem {
  id: string;
  number: string;
  shortName: string;
  badgeLabel: string;
  badgeTone: "terracotta" | "cobalt" | "ochre" | "sage" | "ink";
  statusLabel?: string;
  title: string;
  keywords: string[];
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
    shortName: "PopBox",
    badgeLabel: "实物原型",
    badgeTone: "terracotta",
    title: "实体潮玩与数字交互融合的角色互动体验设计",
    keywords: ["潮玩语音互动", "跨 IP 社交联动", "软硬件协同", "桌面舞台装置"],
    categoryLabel: "实体装置 · Web 前端 · CoreS3 单角色语音",
    year: "2026.5-2026.6",
    whatItIs: "探索潮玩在摆放观赏之外的互动可能：通过实体舞台装置、M5Stack CoreS3 屏幕语音交互与 Web 端互动页面，让手办角色在对话与日常记录中被重新激活。",
    claraContribution: "参与产品定位、功能讨论与整体交互方案，完成 Web 前端（留言墙、照片墙、静态小故事）及 M5Stack CoreS3 单角色语音对话基础 API 调用。",
    image: publicAssetUrl("assets/aistudio/popbox____b906b97a.png"),
    link: "/project/popbox",
    category: "product",
  },
  {
    id: "logicweaver",
    number: "02",
    shortName: "LogicWeaver",
    badgeLabel: "团队课程项目 · 原型迭代",
    badgeTone: "ink",
    title: "法律案件 AI 推理辅助工作台",
    keywords: ["复杂信息整理", "信息画布", "假设—证据推理", "Agent 调查"],
    categoryLabel: "Human–AI Interaction · 信息架构 · AI Agent · Vibe Coding",
    year: "2026.3-2026.4",
    whatItIs: "围绕法律推理中的不同任务，探索由 AI 选择并编排时间线、冲突对比与假设—证据等结构化界面；通过可追溯的信息画布和 Agent 调查原型验证基础工作流。",
    claraContribution: "参与需求分析、信息架构与交互设计；通过 Vibe Coding 推进原型实现，并结合 Agent 运行记录持续优化交互与调查流程。",
    image: LOGICWEAVER_WORKSPACE_COVER,
    link: "/project/logicweaver",
    category: "product",
  },
  {
    id: "lifelog",
    number: "03",
    shortName: "Lifelog",
    badgeLabel: "团队研究项目",
    badgeTone: "cobalt",
    title: "基于第一人称生活影像的情景记忆训练系统",
    keywords: ["记忆材料提取", "引导式回忆", "多模态事件核验", "医患双端系统"],
    categoryLabel: "引导式回忆辅助 · 全链路系统搭建",
    year: "2025.11-2026.8",
    whatItIs: "面向情景记忆障碍人群的辅助系统：从第一人称穿戴式生活音视频中，经全局多模态理解、交互帧实体视觉核验与事件仲裁提炼记忆材料；在 Unity 端结合答题历史逐级提供语言、图像及视频线索并由 LLM 动态引导，同时搭配医生端网页支持任务配置与回忆表现评估。",
    claraContribution: "负责视频理解与后端实现 · 医生端管理与评估网页搭建 · Unity 用户端逻辑搭建（UI 界面修改调整）",
    image: lifelogOverviewImg,
    link: "/project/lifelog",
    category: "research",
  },
  {
    id: "mesee",
    number: "04",
    shortName: "Mesee",
    badgeLabel: "交互设计课程 · 高保真设计",
    badgeTone: "cobalt",
    title: "任务记忆增强 Agent 概念设计",
    keywords: ["聊天待办识别", "任务记忆增强", "情境主动提醒", "记忆回溯画布"],
    categoryLabel: "Human–AI Interaction · Mobile UX · Interaction Design",
    year: "2025.09—11",
    whatItIs: "以任务为核心的记忆增强 Agent 概念设计。探索如何从聊天等日常信息中识别待办，在合适的时机提供提醒，并通过记忆画布帮助用户重新找到相关信息。",
    claraContribution: "参与团队产品定义、信息架构、交互流程及低保真、高保真设计。",
    image: publicAssetUrl("assets/mesee/mesee_showcase_board.png"),
    link: "/project/mesee",
    category: "exploration",
  },
  {
    id: "resonance",
    number: "05",
    shortName: "Resonance",
    badgeLabel: "个人课程作品",
    badgeTone: "terracotta",
    title: "对话式参数化家具定制体验设计",
    keywords: ["对话式家具定制", "参数化设计", "自然语言交互", "实时报价反馈"],
    categoryLabel: "个人课程作品 · 参数化设计 · 自然语言交互",
    year: "2026.03—2026.06",
    whatItIs: "基于参数化桌子模型，打造可通过自然语言和可视化参数调节进行家具定制的交互原型，让非专业用户也能直观探索不同的设计方案。",
    claraContribution: "独立完成 Web 交互原型，以及 LLM、Rhino.Compute 几何计算与规则反馈的系统整合。",
    image: publicAssetUrl("assets/aistudio/2_218f39fc.png"),
    link: "/project/resonance",
    category: "product",
  },
  {
    id: "thesis",
    number: "06",
    shortName: "硕士毕设",
    badgeLabel: "在研课题 · 硕士毕业设计",
    badgeTone: "sage",
    statusLabel: "文献研究阶段",
    title: "移动信息流中的情境自适应 Agent 交互研究",
    keywords: ["移动信息流", "情境自适应", "主动式 Agent", "介入时机决策"],
    categoryLabel: "Human–AI Interaction · Proactive Agent · UX Research",
    year: "2026.11 — Present",
    whatItIs: "探索个人 Agent 如何理解移动信息流中不断变化的浏览活动与支持需求，并在帮助价值、打扰成本和用户自主感之间做出适当的介入决策。",
    claraContribution: "围绕移动信息流使用、主动式 Agent 情境理解与介入机制开展文献调研，梳理关键研究问题及后续交互设计方向。",
    image: thesisConceptImg,
    link: "/project/thesis",
    category: "research",
    nonClickable: true,
  },
];

interface ChiPaperItem {
  id: string;
  period: string;
  title: string;
  venueRole: string;
  direction: string;
  contributionLabel: string;
  contributions: string[];
  url: string;
  highlight?: boolean;
}

// Co-first-author paper placed first, followed by collaborative CHI papers
const CHI_PAPERS: ChiPaperItem[] = [
  {
    id: "chi2026-mindfulness",
    period: "2024.11 — 2025.09",
    title: "Exploring the Impact of Sensory Conflict on State Mindfulness in VR Meditation Training",
    venueRole: "ACM CHI 2026 · 共同第一作者",
    direction: "VR 正念训练中的感官冲突及其对状态正念的影响。",
    contributionLabel: "个人贡献",
    contributions: [
      "以本科毕业设计为基础，独立提出研究主题与核心研究问题，并在指导下完成实验方案设计。",
      "负责 VR 实验系统开发，包括柔性传感器接入与呼吸信号检测。",
      "负责实验执行，以及眼动数据与主观问卷数据分析。",
      "与合作者分工完成论文撰写与修改。",
    ],
    url: "https://dl.acm.org/doi/10.1145/3772318.3791394",
    highlight: true,
  },
  {
    id: "chi2026-locomotion",
    period: "2023.11 — 2024.04",
    title: "Continuous Measurement Methods for Transient Physiological Discomfort in VR Locomotion",
    venueRole: "ACM CHI 2026 · 第三作者",
    direction: "VR 移动过程中瞬态生理不适的连续测量。",
    contributionLabel: "个人贡献",
    contributions: [
      "前期文献调研",
      "VR 实验系统开发",
      "两轮用户实验",
      "部分论文撰写",
    ],
    url: "https://dl.acm.org/doi/10.1145/3772318.3791721",
  },
  {
    id: "chi2025-telesurgery",
    period: "2024.06 — 2024.09",
    title: "Exploring the Remapping Impact of Spatial Head-hand Relations in Immersive Telesurgery",
    venueRole: "ACM CHI 2025 · 第四作者",
    direction: "沉浸式远程手术中的空间头手关系重新映射。",
    contributionLabel: "个人工作",
    contributions: [
      "前期文献调研、用户实验执行及研究视频剪辑。",
    ],
    url: "https://dl.acm.org/doi/10.1145/3706598.3714285",
  },
];

export function Home() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  const [isPapersOpen, setIsPapersOpen] = useState(false);
  
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

        {/* ── LAYER 1: Electric Neon Lime Ambient Rays ── */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out z-1"
          style={{ transform: midTransform }}
        >
          {/* High-energy Neon Lime Ambient Orbs */}
          <div className="absolute top-1/4 -left-20 w-[480px] h-[480px] bg-[#ccff00]/10 blur-[140px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[550px] h-[550px] bg-[#ccff00]/8 blur-[160px] rounded-full pointer-events-none" />
          
          {/* Subtle warm incandescent counter-glow from physical lamp */}
          <div className="absolute top-1/3 right-1/4 w-[360px] h-[360px] bg-[#ffaa44]/10 blur-[130px] rounded-full pointer-events-none" />
          
          {/* Bottom Desk Surface Plane with Soft Top Feathering */}
          <div
            className="absolute -bottom-8 -left-6 -right-6 h-72 overflow-hidden pointer-events-none opacity-35"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.95) 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0.95) 82%, transparent 100%)",
            }}
          >
            <img
              src={spatialDesk}
              alt="Desk Plane Perspective"
              className="w-full h-full object-cover object-center filter brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/25 to-transparent" />
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
                  Hi！我是 <strong className="text-white font-medium">Clara</strong>，欢迎来到我的个人网站！
                </p>
                <p>
                  如果你也对人与技术如何相互影响、彼此塑造感兴趣，不妨继续向下看看！这里会持续记录我的研究、项目与个人探索，希望其中有一些内容能让你产生共鸣。
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
                
                {/* LogicWeaver working prototype */}
                <div className="aspect-[2538/1311] rounded-2xl overflow-hidden mb-5 border border-black/[0.08] bg-[#0b0b14] relative tactile-inset">
                  <img 
                    src={publicAssetUrl("assets/logicweaver/workspace-agent-investigation.jpeg")}
                    onError={(e) => {
                      if (e.currentTarget.src !== LOGICWEAVER_WORKSPACE_COVER) {
                        e.currentTarget.src = LOGICWEAVER_WORKSPACE_COVER;
                      }
                    }}
                    alt="LogicWeaver 工作区与 Agent 调查运行原型"
                    width={2538}
                    height={1311}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 text-white text-[10px] backdrop-blur-md font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                    <span>LogicWeaver · Agent 调查原型</span>
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
                  
                  <div className="pt-2 border-t border-black/[0.06] flex items-center text-[11px] font-medium text-[#161719]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                      <span className="font-semibold text-stone-700">状态：持续探索中</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative Geometric Stamp (English, zero overflow) */}
              <div className="hidden sm:flex absolute -bottom-6 -right-4 w-24 h-24 rounded-full border-2 border-dashed border-[#ccff00]/65 items-center justify-center text-center p-2 text-[10px] font-mono font-bold tracking-[0.12em] text-[#ccff00] rotate-[-12deg] pointer-events-none backdrop-blur-sm bg-black/45 leading-[1.45]">
                <span>
                  THINK<br />MAKE<br />EXPLORE
                </span>
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
      <div className="w-full bg-[#fafafa] relative z-10 bg-tactile-paper">

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: ABOUT ME / BACKGROUND & PHILOSOPHY
           ───────────────────────────────────────────────────────────── */}
        <section id="about" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-black/[0.08] relative z-10 scroll-mt-20">
          
          {/* Section Header with Distinct Architectural Chapter Numeral */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-12 pb-4 border-b border-[#161719]/15">
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

          {/* Top Editorial Spread: High-Contrast Statement + Ink-Black Education Monograph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-12">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <p className="text-xl sm:text-2xl lg:text-[26px] text-[#161719] font-editorial-cn font-medium leading-[1.68] text-balance">
                我对技术如何影响人的
                <mark className="bg-[#ccff00] text-[#121318] px-1.5 py-0.5 mx-1 font-bold box-decoration-clone">
                  感知、认知与日常行为
                </mark>
                保持好奇，也喜欢把这些问题带入具体的交互实践。从人工智能到交互设计，我持续尝试在
                <span className="underline decoration-[#161719] decoration-2 underline-offset-[6px] mx-1">
                  技术实现
                </span>
                与
                <span className="underline decoration-[#ccff00] decoration-4 underline-offset-[6px] mx-1">
                  人的真实体验
                </span>
                之间建立联系。
              </p>

              <div className="pt-6 mt-8 border-t border-[#161719]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
                <div className="flex items-center gap-2.5 font-semibold text-[#161719]">
                  <span>人工智能</span>
                  <ArrowRight size={13} className="text-[#161719]" />
                  <span>交互设计</span>
                </div>
                <div className="flex items-center gap-2 text-[#525660]">
                  <span className="w-2 h-2 bg-[#ccff00] border border-[#161719] inline-block shrink-0" aria-hidden="true" />
                  <span>理性建模 · 感知实验 · 交互原型</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full bg-[#121318] text-white border border-[#161719] rounded-xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ccff00]" aria-hidden="true" />

                <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/15">
                  <div>
                    <div className="font-display text-lg font-extrabold tracking-tight text-white">
                      CLARA
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5 font-sans">
                      教育背景
                    </div>
                  </div>
                  <div className="rotate-[-4deg] border border-dashed border-[#ccff00]/65 px-2.5 py-1 text-[10px] font-sans font-bold text-[#ccff00] tracking-wider shrink-0">
                    AI × HCI
                  </div>
                </div>

                <div className="space-y-5 pt-5 font-sans">
                  <div>
                    <span className="text-xs font-medium text-[#ccff00] block tabular-nums">
                      硕士在读 · 预计 2028 年毕业
                    </span>
                    <div className="font-bold text-base sm:text-[17px] text-white mt-1 leading-snug">
                      同济大学设计创意学院 · 交互设计
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/12">
                    <span className="text-xs font-medium text-stone-400 block">
                      本科毕业
                    </span>
                    <div className="font-bold text-base sm:text-[17px] text-white/95 mt-1 leading-snug">
                      北京师范大学 · 人工智能
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Unified Architectural Ledger (Unified Sans Typography, No Numeric Prefixes) */}
          <div className="border-t-2 border-[#161719] font-sans">
            {/* 实习经历 */}
            <div className="py-7 border-b border-[#161719]/15 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
              <div className="lg:col-span-3 flex items-baseline justify-between lg:block">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#161719] inline-block shrink-0" aria-hidden="true" />
                  <span className="text-sm font-bold text-[#161719]">实习经历</span>
                </div>
                <div className="text-xs text-[#646973] tabular-nums lg:mt-1.5 lg:pl-[18px]">
                  2023.11 — 2024.09
                </div>
              </div>

              <div className="lg:col-span-9 space-y-1.5">
                <h3 className="font-bold text-lg text-[#111214] leading-snug">
                  中国科学院软件研究所人机交互实验室
                </h3>
                <p className="text-sm text-[#4A4E58] leading-relaxed">
                  主要负责 Unity / VR 交互系统开发，支持相关交互原型实现与实验开展。
                </p>
              </div>
            </div>

            {/* 论文经历（默认折叠，展开后共一置顶 + 其余两篇双栏） */}
            <div className="border-b border-[#161719]/15">
              <button
                type="button"
                onClick={() => setIsPapersOpen((prev) => !prev)}
                aria-expanded={isPapersOpen}
                aria-controls="chi-papers-panel"
                className="w-full text-left py-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#161719] focus-visible:ring-offset-2"
              >
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-[#ccff00] border border-[#161719] inline-block shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold text-[#161719]">论文经历</span>
                  </div>
                  <div className="text-xs text-[#646973] lg:pl-[18px]">
                    ACM CHI × 3
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-1 min-w-0">
                  <h3 className="font-bold text-lg text-[#111214] leading-snug">
                    CHI 学术论文研究
                  </h3>
                  <p className="text-sm text-[#4A4E58] leading-relaxed">
                    参与 3 篇 ACM CHI 会议论文研究 · 共同第一作者 × 1 · 第三作者 × 1 · 第四作者 × 1
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      isPapersOpen
                        ? "bg-[#ccff00] text-[#121318] border border-[#161719]"
                        : "bg-[#121318] text-[#ccff00] group-hover:bg-[#ccff00] group-hover:text-[#121318]"
                    }`}
                  >
                    <span>{isPapersOpen ? "收起论文归档" : "展开 3 篇论文"}</span>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 motion-reduce:transition-none ${
                        isPapersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
              </button>

              {/* Smooth Accordion Panel (Co-First Author Spotlight First + Dual-Column Supporting Papers) */}
              <div
                id="chi-papers-panel"
                aria-hidden={!isPapersOpen}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                  isPapersOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="pb-8 pt-1 space-y-4">
                    {/* Featured Co-First Author Paper (First) */}
                    {CHI_PAPERS[0] && (
                      <article className="bg-[#121318] text-white border border-[#161719] relative overflow-hidden">
                        <div className="h-1.5 bg-[#ccff00] w-full" aria-hidden="true" />

                        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                          <div className="lg:col-span-5 space-y-3.5 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                              <span className="font-bold text-[#ccff00]">
                                {CHI_PAPERS[0].venueRole}
                              </span>
                              <span className="text-stone-400 tabular-nums">
                                研究时间：{CHI_PAPERS[0].period}
                              </span>
                            </div>

                            <h4 className="font-editorial font-bold text-xl sm:text-[22px] text-white leading-snug break-words">
                              {CHI_PAPERS[0].title}
                            </h4>

                            <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed">
                              <span className="font-semibold text-white">研究方向：</span>
                              {CHI_PAPERS[0].direction}
                            </p>

                            <div className="pt-2 text-xs">
                              <span className="font-semibold text-stone-400 mr-1.5">论文链接：</span>
                              <a
                                href={CHI_PAPERS[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex={isPapersOpen ? undefined : -1}
                                className="inline-flex items-baseline gap-1 text-[#ccff00] hover:text-white underline underline-offset-4 break-all transition-colors"
                              >
                                <span>{CHI_PAPERS[0].url}</span>
                                <ArrowUpRight size={12} className="shrink-0 self-center" />
                              </a>
                            </div>
                          </div>

                          <div className="lg:col-span-7 space-y-3 min-w-0">
                            <div className="text-xs font-semibold text-stone-400">
                              {CHI_PAPERS[0].contributionLabel}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/15 border border-white/15">
                              {CHI_PAPERS[0].contributions.map((item) => (
                                <div key={item} className="bg-[#171920] p-4 flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 bg-[#ccff00] mt-1.5 shrink-0" aria-hidden="true" />
                                  <p className="text-xs sm:text-[13px] text-stone-200 leading-relaxed">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </article>
                    )}

                    {/* Supporting Papers (2-Column Architectural Ledger) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 border border-[#161719]/20 bg-white divide-y lg:divide-y-0 lg:divide-x divide-[#161719]/15">
                      {CHI_PAPERS.slice(1).map((paper) => (
                        <article
                          key={paper.id}
                          className="p-6 sm:p-7 flex flex-col justify-between gap-5 min-w-0"
                        >
                          <div className="space-y-3.5">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-black/10 text-xs">
                              <span className="font-bold text-[#1D3E6D]">
                                {paper.venueRole}
                              </span>
                              <span className="text-[#646973] tabular-nums">
                                研究时间：{paper.period}
                              </span>
                            </div>

                            <h4 className="font-editorial font-bold text-lg text-[#111214] leading-snug break-words">
                              {paper.title}
                            </h4>

                            <p className="text-xs sm:text-[13px] text-[#3A3D45] leading-relaxed">
                              <span className="font-semibold text-[#111214]">研究方向：</span>
                              {paper.direction}
                            </p>

                            <div className="text-xs sm:text-[13px] text-[#2C2F36] leading-relaxed space-y-2 pt-1">
                              <span className="font-semibold text-[#111214] block">
                                {paper.contributionLabel}：
                              </span>
                              {paper.contributions.length === 1 ? (
                                <p>{paper.contributions[0]}</p>
                              ) : (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-0.5">
                                  {paper.contributions.map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-[#161719]/40 shrink-0" aria-hidden="true" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-black/10 text-xs flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="font-semibold text-[#525660]">论文链接：</span>
                            <a
                              href={paper.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isPapersOpen ? undefined : -1}
                              className="inline-flex items-baseline gap-1 text-[#1D3E6D] hover:text-[#111214] underline underline-offset-4 break-all transition-colors"
                            >
                              <span>{paper.url}</span>
                              <ArrowUpRight size={12} className="shrink-0 self-center" />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 学位研究课题 */}
            <div className="py-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
              <div className="lg:col-span-3 space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 border border-[#161719] inline-block shrink-0" aria-hidden="true" />
                  <span className="text-sm font-bold text-[#161719]">学位研究课题</span>
                </div>
                <div className="text-xs text-[#646973] lg:pl-[18px]">
                  本科 · 硕士
                </div>
              </div>

              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#4A4E58] leading-relaxed">
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#111214]">
                    本科毕业设计
                  </h3>
                  <p className="text-sm text-[#4A4E58] leading-relaxed">
                    围绕 VR 正念体验中的感官冲突展开研究与交互探索。
                  </p>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base text-[#111214]">
                    硕士毕业设计
                  </h3>
                  <p className="text-sm text-[#4A4E58] leading-relaxed">
                    关注移动社交媒体信息流中的情境自适应 Agent 交互机制。
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: SELECTED WORK (6 Distinct Unboxed / Single-Surface Formats)
           ───────────────────────────────────────────────────────────── */}
        <section id="works" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10 scroll-mt-20">
          
          {/* Section Header & Crisp Architectural Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-[#161719]/15 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3.5 mb-2.5">
                <span className="inline-flex items-center justify-center min-w-[46px] h-11 px-3 rounded-xl bg-[#161719] text-[#ccff00] font-display text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums shrink-0">
                  02
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial-cn font-bold text-[#111214] whitespace-nowrap">
                  Selected Work · 精选作品
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4E58] leading-relaxed">
                聚焦代表性项目入口；具体实现细节、时序流与技术推演可点击进入项目详情。
              </p>
            </div>

            {/* Crisp High-Contrast Filter Tabs (Zero muddy gray well) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-[#161719]/15 text-xs font-medium">
              <button 
                onClick={() => setFilter("all")} 
                className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${filter === "all" ? "bg-[#111214] text-white font-semibold" : "text-[#4A4E58] hover:text-[#111214] hover:bg-[#F3F4F6]"}`}
              >
                全部 ({REAL_PROJECTS.length})
              </button>
              <button 
                onClick={() => setFilter("research")} 
                className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${filter === "research" ? "bg-[#1d3e6d] text-white font-semibold" : "text-[#4A4E58] hover:text-[#111214] hover:bg-[#F3F4F6]"}`}
              >
                研究项目
              </button>
              <button 
                onClick={() => setFilter("product")} 
                className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${filter === "product" ? "bg-[#111214] text-[#ccff00] font-semibold" : "text-[#4A4E58] hover:text-[#111214] hover:bg-[#F3F4F6]"}`}
              >
                产品与原型
              </button>
              <button 
                onClick={() => setFilter("exploration")} 
                className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${filter === "exploration" ? "bg-[#4e6b56] text-white font-semibold" : "text-[#4A4E58] hover:text-[#111214] hover:bg-[#F3F4F6]"}`}
              >
                探索实验
              </button>
            </div>
          </div>

          {/* Unified 2-Column Editorial Project Cards with Bespoke Proportions */}
          <div className="flex flex-col gap-10">
            {filteredProjects.map((project) => {
              const isDark = project.id === "logicweaver";
              const isPopBox = project.id === "popbox";

              const layoutColsMap: Record<string, { left: string; right: string }> = {
                popbox: { left: "lg:col-span-6", right: "lg:col-span-6" },
                logicweaver: { left: "lg:col-span-5", right: "lg:col-span-7" },
                lifelog: { left: "lg:col-span-5", right: "lg:col-span-7" },
                mesee: { left: "lg:col-span-4", right: "lg:col-span-8" },
                resonance: { left: "lg:col-span-5", right: "lg:col-span-7" },
                thesis: { left: "lg:col-span-7", right: "lg:col-span-5" },
              };
              const cols = layoutColsMap[project.id] || {
                left: "lg:col-span-5",
                right: "lg:col-span-7",
              };

              const accentMap: Record<string, string> = {
                popbox: "#C84B31",
                logicweaver: "#A8D56C",
                lifelog: "#0369A1",
                mesee: "#1D3E6D",
                resonance: "#B34028",
                thesis: "#C24E00",
              };
              const accentColor = accentMap[project.id] || "#1D3E6D";

              const ctaHoverColorMap: Record<string, string> = {
                popbox: "group-hover:text-[#C84B31]",
                logicweaver: "group-hover:text-[#A8D56C]",
                lifelog: "group-hover:text-[#0369A1]",
                mesee: "group-hover:text-[#1D3E6D]",
                resonance: "group-hover:text-[#B34028]",
              };

              const imageSurfaceBg: Record<string, string> = {
                popbox: "#FFFFFF",
                logicweaver: "#07090D",
                lifelog: "#FFFFFF",
                mesee: "#3B59DC",
                resonance: "#FAF7F0",
                thesis: "#FAF8F4",
              };

              const ctaTextMap: Record<string, string> = {
                popbox: "进入 PopBox 实体与语音交互详情",
                logicweaver: "进入 LogicWeaver 工作台推演",
                lifelog: "进入 Lifelog 系统架构与推演",
                mesee: "进入 Mesee 完整交互设计",
                resonance: "进入 Resonance 参数化交互详情",
              };

              if (isDark) {
                return (
                  <Link
                    key={project.id}
                    id={`work-${project.id}`}
                    to={project.link}
                    className="block scroll-mt-24 rounded-2xl bg-[#0B0E14] text-[#EDF0F2] border border-[#2A3340] overflow-hidden group transition-colors hover:border-[#A8D56C]/55 cursor-pointer"
                  >
                    <article className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      <div className={`${cols.left} p-6 sm:p-8 flex flex-col justify-between gap-6`}>
                        <div className="space-y-3.5">
                          {/* Top Eyebrow: Number / English Name / Nature / Time */}
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                            <span className="text-[#A8D56C] font-bold tabular-nums">{project.number}</span>
                            <span>/</span>
                            <span className="font-display font-bold text-white tracking-tight">{project.shortName}</span>
                            <span>/</span>
                            <span className="text-[#E2E8F0]">{project.badgeLabel}</span>
                            <span>/</span>
                            <span className="tabular-nums">{project.year}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl sm:text-2xl font-editorial-cn font-bold text-white leading-snug">
                            {project.title}
                          </h3>

                          {/* Project Characteristic Keywords */}
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#A8D56C]">
                            {project.keywords.map((kw, idx) => (
                              <span key={kw} className="inline-flex items-center gap-2.5">
                                <span>{kw}</span>
                                {idx < project.keywords.length - 1 && (
                                  <span className="text-white/25" aria-hidden="true">·</span>
                                )}
                              </span>
                            ))}
                          </div>

                          {/* Project Summary */}
                          <p className="text-sm text-[#CBD5E1] font-light leading-relaxed pt-1">
                            {project.whatItIs}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {/* Highlighted / Tactile Inset Contribution Block */}
                          <div className="px-4 py-3.5 rounded-xl bg-[#121720] border border-[#26303E] shadow-[inset_0_1px_4px_rgba(0,0,0,0.45)] transition-all duration-200 group-hover:bg-[#EDF0F2] group-hover:border-white group-hover:shadow-[inset_0_2px_5px_rgba(9,12,17,0.18)] group-hover:scale-[1.015]">
                            <p className="text-[13px] text-[#E2E8F0] leading-relaxed transition-colors group-hover:text-[#0B0E14]">
                              <span className="font-bold text-[#A8D56C] mr-1.5 transition-colors group-hover:text-[#166534]">
                                我做了什么：
                              </span>
                              {project.claraContribution}
                            </p>
                          </div>

                          <div
                            className={`inline-flex items-center justify-between w-full pt-3 border-t border-white/10 text-xs font-bold text-white transition-colors ${
                              ctaHoverColorMap[project.id] || ""
                            }`}
                          >
                            <span>{ctaTextMap[project.id]}</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>

                      {/* Direct Single-Container Image Frame (No outer nested wrapper) */}
                      <div
                        className={`${cols.right} lg:border-l border-white/10 flex items-center justify-center p-3 sm:p-4`}
                        style={{ backgroundColor: imageSurfaceBg[project.id] }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto max-h-[380px] object-contain"
                        />
                      </div>
                    </article>
                  </Link>
                );
              }

              const cardInner = (
                <article className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Editorial Column (Custom Width per Project) */}
                  <div
                    className={`${cols.left} p-6 sm:p-8 flex flex-col justify-between gap-6 relative z-30 ${
                      isPopBox ? "lg:pr-12" : ""
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Eyebrow: Number / English Name / Nature / Time */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#525660]">
                        <span className="font-bold tabular-nums" style={{ color: accentColor }}>
                          {project.number}
                        </span>
                        <span>/</span>
                        <span className="font-display font-bold text-[#111214] tracking-tight">
                          {project.shortName}
                        </span>
                        <span>/</span>
                        <span className="text-[#111214] font-medium">{project.badgeLabel}</span>
                        <span>/</span>
                        <span className="tabular-nums">{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-editorial-cn font-bold text-[#111214] leading-snug">
                        {project.title}
                      </h3>

                      {/* Project Characteristic Keywords */}
                      <div
                        className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold"
                        style={{ color: accentColor }}
                      >
                        {project.keywords.map((kw, idx) => (
                          <span key={kw} className="inline-flex items-center gap-2.5">
                            <span>{kw}</span>
                            {idx < project.keywords.length - 1 && (
                              <span className="text-black/20 font-normal" aria-hidden="true">·</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Project Summary */}
                      <p className="text-sm text-[#3A3D45] leading-relaxed pt-1">
                        {project.whatItIs}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Highlighted / Tactile Inset Contribution Block */}
                      <div
                        className={`px-4 py-3.5 rounded-xl bg-[#F4F5F8] border border-[#E3E6EC] shadow-[inset_0_1px_3px_rgba(15,23,42,0.06)] transition-all duration-200 ${
                          project.nonClickable
                            ? ""
                            : "group-hover:bg-[#14171D] group-hover:border-[#14171D] group-hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] group-hover:scale-[1.015]"
                        }`}
                      >
                        <p
                          className={`text-[13px] text-[#1E2025] leading-relaxed transition-colors ${
                            project.nonClickable ? "" : "group-hover:text-[#F8FAFC]"
                          }`}
                        >
                          <span
                            className={`font-bold mr-1.5 transition-colors ${
                              project.nonClickable ? "" : "group-hover:!text-[#ccff00]"
                            }`}
                            style={{ color: accentColor }}
                          >
                            我做了什么：
                          </span>
                          {project.claraContribution}
                        </p>
                      </div>

                      {!project.nonClickable && (
                        <div
                          className={`inline-flex items-center justify-between w-full pt-3 border-t border-[#E6E8EE] text-xs font-bold text-[#111214] transition-colors ${
                            ctaHoverColorMap[project.id] || "group-hover:text-[#1D3E6D]"
                          }`}
                        >
                          <span>{ctaTextMap[project.id] || "进入项目详情"}</span>
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Visual Column (Custom Width per Project) */}
                  {isPopBox ? (
                    <div
                      className={`${cols.right} relative overflow-visible lg:border-l border-[#E6E8EE] flex items-center justify-center min-h-[270px] sm:min-h-[340px]`}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF7F0] to-[#F3ECE0] pointer-events-none"
                      />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="relative z-20 w-[104%] lg:w-[122%] max-w-none h-auto max-h-[430px] -my-4 lg:-my-8 lg:-ml-16 lg:-mr-4 object-contain drop-shadow-[0_26px_34px_rgba(15,23,42,0.24)] pointer-events-none select-none"
                      />
                    </div>
                  ) : (
                    <div
                      className={`${cols.right} lg:border-l border-[#E6E8EE] flex items-center justify-center overflow-hidden ${
                        project.id === "mesee" ? "p-0" : "p-3 sm:p-4"
                      }`}
                      style={{ backgroundColor: imageSurfaceBg[project.id] || "#FFFFFF" }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className={
                          project.id === "mesee"
                            ? "w-full h-full object-cover object-left"
                            : "w-full h-auto max-h-[380px] object-contain"
                        }
                      />
                    </div>
                  )}
                </article>
              );

              if (project.nonClickable) {
                return (
                  <div
                    key={project.id}
                    id={`work-${project.id}`}
                    className="scroll-mt-24 rounded-2xl bg-white text-[#111214] border border-[#DFE2E8] overflow-hidden select-none"
                  >
                    {cardInner}
                  </div>
                );
              }

              return (
                <Link
                  key={project.id}
                  id={`work-${project.id}`}
                  to={project.link}
                  className={`block scroll-mt-24 rounded-2xl bg-white text-[#111214] border border-[#DFE2E8] group transition-colors hover:border-[#111214]/40 cursor-pointer ${
                    isPopBox ? "overflow-visible lg:mt-3 lg:mb-7" : "overflow-hidden"
                  }`}
                >
                  {cardInner}
                </Link>
              );
            })}
          </div>

        </section>

      </div>

    </div>
  );
}
