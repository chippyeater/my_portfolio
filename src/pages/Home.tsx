import { useState, useRef, useEffect, MouseEvent } from "react";
import { 
  ArrowRight, ArrowUpRight, ChevronRight, Layers, Sparkles, Compass, Eye
} from "lucide-react";
import { Link } from "react-router-dom";

// Photographic & Architectural Spatial Background
import spatialBg from "../assets/images/studio_bokeh_dark_1791717182726.jpg";
import spatialDesk from "../assets/images/spatial_desk_plane_1791717198835.jpg";

// Project visuals
import popboxHero from "../assets/images/popbox_cores3_prototype_1791702790117.jpg";
import lifelogHero from "../assets/images/lifelog_video_pipeline_1791702799420.jpg";
import overlayHero from "../assets/images/learning_overlay_browser_1791702809534.jpg";
import thesisHero from "../assets/images/thesis_relational_agent_1791702819224.jpg";
import logicweaverHero from "../assets/images/showcase_logicweaver_graph_1791698627262.jpg";
import meseeHero from "../assets/images/showcase_mesee_agent_1791698603974.jpg";
import resonanceHero from "../assets/images/showcase_resonance_sound_1791698618041.jpg";
import processNotebook from "../assets/images/clara_process_notebook_1791704505546.jpg";
import agentCollage from "../assets/images/clara_agent_collage_1791704517805.jpg";

type ProjectCategory = "all" | "completed" | "team_tech" | "in_dev" | "thesis" | "exploratory";

interface ProjectItem {
  id: string;
  number: string;
  badgeLabel: string;
  badgeTone: "terracotta" | "cobalt" | "ochre" | "sage" | "ink";
  title: string;
  categoryLabel: string;
  year: string;
  whatItIs: string;
  claraContribution: string;
  image: string;
  link: string;
  category: ProjectCategory;
}

const REAL_PROJECTS: ProjectItem[] = [
  {
    id: "popbox",
    number: "01",
    badgeLabel: "已实现硬件原型",
    badgeTone: "terracotta",
    title: "PopBox ｜ 潮玩形态的桌面共情 Agent",
    categoryLabel: "硬件具身 · 串口时序通信 · 情绪交互",
    year: "2024",
    whatItIs: "面向 Z 世代桌面的具身实体 Agent 原型，将屏幕端单一对话外化为可触控扭蛋舱、多态步进电机与 CoreS3 屏幕微表情。",
    claraContribution: "主导硬件交互逻辑设计、状态机跳转定义及基于 M5Stack CoreS3 的串口与固件联调驱动。",
    image: popboxHero,
    link: "/project/popbox",
    category: "completed",
  },
  {
    id: "lifelog",
    number: "02",
    badgeLabel: "团队算法已跑通",
    badgeTone: "cobalt",
    title: "Lifelog 智能穿戴 ｜ 多模态视觉时序记忆切片",
    categoryLabel: "穿戴交互 · 多模态管道 · 关键帧召回",
    year: "2024",
    whatItIs: "针对第一人称持续视频流设计的轻量级时序抽取系统，解决多模态流输入下海量冗余片段的高效检索与意图对齐问题。",
    claraContribution: "设计第一人称时空记忆检索工作流与事件时间轴原型，配合算法团队验证跨模态检索的可用性边界。",
    image: lifelogHero,
    link: "/project/lifelog",
    category: "team_tech",
  },
  {
    id: "overlay",
    number: "03",
    badgeLabel: "在研可运行原型",
    badgeTone: "ochre",
    title: "Learning Overlay ｜ 伴随式网页深度理解助手",
    categoryLabel: "浏览器扩展 · 原位选区 · Agent 协作流",
    year: "2024 - 2025",
    whatItIs: "突破传统侧边栏 Chat 模式，在网页阅读场景中实现原地划词解析、多篇文献概念比对与非线性灵感卡片沉淀。",
    claraContribution: "独立进行交互框架推演与前端工程开发，实现基于 Chrome Extension 的原地浮动气泡与 DOM 渲染管线。",
    image: overlayHero,
    link: "/project/overlay",
    category: "in_dev",
  },
  {
    id: "thesis",
    number: "04",
    badgeLabel: "在研课题",
    badgeTone: "sage",
    title: "面向移动社交媒体的情境自适应个人智能体 ｜ 交互设计研究",
    categoryLabel: "学术课题 · 移动社交媒体 · 情境自适应 · 混合主动交互",
    year: "2025 - 2026",
    whatItIs: "学位毕业设计研究，聚焦图文类移动社交信息流中的多样化支持需求与决策情境，探索兼顾帮助价值、打扰成本与用户自主感的主动交互机制。",
    claraContribution: "主导文献综述、半结构化访谈与情境化共同设计，并构建集成可控信息流的移动 Web 实验原型，开展两条件被试内对照实验。",
    image: thesisHero,
    link: "/project/thesis",
    category: "thesis",
  },
  {
    id: "logicweaver",
    number: "05",
    badgeLabel: "概念架构原型",
    badgeTone: "ink",
    title: "LogicWeaver ｜ 复杂多 Agent 协同工作流白盒画布",
    categoryLabel: "可视化编排 · 状态图检视 · 白盒推理",
    year: "2024",
    whatItIs: "面向多智能体编排的可视化状态调试工作台，将复杂子任务路由与状态流转过程透明化呈现。",
    claraContribution: "负责白盒交互模型构建、节点关系视觉系统以及断点阻断纠偏机制的交互规范制定。",
    image: logicweaverHero,
    link: "/project/logicweaver",
    category: "exploratory",
  },
  {
    id: "mesee",
    number: "06",
    badgeLabel: "交互与界面探索",
    badgeTone: "terracotta",
    title: "MESEE ｜ 空间智能环境伴随感官介质",
    categoryLabel: "空间计算 · 环境智能 · 意图预判",
    year: "2024",
    whatItIs: "探索环境感知 Agent 与物理空间软装材质的共生形态，通过极简微光与流体动效传递系统认知负载状态。",
    claraContribution: "完成微交互动效定义、传感器触发映射表设计及多场景情境板演示。",
    image: meseeHero,
    link: "/project/mesee",
    category: "exploratory",
  },
  {
    id: "resonance",
    number: "07",
    badgeLabel: "生成式声学实验",
    badgeTone: "ink",
    title: "Resonance ｜ 生成式声学参数画布",
    categoryLabel: "生成式美学 · Web Audio · 参数化界面",
    year: "2024",
    whatItIs: "将生物频段信号转化为沉浸式动态三维声景，探讨非语言向机器状态反馈在情绪关怀中的感官可能。",
    claraContribution: "主导参数化生成逻辑实验、音频特征拟合算法与动态交互界面实现。",
    image: resonanceHero,
    link: "/project/resonance",
    category: "exploratory",
  },
];

