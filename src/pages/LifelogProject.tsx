import { publicAssetUrl } from "../lib/assets";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, ListOrdered, Maximize2, ScanSearch, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";

import lifelogOverviewImg from "../assets/images/lifelog/lifelog_overview_diagram.webp";
import pipelineEarlyImg from "../assets/images/lifelog/pipeline_early_full_context.png";

const pipelineRefinedImg = publicAssetUrl("assets/aistudio/02____Full_Context___________941c30d3.png");

import unityStage1SelectImg from "../assets/images/lifelog/unity_stage1_theme_select.webp";
import unityStage1HintImg from "../assets/images/lifelog/unity_stage1_theme_hint.webp";
import unityStage1CorrectImg from "../assets/images/lifelog/unity_stage1_theme_correct.webp";
import unityStage2ActionImg from "../assets/images/lifelog/unity_stage2_episode_action.webp";
import unityStage2ToggleImg from "../assets/images/lifelog/unity_stage2_episode_toggle.webp";
import unityStage2HintImg from "../assets/images/lifelog/unity_stage2_episode_hint.webp";
import unityStage3InitImg from "../assets/images/lifelog/unity_stage3_sequence_init.webp";
import unityStage3ProgressImg from "../assets/images/lifelog/unity_stage3_sequence_progress.webp";
import unityStage4SelectImg from "../assets/images/lifelog/unity_stage4_item_select.webp";
import unityStage4ConfirmImg from "../assets/images/lifelog/unity_stage4_item_confirm.webp";

import doctorTaskSetupImg from "../assets/images/lifelog/doctor_web_task_setup.png";
import doctorProcessingImg from "../assets/images/lifelog/doctor_web_processing_materials.png";
import doctorProcessingEntityImg from "../assets/images/lifelog/doctor_web_processing_entity.png";
import doctorRecallReportImg from "../assets/images/lifelog/doctor_web_recall_report.png";

const OVERVIEW_IMAGE = lifelogOverviewImg;

interface UnityScreenItem {
  id: string;
  stageId: string;
  stageLabel: string;
  shortTitle: string;
  description: string;
  image: string;
  alt: string;
}

const UNITY_STAGES = [
  { id: "theme", step: "01", label: "活动主题" },
  { id: "episode", step: "02", label: "活动情节" },
  { id: "sequence", step: "03", label: "活动排序" },
  { id: "item", step: "04", label: "活动项目" },
] as const;

const FUTURE_DIRECTIONS = [
  {
    step: "01",
    title: "自适应渐进式回忆引导",
    description:
      "在现有分级提示与答题历史反馈的基础上，进一步结合患者个体差异与历史提示效果，动态调整语言、图像及视频线索的呈现方式、强度与节奏。",
    icon: SlidersHorizontal,
    featured: false,
  },
  {
    step: "02",
    title: "专用视觉识别与成本优化",
    description:
      "现有系统依托 VLM 与阿里云图搜图核验商品身份；未来可探索专用商品识别模型、OCR 与云端检索的组合方案，对比评估长尾商品识别效果、处理时延与成本。",
    icon: ScanSearch,
    featured: true,
  },
  {
    step: "03",
    title: "事件顺序任务的难度分级",
    description:
      "针对医生反馈的完整事件排序难度较高问题，探索从两事件先后判断、固定部分位置的补全排序，到完整序列重构的分级任务，适配不同患者的记忆能力。",
    icon: ListOrdered,
    featured: false,
  },
] as const;

