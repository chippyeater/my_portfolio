import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import thesisConceptImg from "../assets/images/thesis_research_concept_1795349826933.jpg";

const LITERATURE_INSIGHTS = [
  {
    index: "01",
    tag: "ACTIVITY SHIFT",
    title: "浏览活动与目标变化",
    body: "一次连续浏览可能包含信息查找、开放探索、评论参与等不同活动，用户的目标与需求也会随内容和行为变化。",
  },
  {
    index: "02",
    tag: "SUPPORT NEEDS",
    title: "潜在支持需求识别",
    body: "用户需要的帮助并不局限于减少浏览时长，还可能包括理解信息、比较内容、辅助决策与社交表达。",
  },
  {
    index: "03",
    tag: "BENEFIT VS. COST",
    title: "介入收益与打扰成本",
    body: "即使 Agent 能推断潜在需求，也需要考虑判断的不确定性、帮助价值及对当前活动的干扰，决定何时提示或保持静默。",
  },
] as const;

const RESEARCH_DIRECTIONS = [
  {
    step: "01",
    rq: "RQ1",
    title: "RQ1 · 识别需求与情境",
    phase: "形成性研究",
    body: "通过访谈、真实事件回溯与简短共创，归纳浏览活动、用户支持需求及相关决策情境特征。",
  },
  {
    step: "02",
    rq: "RQ2",
    title: "RQ2 · 设计介入机制",
    phase: "交互策略设计",
    body: "探索 Agent 何时介入、提供什么帮助，以及采用何种界面呈现与用户控制方式。",
  },
  {
    step: "03",
    rq: "RQ3",
    title: "RQ3 · 原型与系统级对照",
    phase: "实验比较计划",
    body: "计划使用受控移动 Web 原型，比较用户按需调用的通用助手与可主动介入的情境自适应 Agent。",
  },
] as const;

const NEXT_STEPS_SEQUENCE = [
  { step: "01", label: "形成性访谈与共创" },
  { step: "02", label: "情境自适应交互设计" },
  { step: "03", label: "可控移动 Web 实验原型" },
  { step: "04", label: "两条件系统级对照实验与设计原则归纳" },
] as const;

