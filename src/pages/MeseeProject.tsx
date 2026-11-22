import { useState, useEffect } from "react";
import { ArrowLeft, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";

const MESEE_MEDIA = {
  showcaseBoard: "/assets/mesee/mesee_showcase_board.png",
  diagrams: {
    journeyMap: "/assets/aistudio/_____b8515ea7.png",
    systemConcept: "/assets/aistudio/_____86a93625.png",
  },
  capture: {
    taskAddDrag: "/assets/aistudio/mesee-task-add_961fc000.png",
    taskDetectModal: "/assets/aistudio/mesee-task-detect_40230906.png",
    taskEditDetail: "/assets/aistudio/mesee-task-edit_321ac8b1.png",
  },
  remind: {
    timedLockScreen: "/assets/aistudio/mesee-timed-reminder1_70e24df0.png",
    timedUnlockBanner: "/assets/aistudio/mesee-timed-reminder2_ec2b2714.png",
    timedAgentCall: "/assets/aistudio/mesee-timed-reminder-call_5c3b4986.png",
    contextWidget: "/assets/aistudio/mesee-context-widget_6dd7f665.png",
    contextActionDetail: "/assets/aistudio/mesee-context-action_6bbfc11c.png",
    delegatedLockNotice: "/assets/aistudio/mesee-delegated-task1_974469e7.png",
    delegatedAuthorize: "/assets/aistudio/mesee-delegated-task2_2626944b.png",
    delegatedDraftWindow: "/assets/aistudio/mesee-delegated-task3_bb277c15.png",
    delegatedFeedback: "/assets/aistudio/mesee-delegated-task4_42a17f98.png",
  },
  memory: {
    canvasBoard: "/assets/aistudio/mesee-memory-board_f28ead62.png",
    recallGraph: "/assets/aistudio/mesee-memory-recall_43292464.png",
  },
};

interface ZoomTarget {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  deepBackdrop?: boolean;
}

interface ScreenFrameProps {
  src: string;
  alt: string;
  label?: string;
  title: string;
  caption?: string;
  tone?: "blue" | "lavender" | "soft" | "deep";
  imageHeightClass?: string;
  onZoom: (target: ZoomTarget) => void;
  zoomSubtitle?: string;
}

function ScreenFrame({
  src,
  alt,
  label,
  title,
  caption,
  tone = "blue",
  imageHeightClass = "h-[200px] sm:h-[220px]",
  onZoom,
  zoomSubtitle,
}: ScreenFrameProps) {
  const isDeep = tone === "deep";
  const surfaceBg = isDeep
    ? "from-[#546ED5] via-[#6569D1] to-[#7D6CD8] border-[#4D77E8]/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
    : tone === "lavender"
      ? "from-[#F1EDFF]/75 via-white to-[#EEF4FF]/55 border-[#8B79DA]/20"
      : tone === "soft"
        ? "from-[#F5F8FF] via-white to-[#EEF4FF]/65 border-[#4D77E8]/15"
        : "from-[#EEF4FF]/75 via-white to-[#F1EDFF]/50 border-[#4D77E8]/20";

  return (
    <div className="flex flex-col h-full">
      <button
        type="button"
        onClick={() =>
          onZoom({
            src,
            alt,
            title,
            subtitle: zoomSubtitle,
            deepBackdrop: isDeep,
          })
        }
        className={`group relative w-full rounded-[20px] bg-gradient-to-br ${surfaceBg} border p-2.5 sm:p-3 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(77,119,232,0.32)] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D77E8]`}
        aria-label={`放大查看 ${title}`}
      >
        <img
          src={src}
          alt={alt}
          className={`w-auto max-w-full ${imageHeightClass} object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
        />
        <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/92 backdrop-blur-sm text-[11px] font-medium text-[#292B35] border border-[#292B35]/10 shadow-xs">
          <Expand size={10} className="text-[#4D77E8]" />
          <span>放大</span>
        </span>
      </button>

      <div className="mt-2.5 px-1 space-y-1">
        {label && (
          <p className="text-[11px] font-mono tracking-wider text-[#4D77E8] font-semibold">
            {label}
          </p>
        )}
        <h4 className="text-sm font-semibold text-[#292B35] leading-snug">
          {title}
        </h4>
        {caption && (
          <p className="text-xs text-[#737786] leading-relaxed">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

const DESIGN_GOALS = [
  {
    index: "01",
    title: "让记忆更轻松",
    strategy: "设计策略：语义化记录",
    description:
      "尝试从日常信息中识别具有任务意义的内容，将零散的信息组织为可查看、可编辑的任务，减少手动记录与整理的负担。",
    tone: "blue",
  },
  {
    index: "02",
    title: "让重要内容不会被遗忘",
    strategy: "设计策略：情境化触达",
    description:
      "结合时间、地点和任务状态等线索，探索不同的提醒时机与交互方式，让用户在需要的时候重新注意到相关事项。",
    tone: "lavender",
  },
  {
    index: "03",
    title: "让思考更连贯、知识更聚合",
    strategy: "设计策略：图谱化关联",
    description:
      "将任务与相关人物、事件和项目建立联系，通过记忆画布与回溯机制，帮助用户重新找到过去的信息及其上下文。",
    tone: "blue",
  },
];

export function MeseeProject() {
  const [zoomTarget, setZoomTarget] = useState<ZoomTarget | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!zoomTarget) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomTarget(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomTarget]);

  const parallelEntries = [
    {
      id: "manual",
      cardLabel: "入口 A · 用户主动创建",
      title: "用户主动从聊天发起创建",
      caption: "长按聊天消息气泡并拖入底部 Mesee 球体，不打断当前对话即可将信息转为待办。",
      src: MESEE_MEDIA.capture.taskAddDrag,
      alt: "在微信聊天中长按气泡并拖入 Mesee 触发待办捕捉的高保真界面",
      tone: "blue" as const,
      zoomSubtitle: "04 捕捉与创建 · 入口 A：用户主动创建",
    },
    {
      id: "auto",
      cardLabel: "入口 B · Agent 自动识别",
      title: "Agent 自动识别并提取任务",
      caption: "识别对话中的时间、地点与任务类型（定时 / 情景 / 代办），弹出轻量建议卡片供用户确认。",
      src: MESEE_MEDIA.capture.taskDetectModal,
      alt: "Agent 识别聊天会议消息弹出新任务确认框，并展示定时、情景、代办三类任务草案",
      tone: "lavender" as const,
      zoomSubtitle: "04 捕捉与创建 · 入口 B：Agent 自动识别",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col mesee-surface text-[#292B35] selection:bg-[#4D77E8]/20 selection:text-[#292B35]">
      {/* Top Quiet Editorial Sub-navigation */}
      <header className="w-full border-b border-[#292B35]/[0.07] bg-white/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          <Link
            to="/#work-mesee"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#737786] hover:text-[#292B35] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={15} />
            <span>返回作品列表</span>
          </Link>

          <nav
            aria-label="页面章节导览"
            className="hidden md:flex items-center gap-4 lg:gap-5 text-xs font-medium text-[#737786]"
          >
            <a href="#opportunity" className="hover:text-[#4D77E8] transition-colors whitespace-nowrap">
              01 用户与机会
            </a>
            <a href="#approach" className="hover:text-[#4D77E8] transition-colors whitespace-nowrap">
              02 设计策略与旅程
            </a>
            <a href="#system" className="hover:text-[#4D77E8] transition-colors whitespace-nowrap">
              03 系统概念
            </a>
            <a href="#capture" className="hover:text-[#4D77E8] transition-colors whitespace-nowrap">
              04 捕捉与创建
            </a>
            <a href="#remind" className="hover:text-[#4D77E8] transition-colors whitespace-nowrap">
              05 提醒与处理
            </a>
            <a href="#memory" className="hover:text-[#8B79DA] transition-colors whitespace-nowrap">
              06 记忆与回溯
            </a>
            <a href="#role" className="hover:text-[#292B35] transition-colors whitespace-nowrap">
              个人职责
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 pb-12 sm:pb-14">
        {/* ==================== HERO ==================== */}
        <section className="py-8 sm:py-10 mesee-enter">
          {/* Full-Width Spanning Hero Header Band */}
          <div className="pb-8 mb-8 lg:mb-10 border-b border-[#292B35]/[0.07] space-y-3.5">
            <p className="text-[11px] sm:text-xs tracking-[0.08em] text-[#4D77E8] font-medium">
              交互设计 · 课程团队项目 · 2025
            </p>

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-5">
              <div className="flex items-center gap-3.5 shrink-0">
                <div
                  aria-hidden="true"
                  className="mesee-float w-11 h-11 rounded-[15px] bg-gradient-to-br from-[#6C93FF] via-[#597FF2] to-[#9887EA] shadow-[0_10px_24px_-8px_rgba(77,119,232,0.55),inset_0_2px_6px_rgba(255,255,255,0.45)] flex items-center justify-center gap-2 shrink-0"
                >
                  <span className="mesee-blink w-1.5 h-3.5 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                  <span className="mesee-blink w-1.5 h-3.5 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-display-title font-bold tracking-tight text-[#292B35] leading-[1.06]">
                  Mesee
                </h1>
              </div>

              <p className="text-xl sm:text-2xl lg:text-[28px] font-editorial-cn font-semibold text-[#292B35] leading-snug">
                让重要的事被记住，也被推进。
              </p>
            </div>
          </div>

          {/* Balanced 2-Column Intro + Showcase Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-4 text-base sm:text-[17px] text-[#4B4F5C] leading-[1.78] font-normal">
                <p>
                  日常生活中，很多重要事项分散在微信消息、群聊@和临时念头里，当时看到了，转头却忘记了。
                </p>
                <p>
                  Mesee 是一套以任务为核心的记忆增强 Agent 交互概念设计：它尝试从零散信息中识别待办，在合适的时机主动提醒，并通过记忆画布帮助用户随时找回上下文。
                </p>
              </div>

              <div className="pt-4 border-t border-[#292B35]/[0.08]">
                <p className="text-xs sm:text-[13px] text-[#737786] tracking-wide leading-relaxed">
                  2025.09—2025.11 &nbsp;·&nbsp; 交互设计课程团队项目
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[26px] bg-gradient-to-br from-[#EEF4FF] via-white to-[#F1EDFF] p-3 sm:p-4 border border-[#4D77E8]/15 shadow-[0_24px_60px_-24px_rgba(77,119,232,0.28)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_68px_-22px_rgba(77,119,232,0.34)]">
                <button
                  type="button"
                  onClick={() =>
                    setZoomTarget({
                      src: MESEE_MEDIA.showcaseBoard,
                      alt: "Mesee 以任务为核心的记忆增强 Agent 高保真展示展板",
                      title: "Mesee 课程高保真设计展板",
                      subtitle: "点击空白处或按 Esc 关闭大图",
                    })
                  }
                  className="group relative block w-full rounded-[18px] overflow-hidden bg-[#EEF4FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D77E8] cursor-zoom-in"
                  aria-label="放大查看 Mesee 高保真设计展板"
                >
                  <img
                    src={MESEE_MEDIA.showcaseBoard}
                    alt="Mesee 以任务为核心的记忆增强 Agent 高保真展示展板"
                    className="w-full h-auto max-h-[300px] sm:max-h-[320px] object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-medium text-[#292B35] border border-[#292B35]/10 shadow-xs transition-transform group-hover:translate-y-[-1px]">
                    <Expand size={12} className="text-[#4D77E8]" />
                    <span>查看展板高清细节</span>
                  </span>
                </button>

                <div className="mt-2.5 px-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#737786]">
                  <span>核心展示展板 · 概念定位 / 任务卡片 / 记忆回溯与画布概览</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 01｜USER & OPPORTUNITY ==================== */}
        <section id="opportunity" className="py-12 sm:py-16 border-t border-[#292B35]/[0.08] scroll-mt-20">
          <div className="max-w-3xl mb-10 space-y-3">
            <p className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] uppercase">
              01 / USER &amp; OPPORTUNITY
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-editorial-cn font-bold text-[#292B35] leading-snug">
              让零散的信息，成为可以继续推进的事情。
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* Target Users */}
            <article className="lg:col-span-6 rounded-[24px] bg-white border border-[#292B35]/[0.07] p-5 sm:p-6 shadow-[0_12px_32px_-22px_rgba(41,43,53,0.12)] flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-editorial-cn font-bold text-[#292B35]">
                  目标用户
                </h3>
                <p className="text-sm sm:text-[15px] text-[#4B4F5C] leading-[1.78]">
                  Mesee 面向需要同时管理学习、求职与日常事务的年轻移动设备用户。以团队构建的应届毕业生画像为例，他们经常从聊天和日常活动中接收任务信息，却面临信息分散、任务依赖外部事件、提醒不及时以及缺少后续复盘等问题。
                </p>
              </div>
            </article>

            {/* Competitive Inspiration */}
            <article className="lg:col-span-6 rounded-[24px] bg-gradient-to-br from-[#F4F7FF] to-white border border-[#4D77E8]/15 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-editorial-cn font-bold text-[#292B35]">
                  竞品启发｜从 Rewind AI 到 Mesee
                </h3>
                <p className="text-sm sm:text-[15px] text-[#4B4F5C] leading-[1.78]">
                  在前期竞品研究中，我们关注了 Rewind AI 对个人数字活动的持续记录、历史检索和会议回顾能力。它启发我们思考：如果系统能够帮助用户找回过去的信息，是否还能进一步识别这些信息对应的待办事项，并在需要的时候提供支持？
                </p>
                <p className="text-sm sm:text-[15px] text-[#4B4F5C] leading-[1.78]">
                  由此，Mesee 将设计重点从信息记录与回忆，延伸至任务识别、情境化提醒和行动跟进。
                </p>
              </div>
            </article>

            {/* Design Opportunity Callout */}
            <div className="lg:col-span-12 rounded-[22px] bg-gradient-to-r from-[#EEF4FF] via-[#F5F3FF] to-[#EEF4FF] border border-[#4D77E8]/20 px-6 py-4 sm:px-7 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] font-semibold uppercase shrink-0">
                设计机会
              </span>
              <p className="text-sm sm:text-base font-editorial-cn font-semibold text-[#292B35] leading-relaxed md:text-right">
                让个人记忆系统不只回答「我之前看过什么」，还能够帮助用户处理「接下来需要做什么」。
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 02｜DESIGN APPROACH & JOURNEY MAP ==================== */}
        <section id="approach" className="py-10 sm:py-14 border-t border-[#292B35]/[0.08] scroll-mt-16">
          <div className="max-w-3xl mb-8 space-y-3">
            <p className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] uppercase">
              02 / DESIGN APPROACH
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#292B35] leading-snug">
              让记忆更轻松，让行动更连贯。
            </h2>
            <p className="text-sm sm:text-[16px] text-[#4B4F5C] leading-[1.75]">
              基于用户的日常任务场景，我们将设计方向归纳为三个相互关联的目标，并提出对应的交互策略。
            </p>
          </div>

          {/* 3 Strategy Cards */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-10">
            {DESIGN_GOALS.map((goal) => (
              <article
                key={goal.index}
                className={`rounded-[22px] p-5 border transition-all duration-300 hover:-translate-y-0.5 ${
                  goal.tone === "lavender"
                    ? "bg-gradient-to-b from-[#F4F1FF] to-white border-[#8B79DA]/22 shadow-[0_12px_32px_-22px_rgba(139,121,218,0.2)]"
                    : "bg-gradient-to-b from-[#F2F6FF] to-white border-[#4D77E8]/20 shadow-[0_12px_32px_-22px_rgba(77,119,232,0.18)]"
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-mono font-semibold ${
                        goal.tone === "lavender" ? "text-[#8B79DA]" : "text-[#4D77E8]"
                      }`}
                    >
                      {goal.index}
                    </span>
                    <span className="text-xs font-medium text-[#737786]">
                      {goal.strategy}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-[17px] font-editorial-cn font-bold text-[#292B35]">
                    {goal.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#4B4F5C] leading-[1.72]">
                    {goal.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Journey Map Sub-block */}
          <div className="max-w-4xl mx-auto rounded-[24px] bg-white border border-[#292B35]/[0.07] p-5 sm:p-6 shadow-[0_16px_42px_-24px_rgba(41,43,53,0.12)] space-y-5">
            <div className="max-w-3xl space-y-2.5">
              <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                从一天的日常活动中寻找设计机会
              </h3>
              <p className="text-sm text-[#4B4F5C] leading-[1.75]">
                我们通过典型用户的一日旅程，将学习、日常事务、面试准备与晚间复盘等活动串联起来，分析任务信息如何被接收、遗忘、重新触发和处理。
              </p>
              <p className="text-sm text-[#4B4F5C] leading-[1.75]">
                这帮助我们将交互设计集中在三个关键环节：任务出现时的捕捉与确认、任务需要处理时的适时提醒，以及一天结束后的信息整理与回顾。
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setZoomTarget({
                  src: MESEE_MEDIA.diagrams.journeyMap,
                  alt: "Mesee 典型用户一日任务旅程图：覆盖上午学习、处理杂务、打印简历、汇报准备、面试准备、任务收尾与睡前复盘七个时间节点的痛点与设计机会",
                  title: "典型用户的一日任务旅程与设计机会点",
                  subtitle: "点击空白处或按 Esc 关闭",
                })
              }
              className="group relative block w-full rounded-[18px] overflow-hidden bg-[#F7F9FE] border border-[#4D77E8]/15 p-2 sm:p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D77E8] cursor-zoom-in"
              aria-label="放大查看用户旅程图"
            >
              <img
                src={MESEE_MEDIA.diagrams.journeyMap}
                alt="Mesee 典型用户一日任务旅程图：覆盖上午学习、处理杂务、打印简历、汇报准备、面试准备、任务收尾与睡前复盘七个时间节点的痛点与设计机会"
                className="w-full h-auto max-h-[340px] object-contain mx-auto rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-sm text-[11px] font-medium text-[#292B35] border border-[#292B35]/10 shadow-xs">
                <Expand size={11} className="text-[#4D77E8]" />
                <span>查看旅程图高清细节</span>
              </span>
            </button>

            <p className="text-xs text-[#737786]">
              典型用户的一日任务旅程与设计机会点
            </p>
          </div>
        </section>

        {/* ==================== 03｜SYSTEM CONCEPT ==================== */}
        <section id="system" className="py-10 sm:py-14 border-t border-[#292B35]/[0.08] scroll-mt-16">
          <div className="max-w-3xl mb-8 space-y-3.5">
            <p className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] uppercase">
              03 / SYSTEM CONCEPT
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#292B35] leading-snug">
              从信息捕捉到适时行动
            </h2>
            <div className="space-y-3 text-sm sm:text-[16px] text-[#4B4F5C] leading-[1.75]">
              <p>
                在系统概念设计中，我们将 Mesee 的工作过程划分为信息输入、记忆存储、Agent 处理与交互输出。
              </p>
              <p>
                用户输入、设备与事件线索共同提供任务相关信息；Agent 通过语义理解和情境判断，组织任务并选择相应的交互策略；任务卡片、提醒通知与记忆画布则负责向用户呈现结果。
              </p>
              <p>
                架构同时规划了根据用户反馈调整交互策略、更新记忆关联的机制，构成课程阶段的完整系统概念方案。
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto rounded-[24px] bg-gradient-to-br from-[#F4F7FF] via-white to-[#F4F1FF] border border-[#4D77E8]/15 p-4 sm:p-5 shadow-[0_18px_46px_-26px_rgba(77,119,232,0.22)] space-y-3.5">
            <button
              type="button"
              onClick={() =>
                setZoomTarget({
                  src: MESEE_MEDIA.diagrams.systemConcept,
                  alt: "Mesee 系统概念架构图：展示 Input（Sensors、User Input、Event Listener）、Data（User Graph、Memory Database）、Agent（Perception、Decision、Execution、Self-reflection）与 Output（My Canvas、Notification、Task Dealer、Popup / Dialog）之间的工作链路",
                  title: "Mesee 系统概念架构",
                  subtitle: "Input / Data / Agent / Output · 点击空白处或按 Esc 关闭",
                })
              }
              className="group relative block w-full rounded-[18px] overflow-hidden bg-white border border-[#292B35]/[0.06] p-2 sm:p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4D77E8] cursor-zoom-in"
              aria-label="放大查看系统概念架构图"
            >
              <img
                src={MESEE_MEDIA.diagrams.systemConcept}
                alt="Mesee 系统概念架构图：展示 Input（Sensors、User Input、Event Listener）、Data（User Graph、Memory Database）、Agent（Perception、Decision、Execution、Self-reflection）与 Output（My Canvas、Notification、Task Dealer、Popup / Dialog）之间的工作链路"
                className="w-full h-auto max-h-[340px] object-contain mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.01]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-sm text-[11px] font-medium text-[#292B35] border border-[#292B35]/10 shadow-xs">
                <Expand size={11} className="text-[#4D77E8]" />
                <span>查看系统概念架构大图</span>
              </span>
            </button>

            <p className="text-xs text-[#737786] px-1">
              Mesee 系统概念架构 · Input / Data / Agent / Output
            </p>
          </div>
        </section>

        {/* ==================== 04｜信息捕捉与任务创建 ==================== */}
        <section id="capture" className="py-10 sm:py-14 border-t border-[#292B35]/[0.08] scroll-mt-16">
          <div className="max-w-3xl mb-8 space-y-3.5">
            <p className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] uppercase">
              04 / CAPTURE &amp; CREATE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#292B35] leading-snug">
              消息已读，事情却忘了。
            </h2>
            <div className="space-y-3 text-sm sm:text-[16px] text-[#4B4F5C] leading-[1.75]">
              <p>
                大量待办隐藏在聊天对话、文档转发和语音通知里，手动记录的成本很高，不记又很容易遗漏。
              </p>
              <p>
                在设计方案中，任务创建支持「用户主动拖入创建」与「Agent 自动识别提取」两条并列入口；无论从哪种入口进入，最终都交由用户确认或修正任务细节。
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {/* Subtle 2 + 1 Relationship Header above the Single Row */}
            <div className="hidden md:grid grid-cols-3 gap-4 text-[11px] font-medium px-1">
              <div className="col-span-2 flex items-center gap-2 text-[#4D77E8]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF4FF] border border-[#4D77E8]/15">
                  两条并列创建入口
                </span>
                <span className="h-px flex-1 bg-[#4D77E8]/18" />
              </div>
              <div className="col-span-1 flex items-center gap-2 text-[#6569D1]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F1EDFF] border border-[#8B79DA]/20">
                  → 汇入修正确认
                </span>
                <span className="h-px flex-1 bg-[#8B79DA]/20" />
              </div>
            </div>

            {/* Single Row: Entry A + Entry B + Confirm & Edit */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              {parallelEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-[22px] p-4 bg-white border border-[#292B35]/[0.07] shadow-[0_14px_34px_-22px_rgba(77,119,232,0.18)] flex flex-col transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ScreenFrame
                    src={entry.src}
                    alt={entry.alt}
                    label={entry.cardLabel}
                    title={entry.title}
                    caption={entry.caption}
                    tone={entry.tone}
                    imageHeightClass="h-[195px] sm:h-[210px]"
                    onZoom={setZoomTarget}
                    zoomSubtitle={entry.zoomSubtitle}
                  />
                </div>
              ))}

              <div className="rounded-[22px] p-4 bg-white border border-[#4D77E8]/18 shadow-[0_14px_34px_-22px_rgba(101,105,209,0.22)] flex flex-col transition-all duration-300 hover:-translate-y-0.5">
                <ScreenFrame
                  src={MESEE_MEDIA.capture.taskEditDetail}
                  alt="用户在 Mesee 任务建议面板中点击日期选择器、时间滚轮与任务内容字段修改任务细节"
                  label="确认与修正 · 微调细节"
                  title="用户确认或修正任务细节"
                  caption="点按日期、时间、任务主题与标签即可微调参数，保留最终决定权。"
                  tone="deep"
                  imageHeightClass="h-[195px] sm:h-[210px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="04 捕捉与创建 · 确认与修正任务细节"
                />
              </div>
            </div>
          </div>

          <p className="max-w-4xl mx-auto mt-3.5 text-xs text-[#737786]">
            任务创建与修正高保真交互设计
          </p>
        </section>

        {/* ==================== 05｜任务提醒与处理 ==================== */}
        <section id="remind" className="py-10 sm:py-14 border-t border-[#292B35]/[0.08] scroll-mt-16">
          <div className="max-w-3xl mb-8 space-y-3.5">
            <p className="text-xs font-mono tracking-[0.14em] text-[#4D77E8] uppercase">
              05 / REMIND &amp; ACT
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#292B35] leading-snug">
              不同的事，需要不同的提醒。
            </h2>
            <p className="text-sm sm:text-[16px] text-[#4B4F5C] leading-[1.75]">
              不是所有任务都只适合在固定时间弹一次闹钟。Mesee 将任务拆分为定时、情境与代办三种提醒路径，让提醒方式贴合事情本身的性质。
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Group 1: 定时型任务 */}
            <div className="rounded-[24px] bg-white border border-[#292B35]/[0.07] p-4 sm:p-6 shadow-[0_14px_36px_-24px_rgba(41,43,53,0.12)]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[11px] font-medium tracking-wider text-[#4D77E8]">
                    路径 01 · 定时提醒
                  </span>
                  <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                    定时型任务
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B4F5C] leading-relaxed">
                    在明确的时间节点提醒用户。
                  </p>
                </div>
                <p className="text-xs text-[#737786] whitespace-nowrap">
                  锁屏通知 · 解锁弹窗 · Agent 来电
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ScreenFrame
                  src={MESEE_MEDIA.remind.timedLockScreen}
                  alt="定时型任务锁屏通知界面：显示 AAA 项目例会将于 5 分钟后开始"
                  label="01 · 锁屏轻通知"
                  title="锁屏节点提醒"
                  caption="到点前以不打扰的锁屏卡片提示日程与地点，支持延后或划除。"
                  tone="soft"
                  imageHeightClass="h-[195px] sm:h-[210px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 定时型任务（锁屏通知）"
                />
                <ScreenFrame
                  src={MESEE_MEDIA.remind.timedUnlockBanner}
                  alt="定时型任务解锁桌面横幅弹窗：AAA 项目例会即将开始，提供前往会议按钮"
                  label="02 · 解锁弹窗"
                  title="解锁即时弹窗"
                  caption="亮屏解锁时给出直观行动入口，点击「前往会议」快速进入后续操作。"
                  tone="blue"
                  imageHeightClass="h-[195px] sm:h-[210px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 定时型任务（解锁弹窗）"
                />
                <ScreenFrame
                  src={MESEE_MEDIA.remind.timedAgentCall}
                  alt="定时型任务临近来电强提醒：结合当前位置估算步行 6 分钟并提示忽略、查看或稍后处理"
                  label="03 · 临近强提醒"
                  title="Agent 模拟来电提醒"
                  caption="接近截止时间时结合距离估算（如步行 6 分钟）发出高优先级来电提醒。"
                  tone="lavender"
                  imageHeightClass="h-[195px] sm:h-[210px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 定时型任务（Agent 来电）"
                />
              </div>
            </div>

            {/* Group 2: 情境型任务 */}
            <div className="rounded-[24px] bg-gradient-to-br from-[#EEF4FF]/85 via-white to-[#F1EDFF]/75 border border-[#4D77E8]/15 p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[11px] font-medium tracking-wider text-[#4D77E8]">
                    路径 02 · 情境提醒
                  </span>
                  <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                    情境型任务
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B4F5C] leading-relaxed">
                    根据特定条件或事件提供任务提示。
                  </p>
                  <p className="text-xs text-[#737786] pt-1 leading-relaxed">
                    桌面多尺寸组件 · 滑动处理入口 · 上下文整合卡片
                  </p>
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ScreenFrame
                    src={MESEE_MEDIA.remind.contextWidget}
                    alt="Mesee 情境型任务多尺寸桌面组件：条件命中「收到小刘的回复后」提示整理访谈记录并支持滑动去处理"
                    label="01 · 条件命中组件"
                    title="多尺寸组件与滑动入口"
                    caption="预设条件成立时激活桌面组件，右滑卡片即可进入任务。"
                    tone="blue"
                    imageHeightClass="h-[195px] sm:h-[210px]"
                    onZoom={setZoomTarget}
                    zoomSubtitle="05 提醒与处理 · 情境型任务（多尺寸组件）"
                  />
                  <ScreenFrame
                    src={MESEE_MEDIA.remind.contextActionDetail}
                    alt="Mesee 数据处理任务详情界面：展示收到的微信文件、任务要求与 AI 分步处理建议"
                    label="02 · 任务处理详情"
                    title="来源文件与处理建议"
                    caption="自动汇集群聊源文件与任务说明，给出可执行的处理建议。"
                    tone="lavender"
                    imageHeightClass="h-[195px] sm:h-[210px]"
                    onZoom={setZoomTarget}
                    zoomSubtitle="05 提醒与处理 · 情境型任务（任务处理建议）"
                  />
                </div>
              </div>
            </div>

            {/* Group 3: 代办型任务 */}
            <div className="rounded-[24px] bg-white border border-[#8B79DA]/18 p-4 sm:p-6 shadow-[0_14px_36px_-24px_rgba(139,121,218,0.16)]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
                <div className="space-y-1 max-w-xl">
                  <span className="text-[11px] font-medium tracking-wider text-[#8B79DA]">
                    路径 03 · 代办委托
                  </span>
                  <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                    代办型任务
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B4F5C] leading-relaxed">
                    在用户授权的前提下，探索由 Agent 执行指定事项，并向用户反馈任务状态。
                  </p>
                </div>
                <p className="text-xs text-[#737786] whitespace-nowrap">
                  触发提示 · 请求授权 · 拟稿准备 · 状态回传
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ScreenFrame
                  src={MESEE_MEDIA.remind.delegatedLockNotice}
                  alt="代办型任务第一步：锁屏通知提醒将简历发给打印店老板"
                  label="01 · 情景唤醒"
                  title="结合明日面试触发"
                  caption="结合行程信息提出「将简历发给打印店老板」的代办线索。"
                  tone="soft"
                  imageHeightClass="h-[190px] sm:h-[205px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 代办型任务 01 情景唤醒"
                />
                <ScreenFrame
                  src={MESEE_MEDIA.remind.delegatedAuthorize}
                  alt="代办型任务第二步：解锁后询问是否授权任务"
                  label="02 · 明确授权"
                  title="请求用户授权执行"
                  caption="清晰说明拟代办内容与范围，由用户点击「授权任务」后才介入。"
                  tone="lavender"
                  imageHeightClass="h-[190px] sm:h-[205px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 代办型任务 02 授权确认"
                />
                <ScreenFrame
                  src={MESEE_MEDIA.remind.delegatedDraftWindow}
                  alt="代办型任务第三步：Agent 自动打开同济图文聊天窗口，定位最新简历 PDF 并拟定消息"
                  label="03 · 代为准备"
                  title="匹配文件并拟好消息"
                  caption="定位「同济图文」会话与最新「简历.pdf」，预填打印沟通消息。"
                  tone="blue"
                  imageHeightClass="h-[190px] sm:h-[205px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 代办型任务 03 代为准备消息"
                />
                <ScreenFrame
                  src={MESEE_MEDIA.remind.delegatedFeedback}
                  alt="代办型任务第四步：通知消息已编辑完成，交由用户最终确认发送"
                  label="04 · 状态回传"
                  title="反馈状态，交回确认"
                  caption="提示消息已准备就绪，将最终「发送」动作保留在用户手中。"
                  tone="soft"
                  imageHeightClass="h-[190px] sm:h-[205px]"
                  onZoom={setZoomTarget}
                  zoomSubtitle="05 提醒与处理 · 代办型任务 04 反馈确认"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 06｜记忆画布与回溯 ==================== */}
        <section id="memory" className="py-10 sm:py-14 border-t border-[#292B35]/[0.08] scroll-mt-16">
          <div className="max-w-3xl mb-8 space-y-3.5">
            <p className="text-xs font-mono tracking-[0.14em] text-[#8B79DA] uppercase">
              06 / MEMORY &amp; RECALL
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#292B35] leading-snug">
              不止保存任务，也保留它们之间的联系。
            </h2>
            <p className="text-sm sm:text-[16px] text-[#4B4F5C] leading-[1.75]">
              事情往往不是孤立发生的。一次访谈、一份文档和一场会议之间存在关联。Mesee 通过时间画布与关联回溯视图，让用户重新找回某件事的来龙去脉。
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: 记忆画布 */}
            <div className="rounded-[24px] bg-white border border-[#4D77E8]/18 p-4 sm:p-5 shadow-[0_14px_36px_-24px_rgba(77,119,232,0.22)] flex flex-col justify-between gap-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-22px_rgba(77,119,232,0.28)]">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium tracking-wider text-[#4D77E8]">
                    视图 01 · 画布
                  </span>
                  <span className="text-xs text-[#737786]">时间与项目视角</span>
                </div>
                <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                  记忆画布
                </h3>
                <p className="text-xs sm:text-sm text-[#4B4F5C] leading-relaxed">
                  查看和组织不同时间、项目中的任务，保留事项之间的联系。
                </p>
              </div>

              <ScreenFrame
                src={MESEE_MEDIA.memory.canvasBoard}
                alt="Mesee 记忆画布高保真界面：呈现今日与明日任务时间轴、跨任务关联连线及衍生日程建议"
                title="记忆画布 · 时间线与任务关联"
                caption="按「今日 / 明日」横向组织任务节点，连线标示前后衍生关系与时间微调建议。"
                tone="blue"
                imageHeightClass="h-[205px] sm:h-[220px]"
                onZoom={setZoomTarget}
                zoomSubtitle="06 记忆画布与回溯 · 记忆画布视图"
              />
            </div>

            {/* Right: 记忆回溯 */}
            <div className="rounded-[24px] bg-gradient-to-b from-[#F1EDFF]/55 to-white border border-[#8B79DA]/20 p-4 sm:p-5 shadow-[0_14px_36px_-24px_rgba(139,121,218,0.22)] flex flex-col justify-between gap-4 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-22px_rgba(139,121,218,0.3)]">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium tracking-wider text-[#8B79DA]">
                    视图 02 · 回溯
                  </span>
                  <span className="text-xs text-[#737786]">关键词与关联节点</span>
                </div>
                <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#292B35]">
                  记忆回溯
                </h3>
                <p className="text-xs sm:text-sm text-[#4B4F5C] leading-relaxed">
                  通过关键词和关联信息，重新找到与当前问题有关的内容。
                </p>
              </div>

              <ScreenFrame
                src={MESEE_MEDIA.memory.recallGraph}
                alt="Mesee 记忆回溯高保真界面：以访谈记录为中心展开 23 个关联事项气泡网络，底部支持关键词筛选与自然语言查询"
                title="记忆回溯 · 关联图谱与关键词检索"
                caption="以核心任务节点发散展示相关文档与环节气泡，配合关键词标签与提问找回脉络。"
                tone="lavender"
                imageHeightClass="h-[205px] sm:h-[220px]"
                onZoom={setZoomTarget}
                zoomSubtitle="06 记忆画布与回溯 · 记忆回溯视图"
              />
            </div>
          </div>
        </section>

        {/* ==================== MY ROLE ==================== */}
        <section id="role" className="pt-12 sm:pt-14 border-t border-[#292B35]/[0.08] scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs tracking-[0.12em] text-[#4D77E8] font-medium">
                个人职责与参与范围
              </p>
              <h2 className="text-2xl sm:text-3xl font-editorial-cn font-bold text-[#292B35] leading-snug">
                从产品构想到高保真设计
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-[15px] sm:text-[17px] text-[#4B4F5C] leading-[1.8]">
              <p>
                Mesee 是交互设计课程中的团队项目。我在团队中参与了前期产品定义与方向讨论，共同梳理信息架构与关键交互流程，并推进低保真与高保真界面的设计呈现。
              </p>
              <p>
                整个项目聚焦于日常记忆痛点洞察、人机协作边界与移动端交互体验推敲，完成了从概念设定到高保真界面的交互设计方案。
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER (Matching Lifelog Compact Full-Bleed Footer) ==================== */}
      <footer className="mt-auto w-full bg-white/85 backdrop-blur-md border-t border-[#4D77E8]/12">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#737786]">
            <span className="font-display-title font-bold text-[#292B35]">Mesee</span>
            <span aria-hidden="true" className="text-[#4D77E8]/40">·</span>
            <span>交互设计课程团队项目 · 2025.09—2025.11</span>
          </div>

          <Link
            to="/#work-mesee"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#292B35]/12 hover:border-[#4D77E8] hover:shadow-[0_8px_20px_-10px_rgba(77,119,232,0.35)] text-xs sm:text-sm font-medium text-[#292B35] hover:text-[#4D77E8] transition-all whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回精选作品列表</span>
          </Link>
        </div>
      </footer>

      {/* Lightbox Modal for Inspecting High-res Mesee Board, Diagrams & Individual Screens */}
      {zoomTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomTarget.title}
          onClick={() => setZoomTarget(null)}
          className="fixed inset-0 z-50 bg-[#292B35]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full rounded-3xl bg-[#EEF4FF] p-4 sm:p-6 shadow-2xl border border-white/50 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4 pr-12">
              <div className="min-w-0">
                {zoomTarget.subtitle && (
                  <p className="text-[11px] font-mono text-[#4D77E8] mb-0.5 truncate">
                    {zoomTarget.subtitle}
                  </p>
                )}
                <h3 className="text-sm sm:text-base font-semibold text-[#292B35] truncate">
                  {zoomTarget.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomTarget(null)}
                aria-label="关闭大图预览"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 text-[#292B35] hover:text-[#4D77E8] flex items-center justify-center shadow-md cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={`rounded-2xl p-3 sm:p-4 flex items-center justify-center ${
                zoomTarget.deepBackdrop
                  ? "bg-gradient-to-br from-[#546ED5] via-[#6569D1] to-[#7D6CD8]"
                  : "bg-white/90"
              }`}
            >
              <img
                src={zoomTarget.src}
                alt={zoomTarget.alt}
                className="w-auto max-w-full max-h-[80vh] h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