const UNITY_SCREENS: UnityScreenItem[] = [
  {
    id: "stage1-select",
    stageId: "theme",
    stageLabel: "01 · 活动主题",
    shortTitle: "今日活动选择",
    description: "呈现「午餐 / 逛超市 / 散步」候选项，通过时间段提问引导检索当日核心活动主题。",
    image: unityStage1SelectImg,
    alt: "Unity 用户端第一关：今日活动主题选择界面",
  },
  {
    id: "stage1-hint",
    stageId: "theme",
    stageLabel: "01 · 活动主题",
    shortTitle: "拼图线索提示",
    description: "触发提示后以拼图遮罩局部揭示超市货架实拍画面，提供温和的情景唤醒线索。",
    image: unityStage1HintImg,
    alt: "Unity 用户端第一关提示：活动场景拼图局部线索",
  },
  {
    id: "stage1-correct",
    stageId: "theme",
    stageLabel: "01 · 活动主题",
    shortTitle: "主题确认反馈",
    description: "选择「逛超市」后弹出正向鼓励反馈与活动描述摘要，顺利进入情节回忆阶段。",
    image: unityStage1CorrectImg,
    alt: "Unity 用户端第一关选对界面：逛超市反馈确认",
  },
  {
    id: "stage2-action",
    stageId: "episode",
    stageLabel: "02 · 活动情节",
    shortTitle: "实拍场景判断",
    description: "基于购物篮实拍照片展开二选一交互（结账 / 进入超市），定位具体发生的行为节点。",
    image: unityStage2ActionImg,
    alt: "Unity 用户端第二关：实拍照片行为二选一界面",
  },
  {
    id: "stage2-toggle",
    stageId: "episode",
    stageLabel: "02 · 活动情节",
    shortTitle: "图像与照片切换",
    description: "支持在清晰线稿与真实照片之间切换观察同一场景，降低视觉干扰并确认回忆状态。",
    image: unityStage2ToggleImg,
    alt: "Unity 用户端第二关：线稿图像与实拍照片切换界面",
  },
  {
    id: "stage2-hint",
    stageId: "episode",
    stageLabel: "02 · 活动情节",
    shortTitle: "细节线索弹窗",
    description: "展示「挑选饮料」货架实拍图与文字说明，辅助用户辨识片段中的关键动作与环境。",
    image: unityStage2HintImg,
    alt: "Unity 用户端第二关提示：挑选饮料细节弹窗",
  },
  {
    id: "stage3-sort-init",
    stageId: "sequence",
    stageLabel: "03 · 活动排序",
    shortTitle: "事件时间轴排序",
    description: "汇总超市内 4 个关键子事件卡片，引导按时间先后顺序重构完整事件序列。",
    image: unityStage3InitImg,
    alt: "Unity 用户端第三关：活动时间线排序初始界面",
  },
  {
    id: "stage3-sort-progress",
    stageId: "sequence",
    stageLabel: "03 · 活动排序",
    shortTitle: "序列进度与得分",
    description: "实时记录已完成的序列节点（进入超市 → 挑选果蔬）并给予星星反馈激励。",
    image: unityStage3ProgressImg,
    alt: "Unity 用户端第三关选对界面：事件排序进度 2/4",
  },
  {
    id: "stage4-entity",
    stageId: "item",
    stageLabel: "04 · 活动项目",
    shortTitle: "实体物品辨识",
    description: "聚焦「挑选水果和蔬菜」场景，从多个实体卡片中选出实际购买的物品细节。",
    image: unityStage4SelectImg,
    alt: "Unity 用户端第四关：挑选水果和蔬菜实体选择界面",
  },
  {
    id: "stage4-confirm",
    stageId: "item",
    stageLabel: "04 · 活动项目",
    shortTitle: "目标实体选中",
    description: "确认选中「茄子」计入该环节已添加清单，同步累计星星积分并保留「？」提示辅助。",
    image: unityStage4ConfirmImg,
    alt: "Unity 用户端第四关选对界面：选中茄子实体确认",
  },
];

interface DoctorPlatformStep {
  step: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  frontLabel: string;
  backImage?: string;
  backAlt?: string;
  backLabel?: string;
}

