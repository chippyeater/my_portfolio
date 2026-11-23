import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Check,
  Clock,
  Cpu,
  ExternalLink,
  FileText,
  GitBranch,
  Image as ImageIcon,
  Layers,
  MessageSquareText,
  Network,
  RotateCcw,
  ShieldCheck,
  SplitSquareHorizontal,
  User,
  Wallet,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

/**
 * LogicWeaver 设计素材路径配置
 */
const LOGICWEAVER_MEDIA = {
  heroWorkspace: "/assets/aistudio/____60210af4.png",
  competitors: {
    falkor: [
      "/assets/aistudio/FALKOR1_a59ce134.png",
      "/assets/aistudio/FALKOR2_9be99535.png",
      "/assets/aistudio/FALKOR3_31b2c5c2.png",
      "/assets/aistudio/FALKOR4_a3ff6fa0.png",
    ],
    kaseware: [
      "/assets/aistudio/Kaseware1_0f90cc8a.png",
      "/assets/aistudio/Kaseware2_36343c06.png",
      "/assets/aistudio/Kaseware3_1dc46463.png",
      "/assets/aistudio/Kaseware4_66bde272.png",
    ],
  },
  infoUnitDetail: "/assets/aistudio/Level3_4ed93913.png",
  semanticZoomLevels: {
    1: "/assets/aistudio/Level1_699e1cde.png",
    2: "/assets/aistudio/Level2_7c1a893d.png",
    3: "/assets/aistudio/Level3_4ed93913.png",
  } as Record<ZoomLevel, string>,
  reasoningViews: {
    timeline: "/assets/aistudio/______6779f478.png",
    conflict: "/assets/aistudio/_____8e17fbbe.png",
    hypothesis: "/assets/aistudio/_____aa619a0d.png",
  },
  prototypeWorkspace: "/assets/logicweaver/workspace-agent-investigation.jpeg",
  langfuseTrace: "/assets/aistudio/image_0ba4fd56.png",
  futureComposite: "",
};

const USER_PROBLEMS = [
  {
    num: "01",
    title: "01｜窗口切换频繁",
    body: "文书撰写、法条检索与证据对比分布在不同平台，频繁切换容易造成注意力破碎和逻辑链条中断。",
    accent: "text-[#A8D56C]",
  },
  {
    num: "02",
    title: "02｜人力查证低效",
    body: "在数百至上千页材料中查找矛盾耗费大量精力，人工跨文件核对容易遗漏细节，需要反复复查。",
    accent: "text-[#A79AF4]",
  },
  {
    num: "03",
    title: "03｜AI 信任赤字",
    body: "常见对话式 AI 给出的总结偏概括，难以捕捉证据链关键细节，幻觉输出会干扰律师对裁判逻辑的判断。",
    accent: "text-[#E5A85F]",
  },
] as const;

const REASONING_HABITS = [
  {
    index: "01",
    title: "从高确定性信息出发构建推理",
    detail: "优先锚定合同、流水、客观时间点等确定事实，再逐步向外扩展推断。",
    tone: "text-[#A8D56C]",
  },
  {
    index: "02",
    title: "以图结构组织多分支关联",
    detail: "围绕多方陈述、争点与反证并行推进，适配网状关联和局部推翻。",
    tone: "text-[#A79AF4]",
  },
  {
    index: "03",
    title: "推理路径保持可回溯与可修改",
    detail: "新证据出现或事实被推翻时，能够回退步骤并追溯每个判断的依据。",
    tone: "text-[#E5A85F]",
  },
  {
    index: "04",
    title: "法律条文与事实的层级化呈现",
    detail: "将请求权基础、法条适用条件与具体证据材料分层对应查看。",
    tone: "text-[#EDF0F2]",
  },
] as const;

const JOURNEY_STAGES = [
  {
    step: "01",
    title: "案情理解",
    highlighted: false,
    detail: "",
  },
  {
    step: "02",
    title: "证据收集与筛选",
    highlighted: false,
    detail: "",
  },
  {
    step: "03",
    title: "证据结构化整理",
    highlighted: true,
    detail: "将分散材料转化为可管理、可引用的信息，建立事实与证据的对应关系。",
  },
  {
    step: "04",
    title: "推理构建",
    highlighted: true,
    detail: "围绕具体争点提出假设，组织支持、反对及关联材料。",
  },
  {
    step: "05",
    title: "反向检验",
    highlighted: true,
    detail: "检查论证漏洞、识别证据缺口，并根据新发现修正已有判断。",
  },
  {
    step: "06",
    title: "证据与诉讼材料产出",
    highlighted: false,
    detail: "",
  },
] as const;

const COMPETITIVE_PRODUCTS = [
  {
    id: "falkor",
    num: "01",
    name: "FALKOR",
    url: "https://falkor.ai/products/",
    tag: "案件总览与多维可视化分析",
    summary:
      "一站式管理调查目标、文件、人员与任务，在案件总览中实时追踪推进状态；支持多格式数据导入，提供地图、时间轴、热力图、表格与关联图等分析视图以及高效检索过滤。",
    limitation:
      "AI 主要用于辅助资料检索与视图呈现，尚未直接参与因果推理、主动生成待检验假设或检测陈述冲突。",
    screenshots: LOGICWEAVER_MEDIA.competitors.falkor,
  },
  {
    id: "kaseware",
    num: "02",
    name: "Kaseware",
    url: "https://www.kaseware.com/",
    tag: "开源情报调查与跨源数据整合",
    summary:
      "面向企业安全、执法机构与情报团队的调查平台；核心聚焦一站式整合各类外部数据源，减少在多系统之间切换的操作成本，并将即时线索转化为结构化情报档案。",
    limitation:
      "重点在于情报归档与流程管理，尚缺少围绕具体争议焦点的动态推理循环及可检验的假设演进机制。",
    screenshots: LOGICWEAVER_MEDIA.competitors.kaseware,
  },
] as const;

interface IaNodeSpec {
  id: string;
  label: string;
  sublabel: string;
  tone: "green" | "purple" | "amber" | "neutral";
  roleNote: string;
}

const IA_NODES: IaNodeSpec[] = [
  {
    id: "material",
    label: "案件材料",
    sublabel: "合同 · 聊天记录 · 流水 · 陈述材料",
    tone: "neutral",
    roleNote: "原始输入源，所有结构化拆解均须保留原始位置定位。",
  },
  {
    id: "infounit",
    label: "InfoUnit / 信息节点（元信息）",
    sublabel: "基于案件主题的最小可引用信息单位",
    tone: "green",
    roleNote: "基于案件主题考虑的，可独立操作、引用的最小信息单位；保留原文溯源锚点与核验状态。",
  },
  {
    id: "relation",
    label: "Relation / 信息关系",
    sublabel: "支持 · 冲突 · 时序 · 关联",
    tone: "green",
    roleNote: "表达不同 InfoUnit 之间的显式结构关系，可由用户检查或手动修正。",
  },
  {
    id: "issue",
    label: "Issue / 争议问题",
    sublabel: "推理核心争点",
    tone: "neutral",
    roleNote: "锚定当前调查目标，围绕 Issue 组织支持材料、反证与待补证事项。",
  },
  {
    id: "hypothesis",
    label: "Hypothesis / 待验证假设",
    sublabel: "待检验命题",
    tone: "purple",
    roleNote: "用于保存推理过程中的待验证命题，须接受事实与反证检验。",
  },
  {
    id: "gap",
    label: "Evidence Gap / 证据缺口",
    sublabel: "缺失的关键前提或核验材料",
    tone: "amber",
    roleNote: "标示推理链条中仍然缺失、且可能改变当前判断的关键材料。",
  },
  {
    id: "investigation",
    label: "Agent Investigation / 调查与更新",
    sublabel: "检索提案 · 结构修正",
    tone: "purple",
    roleNote: "围绕 Issue 检索证据并提出候选关系、假设或缺口，由用户决定是否采纳并回写结构。",
  },
];

type ZoomLevel = 1 | 2 | 3;
type ReasoningViewId = "timeline" | "conflict" | "hypothesis";
type ConflictStatus = "pending" | "staged" | "rejected" | "confirmed";
type HypothesisCandidateStatus = "proposed" | "accepted" | "revised";