export function ThesisProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="w-full min-h-screen flex flex-col bg-[#F6F6F3] text-[#111111] selection:bg-[#FF7A00] selection:text-[#111111] overflow-x-clip relative"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(17,17,17,0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.032) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Top Exhibition Header Bar */}
      <header className="w-full border-b border-[#111111]/15 bg-[#F6F6F3]/95 backdrop-blur-md relative z-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 h-14 flex items-center justify-between gap-6">
          <Link
            to="/#work-thesis"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4A4A4A] hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={15} />
            <span>返回精选作品列表</span>
          </Link>

          <nav
            aria-label="页面章节导览"
            className="hidden md:flex items-center gap-6 text-xs font-mono text-[#525252]"
          >
            <a
              href="#literature"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              01 / LITERATURE
            </a>
            <a
              href="#landscape"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              02 / LANDSCAPE
            </a>
            <a
              href="#direction"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              03 / DIRECTION
            </a>
            <a
              href="#status"
              className="hover:text-[#111111] transition-colors whitespace-nowrap shrink-0"
            >
              04 / STATUS
            </a>
          </nav>

          <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#111111] whitespace-nowrap shrink-0">
            <span className="w-2 h-2 bg-[#FF7A00] inline-block" aria-hidden="true" />
            <span>2026.11 — Present</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pb-16 sm:pb-24 relative z-10">
        {/* ==================== 00｜OPENING PPT COVER HERO ==================== */}
        <section className="pt-8 sm:pt-12 pb-14 sm:pb-18">
          {/* Top Exhibition Meta Strip */}
          <div className="border-y border-[#111111] bg-white px-4 py-2.5 mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[11px] sm:text-xs font-mono">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#111111]">
              <span className="px-2 py-0.5 bg-[#FF7A00] text-[#111111] font-bold">
                MASTER THESIS
              </span>
              <span className="font-semibold">RESEARCH IN PROGRESS</span>
              <span aria-hidden="true" className="text-[#A3A3A3]">/</span>
              <span className="text-[#525252]">LITERATURE REVIEW</span>
            </div>
            <div className="flex items-center gap-3 text-[#525252] tabular-nums">
              <span>TONGJI D&amp;I · INTERACTION DESIGN</span>
              <span aria-hidden="true" className="text-[#A3A3A3]">·</span>
              <span className="text-[#111111] font-semibold">2026.11 — Present</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Bold Opening Title + Factual Research Spec */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center px-2.5 py-1 bg-[#111111] text-[#FF8A00] font-mono text-xs font-bold tracking-wider">
                  00 / RESEARCH BOARD
                </span>
                <span className="h-px flex-1 bg-[#111111]/20" aria-hidden="true" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-editorial-cn font-black tracking-tight text-[#111111] leading-[1.16] text-balance">
                在不断变化的浏览中，
                <span className="inline-block relative">
                  Agent 何时应该介入？
                  <span
                    aria-hidden="true"
                    className="block h-1.5 w-full bg-[#FF7A00] mt-1"
                  />
                </span>
              </h1>

              {/* Formal Title & Attribution Block */}
              <div className="border border-[#111111]/20 bg-white p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#6E6E6E]">
                  <span className="w-1.5 h-1.5 bg-[#FF7A00]" aria-hidden="true" />
                  <span>FORMAL THESIS TOPIC · 正式题目</span>
                </div>
                <p className="text-sm sm:text-[15px] font-bold text-[#111111] leading-snug">
                  面向移动社交媒体的情境自适应个人智能体交互设计研究
                </p>
                <p className="text-xs text-[#525252]">
                  同济大学设计创意学院 · 交互设计硕士毕业设计 · 文献调研阶段
                </p>
              </div>

              <p className="text-[15px] sm:text-base text-[#3A3A3A] leading-[1.8] font-normal">
                手机信息流中的浏览活动可能在信息查找、兴趣探索与社交参与之间变化。同样的内容和操作，也可能对应不同的用户目标。现有 AI 已能理解部分屏幕内容并提供建议，但如何判断用户此刻是否需要帮助、什么形式的介入更合适，仍值得进一步研究。
              </p>

              {/* Target Scope Strip */}
              <div className="pt-4 border-t border-[#111111]/15 flex items-center gap-2.5 text-xs text-[#4A4A4A]">
                <span className="w-2.5 h-2.5 bg-[#FF7A00] shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-[#111111] font-semibold">研究对象：</strong>
                  图文类移动社交媒体信息流中的自主浏览活动
                </span>
              </div>
            </div>

            {/* Right Column: Curated Exhibition Cover Collage */}
            <div className="lg:col-span-6 relative">
              {/* Background Offset Accent Plate */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-3 -right-3 w-full h-full border border-[#111111]/25 bg-[#EAEAE4] pointer-events-none"
              />

              <figure className="relative bg-white border border-[#111111] shadow-[8px_8px_0px_#111111] overflow-hidden">
                {/* Slide Header Strip */}
                <div className="bg-[#111111] text-white px-4 py-2.5 flex items-center justify-between gap-3 text-[11px] font-mono">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 bg-[#FF7A00] shrink-0" aria-hidden="true" />
                    <span className="truncate">FIG 00 // RESEARCH CONCEPT</span>
                  </div>
                  <span className="px-2 py-0.5 bg-[#FF7A00] text-[#111111] font-bold text-[10px] whitespace-nowrap shrink-0">
                    LITERATURE STAGE
                  </span>
                </div>

                {/* Main Artwork Container with Layered Micro-Cards */}
                <div className="relative bg-[#F6F6F3] p-3 sm:p-4 border-b border-[#111111]/15">
                  <div className="relative border border-[#111111]/20 bg-[#f8f6f0] overflow-hidden">
                    <img
                      src={thesisConceptImg}
                      alt="研究概念示意：移动信息流浏览路径、浮动研究笔记与情境自适应 Agent 介入判断"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto aspect-[4/3] object-contain block"
                    />

                    {/* Top-Right Layered Collage Index Note */}
                    <div className="hidden sm:block absolute top-3 right-3 bg-white border border-[#111111] px-2.5 py-1.5 shadow-[3px_3px_0px_#FF7A00] text-[10px] font-mono leading-tight">
                      <span className="block text-[#C24E00] font-bold">CONTEXT × TIMING</span>
                      <span className="text-[#525252]">介入时机 · 提示方式</span>
                    </div>

                    {/* Bottom-Left Sharp Disclaimer Flag */}
                    <div className="absolute bottom-2.5 left-2.5 bg-[#111111] text-white px-2.5 py-1 text-[10px] font-mono">
                      Research Concept · Not a working prototype
                    </div>
                  </div>
                </div>

                {/* Bottom Layered Tension Strip (Exhibition Board Spec) */}
                <figcaption className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px]">
                  <span className="font-mono font-semibold text-[#111111]">
                    研究概念示意 · 浏览路径与情境介入判断
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 bg-[#F2F2EE] border border-[#111111]/20 text-[#111111]">
                      帮助价值
                    </span>
                    <span className="px-2 py-0.5 bg-[#FF8A00]/20 border border-[#FF7A00] text-[#111111] font-semibold">
                      打扰成本
                    </span>
                    <span className="px-2 py-0.5 bg-[#F2F2EE] border border-[#111111]/20 text-[#111111]">
                      用户自主感
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ==================== 01｜LITERATURE INSIGHTS ==================== */}
        <section
          id="literature"
          className="pt-12 sm:pt-16 pb-14 sm:pb-18 border-t-2 border-[#111111] scroll-mt-14 space-y-8"
        >
          {/* Unified PPT Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-[#111111]/15">
            <div className="lg:col-span-4 flex items-end gap-4">
              <span className="text-5xl sm:text-6xl font-display font-black leading-none tracking-tighter text-[#FF7A00] tabular-nums select-none">
                01
              </span>
              <div className="pb-1 space-y-1">
                <span className="block text-[11px] font-mono font-bold tracking-wider text-[#111111]">
                  LITERATURE INSIGHTS
                </span>
                <span className="block text-xs text-[#525252]">
                  文献归纳与问题收敛
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-2.5">
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-black text-[#111111] leading-snug text-balance">
                01｜From Literature to Research Questions
              </h2>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-[1.78]">
                围绕社交信息流使用、主动式 Agent 与自我调节支持机制开展文献调研后，我将当前问题收敛为以下三个研究切入点。
              </p>
            </div>
          </div>

          {/* 3 Structured Research Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {LITERATURE_INSIGHTS.map((item) => (
              <article
                key={item.index}
                className="bg-white border border-[#111111] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Top Metadata Band */}
                  <div className="bg-[#F2F2EE] border-b border-[#111111] px-4 py-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#111111] text-[#FF8A00] font-mono text-xs font-bold tabular-nums">
                        {item.index}
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-[#525252]">
                        {item.tag}
                      </span>
                    </div>
                    <span className="w-2.5 h-2.5 bg-[#FF7A00]" aria-hidden="true" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-lg font-editorial-cn font-bold text-[#111111] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#3A3A3A] leading-[1.75]">
                      {item.body}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 py-2.5 border-t border-[#111111]/12 flex items-center justify-between text-[11px] font-mono text-[#6E6E6E]">
                  <span>LITERATURE FOCUS</span>
                  <span className="text-[#111111] font-semibold">文献归纳</span>
                </div>
              </article>
            ))}
          </div>

          {/* Dark Exhibition Synthesis Strip */}
          <div className="border border-[#111111] bg-[#111111] text-white grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-3 bg-[#FF7A00] text-[#111111] px-5 py-4 flex flex-col justify-center gap-0.5">
              <span className="font-mono text-[10px] font-bold tracking-wider">
                SYNTHESIS BAR
              </span>
              <span className="font-editorial-cn text-base font-black">
                文献调研脉络
              </span>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 text-xs">
              <div className="px-5 py-4 space-y-1">
                <span className="block font-mono text-[11px] text-[#A3A3A3]">
                  调研线索 · 01
                </span>
                <span className="block font-medium text-white">
                  移动社交使用体验与评价体系
                </span>
              </div>
              <div className="px-5 py-4 space-y-1">
                <span className="block font-mono text-[11px] text-[#A3A3A3]">
                  调研线索 · 02
                </span>
                <span className="block font-medium text-white">
                  多样化支持需求与自我调节支持机制
                </span>
              </div>
              <div className="px-5 py-4 space-y-1">
                <span className="block font-mono text-[11px] text-[#FF8A00]">
                  问题提炼 · 核心权衡
                </span>
                <span className="block font-medium text-white">
                  帮助价值 · 打扰成本 · 用户自主感
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 02｜PRODUCT LANDSCAPE (INTENTIONAL RESERVED BLANK) ==================== */}
        <section
          id="landscape"
          className="pt-12 sm:pt-16 pb-14 sm:pb-18 border-t-2 border-[#111111] scroll-mt-14 space-y-8"
        >
          {/* Unified PPT Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-[#111111]/15">
            <div className="lg:col-span-4 flex items-end gap-4">
              <span className="text-5xl sm:text-6xl font-display font-black leading-none tracking-tighter text-[#D4D4CE] tabular-nums select-none">
                02
              </span>
              <div className="pb-1 space-y-1">
                <span className="block text-[11px] font-mono font-bold tracking-wider text-[#111111]">
                  PRODUCT LANDSCAPE
                </span>
                <span className="block text-xs text-[#6E6E6E]">
                  预留版块
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-black text-[#111111] leading-snug">
                02｜Product Landscape
              </h2>
              <span className="px-2.5 py-0.5 bg-[#F2F2EE] border border-[#111111]/25 text-[11px] font-mono text-[#525252]">
                Reserved
              </span>
            </div>
          </div>

          {/* Intentional Architectural Blank Canvas */}
          <div
            aria-label="Product Landscape 预留空白版块"
            className="w-full min-h-[168px] sm:min-h-[200px] bg-white border border-[#111111]/25 relative flex items-center justify-center p-6"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(17,17,17,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.03) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          >
            {/* Registration Corner Marks */}
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-[#111111]/45"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-[#111111]/45"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-[#111111]/45"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-[#111111]/45"
            />

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F6F6F3] border border-[#111111]/20 text-xs font-mono text-[#525252]">
              <span className="w-2 h-2 bg-[#FF7A00]" aria-hidden="true" />
              <span>Reserved · To Be Added</span>
            </div>
          </div>
        </section>

        {/* ==================== 03｜RESEARCH DIRECTION ==================== */}
        <section
          id="direction"
          className="pt-12 sm:pt-16 pb-14 sm:pb-18 border-t-2 border-[#111111] scroll-mt-14 space-y-8"
        >
          {/* Unified PPT Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-6 border-b border-[#111111]/15">
            <div className="lg:col-span-4 flex items-end gap-4">
              <span className="text-5xl sm:text-6xl font-display font-black leading-none tracking-tighter text-[#FF7A00] tabular-nums select-none">
                03
              </span>
              <div className="pb-1 space-y-1">
                <span className="block text-[11px] font-mono font-bold tracking-wider text-[#111111]">
                  RESEARCH DIRECTION
                </span>
                <span className="block text-xs text-[#525252]">
                  研究架构与推进路径
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-2.5">
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-black text-[#111111] leading-snug text-balance">
                03｜Research Direction
              </h2>
              <p className="text-sm sm:text-base text-[#3A3A3A] leading-[1.78]">
                计划通过形成性用户研究识别浏览活动中的支持需求与相关情境，再据此设计 Agent 的介入策略，并在统一移动端原型中比较响应式通用助手与情境自适应 Agent 的整体体验。
              </p>
            </div>
          </div>

          {/* Connected Research Architecture Strip */}
          <div className="space-y-4">
            {/* Desktop Logic Flow Bar */}
            <div className="hidden md:grid grid-cols-3 gap-6 items-center px-1 text-[11px] font-mono text-[#525252]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#111111] text-white font-bold">STAGE 01</span>
                <span>识别需求与情境</span>
                <span className="h-px flex-1 bg-[#111111]/25" aria-hidden="true" />
                <ArrowRight size={13} className="text-[#FF7A00] shrink-0" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FF7A00] text-[#111111] font-bold">STAGE 02</span>
                <span>设计介入机制</span>
                <span className="h-px flex-1 bg-[#111111]/25" aria-hidden="true" />
                <ArrowRight size={13} className="text-[#FF7A00] shrink-0" />
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#111111] text-white font-bold">STAGE 03</span>
                <span>原型与系统级对照</span>
                <span className="h-px flex-1 bg-[#111111]/25" aria-hidden="true" />
              </div>
            </div>

            {/* 3 RQ Research Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {RESEARCH_DIRECTIONS.map((item, idx) => (
                <article
                  key={item.rq}
                  className="bg-white border border-[#111111] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 relative"
                >
                  {/* Top Strong Orange/Black Bar */}
                  <div
                    className={`h-1.5 w-full ${
                      idx === 1 ? "bg-[#FF7A00]" : "bg-[#111111]"
                    }`}
                  />

                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-0.5 font-mono text-xs font-bold ${
                            idx === 1
                              ? "bg-[#FF7A00] text-[#111111]"
                              : "bg-[#111111] text-[#FF8A00]"
                          }`}
                        >
                          {item.rq}
                        </span>
                        <span className="text-[11px] font-mono text-[#525252]">
                          {item.phase}
                        </span>
                      </div>

                      <h3 className="text-lg font-editorial-cn font-bold text-[#111111] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#3A3A3A] leading-[1.75]">
                        {item.body}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#111111]/12 flex items-center justify-between text-[11px] font-mono text-[#6E6E6E]">
                      <span>计划推进阶段 {item.step}</span>
                      <span className="text-[#111111] font-semibold">Planned</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Concise Design Judgment Exhibition Callout */}
          <div className="border border-[#111111] bg-white shadow-[6px_6px_0px_#FF7A00]">
            <div className="bg-[#111111] text-white px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF7A00]" aria-hidden="true" />
                <span className="font-bold">DESIGN JUDGMENT</span>
              </div>
              <span className="text-[#FF8A00]">设计边界与克制介入</span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-sm sm:text-base text-[#111111] font-medium leading-[1.82]">
                研究关注的不只是 Agent 能识别什么，还包括：在判断不确定、可能打断当前活动或用户没有明确求助时，系统是否应该保持静默、延迟提示或先请求确认。
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 04｜STATUS & NEXT STEPS ==================== */}
        <section
          id="status"
          className="pt-12 sm:pt-16 border-t-2 border-[#111111] scroll-mt-14 space-y-6"
        >
          {/* Unified PPT Section Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-[#111111]/15">
            <div className="flex items-end gap-4">
              <span className="text-4xl sm:text-5xl font-display font-black leading-none tracking-tighter text-[#111111] tabular-nums select-none">
                04
              </span>
              <div className="pb-0.5 space-y-0.5">
                <span className="block text-[11px] font-mono font-bold tracking-wider text-[#C24E00]">
                  STATUS &amp; NEXT STEPS
                </span>
                <h2 className="text-xl sm:text-2xl font-editorial-cn font-black text-[#111111] leading-snug">
                  研究进度与后续计划
                </h2>
              </div>
            </div>
          </div>

          <div className="border border-[#111111] bg-white grid grid-cols-1 lg:grid-cols-12">
            {/* Left Current Stage Block */}
            <div className="lg:col-span-4 bg-[#111111] text-white p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#FF8A00]">
                  <span className="w-2 h-2 bg-[#FF7A00]" aria-hidden="true" />
                  <span>CURRENT STAGE · 当前阶段</span>
                </div>
                <p className="text-lg sm:text-xl font-editorial-cn font-bold text-white leading-snug">
                  文献调研与研究方案整理
                </p>
              </div>
              <div className="pt-3 border-t border-white/15 text-[11px] font-mono text-[#A3A3A3]">
                2026.11 — Present
              </div>
            </div>

            {/* Right Linear Step Chain (No fake percentages) */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-center gap-4">
              <span className="text-[11px] font-mono font-bold text-[#525252]">
                NEXT STEPS · 后续计划
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {NEXT_STEPS_SEQUENCE.map((item, idx) => (
                  <div
                    key={item.step}
                    className="border border-[#111111]/20 bg-[#F6F6F3] p-3.5 flex flex-col justify-between gap-2.5 relative"
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="font-bold text-[#111111] tabular-nums">
                        {item.step}
                      </span>
                      {idx < NEXT_STEPS_SEQUENCE.length - 1 ? (
                        <ArrowRight size={12} className="text-[#FF7A00]" aria-hidden="true" />
                      ) : (
                        <span className="w-2 h-2 bg-[#FF7A00]" aria-hidden="true" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-[#111111] leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Compact Footer matching site conventions */}
      <footer className="mt-auto w-full border-t border-[#111111]/15 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#525252]">
            <span className="font-editorial-cn font-bold text-[#111111]">
              面向移动社交媒体的情境自适应个人智能体交互设计研究
            </span>
            <span aria-hidden="true">·</span>
            <span>文献调研阶段</span>
          </div>

          <Link
            to="/#work-thesis"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#FF7A00] text-white hover:text-[#111111] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回精选作品列表</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