const DOCTOR_PLATFORM_STEPS: DoctorPlatformStep[] = [
  {
    step: "01",
    title: "任务配置与视频上传",
    caption: "配置患者编号、采购清单与干扰事件数，并上传第一人称音视频。",
    image: doctorTaskSetupImg,
    alt: "Lifelog 实验分析平台：任务配置与上传界面",
    frontLabel: "任务参数与视频上传",
  },
  {
    step: "02",
    title: "任务处理监控与回忆材料生成",
    caption: "同步处理进度与 Unity 就绪状态，汇总活动概览、关键帧与交互实体追踪。",
    image: doctorProcessingImg,
    alt: "Lifelog 实验分析平台：任务处理进度与活动概览界面",
    frontLabel: "活动概览与关键帧",
    backImage: doctorProcessingEntityImg,
    backAlt: "Lifelog 实验分析平台：交互实体追踪与生成问题明细",
    backLabel: "交互实体追踪明细",
  },
  {
    step: "03",
    title: "用户回忆表现报告",
    caption: "统计总分、错误次数、提示请求与交互耗时，辅助临床回顾评估。",
    image: doctorRecallReportImg,
    alt: "Lifelog 实验分析平台：用户回忆表现报告界面",
    frontLabel: "临床统计与交互日志",
  },
];

interface ZoomedMediaState {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  primaryLabel?: string;
  alternateImage?: string;
  alternateAlt?: string;
  alternateLabel?: string;
  activeVariant?: "primary" | "alternate";
}