export function LogicWeaverProject() {
  const [selectedIaId, setSelectedIaId] = useState<string>("infounit");
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(2);
  const [activeView, setActiveView] = useState<ReasoningViewId>("timeline");
  const [conflictStatus, setConflictStatus] = useState<ConflictStatus>("pending");
  const [wipePercent, setWipePercent] = useState<number>(54);
  const [hypothesisCandidateStatus, setHypothesisCandidateStatus] =
    useState<HypothesisCandidateStatus>("proposed");

  const selectedIaNode = IA_NODES.find((item) => item.id === selectedIaId) || IA_NODES[1];

  return (
    <div className="w-full min-h-screen lw-grid-canvas text-[#EDF0F2] selection:bg-[#A8D56C] selection:text-[#090C11] relative overflow-x-clip flex flex-col">
      {/* Top Subpage Navigation Strip */}
      <header className="w-full bg-[#090C11]/95 border-b border-white/12 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
          <Link
            to="/#work-logicweaver"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg lw-silver-frame-subtle hover:border-white/35 text-xs font-medium text-[#A0AAB4] hover:text-[#EDF0F2] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回作品列表</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono text-[#A0AAB4] whitespace-nowrap shrink-0">
            <span className="text-[#A8D56C] tabular-nums">03</span>
            <span aria-hidden="true" className="text-[#3A444F]">/</span>
            <span>LogicWeaver</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* ═════════════════════════════════════════════════════════════
            00 ｜ HERO
           ═════════════════════════════════════════════════════════════ */}
        <section className="w-full relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 62% 52% at 72% 35%, rgba(226, 232, 240, 0.055) 0%, transparent 72%)",
            }}
          />

          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative z-10 lw-enter">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Typography & Core Narrative */}
              <div className="lg:col-span-5 space-y-6">
                <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                  人机协同推理工作台
                </div>

                <div className="space-y-2.5">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-[#EDF0F2] leading-[1.08]">
                    LogicWeaver
                  </h1>
                  <p className="text-xl sm:text-2xl font-editorial-cn font-semibold text-[#A0AAB4] leading-snug">
                    法律案件事实与证据推理工作台
                  </p>
                </div>

                <p className="text-base sm:text-[17px] text-[#EDF0F2]/90 leading-[1.75] max-w-xl font-normal">
                  复杂法律案件中的信息分散在合同、聊天记录、流水和陈述材料中。理解案件不仅需要找到信息，还需要持续检查事实之间的关系、证据是否支持主张，以及推理中还缺少什么。LogicWeaver 尝试将这些工作整合到<span className="text-[#A8D56C] font-medium">同一个可编辑的画布</span>中，让用户与 AI 围绕<span className="text-[#A79AF4] font-medium">可追溯的证据</span>共同推进调查。
                </p>

                <div className="pt-4 border-t border-white/12 text-xs text-[#A0AAB4]">
                  团队项目 · 交互设计 · AI Agent · 2026
                </div>
              </div>

              {/* Right Column: High-fidelity Workspace Design Frame */}
              <div className="lg:col-span-7">
                <figure className="space-y-3">
                  <div className="rounded-2xl lw-silver-frame lw-silver-shimmer overflow-hidden">
                    {/* Terminal Chrome Bar */}
                    <div className="px-4 py-2.5 bg-[#0B0E14]/90 border-b border-white/12 flex items-center justify-between gap-3 text-[11px] font-mono text-[#A0AAB4]">
                      <span className="truncate text-[#EDF0F2]">
                        LogicWeaver 工作台主界面
                      </span>
                      <span className="text-[#D4DAE2] whitespace-nowrap shrink-0">
                        设计稿
                      </span>
                    </div>

                    {LOGICWEAVER_MEDIA.heroWorkspace ? (
                      <div className="bg-[#090C11]">
                        <img
                          src={LOGICWEAVER_MEDIA.heroWorkspace}
                          alt="LogicWeaver · 高保真工作台设计"
                          className="w-full h-auto block object-contain"
                        />
                      </div>
                    ) : (
                      /* Clean High-Fidelity Design Slot preserving exact 3-pane structure */
                      <div className="aspect-[16/10] bg-[#090C11] lw-grid-sub p-4 sm:p-6 flex flex-col justify-between gap-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <span className="text-[#A8D56C]">
                            工作台主视图结构
                          </span>
                          <span className="text-[#A0AAB4]">
                            高保真工作台主界面设计稿
                          </span>
                        </div>

                        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
                          <div className="col-span-3 rounded-xl bg-[#141920] border border-white/10 p-3 flex flex-col gap-2">
                            <div className="text-[11px] font-medium text-[#EDF0F2] pb-1.5 border-b border-white/10 truncate">
                              文件侧栏
                            </div>
                            <div className="space-y-1.5 text-[10px] text-[#A0AAB4] font-mono">
                              <div className="px-2 py-1 rounded bg-[#1D242D] text-[#EDF0F2] truncate">
                                合同文本
                              </div>
                              <div className="px-2 py-1 rounded bg-[#090C11]/70 truncate">
                                聊天记录
                              </div>
                              <div className="px-2 py-1 rounded bg-[#090C11]/70 truncate">
                                银行流水
                              </div>
                              <div className="px-2 py-1 rounded bg-[#090C11]/70 truncate">
                                陈述材料
                              </div>
                            </div>
                          </div>

                          <div className="col-span-6 rounded-xl bg-[#141920]/70 border border-white/15 p-3.5 flex flex-col justify-between relative">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-[#A8D56C]">中央推理画布</span>
                              <span className="text-[#A0AAB4]">可追溯证据结构</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 my-auto">
                              <div className="p-2.5 rounded-lg bg-[#141920] border border-[#A8D56C]/45">
                                <div className="text-[10px] font-mono text-[#A8D56C] mb-1">
                                  InfoUnit
                                </div>
                                <div className="h-2 w-4/5 rounded-xs bg-white/15" />
                              </div>
                              <div className="p-2.5 rounded-lg bg-[#141920] border border-[#A79AF4]/45">
                                <div className="text-[10px] font-mono text-[#A79AF4] mb-1">
                                  Hypothesis
                                </div>
                                <div className="h-2 w-3/4 rounded-xs bg-white/15" />
                              </div>
                              <div className="col-span-2 p-2.5 rounded-lg bg-[#141920] border border-[#E5A85F]/40 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-[#E5A85F]">
                                  Conflict / Evidence Gap
                                </span>
                                <span className="text-[10px] font-mono text-[#A0AAB4]">
                                  Relation ──► Issue
                                </span>
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-[#A0AAB4]">
                              此处替换为主视图 Figma 高保真截图
                            </div>
                          </div>

                          <div className="col-span-3 rounded-xl bg-[#141920] border border-white/10 p-3 flex flex-col justify-between">
                            <div className="text-[11px] font-medium text-[#EDF0F2] pb-1.5 border-b border-white/10 truncate">
                              Agent 调查面板
                            </div>
                            <div className="space-y-2 my-auto">
                              <div className="p-2 rounded bg-[#1D242D] text-[10px] text-[#A79AF4] font-mono">
                                证据检索与提案
                              </div>
                              <div className="p-2 rounded bg-[#090C11]/70 text-[10px] text-[#A0AAB4] font-mono">
                                结构检查与确认
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <figcaption className="text-xs text-[#A0AAB4] flex items-center justify-between gap-3 px-1">
                    <span>LogicWeaver 高保真工作台界面设计</span>
                    <span className="text-[#A0AAB4]/70">界面设计</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          <div className="lw-silver-divider w-full" />
        </section>

        {/* Main Content Sections Container */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-14 sm:space-y-16">
          {/* ═════════════════════════════════════════════════════════════
              01 ｜ USER & PROBLEM
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-14">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                01 / USER & PROBLEM
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                从分散材料到可验证的论证结构
              </h2>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  通过对法律实务从业者的访谈调研，我们看到案件分析是一个<span className="text-[#A8D56C] font-medium">持续演进的建构过程</span>：用户需要从海量材料中筛查关键证据、交叉核对多方陈述，并随着新材料出现不断修正推理链条。
                </p>
                <p>
                  传统文档与单轮对话式 AI 难以兼顾高密度证据核验，也难以让推理过程保持<span className="text-[#A79AF4] font-medium">可见、可回溯与可修改</span>。
                </p>
              </div>
            </div>

            {/* A. 用户画像与目标人群规格（开放式分割线双栏排版） */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-white/12">
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#EDF0F2]">
                  用户画像与人群特征
                </h3>
                <span className="text-xs text-[#A0AAB4]">
                  访谈归纳
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 lg:divide-x divide-white/10 pb-8 border-b border-white/12">
                {/* Left 5 cols: Persona (小张 · 实习律师) */}
                <div className="lg:col-span-5 lg:pr-8 flex flex-col justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg lw-silver-frame-subtle flex items-center justify-center shrink-0">
                      <span className="font-editorial-cn font-bold text-base text-[#EDF0F2]">
                        张
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline gap-2.5">
                        <span className="text-lg font-semibold text-[#EDF0F2]">
                          小张
                        </span>
                        <span className="text-xs font-mono text-[#A8D56C]">
                          实习律师
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#A0AAB4]">
                        <span>专业：法律</span>
                        <span>年龄：22</span>
                        <span>爱好：剧本杀、小说</span>
                      </div>
                    </div>
                  </div>

                  <blockquote className="pl-4 border-l-2 border-white/25 text-xs sm:text-[13px] text-[#EDF0F2]/88 leading-relaxed">
                    “我希望 AI 能帮我找证据之间的矛盾或者按照一定规则整理材料，因为有时候当事人提供的证据非常多，会有几百页甚至上千页的情况，这时候人力去对是非常吃力的。”
                  </blockquote>
                </div>

                {/* Right 7 cols: Target User Group & Information Spec */}
                <div className="lg:col-span-7 lg:pl-8 space-y-5">
                  <div className="space-y-1.5">
                    <div className="text-[11px] text-[#A8D56C]">
                      目标用户群
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#EDF0F2]">
                      逻辑严密的法律从业者、专业维权者、推理解密爱好者
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-white/10">
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-[#A0AAB4]">
                        职业 / 专业
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#EDF0F2]/85 leading-relaxed">
                        处理开放式信息系统的专业人员（律师、法律研究员、高级调查员）。
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-[#A0AAB4]">
                        任务目标
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#EDF0F2]/85 leading-relaxed">
                        从海量、碎片化且具对抗性的材料中构建完整合法的证据链，并转化为文书。
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-[#A0AAB4]">
                        信息源特征
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#EDF0F2]/85 leading-relaxed">
                        多模态、跨媒介的复杂信息（笔录、合同、流水、截屏与现场记录）。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B. AI 工具使用的痛点与体验障碍 */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#EDF0F2]">
                  AI 工具使用的痛点与体验障碍
                </h3>
                <span className="text-xs text-[#A0AAB4]">
                  痛点与信任障碍
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/12 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {USER_PROBLEMS.map((item) => (
                  <article
                    key={item.num}
                    className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 space-y-2.5"
                  >
                    <div className={`font-mono text-xs font-semibold ${item.accent}`}>
                      {item.title}
                    </div>
                    <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              {/* Verbatim Interview Feedback */}
              <div className="pl-4 border-l-2 border-white/25 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 py-1">
                <span className="text-[11px] font-mono text-[#A79AF4] shrink-0">
                  访谈原声
                </span>
                <p className="text-xs sm:text-sm text-[#EDF0F2]/85 leading-relaxed">
                  “很多时候 AI 对我要找的案件情况没有完全理解，它给我找的都是非常笼统的总结，并不能体现出法院的裁判逻辑。”
                </p>
              </div>
            </div>

            {/* C. 用户的推理行为与习惯 */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-white/12">
                <h3 className="text-base sm:text-lg font-display font-semibold text-[#EDF0F2]">
                  用户的推理行为与习惯
                </h3>
                <span className="text-xs text-[#A0AAB4]">
                  推理行为习惯
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {REASONING_HABITS.map((habit) => (
                  <div
                    key={habit.index}
                    className="pt-3 border-t border-white/15 space-y-2"
                  >
                    <div className={`text-[11px] font-mono font-semibold ${habit.tone}`}>
                      习惯 {habit.index}
                    </div>
                    <h4 className="text-sm font-semibold text-[#EDF0F2] leading-snug">
                      {habit.title}
                    </h4>
                    <p className="text-xs text-[#A0AAB4] leading-relaxed">
                      {habit.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* D. 用户旅程（无外框，直接平铺于画布） */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-white/12">
                <h3 className="text-lg sm:text-xl font-display font-semibold text-[#EDF0F2]">
                  用户推理旅程
                </h3>
                <span className="text-xs text-[#A0AAB4]">
                  复杂案件分析六阶段工作流（重点聚焦第 3–5 阶段）
                </span>
              </div>

              <div className="relative pt-2">
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute left-4 right-4 top-[22px] h-px bg-white/12 z-0"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
                  {JOURNEY_STAGES.map((stage, index) => (
                    <div
                      key={stage.step}
                      className={`rounded-xl p-4 flex flex-col gap-2.5 transition-colors ${
                        stage.highlighted
                          ? "lw-inverted-frame"
                          : "bg-[#0D1117]/80 border border-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-mono text-xs tabular-nums ${
                            stage.highlighted ? "text-[#134222] font-bold" : "text-[#8E99A6]"
                          }`}
                        >
                          {stage.step}
                        </span>
                        {index < JOURNEY_STAGES.length - 1 && (
                          <ArrowRight
                            size={12}
                            className={`lg:hidden ${
                              stage.highlighted ? "text-[#134222]" : "text-white/20"
                            }`}
                          />
                        )}
                      </div>

                      <div
                        className={`text-sm font-semibold leading-snug ${
                          stage.highlighted ? "text-[#090C11]" : "text-[#9AA5B2]"
                        }`}
                      >
                        {stage.title}
                      </div>

                      {stage.detail && (
                        <p className="text-xs text-[#1D2530] leading-relaxed pt-2 border-t border-[#090C11]/15">
                          {stage.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              02 ｜ COMPETITIVE RESEARCH
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                02 / COMPETITIVE RESEARCH
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                现有工具如何支持复杂信息分析？
              </h2>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  团队重点调研了调查分析与开源情报平台代表产品 FALKOR 与 Kaseware。两款产品在多源材料整合、案件总览与多种可视化视图上提供了成熟的工程能力。
                </p>
                <p>
                  基于竞品观察，LogicWeaver 将进一步探索<span className="text-[#A8D56C] font-medium">动态推理过程</span>：让用户在<span className="text-[#A79AF4] font-medium">可编辑画布</span>中检查证据来源，并与 AI 协同推进假设检验、冲突核查与缺口追踪。
                </p>
              </div>
            </div>

            {/* 2 Structured Competitor Editorial Columns (无框套框) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 border-y border-white/12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {COMPETITIVE_PRODUCTS.map((item, colIdx) => (
                <article
                  key={item.id}
                  className={`py-8 ${
                    colIdx === 0 ? "lg:pr-8" : "lg:pl-8"
                  } flex flex-col justify-between gap-6`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono text-[#A8D56C]">
                          竞品 {item.num} · {item.tag}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-[#EDF0F2]">
                          {item.name}
                        </h3>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg lw-silver-frame-subtle text-[11px] font-mono text-[#A0AAB4] hover:text-[#EDF0F2] transition-colors shrink-0"
                      >
                        <span>官网</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>

                    <p className="text-sm text-[#EDF0F2]/85 leading-relaxed">
                      {item.summary}
                    </p>

                    <div className="pl-3.5 border-l-2 border-white/20 space-y-1">
                      <div className="text-[11px] font-mono text-[#A79AF4]">
                        推理支持观察
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#A0AAB4] leading-relaxed">
                        {item.limitation}
                      </p>
                    </div>
                  </div>

                  {/* 2x2 Reference Thumbnail Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {item.screenshots.map((src, idx) => (
                      <div
                        key={src}
                        className="aspect-[16/10] rounded-lg overflow-hidden lw-silver-frame-subtle"
                      >
                        <img
                          src={src}
                          alt={`${item.name} 界面参考 ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Wide Research Conclusion Panel (Soft Muted Inverted Banner with Restrained Shimmer) */}
            <div className="lw-inverted-frame lw-inverted-shimmer rounded-2xl px-6 sm:px-8 py-6">
              <div className="text-xs font-semibold text-[#2D3745] mb-2">
                调研结论
              </div>
              <p className="text-lg sm:text-xl font-editorial-cn font-semibold text-[#090C11] leading-relaxed">
                把<span className="text-[#134222]">「材料」「关系」与「推理」</span>放进同一个可持续编辑的工作空间，让每次 AI 介入都能成为<span className="text-[#31237A]">可检验的结构化结果</span>。
              </p>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              03 ｜ INFORMATION ARCHITECTURE
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                03 / INFORMATION ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                区分信息、关系与推论
              </h2>
              <div className="space-y-3.5 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  我们将案件材料拆解为 <strong className="text-[#A8D56C] font-semibold">InfoUnit（信息节点 / 元信息）</strong>——即基于案件主题考虑的、可独立操作与引用的最小信息单位，并用 Relation 表达不同信息之间的关联。
                </p>
                <p>
                  分析过程中的 <span className="text-[#A79AF4] font-medium">Hypothesis</span> 用来保存待验证的命题，<span className="text-[#E5A85F] font-medium">Evidence Gap</span> 则指出仍然缺失、且可能改变判断的关键材料。
                </p>
                <p>
                  用户可以随时检查来源，修改关系与判断，让推理过程随着新证据持续更新。
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 cols: Precision Information Architecture Diagram (Single Clean Silver Frame) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/12 text-xs font-mono">
                  <span className="text-[#EDF0F2]">信息结构图</span>
                  <span className="text-[#A0AAB4]">点击任意对象查看语义定位</span>
                </div>

                {/* Precision Diagram Canvas */}
                <div className="rounded-2xl lw-silver-frame lw-grid-sub p-4 sm:p-6 space-y-5">
                  {/* Tier 1: Source -> InfoUnit <-> Relation */}
                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
                    <button
                      type="button"
                      onClick={() => setSelectedIaId("material")}
                      className={`sm:col-span-3 text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "material"
                          ? "bg-[#1D242D] border-[#EDF0F2]"
                          : "bg-[#0B0E14]/90 border-white/12 hover:border-white/30"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#EDF0F2]">
                        案件材料
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        原始输入文档与记录
                      </div>
                    </button>

                    <div className="hidden sm:flex sm:col-span-1 justify-center text-[#A8D56C]">
                      <ArrowRight size={15} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedIaId("infounit")}
                      className={`sm:col-span-3 text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "infounit"
                          ? "bg-[#1D242D] border-[#A8D56C]"
                          : "bg-[#0B0E14]/90 border-[#A8D56C]/35 hover:border-[#A8D56C]"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#A8D56C]">
                        InfoUnit / 信息单元
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        可溯源结构化事实
                      </div>
                    </button>

                    <div className="hidden sm:flex sm:col-span-1 justify-center text-[#A8D56C]">
                      <ArrowRight size={15} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedIaId("relation")}
                      className={`sm:col-span-3 text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "relation"
                          ? "bg-[#1D242D] border-[#A8D56C]"
                          : "bg-[#0B0E14]/90 border-[#A8D56C]/35 hover:border-[#A8D56C]"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#A8D56C]">
                        Relation / 信息关系
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        单元间关联与方向
                      </div>
                    </button>
                  </div>

                  {/* Connector Line downward */}
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-px bg-white/18" />
                  </div>

                  {/* Tier 2: Issue Anchor */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setSelectedIaId("issue")}
                      className={`w-full sm:w-3/4 p-3.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        selectedIaId === "issue"
                          ? "bg-[#1D242D] border-[#EDF0F2]"
                          : "bg-[#0B0E14]/90 border-white/15 hover:border-white/35"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#EDF0F2]">
                        Issue / 争议问题
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-0.5">
                        用户与 Agent 协同管理的核心推理锚点
                      </div>
                    </button>
                  </div>

                  {/* Tier 3: Hypothesis, Evidence Gap & Agent Investigation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedIaId("hypothesis")}
                      className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "hypothesis"
                          ? "bg-[#1D242D] border-[#A79AF4]"
                          : "bg-[#0B0E14]/90 border-[#A79AF4]/35 hover:border-[#A79AF4]"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#A79AF4]">
                        Hypothesis / 待验证假设
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        待核实命题与推理链
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedIaId("gap")}
                      className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "gap"
                          ? "bg-[#1D242D] border-[#E5A85F]"
                          : "bg-[#0B0E14]/90 border-[#E5A85F]/35 hover:border-[#E5A85F]"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#E5A85F]">
                        Evidence Gap / 证据缺口
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        待补充验证条件
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedIaId("investigation")}
                      className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                        selectedIaId === "investigation"
                          ? "bg-[#1D242D] border-[#A79AF4]"
                          : "bg-[#0B0E14]/90 border-white/15 hover:border-[#A79AF4]"
                      }`}
                    >
                      <div className="text-xs font-mono font-semibold text-[#A79AF4]">
                        Agent Investigation / 调查与更新
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] mt-1">
                        持续修正证据与推理结构
                      </div>
                    </button>
                  </div>

                  {/* Selected Node Inspector Strip */}
                  <div className="pt-3.5 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span
                      className={`font-mono font-semibold shrink-0 ${
                        selectedIaNode.tone === "green"
                          ? "text-[#A8D56C]"
                          : selectedIaNode.tone === "purple"
                            ? "text-[#A79AF4]"
                            : selectedIaNode.tone === "amber"
                              ? "text-[#E5A85F]"
                              : "text-[#EDF0F2]"
                      }`}
                    >
                      {selectedIaNode.label}
                    </span>
                    <span className="text-[#A0AAB4] leading-relaxed">
                      {selectedIaNode.roleNote}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A0AAB4] leading-relaxed">
                  案件材料经过解析形成 InfoUnit，信息单元之间通过 Relation 表达关联；围绕 Issue，用户与 Agent 共同管理 Hypothesis 和 Evidence Gap，并根据后续调查结果持续修正结构。
                </p>
              </div>

              {/* Right 4 cols: InfoUnit Card Detail + Traceability Principle (Open Vertical Stack) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-white/12">
                    <span className="text-[#A8D56C]">InfoUnit 信息节点</span>
                    <span className="text-[#A0AAB4]">最小信息单位</span>
                  </div>
                  {LOGICWEAVER_MEDIA.infoUnitDetail ? (
                    <div className="space-y-3">
                      <div className="rounded-xl lw-silver-frame-subtle p-3.5 flex items-center justify-center bg-[#1B222B]">
                        <img
                          src={LOGICWEAVER_MEDIA.infoUnitDetail}
                          alt="信息单元卡片来源与状态区分设计细节"
                          className="w-full max-h-[240px] object-contain"
                        />
                      </div>
                      <p className="text-xs text-[#A0AAB4] leading-relaxed">
                        基于案件主题考虑的，可独立操作、引用的最小信息单位；内含类型标签、事实陈述字段与原文引文溯源。
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl lw-silver-frame-subtle space-y-2">
                      <div className="text-xs font-mono text-[#A8D56C]">
                        InfoUnit 节点结构定义
                      </div>
                      <div className="text-xs text-[#EDF0F2]">
                        基于案件主题考虑的，可独立操作、引用的最小信息单位。
                      </div>
                    </div>
                  )}
                </div>

                <div className="lw-inverted-frame rounded-xl p-5 space-y-2">
                  <div className="text-base sm:text-lg font-editorial-cn font-bold text-[#090C11]">
                    来源可追溯，推论可检验。
                  </div>
                  <p className="text-sm text-[#1D2530] leading-relaxed">
                    原文出现过陈述记录，尚需经过多方材料<span className="text-[#134222] font-semibold">交叉核验</span>后方可作为支撑依据；AI 生成的候选假设同样须经<span className="text-[#31237A] font-semibold">人工检视与反证检验</span>。
                  </p>
                </div>
              </div>
            </div>

            {/* Rebuilt System Architecture & Human-AI Reasoning Loop (Open 4-Column Divider Pipeline) */}
            <div className="space-y-5 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/12">
                <div className="flex items-center gap-2.5">
                  <Network size={15} className="text-[#D4DAE2]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#EDF0F2]">
                    系统架构 · 人机协同推理循环
                  </h3>
                </div>
                <span className="text-xs text-[#A0AAB4]">
                  四阶段架构流程
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                {/* Stage 1 */}
                <div className="py-6 sm:px-5 first:sm:pl-0 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#EDF0F2]">
                      01 · 多模态信息输入
                    </span>
                    <ArrowRight size={13} className="text-white/35 hidden lg:block" />
                  </div>
                  <ul className="space-y-2 text-xs text-[#A0AAB4]">
                    <li className="flex items-center gap-2">
                      <FileText size={13} className="text-[#A8D56C] shrink-0" />
                      <span>文档</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MessageSquareText size={13} className="text-[#A8D56C] shrink-0" />
                      <span>聊天记录</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <User size={13} className="text-[#A8D56C] shrink-0" />
                      <span>证人证词</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ImageIcon size={13} className="text-[#A8D56C] shrink-0" />
                      <span>图片截图</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Wallet size={13} className="text-[#A8D56C] shrink-0" />
                      <span>资金流动记录及其他原始卷宗</span>
                    </li>
                  </ul>
                </div>

                {/* Stage 2 */}
                <div className="py-6 sm:px-5 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#A8D56C]">
                      02 · 信息提取与加工
                    </span>
                    <ArrowRight size={13} className="text-white/35 hidden lg:block" />
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#EDF0F2]/88">
                    <li className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-[#A8D56C] shrink-0" />
                      <span>提取证据关键信息</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-[#A8D56C] shrink-0" />
                      <span>评估证据的可靠性</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-[#A8D56C] shrink-0" />
                      <span>支持查询、追溯、更新</span>
                    </li>
                  </ul>
                </div>

                {/* Stage 3 */}
                <div className="py-6 sm:px-5 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#A79AF4]">
                      03 · 推理辅助机制
                    </span>
                    <ArrowRight size={13} className="text-white/35 hidden lg:block" />
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#EDF0F2]/88">
                    <li className="flex items-center gap-2">
                      <Cpu size={13} className="text-[#A79AF4] shrink-0" />
                      <span>自动生成事件节点</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cpu size={13} className="text-[#A79AF4] shrink-0" />
                      <span>推理路径 / 假设建议</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cpu size={13} className="text-[#E5A85F] shrink-0" />
                      <span>矛盾关系检测</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Cpu size={13} className="text-[#E5A85F] shrink-0" />
                      <span>缺失证据检测</span>
                    </li>
                  </ul>
                </div>

                {/* Stage 4 */}
                <div className="py-6 sm:px-5 last:sm:pr-0 flex flex-col justify-between gap-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#EDF0F2]">
                      04 · 用户推理与交互
                    </span>
                    <ArrowUpDown size={13} className="text-[#D4DAE2]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] leading-relaxed">
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] text-[#A79AF4]">
                        AI 辅助生成
                      </div>
                      <ul className="text-[#A0AAB4] space-y-0.5">
                        <li>· 推荐相关证据</li>
                        <li>· 生成新视图</li>
                        <li>· 发现冲突</li>
                        <li>· 发现缺口</li>
                      </ul>
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono text-[10px] text-[#A8D56C]">
                        用户手动编辑
                      </div>
                      <ul className="text-[#EDF0F2]/88 space-y-0.5">
                        <li>· 拖拽证据</li>
                        <li>· 标记节点</li>
                        <li>· 创建新假设</li>
                        <li>· 新建推理事件</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 space-y-0.5">
                    <div className="text-[11px] font-mono text-[#D4DAE2] font-semibold">
                      ⇄ 自定义组件生成
                    </div>
                    <div className="text-[10px] text-[#A0AAB4]">
                      随任务切换视图并实时回写画布状态
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Principle Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#D4DAE2] shrink-0">
                  人机协同推理闭环
                </span>
                <p className="text-[#A0AAB4] leading-relaxed">
                  AI 与用户在推理过程中持续交替地组织信息、提出假设、验证证据并调整结构，通过循环推进形成可检验的推理结论。
                </p>
              </div>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              04 ｜ INTERACTION DESIGN
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-14">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                04 / INTERACTION DESIGN
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                让界面适应用户当前的推理任务
              </h2>
              <div className="space-y-3.5 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  复杂案件分析并不总是需要同一种可视化方式。建立全局认知时，用户需要看到信息之间的关系；核对事件时，需要关注先后顺序；处理争议时，需要并列比较冲突；验证主张时，则需要完整的证据支持与反驳。
                </p>
                <p>
                  因此我们以关系画布作为工作空间，并设计了三种围绕具体任务展开的推理视图。
                </p>
              </div>
            </div>

            {/* A. 基础画布与语义缩放（去外框，左右直接排版 + 右侧单一银白金属框） */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-white/12">
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#A8D56C]">
                  <Layers size={14} />
                  <span>同一画布 · 多层级信息密度</span>
                </div>
                <p className="text-sm sm:text-[15px] text-[#EDF0F2]/90 leading-relaxed">
                  信息节点（元信息）作为基于案件主题考虑的、可独立操作与引用的最小信息单位，在画布中<span className="text-[#A8D56C] font-medium">随观察层级展示不同密度的内容</span>：远距离用于识别整体关系，聚焦时展示摘要，深入时查看细节和来源。
                </p>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  AI 以画布当前信息为上下文参与交互，使推理成果直接沉淀在工作区中。
                </p>

                {/* Level Switcher */}
                <div className="pt-2 space-y-4">
                  <div className="inline-flex flex-nowrap items-center gap-1 p-1 rounded-xl lw-silver-frame-subtle">
                    {([
                      { level: 1 as ZoomLevel, label: "Level 1" },
                      { level: 2 as ZoomLevel, label: "Level 2" },
                      { level: 3 as ZoomLevel, label: "Level 3" },
                    ]).map((item) => (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setZoomLevel(item.level)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                          zoomLevel === item.level
                            ? "bg-[#DCE2EC] text-[#090C11] font-semibold shadow-sm"
                            : "text-[#A0AAB4] hover:text-[#EDF0F2] font-medium"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Level Spec Note (Open Left-Rule Callout) */}
                  <div className="pl-3.5 border-l-2 border-white/25 space-y-1">
                    <div className="text-[11px] font-mono text-[#D4DAE2]">
                      {zoomLevel === 1 && "层级 01 · 远距离整体关系"}
                      {zoomLevel === 2 && "层级 02 · 聚焦态摘要"}
                      {zoomLevel === 3 && "层级 03 · 深入态细节与来源"}
                    </div>
                    <p className="text-xs text-[#A0AAB4] leading-relaxed">
                      {zoomLevel === 1 &&
                        "收敛为轻量节点标签，呈现不同焦点与未启用（灰置）状态，便于识别全图关联走向。"}
                      {zoomLevel === 2 &&
                        "展开节点类型标牌（如「事实」）与核心事实摘要句，支持在工作区中直接阅读和调整关系。"}
                      {zoomLevel === 3 &&
                        "完整展示发言人、案件角色、陈述类型等元信息字段以及原文来源引文，供用户逐项核实。"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 7 cols: Active Level High-Fidelity View + Quick Level Thumbnails */}
              <div className="lg:col-span-7 space-y-3.5">
                <div className="rounded-2xl overflow-hidden lw-silver-frame bg-[#1E242E] p-4 sm:p-6 flex items-center justify-center min-h-[260px]">
                  <img
                    src={LOGICWEAVER_MEDIA.semanticZoomLevels[zoomLevel]}
                    alt={`信息节点 Level ${zoomLevel} 三级语义缩放视图`}
                    className={
                      zoomLevel === 1
                        ? "w-full max-w-[320px] sm:max-w-[350px] max-h-[210px] mx-auto object-contain block"
                        : zoomLevel === 2
                          ? "w-full max-w-[380px] sm:max-w-[420px] max-h-[240px] mx-auto object-contain block"
                          : "w-full max-w-[460px] sm:max-w-[500px] max-h-[330px] mx-auto object-contain block"
                    }
                  />
                </div>

                {/* Quick 3-Level Thumb Strip (Clean Minimal Divider Tabs) */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {([1, 2, 3] as ZoomLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setZoomLevel(lvl)}
                      className={`pb-2.5 pt-1.5 border-b-2 text-left transition-all cursor-pointer ${
                        zoomLevel === lvl
                          ? "border-white/75 opacity-100"
                          : "border-white/10 opacity-65 hover:opacity-100"
                      }`}
                    >
                      <div className="h-14 rounded-lg bg-[#1E242E] overflow-hidden flex items-center justify-center p-1 mb-1.5">
                        <img
                          src={LOGICWEAVER_MEDIA.semanticZoomLevels[lvl]}
                          alt={`Level 0${lvl} 缩略图`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-[10px] font-mono text-[#EDF0F2] truncate">
                        层级 0{lvl} ·{" "}
                        {lvl === 1 ? "整体关系" : lvl === 2 ? "聚焦摘要" : "细节引文"}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-[#A0AAB4] flex items-center justify-between">
                  <span>信息节点三级语义缩放设计稿（含常规态与灰置态）</span>
                  <span>语义缩放设计</span>
                </div>
              </div>
            </div>

            {/* B. 三种推理视图（核心交互展示区） */}
            <div className="space-y-5 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#EDF0F2]">
                    三种面向任务的推理视图
                  </h3>
                </div>

                {/* View Selector Tabs (Muted Inverted Active State) */}
                <div
                  role="tablist"
                  aria-label="推理视图切换"
                  className="flex flex-wrap items-center gap-1 p-1 rounded-xl lw-silver-frame-subtle"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === "timeline"}
                    onClick={() => setActiveView("timeline")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      activeView === "timeline"
                        ? "bg-[#DCE2EC] text-[#090C11] font-semibold shadow-sm"
                        : "text-[#A0AAB4] hover:text-[#EDF0F2] font-medium"
                    }`}
                  >
                    <Clock size={13} className={activeView === "timeline" ? "text-[#134222]" : ""} />
                    <span>01｜Timeline</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === "conflict"}
                    onClick={() => setActiveView("conflict")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      activeView === "conflict"
                        ? "bg-[#DCE2EC] text-[#090C11] font-semibold shadow-sm"
                        : "text-[#A0AAB4] hover:text-[#EDF0F2] font-medium"
                    }`}
                  >
                    <SplitSquareHorizontal size={13} className={activeView === "conflict" ? "text-[#6B3507]" : ""} />
                    <span>02｜Conflict</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeView === "hypothesis"}
                    onClick={() => setActiveView("hypothesis")}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap ${
                      activeView === "hypothesis"
                        ? "bg-[#DCE2EC] text-[#090C11] font-semibold shadow-sm"
                        : "text-[#A0AAB4] hover:text-[#EDF0F2] font-medium"
                    }`}
                  >
                    <GitBranch size={13} className={activeView === "hypothesis" ? "text-[#31237A]" : ""} />
                    <span>03｜Hypothesis</span>
                  </button>
                </div>
              </div>

              {/* Main View Showcase Area (Single Clean Silver Frame, No Inner Double Box) */}
              <div className="lw-silver-frame rounded-2xl overflow-hidden">
                {activeView === "timeline" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/12 flex flex-col justify-between gap-6">
                      <div className="space-y-4">
                        <div className="font-mono text-xs text-[#D4DAE2]">
                          01｜Timeline · 时间—事件链
                        </div>
                        <p className="text-sm sm:text-[15px] text-[#EDF0F2]/90 leading-relaxed">
                          按时间组织相关事件、证据与来源，帮助用户核对事件顺序、时间重叠与空窗。
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/10 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#A0AAB4]">适用任务</div>
                        <p className="text-xs sm:text-sm text-[#EDF0F2] leading-relaxed">
                          还原案件经过，检查不同陈述中的时间信息是否一致。
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#090C11] lw-grid-sub flex flex-col justify-center">
                      {LOGICWEAVER_MEDIA.reasoningViews.timeline ? (
                        <img
                          src={LOGICWEAVER_MEDIA.reasoningViews.timeline}
                          alt="Timeline 时间—事件链视图设计稿"
                          className="w-full h-auto object-contain block"
                        />
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A0AAB4]">
                            <span>简洁结构示意</span>
                            <span>Timeline 视图结构示意</span>
                          </div>

                          {/* Clean Minimal Schematic for Timeline */}
                          <div className="my-auto py-4 space-y-5">
                            <div className="relative flex items-center justify-between border-b border-[#3A444F] pb-3 text-[11px] font-mono text-[#A0AAB4]">
                              <span>时间标尺 axis</span>
                              <span className="text-[#E5A85F]">时间空窗 / 重叠检测区间</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                              <div className="p-3.5 rounded-xl bg-[#141920] border border-[#A8D56C]/40 space-y-1.5">
                                <div className="text-[11px] font-mono text-[#A8D56C]">事件节点 A</div>
                                <div className="text-xs text-[#EDF0F2]">关联来源文档锚点</div>
                              </div>
                              <div className="p-3.5 rounded-xl bg-[#141920] border border-dashed border-[#E5A85F]/50 space-y-1.5">
                                <div className="text-[11px] font-mono text-[#E5A85F]">时间空窗段</div>
                                <div className="text-xs text-[#A0AAB4]">提示缺失时间记录</div>
                              </div>
                              <div className="p-3.5 rounded-xl bg-[#141920] border border-[#A8D56C]/40 space-y-1.5">
                                <div className="text-[11px] font-mono text-[#A8D56C]">事件节点 B</div>
                                <div className="text-xs text-[#EDF0F2]">对照交叉陈述时间</div>
                              </div>
                            </div>
                          </div>

                          <div className="text-[11px] font-mono text-[#A0AAB4]/80">
                            呈现视图交互定义与时间轴关系结构
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {activeView === "conflict" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/12 flex flex-col justify-between gap-6">
                      <div className="space-y-4">
                        <div className="font-mono text-xs text-[#E5A85F]">
                          02｜Conflict · 冲突对比
                        </div>
                        <p className="text-sm sm:text-[15px] text-[#EDF0F2]/90 leading-relaxed">
                          并列呈现围绕同一争点的两份材料，突出文本差异；对于适合视觉比较的材料，也探索图像重叠擦拭。
                        </p>
                        <p className="text-sm text-[#A0AAB4] leading-relaxed">
                          AI 提供候选冲突，用户通过<span className="text-[#E5A85F] font-medium">暂存、驳回或确认</span>决定其状态。
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/10 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#E5A85F]">适用任务</div>
                        <p className="text-xs sm:text-sm text-[#EDF0F2] leading-relaxed">
                          比较不同证词与材料中的矛盾，检查冲突是否真实成立。
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#090C11] lw-grid-sub flex flex-col justify-center">
                      {LOGICWEAVER_MEDIA.reasoningViews.conflict ? (
                        <img
                          src={LOGICWEAVER_MEDIA.reasoningViews.conflict}
                          alt="Conflict 冲突对比高保真设计"
                          className="w-full h-auto object-contain block rounded-lg"
                        />
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                            <span className="text-[#E5A85F]">
                              CONFLICT VIEW · 交互结构与状态机制示意
                            </span>
                            <span className="text-[#A0AAB4]">
                              可接入 Conflict 高保真设计图
                            </span>
                          </div>

                          {/* Interactive Comparison Demo */}
                          <div className="space-y-4">
                            {/* Dual-source parallel diff */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              <div className="p-4 rounded-xl bg-[#141920] border border-[#3A444F] space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                  <span className="text-[#EDF0F2]">材料来源 A</span>
                                  <span className="text-[#E5A85F]">文本差异高亮</span>
                                </div>
                                <div className="text-xs text-[#A0AAB4] leading-relaxed">
                                  围绕同一争点并列展示出处 A 的关键条款或陈述段落，差异词段以橙色边线标出。
                                </div>
                              </div>
                              <div className="p-4 rounded-xl bg-[#141920] border border-[#E5A85F]/45 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                  <span className="text-[#EDF0F2]">材料来源 B</span>
                                  <span className="text-[#E5A85F]">冲突对照</span>
                                </div>
                                <div className="text-xs text-[#A0AAB4] leading-relaxed">
                                  对照出处 B 的表述或时间/金额数值差异，辅助用户直接判断矛盾焦点。
                                </div>
                              </div>
                            </div>

                            {/* Interactive Image Wipe Exploration */}
                            <div className="p-4 rounded-xl bg-[#141920] border border-[#3A444F] space-y-2.5">
                              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                                <span className="text-[#EDF0F2]">
                                  图像重叠擦拭对比探索（扫描件 / 票据图像）
                                </span>
                                <span className="text-[#E5A85F] tabular-nums">
                                  擦拭分界 {wipePercent}%
                                </span>
                              </div>
                              <div className="relative h-14 rounded-lg overflow-hidden border border-[#3A444F] bg-[#090C11] select-none">
                                <div className="absolute inset-0 flex items-center justify-end pr-4 text-[11px] font-mono text-[#A0AAB4]">
                                  材料图像 B · 印章 / 签字图层
                                </div>
                                <div
                                  className="absolute inset-y-0 left-0 bg-[#1D242D] border-r-2 border-[#E5A85F] flex items-center pl-4 overflow-hidden"
                                  style={{ width: `${wipePercent}%` }}
                                >
                                  <span className="text-[11px] font-mono text-[#EDF0F2] whitespace-nowrap">
                                    材料图像 A · 原始扫描层
                                  </span>
                                </div>
                              </div>
                              <input
                                type="range"
                                min={15}
                                max={85}
                                value={wipePercent}
                                onChange={(e) => setWipePercent(Number(e.target.value))}
                                aria-label="调整图像重叠擦拭对比位置"
                                className="w-full accent-[#E5A85F] cursor-pointer"
                              />
                            </div>

                            {/* Interactive Conflict Candidate Decision State */}
                            <div className="p-4 rounded-xl bg-[#141920] border border-[#E5A85F]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="text-xs">
                                <span className="font-mono text-[#E5A85F] mr-2">
                                  候选冲突状态：
                                </span>
                                <span className="text-[#EDF0F2] font-medium">
                                  {conflictStatus === "pending" && "待处理（AI 推荐候选冲突）"}
                                  {conflictStatus === "staged" && "已暂存（保留待进一步核查）"}
                                  {conflictStatus === "rejected" && "已驳回（确认不构成实质冲突）"}
                                  {conflictStatus === "confirmed" && "已确认（写入案件冲突结构）"}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setConflictStatus("staged")}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                                    conflictStatus === "staged"
                                      ? "bg-[#E5A85F]/20 text-[#E5A85F] border-[#E5A85F]"
                                      : "bg-[#090C11] text-[#A0AAB4] border-[#3A444F] hover:text-[#EDF0F2]"
                                  }`}
                                >
                                  暂存
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConflictStatus("rejected")}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                                    conflictStatus === "rejected"
                                      ? "bg-[#1D242D] text-[#EDF0F2] border-[#A0AAB4]"
                                      : "bg-[#090C11] text-[#A0AAB4] border-[#3A444F] hover:text-[#EDF0F2]"
                                  }`}
                                >
                                  <X size={12} />
                                  <span>驳回</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConflictStatus("confirmed")}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                                    conflictStatus === "confirmed"
                                      ? "bg-[#A8D56C]/20 text-[#A8D56C] border-[#A8D56C]"
                                      : "bg-[#090C11] text-[#A0AAB4] border-[#3A444F] hover:text-[#EDF0F2]"
                                  }`}
                                >
                                  <Check size={12} />
                                  <span>确认</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {activeView === "hypothesis" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/12 flex flex-col justify-between gap-6">
                      <div className="space-y-4">
                        <div className="font-mono text-xs text-[#A79AF4]">
                          03｜Hypothesis · 假设—证据
                        </div>
                        <p className="text-sm sm:text-[15px] text-[#EDF0F2]/90 leading-relaxed">
                          以可检验的命题为中心，连接支持材料、反对材料和待确认关系，明确哪些判断已有依据、哪些仍需补证。
                        </p>
                        <p className="text-sm text-[#A0AAB4] leading-relaxed">
                          AI 可以推荐候选关联，用户<span className="text-[#A79AF4] font-medium">保留确认与修正权</span>。
                        </p>
                      </div>
                      <div className="pt-4 border-t border-white/10 space-y-1.5">
                        <div className="text-[11px] font-mono text-[#A79AF4]">适用任务</div>
                        <p className="text-xs sm:text-sm text-[#EDF0F2] leading-relaxed">
                          建立论证、检查反证，并识别尚未解决的证据缺口。
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-8 p-6 sm:p-8 bg-[#090C11] lw-grid-sub flex flex-col justify-center">
                      {LOGICWEAVER_MEDIA.reasoningViews.hypothesis ? (
                        <img
                          src={LOGICWEAVER_MEDIA.reasoningViews.hypothesis}
                          alt="Hypothesis 假设—证据视图高保真设计"
                          className="w-full h-auto object-contain block"
                        />
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                            <span className="text-[#A79AF4]">
                              HYPOTHESIS VIEW · 支持 / 反驳 / 待确认关系结构
                            </span>
                            <span className="text-[#A0AAB4]">
                              可接入 Hypothesis 高保真设计图
                            </span>
                          </div>

                          <div className="space-y-4">
                            {/* Center Proposition */}
                            <div className="p-4 rounded-xl bg-[#1D242D] border border-[#A79AF4]/65 text-center space-y-1">
                              <div className="text-[11px] font-mono text-[#A79AF4]">
                                可检验命题 · HYPOTHESIS
                              </div>
                              <div className="text-sm font-semibold text-[#EDF0F2]">
                                围绕核心主张组织多向证据检验关系
                              </div>
                            </div>

                            {/* Three Relation Semantics */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                              {/* Green Support */}
                              <div className="p-4 rounded-xl bg-[#141920] border border-[#A8D56C]/55 space-y-2">
                                <div className="text-[11px] font-mono text-[#A8D56C]">
                                  ─── 支持关系
                                </div>
                                <div className="text-xs font-medium text-[#EDF0F2]">
                                  支持材料（绿色实线）
                                </div>
                                <p className="text-[11px] text-[#A0AAB4] leading-relaxed">
                                  已核实来源的 InfoUnit 直接支撑命题成立。
                                </p>
                              </div>

                              {/* Orange/Red Refute */}
                              <div className="p-4 rounded-xl bg-[#141920] border border-[#E5A85F]/55 space-y-2">
                                <div className="text-[11px] font-mono text-[#E5A85F]">
                                  ─── 反驳关系
                                </div>
                                <div className="text-xs font-medium text-[#EDF0F2]">
                                  反对材料（橙红警告）
                                </div>
                                <p className="text-[11px] text-[#A0AAB4] leading-relaxed">
                                  指向相反事实或削弱前提的反证线索。
                                </p>
                              </div>

                              {/* Translucent Pending */}
                              <div className="p-4 rounded-xl bg-[#141920]/55 border border-dashed border-[#A79AF4]/50 space-y-2 opacity-85">
                                <div className="text-[11px] font-mono text-[#A79AF4]">
                                  - - - 待确认关系
                                </div>
                                <div className="text-xs font-medium text-[#EDF0F2]">
                                  半透明候选关联
                                </div>
                                <p className="text-[11px] text-[#A0AAB4] leading-relaxed">
                                  AI 推荐或缺少必要补证，等待用户确认与修正。
                                </p>
                              </div>
                            </div>

                            {/* Interactive Confirm / Revise Control */}
                            <div className="p-4 rounded-xl bg-[#141920] border border-[#3A444F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="text-xs">
                                <span className="font-mono text-[#A79AF4] mr-2">
                                  AI 候选关联状态：
                                </span>
                                <span className="text-[#EDF0F2]">
                                  {hypothesisCandidateStatus === "proposed" &&
                                    "半透明待确认状态（等待用户检视）"}
                                  {hypothesisCandidateStatus === "accepted" &&
                                    "已确认为有效证据关联（转为实线）"}
                                  {hypothesisCandidateStatus === "revised" &&
                                    "已由用户手动修正关联方向与角色"}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setHypothesisCandidateStatus("accepted")}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                                    hypothesisCandidateStatus === "accepted"
                                      ? "bg-[#A8D56C]/20 text-[#A8D56C] border-[#A8D56C]"
                                      : "bg-[#090C11] text-[#A0AAB4] border-[#3A444F] hover:text-[#EDF0F2]"
                                  }`}
                                >
                                  确认关联
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setHypothesisCandidateStatus("revised")}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs border transition-colors cursor-pointer ${
                                    hypothesisCandidateStatus === "revised"
                                      ? "bg-[#A79AF4]/20 text-[#A79AF4] border-[#A79AF4]"
                                      : "bg-[#090C11] text-[#A0AAB4] border-[#3A444F] hover:text-[#EDF0F2]"
                                  }`}
                                >
                                  <RotateCcw size={12} />
                                  <span>修正关系</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Exact Required Scope Disclaimer */}
              <p className="text-xs text-[#A0AAB4] leading-relaxed">
                以上为三种推理视图的交互设计方案，系统定义了面向不同调查任务的视图组织与切换机制。
              </p>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              05 ｜ MVP SCOPE & TRADE-OFF
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                05 / MVP SCOPE & TRADE-OFF
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                先建立可信的推理基础，再生成更丰富的界面
              </h2>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  最初的完整方案希望 AI 根据当前问题选择时间线、冲突对比或假设—证据视图，并动态组织展示内容。
                </p>
                <p>
                  进入 MVP 开发后，我们优先解决更基础的工作流：材料能否被结构化为可追溯的信息，Agent 能否有效检索证据、提出假设与证据缺口，用户能否核对和修改这些结果。三种视图的自动生成因此被排在后续阶段。
                </p>
                <p>
                  这是一项同时考虑<span className="text-[#E5A85F] font-medium">产品可行性与用户体验的取舍</span>。法律推理中，漂亮而无法核实的图形可能让不可靠的判断显得可信；因此，<span className="text-[#A8D56C] font-medium">先建立来源、状态和人工修正机制</span>，再增加复杂的生成式呈现。
                </p>
              </div>
            </div>

            {/* Prioritized vs Deferred Structural Comparison (Muted Inverted MVP Card vs Dark Deferred Card) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: MVP 优先范围 */}
              <div className="lw-inverted-frame rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="space-y-1 pb-3.5 border-b border-[#090C11]/15">
                  <div className="text-xs tracking-wider text-[#134222] font-bold">
                    MVP 优先范围
                  </div>
                  <h3 className="text-lg font-semibold text-[#090C11]">
                    优先实现的基础工作流
                  </h3>
                </div>

                <ul className="space-y-3 text-sm sm:text-[15px] text-[#090C11] font-medium">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#134222] font-bold mt-1 tabular-nums">01</span>
                    <span>材料上传与结构化提取</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#134222] font-bold mt-1 tabular-nums">02</span>
                    <span>InfoUnit 与 Relation 管理</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#134222] font-bold mt-1 tabular-nums">03</span>
                    <span>Issue、Hypothesis 与 Evidence Gap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#134222] font-bold mt-1 tabular-nums">04</span>
                    <span>Agent 调查与提案处理</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#134222] font-bold mt-1 tabular-nums">05</span>
                    <span>证据回溯与人工修正</span>
                  </li>
                </ul>
              </div>

              {/* Right: 后续延展阶段 */}
              <div className="rounded-2xl bg-[#0D1117]/80 border border-white/10 p-6 sm:p-8 space-y-5">
                <div className="space-y-1 pb-3.5 border-b border-white/10">
                  <div className="text-xs tracking-wider text-[#8B95A5] font-semibold">
                    后续延展阶段
                  </div>
                  <h3 className="text-lg font-semibold text-[#A0AAB4]">
                    延期实现的设计能力
                  </h3>
                </div>

                <ul className="space-y-3 text-sm sm:text-[15px] text-[#8B95A5]">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#A0AAB4]/60 mt-1 tabular-nums">—</span>
                    <span>Timeline / Conflict / Hypothesis 动态视图生成</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#A0AAB4]/60 mt-1 tabular-nums">—</span>
                    <span>根据当前推理任务自动选择布局</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#A0AAB4]/60 mt-1 tabular-nums">—</span>
                    <span>视图生成结果的持久化与同步</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs text-[#A0AAB4]/60 mt-1 tabular-nums">—</span>
                    <span>更完整的法律检索与文书工作流</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Design Decision Summary (Dark Silver-Metallic Shimmer Band) */}
            <div className="lw-silver-frame lw-silver-shimmer rounded-2xl px-6 sm:px-8 py-6 text-center">
              <p className="text-lg sm:text-xl font-editorial-cn font-semibold text-[#EDF0F2] leading-relaxed">
                先让用户能够<span className="text-[#A8D56C]">核实和修改 AI 的判断</span>，再让 AI 生成更复杂的界面。
              </p>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              06 ｜ WORKING PROTOTYPE & ITERATION
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                06 / WORKING PROTOTYPE
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                让 Agent 的行动变成可检查、可修改的工作区结果
              </h2>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  在后续原型实现中，我使用 Vibe Coding 推进前后端功能，将案件信息、假设与证据缺口整合到调查工作区，并围绕 Agent 的<span className="text-[#E5A85F] font-medium">工具调用、提案、状态更新和失败恢复</span>持续迭代。
                </p>
                <p>
                  用户不仅能向 Agent 提问，还能在画布中检查调查产生的结构化结果，决定后续如何继续处理。
                </p>
              </div>
            </div>

            {/* Three Showcase Focus Points (Open 3-Col Ledger) */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="py-6 md:px-6 first:md:pl-0 last:md:pr-0 space-y-2">
                <div className="font-mono text-xs font-semibold text-[#A8D56C]">
                  01｜结构化材料
                </div>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  将文件中的信息转换为可引用、可编辑的信息单元，保留对应证据来源。
                </p>
              </div>
              <div className="py-6 md:px-6 space-y-2">
                <div className="font-mono text-xs font-semibold text-[#A79AF4]">
                  02｜Agent 调查
                </div>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  Agent 通过工具读取案件信息与证据，围绕当前问题形成调查结果与结构化提案。
                </p>
              </div>
              <div className="py-6 md:px-6 last:md:pr-0 space-y-2">
                <div className="font-mono text-xs font-semibold text-[#E5A85F]">
                  03｜运行分析与迭代
                </div>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  利用 Langfuse 和本地运行记录检查工具调用、证据读取、异常提案和状态更新问题。
                </p>
              </div>
            </div>

            {/* Large Workspace Interaction + Langfuse Trace (Single-Level Silver Frames) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 cols: Workspace & Agent Investigation Interaction */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs pb-2 border-b border-white/12">
                  <span className="text-[#EDF0F2]">工作区与 Agent 调查交互</span>
                  <span className="text-[#D4DAE2]">
                    {LOGICWEAVER_MEDIA.prototypeWorkspace ? "原型实现" : "交互设计"}
                  </span>
                </div>

                <div className="rounded-2xl lw-silver-frame overflow-hidden">
                  {LOGICWEAVER_MEDIA.prototypeWorkspace ? (
                    <a
                      href={LOGICWEAVER_MEDIA.prototypeWorkspace}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="查看工作区与 Agent 调查交互完整截图（新窗口）"
                      className="block bg-[#090C11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8D56C] focus-visible:-outline-offset-2"
                    >
                      <img
                        src={LOGICWEAVER_MEDIA.prototypeWorkspace}
                        alt="LogicWeaver 运行原型：案件材料、证据画布与 Agent 调查变更记录"
                        width={2538}
                        height={1311}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-contain block"
                      />
                    </a>
                  ) : (
                    <div className="min-h-[260px] bg-[#090C11] lw-grid-sub p-6 flex flex-col justify-center gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10 py-5 gap-4 sm:gap-0">
                        <div className="sm:pr-5 space-y-2">
                          <div className="text-xs font-medium text-[#A8D56C]">
                            画布中的结构化结果
                          </div>
                          <p className="text-xs text-[#A0AAB4] leading-relaxed">
                            展示信息单元、待验证假设与证据缺口在调查工作区中的组织方式。
                          </p>
                        </div>
                        <div className="pt-4 sm:pt-0 sm:pl-5 space-y-2">
                          <div className="text-xs font-medium text-[#A79AF4]">
                            Agent 提案交互
                          </div>
                          <p className="text-xs text-[#A0AAB4] leading-relaxed">
                            呈现提案产生、状态更新与失败恢复的人机协同检查流程。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 5 cols: Observing Agent Behavior + Langfuse Trace */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-lg font-display font-semibold text-[#EDF0F2]">
                    观察 Agent 运行行为
                  </h3>
                  <p className="text-sm text-[#A0AAB4] leading-relaxed">
                    我使用 Langfuse 和本地运行记录<span className="text-[#A79AF4] font-medium">观察 Agent 的工具调用与输出</span>，将异常提案、无效工具调用和状态一致性问题定位到具体环节，再调整 Agent 工作流与界面交互。
                  </p>
                </div>

                <div className="rounded-2xl lw-silver-frame overflow-hidden">
                  <div className="px-3.5 py-2.5 bg-[#0B0E14] border-b border-white/12 flex items-center justify-between text-[11px] text-[#A0AAB4]">
                    <span className="font-mono">Langfuse Trace</span>
                    <span className="text-[#D4DAE2]">运行轨迹</span>
                  </div>

                  {LOGICWEAVER_MEDIA.langfuseTrace ? (
                    <div className="bg-[#0B0E14] p-2 flex items-center justify-center">
                      <div className="relative w-full rounded overflow-hidden">
                        <img
                          src={LOGICWEAVER_MEDIA.langfuseTrace}
                          alt="Langfuse Trace 运行记录截图（Investigation Agent 调用链与工作上下文）"
                          className="w-full h-auto object-contain block"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-[#090C11]/15 pointer-events-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 flex flex-col items-center justify-center text-center gap-2 min-h-[175px]">
                      <FileText size={20} className="text-[#A0AAB4]/60" />
                      <div className="text-xs font-medium text-[#EDF0F2]">
                        Langfuse 运行轨迹记录
                      </div>
                      <div className="text-[11px] text-[#A0AAB4] max-w-xs leading-relaxed">
                        用于展示工具调用、证据读取与状态检查的运行轨迹。
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              07 ｜ MY ROLE
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-10">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                07 / MY ROLE
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                从信息架构到 AI Agent 的实际运行
              </h2>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  课程设计阶段，我与团队共同分析法律案件的资料整理和推理需求，参与<span className="text-[#A8D56C] font-medium">信息对象定义、画布交互、三级卡片和推理视图方案</span>的设计。
                </p>
                <p>
                  后续，我将重心放在可运行原型，通过 Vibe Coding 推进实现，并持续检查 Agent 如何读取证据、形成提案、影响已有推理状态。
                </p>
                <p>
                  这让我能够同时<span className="text-[#A79AF4] font-medium">从交互体验与系统行为两个层面调整产品</span>。
                </p>
              </div>
            </div>

            {/* Dual Column Structural Breakdown (Dark Collaborative vs Inverted Individual Ownership) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Collaborative Design */}
              <div className="rounded-2xl bg-[#0D1117]/80 border border-white/10 p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs tracking-wider text-[#A8D56C] font-semibold">
                    团队协作
                  </div>
                  <h3 className="text-xl font-editorial-cn font-semibold text-[#EDF0F2]">
                    团队协作设计
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#A0AAB4] leading-relaxed">
                  用户任务与旅程分析、信息架构、画布交互、分级信息卡片与三种推理视图设计。
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-mono text-[#A0AAB4]">
                  <span className="text-[#EDF0F2]">旅程模型</span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#A8D56C]">InfoUnit · Relation</span>
                  <span className="text-white/20">/</span>
                  <span className="text-[#A79AF4]">三级卡片 · 推理视图</span>
                </div>
              </div>

              {/* Prototyping & Iteration (Muted Inverted Card Highlighting Personal Ownership) */}
              <div className="lw-inverted-frame rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs tracking-wider text-[#31237A] font-bold">
                    个人实现
                  </div>
                  <h3 className="text-xl font-editorial-cn font-semibold text-[#090C11]">
                    个人原型实现与迭代
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#1D2530] leading-relaxed">
                  Vibe Coding、前后端原型实现、Agent 调查工作流调试、工具调用和状态检查、Langfuse 运行分析。
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-mono text-[#2D3745]">
                  <span className="text-[#090C11] font-semibold">工作区原型</span>
                  <span className="text-[#090C11]/25">/</span>
                  <span className="text-[#31237A] font-semibold">工具调用与提案</span>
                  <span className="text-[#090C11]/25">/</span>
                  <span className="text-[#6B3507] font-semibold">Langfuse Trace 检查</span>
                </div>
              </div>
            </div>
          </section>

          <div className="lw-silver-divider w-full" />

          {/* ═════════════════════════════════════════════════════════════
              08 ｜ WHAT'S NEXT
             ═════════════════════════════════════════════════════════════ */}
          <section className="space-y-12">
            <div className="max-w-3xl space-y-4">
              <div className="font-mono text-xs tracking-wider text-[#A8D56C]">
                08 / WHAT'S NEXT
              </div>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-bold text-[#EDF0F2] leading-tight">
                让 Agent 跟随用户变化的推理思路
              </h2>
              <div className="text-xs font-mono text-[#E5A85F]">
                Future Exploration · 以下方向尚未实现
              </div>
              <div className="space-y-4 text-base sm:text-[17px] text-[#A0AAB4] leading-[1.75]">
                <p>
                  用户会随着新证据修正假设、切换争点，也会暂时搁置一条推理路径。下一步的核心问题是：<span className="text-[#A8D56C] font-medium">Agent 如何理解这些转向，持续跟上用户正在思考的问题？</span>
                </p>
                <p>
                  我希望进一步探索，Agent 如何理解用户尚未明说的判断前提、对证据重要性的取舍，以及何时值得继续追问；再以低打扰的建议介入，将推理过程延伸到法条对应与成果整理。
                </p>
              </div>
            </div>

            {/* Three future directions, distinct from implemented capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="py-6 md:px-6 first:md:pl-0 space-y-2.5">
                <div className="font-mono text-xs font-semibold text-[#A8D56C]">01 / 推理协同</div>
                <h3 className="text-base font-editorial-cn font-semibold text-[#EDF0F2]">
                  跟上推理的转向
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  探索如何结合用户当前关注的证据、手动修改与假设变化，识别调查目标的转移；在意图不明确时主动澄清，让后续调查与用户的思路保持衔接。
                </p>
              </div>
              <div className="py-6 md:px-6 space-y-2.5">
                <div className="font-mono text-xs font-semibold text-[#A79AF4]">02 / 低打扰交互</div>
                <h3 className="text-base font-editorial-cn font-semibold text-[#EDF0F2]">
                  以幽灵提示轻量介入
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  借鉴代码自动补全，在当前操作附近轻量呈现候选关系、待核验问题或下一步线索。探索提示的时机与粒度，让用户按需采纳、忽略或展开依据，确认后再写入推理结构。
                </p>
              </div>
              <div className="py-6 md:px-6 last:md:pr-0 space-y-2.5">
                <div className="font-mono text-xs font-semibold text-[#E5A85F]">03 / 工作流延伸</div>
                <h3 className="text-base font-editorial-cn font-semibold text-[#EDF0F2]">
                  从证据推理到可用成果
                </h3>
                <p className="text-sm sm:text-[15px] text-[#A0AAB4] leading-relaxed">
                  探索争点、法律适用条件与事实证据的对应方式，并设计可筛选、可复核的结构化证据清单与材料导出。保留来源和待核验状态，让分析结果能够进入后续文书与协作流程。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-white/12">
                <span className="text-[#EDF0F2]">成果导出的现状与下一步</span>
                <span className="text-[#A0AAB4]">能力边界</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/12 divide-y md:divide-y-0 md:divide-x divide-white/10 pb-6">
                <div className="py-3 md:pr-6 space-y-2">
                  <div className="text-xs font-mono text-[#A8D56C]">已有原型 / 离线归档</div>
                  <p className="text-sm text-[#A0AAB4] leading-relaxed">
                    已支持离线 ZIP 导出，包含六章节 HTML、manifest 清单与原始文件。
                  </p>
                </div>
                <div className="py-3 md:pl-6 space-y-2">
                  <div className="text-xs font-mono text-[#E5A85F]">待探索 / 结构化交付</div>
                  <p className="text-sm text-[#A0AAB4] leading-relaxed">
                    尚无结构化法律证据清单与法条映射；导出内容的组织方式、筛选与预览交互仍待设计和验证。
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Editorial Precision Footer */}
      <footer className="w-full bg-[#090C11] border-t border-white/12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="text-lg font-display font-bold text-[#EDF0F2]">
              LogicWeaver
            </div>
            <div className="text-xs sm:text-sm text-[#A0AAB4]">
              让推理过程保持可见、可追溯、可修正。
            </div>
          </div>

          <Link
            to="/#work-logicweaver"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg lw-silver-frame-subtle hover:border-white/35 text-xs font-medium text-[#EDF0F2] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回作品列表</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