export function Home() {
  const [filter, setFilter] = useState<ProjectCategory>("all");
  
  // 2.5D Spatial Mouse Coordinates for Parallax Layers
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="w-full text-[#161719] overflow-hidden selection:bg-[#ccff00] selection:text-black relative">
      
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
              <h1 className="text-3xl sm:text-5xl lg:text-[3.65rem] font-editorial-cn font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
                探索人与智能体的 <br />
                <span className="font-editorial-cn font-black text-[#ccff00] neon-lime-text-glow mr-3 inline-block">
                  协同心智与交互边界，
                </span>
                <br className="hidden sm:inline" />
                并将设计转化为可运行的原型。
              </h1>

              {/* Refined Spatial Divider Line between Headline and Clara Introduction */}
              <div className="w-full my-6 border-t border-white/15" />

              {/* Spatial Editorial Subtext */}
              <p className="text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed mb-8 drop-shadow-sm">
                我是 <strong className="text-white font-medium">Clara</strong>，正处于交互设计、AI 产品与 Agent 原型构建的交汇点。我不仅关心智能体如何被想象，更在学习与亲手将它们落地在真实的硬件通信、浏览器扩展和代码环境之中。
              </p>

              {/* High Contrast Action Anchors */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a 
                  href="#works" 
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ccff00] text-[#0d0e12] font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(204,255,0,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:translate-y-[-2px]"
                >
                  <span>Selected Work · 精选作品</span>
                  <ArrowRight size={14} className="text-[#0d0e12]" />
                </a>
                <a 
                  href="#about" 
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium transition-all backdrop-blur-md shadow-lg"
                >
                  <span>About Me · 了解我的背景</span>
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
                  PHYSICAL ARTIFACT · 工作台切片
                </div>

                {/* Corner Depth Badge */}
                <div className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-[#161719] text-[#ccff00] text-[9px] font-mono font-bold tracking-tight shadow-md">
                  DEPTH LAYER Z+50
                </div>

                {/* Photographic Process Card */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-black/[0.08] relative group/photo shadow-md">
                  <img 
                    src={processNotebook} 
                    alt="Clara's Physical Process Notebook" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/photo:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 text-white text-[10px] backdrop-blur-md font-sans flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                    <span>软硬件联调实物 · CoreS3 屏幕原型</span>
                  </div>
                </div>

                {/* Card Editorial Metadata */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-baseline border-b border-black/[0.08] pb-2.5">
                    <span className="font-serif text-[#5e626b] font-medium">Curator & Builder</span>
                    <span className="font-bold text-[#161719] flex items-center gap-1">
                      <span>Clara</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ccff00] text-[#0d0e12] font-mono font-bold">RESEARCHER</span>
                    </span>
                  </div>
                  <p className="text-[#44474f] leading-relaxed text-xs font-light">
                    “跳出单一 Chat 聊天气泡，把大模型的推理意图拆解为可感知、可纠偏的物理或屏幕交互触点。”
                  </p>
                  
                  <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-medium text-[#161719]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
                      <span className="font-semibold text-stone-700">状态：课题研究 & 原型闭环中</span>
                    </div>
                    <span className="font-mono text-[#5e626b] text-[10px]">VERIFIED 2026</span>
                  </div>
                </div>

              </div>

              {/* Decorative Geometric Stamp */}
              <div className="hidden sm:flex absolute -bottom-5 -right-4 w-20 h-20 rounded-full border-2 border-dashed border-[#ccff00]/60 items-center justify-center text-center p-1.5 text-[8px] font-mono font-bold text-[#ccff00] rotate-[-12deg] pointer-events-none backdrop-blur-sm bg-black/40 shadow-lg">
                AUTONOMOUS<br />AGENT & HCI<br />STUDIO
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          MARQUEE BANNER: Distinct Dark Ribbon with Neon Lime Highlights
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#121318] py-4 overflow-hidden border-y border-white/10 relative flex items-center z-20 shadow-2xl">
        <div 
          className="whitespace-nowrap flex w-max animate-marquee text-[#f8f6f0] tracking-wide select-none" 
          style={{ fontFamily: 'var(--font-croissant)' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-sm sm:text-base md:text-lg mx-8 px-2 flex-shrink-0 flex items-center gap-5">
              <span>I want to go to the dock and grab some fries.</span>
              <span className="text-xs text-[#ccff00] font-sans font-bold tracking-normal">/* 去码头整点薯条 */</span>
              <span className="text-[#ccff00] text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN BODY SECTION WRAPPER: Tactile Warm Paper Tone
          Clean seamless transition into editorial content
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#f8f6f0] relative z-10 bg-tactile-paper">

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: ABOUT ME / BACKGROUND & PHILOSOPHY
           ───────────────────────────────────────────────────────────── */}
        <section id="about" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-b border-black/[0.08] relative z-10">
          
          {/* Section Header with Editorial Tag */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-12 pb-4 border-b border-black/[0.08]">
            <div className="flex items-baseline gap-3">
              <span className="text-[#161719] bg-[#ccff00] px-2 py-0.5 rounded-sm font-mono text-sm font-bold shadow-xs">01</span>
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-bold text-[#161719]">
                About Me · 背景与个人理念
              </h2>
            </div>
            <span className="text-xs text-[#5e626b] font-medium">
              跨越工科算法与人机交互设计的主体缝隙
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Narrative Dossier & Integrated Editorial Text Columns */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#44474f] font-light leading-relaxed">
              <p>
                我是 <strong className="font-semibold text-[#161719]">Clara</strong>，目前专注于人机交互与 AI 智能体设计研究，兼具算法工程与产品原型的交叉背景。
              </p>
              <p>
                算法与工程的探索让我熟悉神经网络的推理机制、状态机时序调度和前后端代码实现；而深入人机交互设计后，我深刻意识到：<strong className="text-[#161719] font-medium">拥有强大推理能力的大模型，并不会自发带来通透优雅的人类使用体验。</strong>
              </p>
              <p>
                今天的 AI 产品往往将用户逼入狭窄的文本输入框中，迫使人去揣摩黑盒算法的心思。我致力于打破这种单一界面垄断，在<span className="text-[#161719] font-medium bg-[#ccff00]/40 px-1 rounded-xs">硬件具身、浏览器上下文原地解析、复杂关系推理拓扑</span>等具体场景中，打造真正具备生命感与控制感的人机协作系统。
              </p>

              {/* Three Focus Columns: Clean Editorial Layout with Typographic Hierarchy (No orphan dots) */}
              <div className="pt-6 border-t border-black/[0.08]">
                <div className="text-xs font-serif uppercase tracking-widest text-[#5e626b] mb-5 font-bold">
                  CORE FOCUS · 核心关注方向
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                  
                  {/* Pillar 01 */}
                  <div className="space-y-2 border-l-2 border-[#161719] pl-3.5 sm:border-l-0 sm:pl-0 sm:border-t-2 sm:pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#161719]">01</span>
                      <h4 className="font-bold text-[#161719] text-sm font-editorial-cn">
                        超越单一对话框
                      </h4>
                    </div>
                    <p className="text-xs text-[#5e626b] leading-relaxed">
                      探索原地 DOM 选区解析、物理硬件手办交互与多维白盒拓扑，拒绝把人逼入狭窄聊天气泡。
                    </p>
                  </div>

                  {/* Pillar 02 */}
                  <div className="space-y-2 border-l-2 border-[#1d3e6d] pl-3.5 sm:border-l-0 sm:pl-0 sm:border-t-2 sm:pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#1d3e6d]">02</span>
                      <h4 className="font-bold text-[#161719] text-sm font-editorial-cn">
                        可感知 · 纠偏 · 限定
                      </h4>
                    </div>
                    <p className="text-xs text-[#5e626b] leading-relaxed">
                      让智能体的推论过程可被用户理解、审查和随时划定领地边界，构建有安全感的人机契约。
                    </p>
                  </div>

                  {/* Pillar 03 */}
                  <div className="space-y-2 border-l-2 border-[#d69836] pl-3.5 sm:border-l-0 sm:pl-0 sm:border-t-2 sm:pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#d69836]">03</span>
                      <h4 className="font-bold text-[#161719] text-sm font-editorial-cn">
                        做可运行的原型
                      </h4>
                    </div>
                    <p className="text-xs text-[#5e626b] leading-relaxed">
                      不沉溺在空泛的科幻概念里，亲自用代码和硬件调出最小可工作闭环，以工程检验设计假设。
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Visual Collaged Note with Risograph Artifact */}
            <div className="lg:col-span-5 relative">
              <div className="pt-8 px-6 pb-6 rounded-3xl bg-white border border-black/[0.08] paper-shadow-lg relative overflow-visible">
                
                {/* Semi-translucent Washi tape without covering content */}
                <div className="washi-tape-blue absolute -top-3.5 left-8 px-4 py-0.5 text-[10px] text-white font-medium rounded-xs tracking-wider z-20">
                  CURRICULUM VITAE
                </div>

                <div className="text-xs font-serif text-[#161719] pb-3 mb-4 border-b border-black/[0.08] flex justify-between items-center">
                  <span className="font-bold">CLARA'S RADAR</span>
                  <span className="text-[#161719] bg-[#ccff00] px-1.5 py-0.2 rounded text-[10px] font-mono font-bold">VERIFIED 2026</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">当前专业与院校</span>
                    <div className="font-medium text-[#161719] flex items-center justify-between">
                      <span>同济大学设计创意学院 (D&I)</span>
                      <span className="text-xs text-[#161719] bg-[#ccff00]/60 px-2 py-0.5 rounded font-semibold">交互设计硕士在读</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">本科起点</span>
                    <div className="font-medium text-[#161719]">
                      人工智能相关专业（CS & 算法工科背景）
                    </div>
                  </div>

                  <div>
                    <span className="text-[#5e626b] block text-[11px] mb-1">真实定位态度</span>
                    <p className="text-[#44474f] text-[11px] leading-relaxed bg-[#f8f6f0] p-3 rounded-xl border border-black/[0.05]">
                      “致力于弥合技术与以人为本的设计之间的鸿沟，通过研究 AI 的发展与人类真实需求，让 AI 技术变得更易于触达和享受。”
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black/[0.08] flex items-center justify-between text-[11px]">
                    <span className="text-[#5e626b]">联络方式</span>
                    <span className="font-mono text-[#161719] font-medium">[clara.design.ai@placeholder.com]</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: SELECTED WORK (Clean Streamlined Editorial Project Cards)
           ───────────────────────────────────────────────────────────── */}
        <section id="works" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto relative z-10">
          
          {/* Section Header & Stage Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-6 border-b border-black/[0.08] gap-6">
            <div className="max-w-xl">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[#161719] bg-[#ccff00] px-2 py-0.5 rounded-sm font-mono text-sm font-bold shadow-xs">02</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial-cn font-bold text-[#161719] whitespace-nowrap">
                  Selected Work · 精选作品
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5e626b] leading-relaxed">
                聚焦代表性项目入口；具体实现细节、时序流与技术推演可点击进入项目详情。
              </p>
            </div>

            {/* Filter Bar with clean, non-cramped layout */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-black/[0.05] border border-black/[0.08] text-xs font-medium">
              <button 
                onClick={() => setFilter("all")} 
                className={`px-3 py-1.5 rounded-full transition-all ${filter === "all" ? "bg-[#161719] text-[#f8f6f0] shadow-xs font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                全部 ({REAL_PROJECTS.length})
              </button>
              <button 
                onClick={() => setFilter("completed")} 
                className={`px-3 py-1.5 rounded-full transition-all ${filter === "completed" ? "bg-[#161719] text-[#ccff00] shadow-xs font-bold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                已实现硬件原型
              </button>
              <button 
                onClick={() => setFilter("team_tech")} 
                className={`px-3 py-1.5 rounded-full transition-all ${filter === "team_tech" ? "bg-[#1d3e6d] text-white shadow-xs font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                团队算法实现
              </button>
              <button 
                onClick={() => setFilter("in_dev")} 
                className={`px-3 py-1.5 rounded-full transition-all ${filter === "in_dev" ? "bg-[#d69836] text-white shadow-xs font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                在研闭环
              </button>
              <button 
                onClick={() => setFilter("thesis")} 
                className={`px-3 py-1.5 rounded-full transition-all ${filter === "thesis" ? "bg-[#4e6b56] text-white shadow-xs font-semibold" : "text-[#5e626b] hover:text-[#161719]"}`}
              >
                毕业设计命题
              </button>
            </div>
          </div>

          {/* Streamlined Editorial Project Cards: Balanced density, clear hierarchy, no bloat */}
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <article 
                key={project.id}
                className="p-5 sm:p-7 md:p-8 rounded-3xl bg-white border border-black/[0.08] paper-shadow-hover relative overflow-hidden group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  
                  {/* Left Visual Preview: Balanced aspect ratio (16/10) */}
                  <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-[#f8f6f0] aspect-[16/10] border border-black/[0.08] paper-shadow">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    
                    {/* Subtle Stamp on Image Corner */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] text-[11px] font-medium text-[#161719] shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#161719]" />
                      <span>{project.badgeLabel}</span>
                    </div>

                    {/* Corner Quick Jump */}
                    <Link 
                      to={project.link}
                      className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#161719] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all shadow-md group-hover:scale-110"
                      title="查看完整详情"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>

                  {/* Right Editorial Info: Streamlined, concise, high readability */}
                  <div className="lg:col-span-7 flex flex-col justify-between py-1">
                    <div>
                      
                      {/* Meta line: Clean restrained number & category tag */}
                      <div className="flex items-center gap-2.5 text-xs text-[#5e626b] mb-2 font-medium">
                        <span className="font-mono text-sm text-[#161719] bg-[#ccff00] px-1.5 rounded-xs font-bold tracking-tight">{project.number}</span>
                        <span>·</span>
                        <span className="text-[#1d3e6d] font-semibold">{project.categoryLabel}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-xl sm:text-2xl font-editorial-cn font-bold text-[#161719] mb-3 leading-snug">
                        <Link to={project.link} className="hover:text-[#1d3e6d] transition-colors">
                          {project.title}
                        </Link>
                      </h3>

                      {/* What It Is (1-2 sentences) */}
                      <div className="mb-3 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
                        {project.whatItIs}
                      </div>

                      {/* Clara's Specific Contribution (1 crisp sentence) */}
                      <div className="p-3 rounded-xl bg-[#f8f6f0] border border-black/[0.06] text-xs text-[#161719] mb-5">
                        <span className="text-[#161719] font-bold mr-1.5">我的实际贡献：</span>
                        <span className="text-[#44474f] leading-relaxed">{project.claraContribution}</span>
                      </div>

                    </div>

                    {/* Card Action Link */}
                    <div className="pt-3 border-t border-black/[0.08] flex items-center justify-between">
                      <Link 
                        to={project.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#161719] hover:text-[#1d3e6d] transition-colors group/link"
                      >
                        <span>阅读该项目的完整推演与记录</span>
                        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                      </Link>
                      <span className="text-[11px] text-[#5e626b] font-mono">
                        VIEW CASE STUDY ↗
                      </span>
                    </div>

                  </div>

                </div>
              </article>
            ))}
          </div>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 4: NOTEBOOK & EXPERIMENTAL SCRAPBOOK (#notebook)
           ───────────────────────────────────────────────────────────── */}
        <section id="notebook" className="w-full py-16 md:py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-black/[0.08] relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-10 pb-4 border-b border-black/[0.08]">
            <div className="flex items-baseline gap-3">
              <span className="text-[#161719] bg-[#ccff00] px-2 py-0.5 rounded-sm font-mono text-sm font-bold shadow-xs">03</span>
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-bold text-[#161719]">
                Research & Working Notes · 研究与草图笔记
              </h2>
            </div>
            <span className="text-xs text-[#5e626b]">
              非线性的设计思索、人机心智草图与工作流反思
            </span>
          </div>

          {/* Asymmetrical Editorial Showcase: Collage & Interactive Trace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Collage Plate */}
            <div className="lg:col-span-6 relative">
              <div className="p-3 sm:p-4 rounded-3xl bg-white border border-black/[0.08] paper-shadow-lg">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative">
                  <img 
                    src={agentCollage} 
                    alt="Human-Agent Interaction Design Collage" 
                    className="w-full h-full object-cover"
                  />
                  <div className="washi-tape-lime absolute top-3 right-6 px-3 py-0.5 text-[10px] text-[#0d0e12] font-bold rounded-xs tracking-wider">
                    RISOGRAPH ARCHIVE
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-xs text-[#5e626b]">
                  <span className="font-serif">Plate 04: 人与 Agent 协作的心智拓扑与流转机制</span>
                  <span className="text-[11px] text-[#161719] bg-[#ccff00] px-1.5 py-0.5 rounded font-bold">研究档案切片</span>
                </div>
              </div>
            </div>

            {/* Interactive Mindset Notes */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="space-y-4">
                
                <div className="p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
                  <span className="text-[11px] font-bold text-[#161719] bg-[#ccff00]/60 px-2 py-0.5 rounded inline-block uppercase tracking-wider mb-2">
                    01 / 拒绝黑盒焦虑：从“魔法感”走向“透明可控”
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#161719] mb-1.5 font-editorial-cn">
                    为什么 Agent 不应只是另一个聊天机器人？
                  </h4>
                  <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed font-light">
                    对话框将复杂任务压缩为线性的文字流，剥夺了人类在二维视觉空间中的浏览、组织与直接操纵能力。当 Agent 处理多步长流程时，用户需要看见它的“执行轨迹、依据来源与决策假设”，并能在任何阶段插手干预。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
                  <span className="text-[11px] font-bold text-[#1d3e6d] bg-[#1d3e6d]/10 px-2 py-0.5 rounded inline-block uppercase tracking-wider mb-2">
                    02 / 核心研究关切：移动社交信息流的情境自适应介入
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#161719] mb-1.5 font-editorial-cn">
                    Agent 何时适合主动介入，何时应当保持静默？
                  </h4>
                  <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed font-light">
                    在移动社交媒体的连续浏览中，用户的活动与意图会随信息流不断转换。我在毕业课题中正探索：个人智能体如何依据浏览情境权衡帮助价值、判断不确定性与打扰成本，在提供恰当支持的同时保障用户的自主控制感。
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
                  <span className="text-[11px] font-bold text-[#d69836] bg-[#d69836]/10 px-2 py-0.5 rounded inline-block uppercase tracking-wider mb-2">
                    03 / 保持年轻与诚实：构建最小可验证原型
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#161719] mb-1.5 font-editorial-cn">
                    用真实代码与硬件检验交互假说
                  </h4>
                  <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed font-light">
                    在 PopBox 中调试 CoreS3 串口通信，在 Lifelog 中比对视觉关键帧，在 Learning Overlay 中计算 DOM Range 的 Offset……亲手把原型跑通，是让设计经受现实检验的唯一方式。
                  </p>
                </div>

              </div>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}