export function LifelogProject() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isStep2Hovered, setIsStep2Hovered] = useState(false);
  const [zoomedMedia, setZoomedMedia] = useState<ZoomedMediaState | null>(null);

  const activeScreen = UNITY_SCREENS[activeScreenIndex];

  useEffect(() => {
    if (!isLightboxOpen && !zoomedMedia) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
        setZoomedMedia(null);
      } else if (isLightboxOpen && event.key === "ArrowLeft") {
        setActiveScreenIndex((prev) => (prev - 1 + UNITY_SCREENS.length) % UNITY_SCREENS.length);
      } else if (isLightboxOpen && event.key === "ArrowRight") {
        setActiveScreenIndex((prev) => (prev + 1) % UNITY_SCREENS.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, zoomedMedia]);

  const handleStageSelect = (stageId: string) => {
    const firstIndex = UNITY_SCREENS.findIndex((item) => item.stageId === stageId);
    if (firstIndex !== -1) {
      setActiveScreenIndex(firstIndex);
    }
  };

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev - 1 + UNITY_SCREENS.length) % UNITY_SCREENS.length);
  };

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev + 1) % UNITY_SCREENS.length);
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-[#0284c7] selection:text-white overflow-x-clip flex flex-col">
      {/* Top Bar */}
      <header className="w-full bg-white border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
          <Link
            to="/#work-lifelog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#475569] hover:text-[#0284c7] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={15} />
            <span>返回作品列表</span>
          </Link>

          <div className="flex items-center gap-2.5 text-xs text-[#64748b] whitespace-nowrap shrink-0">
            <span>研究项目档案</span>
            <span aria-hidden="true" className="text-[#cbd5e1]">/</span>
            <span className="font-display font-semibold text-[#0f172a]">Lifelog</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Overview */}
        <section className="w-full bg-white border-b border-[#e2e8f0]">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#0284c7] mb-3 tracking-wide">
                <span className="font-display font-bold text-[#0f172a]">Lifelog</span>
                <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
                <span>团队研究项目 · 2025.11-2026.8</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-editorial-cn font-bold tracking-tight text-[#0f172a] leading-[1.2] mb-5 text-balance">
                基于第一人称生活影像的情景记忆训练系统
              </h1>

              <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl mb-9">
                将第一人称生活记录转化为结构化事件与记忆线索，支持从活动回顾到实体细节的渐进式回忆。
              </p>
            </div>

            {/* Clean Metadata Spec Strip */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#e2e8f0] text-sm">
              <div className="md:col-span-6">
                <div className="text-xs text-[#64748b] mb-1">个人分工与实现</div>
                <div className="font-medium text-[#0f172a]">
                  视频理解与后端实现 · 医生端网页搭建 · Unity 端搭建
                  <span className="text-[#64748b] font-normal">（Unity UI 负责修改调整）</span>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-xs text-[#64748b] mb-1">项目类型</div>
                <div className="font-medium text-[#0f172a]">团队研究项目</div>
              </div>
              <div className="md:col-span-4">
                <div className="text-xs text-[#64748b] mb-1">核心链路</div>
                <div className="font-medium text-[#0f172a]">
                  <span className="text-[#16a34a]">视频理解</span>
                  <span className="mx-1.5 text-[#cbd5e1]">·</span>
                  <span className="text-[#0284c7]">实体核验</span>
                  <span className="mx-1.5 text-[#cbd5e1]">·</span>
                  <span>渐进引导回忆</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Case Study Content */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-18 space-y-20">
          {/* 01 · TECHNICAL ROUTE, INTERACTION DESIGN & FIELD CAPTURE */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#0284c7] mb-2">
                  <span className="font-mono font-semibold tabular-nums">01</span>
                  <span aria-hidden="true" className="text-[#cbd5e1]">/</span>
                  <span>技术路线与交互总览</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#0f172a]">
                  From Life Logs to Guided Recall
                </h2>
              </div>
              <span className="text-xs text-[#64748b]">
                记忆材料提取技术路线 · 三层系统交互设计 · 穿戴记录与试验实拍
              </span>
            </div>

            <figure className="bg-white rounded-2xl border border-[#e2e8f0] p-4 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-5">
              <div className="rounded-xl overflow-hidden bg-white border border-[#e2e8f0]/80">
                <img
                  src={OVERVIEW_IMAGE}
                  alt="Lifelog 记忆材料提取技术路线、系统交互设计框架及穿戴硬件实拍总览图"
                  onClick={() =>
                    setZoomedMedia({
                      title: "技术路线、交互设计与现场实拍总览",
                      subtitle: "01 · From Life Logs to Guided Recall",
                      image: OVERVIEW_IMAGE,
                      alt: "Lifelog 记忆材料提取技术路线、系统交互设计框架及穿戴硬件实拍总览图",
                    })
                  }
                  className="w-full h-auto object-contain block cursor-zoom-in"
                />
              </div>

              <figcaption className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#e2e8f0] text-xs leading-relaxed text-[#475569]">
                <div>
                  <div className="font-semibold text-[#0f172a] mb-1">
                    01 / 记忆材料提取技术路线（左）
                  </div>
                  <p>
                    通过全局多模态理解生成候选事件与实体，结合交互帧视觉核验与事件仲裁，分别输出叙事层线索与实体层细节问题。
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-[#0f172a] mb-1">
                    02 / 三层渐进交互设计（右）
                  </div>
                  <p>
                    围绕框架层（活动主题）、叙事层（场景行为与时间排序）与实体层（物品明细），兼顾项目记忆与联结记忆双路径唤醒。
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-[#0f172a] mb-1">
                    03 / 硬件佩戴与临床测试（下）
                  </div>
                  <p>
                    展示胸前穿戴式第一人称记录设备实际佩戴形态、货架采购交互捕捉，以及患者在病房场景下使用平板开展回忆测试的画面。
                  </p>
                </div>
              </figcaption>
            </figure>
          </section>

          {/* 02 · PIPELINE EVOLUTION */}
          <section className="pt-14 border-t border-[#e2e8f0]">
            <div className="mb-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#16a34a] mb-2">
                <span className="font-mono font-semibold tabular-nums">02</span>
                <span aria-hidden="true" className="text-[#cbd5e1]">/</span>
                <span>算法流程演进</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#0f172a]">
                From One-Pass Generation to Evidence-Based Verification
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Left Card: Early Full Context */}
              <article className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="bg-[#f0f9ff] border-b border-[#bae6fd]/70 px-5 py-4 md:min-h-[116px] flex flex-col justify-center">
                  <div className="text-xs font-medium text-[#0284c7] mb-1">
                    早期方案
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#0f172a] mb-1">
                    Early Full Context
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    一次性理解视频，同时生成候选事件和实体。
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-white flex-1 flex items-center">
                  <div className="w-full rounded-xl overflow-hidden border border-[#e2e8f0] bg-white">
                    <img
                      src={pipelineEarlyImg}
                      alt="早期 Full Context 技术流程图：基于全场景上下文的记忆材料生成"
                      onClick={() =>
                        setZoomedMedia({
                          title: "早期 Full Context · 早期方案",
                          subtitle: "02 · 算法流程演进",
                          image: pipelineEarlyImg,
                          alt: "早期 Full Context 技术流程图：基于全场景上下文的记忆材料生成",
                        })
                      }
                      className="w-full h-auto object-contain block cursor-zoom-in"
                    />
                  </div>
                </div>
              </article>

              {/* Right Card: Refined Full Context + Verification */}
              <article className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="bg-[#f0fdf4] border-b border-[#bbf7d0]/80 px-5 py-4 md:min-h-[116px] flex flex-col justify-center">
                  <div className="text-xs font-medium text-[#16a34a] mb-1">
                    演进方案
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-[#0f172a] mb-1">
                    Refined Full Context + Verification
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    全局生成候选，提取交互帧核验实体并修正事件结构。
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-white flex-1 flex items-center">
                  <div className="w-full rounded-xl overflow-hidden border border-[#e2e8f0] bg-white">
                    <img
                      src={pipelineRefinedImg}
                      alt="精炼 Full Context + 核验技术流程图：基于证据的上下文精炼与记忆材料生成"
                      onClick={() =>
                        setZoomedMedia({
                          title: "精炼 Full Context + 核验 · 演进方案",
                          subtitle: "02 · 算法流程演进",
                          image: pipelineRefinedImg,
                          alt: "精炼 Full Context + 核验技术流程图：基于证据的上下文精炼与记忆材料生成",
                        })
                      }
                      className="w-full h-auto object-contain block cursor-zoom-in"
                    />
                  </div>
                </div>
              </article>
            </div>

            <div className="px-5 py-4 rounded-xl bg-white border border-[#e2e8f0] text-xs sm:text-sm text-[#475569] leading-relaxed">
              早期方案在拍摄条件较理想的短视频中表现较好，但真实生活视频中的短暂交互、遮挡与模糊容易导致实体误识别，并进一步影响事件划分。因此，后续方案保留全局理解，同时引入独立的实体视觉核验和事件仲裁。
            </div>
          </section>

          {/* 03 · SYSTEM INTERFACES */}
          <section className="pt-14 border-t border-[#e2e8f0]">
            <div className="mb-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#0284c7] mb-2">
                <span className="font-mono font-semibold tabular-nums">03</span>
                <span aria-hidden="true" className="text-[#cbd5e1]">/</span>
                <span>系统交互界面</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#0f172a]">
                From Understanding to Guided Recall
              </h2>
            </div>

            <div className="space-y-8">
              {/* Subsystem 1: Unity User Interface (10 Real Screens across 4 Stages) */}
              <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="bg-[#f0fdf4] border-b border-[#bbf7d0]/80 px-5 sm:px-6 py-4 flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#0f172a]">
                      Unity 用户端界面
                    </h3>
                    <span className="text-xs font-medium text-[#16a34a] whitespace-nowrap shrink-0">
                      渐进回忆交互
                    </span>
                  </div>
                  <span className="text-xs text-[#475569]">
                    承担 Unity 端逻辑搭建 · UI 界面协助修改与细节调整
                  </span>
                </div>

                {/* Stage Switcher Bar */}
                <div className="px-5 sm:px-6 pt-4 pb-3 border-b border-[#e2e8f0] bg-[#f8fafc]/60 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="回忆阶段切换">
                    {UNITY_STAGES.map((stage) => {
                      const isStageActive = activeScreen.stageId === stage.id;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          role="tab"
                          aria-selected={isStageActive}
                          onClick={() => handleStageSelect(stage.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            isStageActive
                              ? "bg-[#16a34a] text-white shadow-xs"
                              : "bg-white text-[#475569] border border-[#e2e8f0] hover:border-[#86efac] hover:text-[#16a34a]"
                          }`}
                        >
                          <span className="font-mono text-[11px] tabular-nums opacity-85">{stage.step}</span>
                          <span>{stage.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-xs text-[#64748b] font-mono tabular-nums">
                    {String(activeScreenIndex + 1).padStart(2, "0")} / {String(UNITY_SCREENS.length).padStart(2, "0")}
                  </div>
                </div>

                {/* Interactive Showcase Workspace */}
                <div className="p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Main High-Resolution Stage Preview */}
                    <div className="lg:col-span-8">
                      <div className="rounded-xl overflow-hidden border border-[#e2e8f0] bg-[#f8fafc]">
                        <img
                          src={activeScreen.image}
                          alt={activeScreen.alt}
                          onClick={() => setIsLightboxOpen(true)}
                          className="w-full aspect-[3/2] object-contain block cursor-zoom-in"
                        />
                      </div>
                    </div>

                    {/* Right Detail & Navigation Panel */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-5 lg:py-2">
                      <div>
                        <div className="text-xs font-mono font-semibold text-[#16a34a] mb-2">
                          {activeScreen.stageLabel}
                        </div>
                        <h4 className="text-lg sm:text-xl font-semibold text-[#0f172a] mb-2.5">
                          {activeScreen.shortTitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                          {activeScreen.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#e2e8f0] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="上一张界面截图"
                            className="w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] hover:border-[#cbd5e1] text-[#334155] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            aria-label="下一张界面截图"
                            className="w-9 h-9 rounded-lg border border-[#e2e8f0] bg-white hover:bg-[#f8fafc] hover:border-[#cbd5e1] text-[#334155] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsLightboxOpen(true)}
                          aria-label="放大查看当前界面截图"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#f0fdf4] hover:border-[#86efac] hover:text-[#15803d] text-[#334155] text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Maximize2 size={13} />
                          <span>大图预览</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* All 10 Screens Filmstrip */}
                  <div className="pt-5 border-t border-[#e2e8f0]">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {UNITY_SCREENS.map((item, idx) => {
                        const isSelected = idx === activeScreenIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveScreenIndex(idx)}
                            className={`text-left rounded-lg border overflow-hidden transition-all cursor-pointer bg-white ${
                              isSelected
                                ? "border-[#16a34a] ring-2 ring-[#16a34a]/20 bg-[#f0fdf4]"
                                : "border-[#e2e8f0] hover:border-[#94a3b8]"
                            }`}
                          >
                            <div className="aspect-[3/2] bg-[#f8fafc] overflow-hidden border-b border-[#e2e8f0]/70">
                              <img
                                src={item.image}
                                alt={item.shortTitle}
                                loading="lazy"
                                className="w-full h-full object-cover block"
                              />
                            </div>
                            <div className="px-2.5 py-1.5 flex items-center justify-between gap-1.5">
                              <span
                                className={`text-[11px] truncate font-medium ${
                                  isSelected ? "text-[#15803d]" : "text-[#334155]"
                                }`}
                              >
                                {item.shortTitle}
                              </span>
                              <span className="font-mono text-[10px] text-[#94a3b8] tabular-nums shrink-0">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Progressive Recall Cue Mechanism Note */}
                <div className="px-5 sm:px-6 py-4 bg-[#f8fafc]/80 border-t border-[#e2e8f0] flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 text-xs leading-relaxed text-[#475569]">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#15803d] whitespace-nowrap shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0" aria-hidden="true" />
                    <span>渐进式提示机制</span>
                  </span>
                  <span aria-hidden="true" className="hidden sm:inline text-[#cbd5e1]">/</span>
                  <p>
                    系统根据不同回忆任务逐级提供语言、图像及第一人称视频等线索，并结合用户的答题历史与提示使用情况，通过 LLM 调整引导内容。
                  </p>
                </div>
              </div>

              {/* Subsystem 2: Doctor Web Platform */}
              <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
                <div className="bg-[#f0f9ff] border-b border-[#bae6fd]/70 px-5 sm:px-6 py-4 flex flex-wrap items-baseline justify-between gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#0f172a]">
                      医生端网页平台
                    </h3>
                    <span className="text-xs font-medium text-[#0284c7] whitespace-nowrap shrink-0">
                      管理与评估
                    </span>
                  </div>
                  <span className="text-xs text-[#475569]">
                    独立完成医生端 Web 前端页面搭建与任务管理链路集成
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
                  {DOCTOR_PLATFORM_STEPS.map((item) => {
                    const hasFlip = Boolean(item.backImage);
                    return (
                      <div key={item.step} className="p-5 sm:p-6 flex flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span className="font-mono text-xs font-semibold text-[#0284c7] tabular-nums">
                              {item.step}
                            </span>
                            <h4 className="text-sm sm:text-base font-semibold text-[#0f172a]">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#64748b] leading-relaxed">
                            {item.caption}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {hasFlip && item.backImage ? (
                            <div
                              data-testid="doctor-step-02-flip"
                              onMouseEnter={() => setIsStep2Hovered(true)}
                              onMouseLeave={() => setIsStep2Hovered(false)}
                              onClick={() =>
                                setZoomedMedia({
                                  title: item.title,
                                  subtitle: `医生端网页 · 步骤 ${item.step}`,
                                  image: item.image,
                                  alt: item.alt,
                                  primaryLabel: item.frontLabel,
                                  alternateImage: item.backImage,
                                  alternateAlt: item.backAlt,
                                  alternateLabel: item.backLabel,
                                  activeVariant: isStep2Hovered ? "alternate" : "primary",
                                })
                              }
                              className="group perspective-1200 cursor-zoom-in"
                            >
                              <div className="relative w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] preserve-3d group-hover:[transform:rotateY(180deg)]">
                                <div className="w-full rounded-xl overflow-hidden border border-[#e2e8f0] bg-white [backface-visibility:hidden]">
                                  <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-full h-auto object-contain block"
                                  />
                                </div>

                                <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden border border-[#7dd3fc] bg-white shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
                                  <img
                                    src={item.backImage}
                                    alt={item.backAlt || item.alt}
                                    className="w-full h-full object-contain block"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="rounded-xl overflow-hidden border border-[#e2e8f0] bg-white">
                              <img
                                src={item.image}
                                alt={item.alt}
                                onClick={() =>
                                  setZoomedMedia({
                                    title: item.title,
                                    subtitle: `医生端网页 · 步骤 ${item.step}`,
                                    image: item.image,
                                    alt: item.alt,
                                  })
                                }
                                className="w-full h-auto object-contain block cursor-zoom-in"
                              />
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2 text-[11px] text-[#64748b] px-0.5">
                            <span>{hasFlip ? "视频处理进度监控 · 结果详情" : item.frontLabel}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 04 · FUTURE DIRECTIONS */}
          <section className="pt-14 border-t border-[#e2e8f0]">
            <div className="mb-7">
              <div className="flex items-center gap-2 text-xs font-medium text-[#16a34a] mb-2">
                <span className="font-mono font-semibold tabular-nums">04</span>
                <span aria-hidden="true" className="text-[#cbd5e1]">/</span>
                <span>未来改进方向</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#0f172a]">
                Future Directions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FUTURE_DIRECTIONS.map((item) => {
                const DirectionIcon = item.icon;
                const isFeatured = item.featured;
                return (
                  <article
                    key={item.step}
                    className={`rounded-2xl border p-5 sm:p-6 flex flex-col gap-3.5 transition-colors ${
                      isFeatured
                        ? "bg-[#0f172a] border-[#0f172a] text-white shadow-[0_10px_28px_-10px_rgba(15,23,42,0.28)]"
                        : "bg-white border-[#e2e8f0] text-[#0f172a] shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-xs font-semibold tabular-nums ${
                          isFeatured ? "text-[#38bdf8]" : "text-[#64748b]"
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                          isFeatured
                            ? "bg-white/10 border-white/15 text-[#7dd3fc]"
                            : "bg-[#f8fafc] border-[#e2e8f0] text-[#475569]"
                        }`}
                      >
                        <DirectionIcon size={15} />
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3
                        className={`text-base font-semibold leading-snug ${
                          isFeatured ? "text-white" : "text-[#0f172a]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isFeatured ? "text-[#cbd5e1]" : "text-[#475569]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Clean ToB Footer */}
      <footer className="mt-auto w-full bg-white border-t border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#64748b]">
            <span className="font-display font-bold text-[#0f172a]">Lifelog</span>
            <span aria-hidden="true" className="text-[#cbd5e1]">·</span>
            <span>基于第一人称生活影像的情景记忆训练系统</span>
          </div>

          <Link
            to="/#work-lifelog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f172a] hover:bg-[#0284c7] text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回精选作品列表</span>
          </Link>
        </div>
      </footer>

      {/* Lightbox Modal for Unity Screens */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0f172a]/90 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Unity 交互界面大图预览"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono text-[#86efac] mb-0.5">
                {activeScreen.stageLabel} · {String(activeScreenIndex + 1).padStart(2, "0")} / {String(UNITY_SCREENS.length).padStart(2, "0")}
              </div>
              <div className="text-sm sm:text-base font-semibold truncate">
                {activeScreen.shortTitle}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="关闭大图预览"
              className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Stage */}
          <div
            className="relative max-w-6xl w-full mx-auto flex-1 min-h-0 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label="上一张"
              className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center transition-colors cursor-pointer mr-4 shrink-0"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="max-h-full max-w-full rounded-xl overflow-hidden bg-white shadow-2xl">
              <img
                src={activeScreen.image}
                alt={activeScreen.alt}
                className="max-h-[75vh] w-auto object-contain block"
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="下一张"
              className="hidden sm:flex w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center transition-colors cursor-pointer ml-4 shrink-0"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="max-w-3xl w-full mx-auto text-center text-xs sm:text-sm text-[#e2e8f0]"
            onClick={(e) => e.stopPropagation()}
          >
            {activeScreen.description}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Overview & Doctor Web Screens */}
      {zoomedMedia && (
        <div
          className="fixed inset-0 z-50 bg-[#0f172a]/90 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={zoomedMedia.title}
          onClick={() => setZoomedMedia(null)}
        >
          <div
            className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="text-xs font-mono text-[#7dd3fc] mb-0.5">
                {zoomedMedia.subtitle}
              </div>
              <div className="text-sm sm:text-base font-semibold truncate">
                {zoomedMedia.title}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {zoomedMedia.alternateImage && (
                <div className="inline-flex items-center p-1 rounded-lg bg-white/10 border border-white/15">
                  <button
                    type="button"
                    onClick={() =>
                      setZoomedMedia((prev) =>
                        prev ? { ...prev, activeVariant: "primary" } : null
                      )
                    }
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      (zoomedMedia.activeVariant ?? "primary") === "primary"
                        ? "bg-[#0284c7] text-white"
                        : "text-[#cbd5e1] hover:text-white"
                    }`}
                  >
                    {zoomedMedia.primaryLabel || "默认视图"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setZoomedMedia((prev) =>
                        prev ? { ...prev, activeVariant: "alternate" } : null
                      )
                    }
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      zoomedMedia.activeVariant === "alternate"
                        ? "bg-[#0284c7] text-white"
                        : "text-[#cbd5e1] hover:text-white"
                    }`}
                  >
                    {zoomedMedia.alternateLabel || "背面视图"}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setZoomedMedia(null)}
                aria-label="关闭大图预览"
                className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div
            className="max-w-6xl w-full mx-auto flex-1 min-h-0 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-full max-w-full rounded-xl overflow-hidden bg-white shadow-2xl">
              <img
                src={
                  zoomedMedia.activeVariant === "alternate" && zoomedMedia.alternateImage
                    ? zoomedMedia.alternateImage
                    : zoomedMedia.image
                }
                alt={
                  zoomedMedia.activeVariant === "alternate" && zoomedMedia.alternateAlt
                    ? zoomedMedia.alternateAlt
                    : zoomedMedia.alt
                }
                className="max-h-[80vh] w-auto object-contain block"
              />
            </div>
          </div>

          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
