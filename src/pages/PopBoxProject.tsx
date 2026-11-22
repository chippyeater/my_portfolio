import { useEffect, useState } from "react";
import { ArrowLeft, GitBranch, Sparkles, Cpu, Globe, Volume2, AlertCircle, Film, Mic, Zap, Trophy, Maximize2, X, ScanFace, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * PopBox 素材路径集中配置（便于后续替换或补充新素材）
 * 已放置素材位于：/public/assets/aistudio/
 * 建议后续新增实拍图、网页截图或视频可放入：/public/assets/popbox/
 */
const POPBOX_MEDIA = {
  // 已接入的正式素材
  physicalPrototype: "/assets/aistudio/popbox____b906b97a.png",
  conceptStageRender: "/assets/aistudio/AI______2e63cf52.jpg",
  playGuidePoster: "/assets/aistudio/_______36ae5e3d.png",
  dailyFront: "/assets/aistudio/__1_670abe8a.png",
  dailyBack: "/assets/aistudio/__2_b826fb1b.png",
  promoVideoUrl: "/assets/aistudio/_____72fe4e3c.mp4",
  coreS3InteractionVideoUrl: "/assets/aistudio/_____32fa5109.mp4",
  webNotesShot: "/assets/aistudio/image_5b68c5fa.png",
  webGalleryShot: "/assets/aistudio/image_00331e1f.png",
  interactionFlowShot: "/assets/aistudio/______84b28fb7.png",

  // 可选补充素材位（填入真实 URL 后对应区块自动显示）
  webProfileShot: "" as string,
};

const INTERACTION_STEPS = [
  {
    step: "01",
    title: "识别角色",
    summary: "将盲盒放上舞台感应区，自动识别 P1 / P2 角色并加载对应人设音色。",
    accentBg: "bg-[#ffe600]",
    cardTint: "bg-[#ffe600]/15",
  },
  {
    step: "02",
    title: "选择玩法",
    summary: "触发「日常群聊」自由交流，或开启「限时辩论」设定观点主题。",
    accentBg: "bg-[#67e8f9]",
    cardTint: "bg-[#67e8f9]/15",
  },
  {
    step: "03",
    title: "语音提问与回应",
    summary: "通过 CoreS3 麦克风直接对话，两位角色按性格轮番作出语音回应。",
    accentBg: "bg-[#c084fc]",
    cardTint: "bg-[#c084fc]/15",
  },
  {
    step: "04",
    title: "按键爆灯与进度反馈",
    summary: "随时按下实体舞台按钮为认同方爆灯投票，进度条实时同步倾向变化。",
    accentBg: "bg-[#ccff00]",
    cardTint: "bg-[#ccff00]/20",
  },
  {
    step: "05",
    title: "屏幕结算",
    summary: "倒计时结束后屏幕揭晓本轮胜出立场，沉淀该角色的专属互动记录。",
    accentBg: "bg-[#fb7185]",
    cardTint: "bg-[#fb7185]/15",
  },
] as const;

export function PopBoxProject() {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepPaused, setIsStepPaused] = useState(false);
  const [flowBranch, setFlowBranch] = useState<"chat" | "debate">("debate");
  const [isFlowZoomed, setIsFlowZoomed] = useState(false);

  useEffect(() => {
    if (isStepPaused) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % INTERACTION_STEPS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [isStepPaused]);

  useEffect(() => {
    if (!isFlowZoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFlowZoomed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFlowZoomed]);

  const hasFlowShot = Boolean(POPBOX_MEDIA.interactionFlowShot);
  const webShots = [
    { src: POPBOX_MEDIA.webProfileShot, title: "角色档案页", alt: "Web 端角色档案界面截图", rotate: "sm:rotate-[-0.8deg]" },
    { src: POPBOX_MEDIA.webNotesShot, title: "小纸条（留言墙）", alt: "Web 端激活齐妃角色时的小纸条留言墙界面截图", rotate: "sm:rotate-[-0.6deg]" },
    { src: POPBOX_MEDIA.webGalleryShot, title: "出行照片墙", alt: "Web 端激活齐妃角色时的出行照片墙界面截图", rotate: "sm:rotate-[0.6deg]" },
  ].filter((item) => Boolean(item.src));

  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-10 md:pt-14 selection:bg-[#ffe600] selection:text-[#161719] relative overflow-x-hidden flex flex-col">
      {/* Subtle Neo-Brutalist Halftone Dot Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.35] z-0"
        style={{
          backgroundImage: "radial-gradient(#161719 0.75px, transparent 0.75px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="max-w-6xl w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 pb-16 sm:pb-20">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-5 border-b-2 border-[#161719]">
          <Link
            to="/#work-popbox"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#161719] shadow-[3px_3px_0px_#161719] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#161719] hover:bg-[#ffe600] text-xs font-bold text-[#161719] transition-all"
          >
            <ArrowLeft size={14} /> 返回作品列表
          </Link>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-1 bg-[#161719] text-[#ccff00] rounded-sm font-mono">
              档案 01
            </span>
            <span className="px-2.5 py-1 bg-[#ffe600] border-2 border-[#161719] rounded-sm">
              实体交互 + AI
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            1. HERO: PopBox · 让潮玩，不止于观赏。
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20">
          {/* Top Editorial Title Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <span className="px-3 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[10px] sm:text-[11px] font-bold tracking-wide rotate-[-1.5deg] max-w-full">
                  玩具的平行宇宙
                </span>
                <span className="px-2.5 py-1 bg-[#c084fc] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[10px] sm:text-[11px] font-bold text-[#161719] rotate-[1deg]">
                  实体交互 + AI
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-editorial-cn font-black tracking-tight text-[#161719] leading-[1.12] break-words">
                PopBox
                <span className="block text-2xl sm:text-4xl font-bold mt-2 text-[#161719]">
                  让潮玩，不止于观赏。
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#3a3d45] max-w-2xl leading-relaxed">
                把摆在桌角的潮玩请上实体互动舞台。通过物理互动装置、M5Stack CoreS3 语音交互与轻量网页端记录，让静态摆件拥有开口回应与陪伴的可能。
              </p>
            </div>

            <div className="lg:col-span-4 border-l-2 border-[#161719] pl-5 space-y-2.5 text-xs">
              <div>
                <span className="text-[#5e626b] text-[11px] block">时间</span>
                <span className="font-bold">2026.03—2026.06</span>
              </div>
              <div>
                <span className="text-[#5e626b] text-[11px] block">个人工作</span>
                <span className="font-semibold">产品交互 · Web 前端 · CoreS3 单角色语音 API</span>
              </div>
              <div>
                <span className="text-[#5e626b] text-[11px] block">原型形态</span>
                <span className="font-semibold">实体舞台装置 + M5Stack CoreS3 + 网页端</span>
              </div>
            </div>
          </div>

          {/* Hybrid Hero Visual Stage: Rich Textured Backdrop + Left Concept Theater + Right Small Physical Prototype */}
          <div className="relative rounded-3xl border-2 border-[#161719] bg-[#f3ecd8]/80 shadow-[8px_8px_0px_#161719] p-4 sm:p-6 lg:p-7 overflow-hidden">
            {/* Layered Architectural Grid + Warm Accent Texture (eliminates blank white feel) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(22,23,25,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,23,25,0.07) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none opacity-40"
              style={{
                background: "radial-gradient(circle, #ffe600 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full pointer-events-none opacity-30"
              style={{
                background: "radial-gradient(circle, #67e8f9 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              {/* LEFT (8/12): Atmospheric AI Stage Concept Render */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl border-2 border-[#161719] bg-[#161719] text-white shadow-[6px_6px_0px_#ffe600] p-3 sm:p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 bg-[#c084fc] text-[#161719] text-[10px] font-bold rounded-sm">
                      剧场概念舞台
                    </span>
                    <span className="text-[10px] text-white/75">
                      AI 概念效果图
                    </span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/20 bg-black">
                    <img
                      src={POPBOX_MEDIA.conceptStageRender}
                      alt="PopBox AI 舞台概念效果图"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT (4/12): Compact Small Physical Prototype Artifact Card + Stickers */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-4 relative">
                {/* Small Tilted Artifact Card */}
                <div className="relative w-full max-w-[260px] rounded-2xl border-2 border-[#161719] bg-[#fffdf5] shadow-[6px_6px_0px_#161719] p-3 pt-5 transform lg:rotate-[2deg] hover:rotate-0 transition-transform duration-300">
                  {/* Top Washi Tape Label */}
                  <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[#67e8f9] border-2 border-[#161719] shadow-[2px_2px_0px_#161719] text-[10px] font-bold rotate-[-2deg]">
                    实物原型
                  </div>

                  {/* Textured Warm Studio Mat Behind Transparent Cutout */}
                  <div
                    className="rounded-xl border border-[#161719]/25 p-2.5 relative overflow-hidden"
                    style={{
                      backgroundColor: "#f6eed8",
                      backgroundImage:
                        "radial-gradient(rgba(22,23,25,0.16) 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  >
                    <img
                      src={POPBOX_MEDIA.physicalPrototype}
                      alt="PopBox 真实实体装置原型（Physical Prototype）"
                      className="w-full max-h-[120px] sm:max-h-[135px] object-contain mx-auto relative z-10"
                    />
                  </div>

                  {/* Compact Meta Below Small Prototype */}
                  <div className="mt-2.5 pt-2 border-t border-dashed border-[#161719]/25 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-[#ffe600] border border-[#161719] text-[10px] font-bold">
                        齐妃 · P1
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#c084fc] border border-[#161719] text-[10px] font-bold">
                        库里 · P2
                      </span>
                    </div>
                    <p className="text-[11px] text-[#44474f] leading-snug">
                      实体舞台原型实拍（含 M5Stack CoreS3 与实体按键）
                    </p>
                  </div>
                </div>

                {/* Circular Neo-Brutalist Seal below small prototype */}
                <div className="hidden sm:flex items-center gap-3 lg:pr-2">
                  <div className="w-20 h-20 rounded-full bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] flex items-center justify-center text-center p-2 text-[9px] font-sans font-black tracking-tight leading-[1.3] rotate-[8deg] overflow-hidden">
                    <span>
                      玩具的
                      <br />
                      平行宇宙
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. THE HOOK: 除了落灰，还能干嘛？
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black">
                01 · THE HOOK
              </div>
              <h2 className="text-3xl sm:text-5xl font-editorial-cn font-black text-[#161719] leading-tight">
                除了落灰，还能干嘛？
              </h2>
              <p className="text-sm sm:text-base text-[#3a3d45] leading-relaxed max-w-2xl">
                盲盒拆开的那一瞬间很有仪式感，但几天之后，大多数角色只能安静地待在书架和展示盒里——我们喜欢它们的造型与性格，却很难和它们产生真正属于今天的互动。
              </p>
              <p className="text-sm sm:text-base text-[#161719] font-medium leading-relaxed max-w-2xl">
                于是我们试着把潮玩从“静态收藏品”变成一个小型桌面交互舞台：当你遇到纠结的小问题，或者只是想找个角色说说话时，它们就在手边。
              </p>
            </div>

            {/* Playful Callout Speech Bubbles */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:pt-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#ffe600] rotate-[-1deg]">
                <div className="text-[11px] font-bold text-[#5e626b] mb-1">
                  每日困惑
                </div>
                <div className="text-sm font-bold text-[#161719]">
                  “人生是旷野还是轨道？该不该回家乡发展？”
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#c084fc]/25 border-2 border-[#161719] shadow-[5px_5px_0px_#161719] rotate-[1deg] sm:ml-6">
                <div className="text-[11px] font-bold text-[#161719] mb-1">
                  玩法回应
                </div>
                <div className="text-sm font-bold text-[#161719]">
                  “没有标准答案，只有不同立场——让喜欢的角色替你打开新角度！”
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            3. THE EXPERIENCE: Physical / Web / Voice + 玩法指引海报
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-[#67e8f9] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black mb-3">
                02 · THE EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial-cn font-black text-[#161719]">
                Physical / Web / Voice
              </h2>
            </div>
            <span className="text-xs font-mono text-[#5e626b]">
              三个维度的互动拼接成完整体验
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 6 cols: Three Experience Layers + Play Steps */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#ffe600]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#ffe600] border-2 border-[#161719] flex items-center justify-center shrink-0">
                    <Sparkles size={16} />
                  </span>
                  <h3 className="text-lg font-editorial-cn font-black">
                    Physical · 实体舞台与物理按键
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                  实体手办站上主题舞台，配合 M5Stack CoreS3 与实体按键完成桌面交互。在辩论模式下，用户可以按下实体按键为喜欢的角色「爆灯」支持，让原本留在手机里的对话拥有桌面手感。
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#67e8f9]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#67e8f9] border-2 border-[#161719] flex items-center justify-center shrink-0">
                    <Globe size={16} />
                  </span>
                  <h3 className="text-lg font-editorial-cn font-black">
                    Web · 轻量化网页互动记录
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                  与实体装置配套的 Web 端页面，承担角色设定呈现与日常互动碎片沉淀：包含留言墙（小纸条）、照片墙与静态小故事页面，把一次对话延伸到桌面以外的浏览空间。
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#c084fc]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#c084fc] border-2 border-[#161719] flex items-center justify-center shrink-0">
                    <Volume2 size={16} />
                  </span>
                  <h3 className="text-lg font-editorial-cn font-black">
                    Voice · 贴合人设的语音对话
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                  结合角色人设与预设玩法流程（如单角色日常对话与双角色辩论舞台），通过 CoreS3 进行语音交互输入与播报，让每个角色按照自己的性格和口吻表达观点。
                </p>
              </div>

              {/* 4-step Play Guide Breakdown */}
              <div className="pt-4 border-t-2 border-dashed border-[#161719]/25">
                <div className="text-xs font-bold text-[#161719] mb-3">
                  辩论舞台四步流程
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#ffe600]/30 border border-[#161719]">
                    <span className="font-mono font-black block">01. 想一个问题</span>
                    <span className="text-[#44474f] text-[11px]">选择、困惑或无解话题</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#67e8f9]/30 border border-[#161719]">
                    <span className="font-mono font-black block">02. 思想碰撞</span>
                    <span className="text-[#44474f] text-[11px]">听见不同角色的鲜活立场</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#c084fc]/30 border border-[#161719]">
                    <span className="font-mono font-black block">03. 爆灯支持</span>
                    <span className="text-[#44474f] text-[11px]">为有共鸣的发言按下按钮</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#161719]">
                    <span className="font-mono font-black block">04. 打开新角度</span>
                    <span className="text-[#44474f] text-[11px]">1–3 分钟轻量思辨体验</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: PopBox Play Guide Poster */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border-2 border-[#161719] bg-white p-3 sm:p-4 shadow-[8px_8px_0px_#161719] relative">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-[#161719] text-[#ccff00] text-[10px] font-bold rounded-sm">
                    玩法指引
                  </span>
                  <span className="text-[11px] font-semibold text-[#5e626b]">
                    PopBox 玩法指引海报
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-[#161719] bg-[#161719]">
                  <img
                    src={POPBOX_MEDIA.playGuidePoster}
                    alt="PopBox 玩法指引海报"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            4. MY ROLE: Product & Interaction / Web Development / Hardware & Voice AI
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#c084fc] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black mb-3">
              03 · MY ROLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-editorial-cn font-black text-[#161719] leading-snug break-words">
              产品交互 / Web 前端 / 硬件与语音
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#161719] space-y-2.5">
              <div className="text-xs font-mono font-black px-2 py-0.5 bg-[#ffe600] border border-[#161719] inline-block">
                01 · PRODUCT & INTERACTION
              </div>
              <h3 className="text-base font-editorial-cn font-black">
                产品定位与整体交互方案
              </h3>
              <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                参与 PopBox 的产品定位、功能取舍讨论与整体交互流程设计，梳理实体舞台互动、CoreS3 屏幕提示与 Web 端体验之间的衔接。
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#161719] space-y-2.5">
              <div className="text-xs font-mono font-black px-2 py-0.5 bg-[#67e8f9] border border-[#161719] inline-block">
                02 · WEB DEVELOPMENT
              </div>
              <h3 className="text-base font-editorial-cn font-black">
                Web 前端独立实现
              </h3>
              <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                完成网页端前端开发工作，搭建了<strong className="text-[#161719] font-semibold">留言墙</strong>、<strong className="text-[#161719] font-semibold">照片墙</strong>以及<strong className="text-[#161719] font-semibold">静态小故事</strong>等核心展示与互动页面。
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#161719] space-y-2.5">
              <div className="text-xs font-mono font-black px-2 py-0.5 bg-[#c084fc] border border-[#161719] inline-block">
                03 · HARDWARE & VOICE AI
              </div>
              <h3 className="text-base font-editorial-cn font-black">
                CoreS3 单角色语音 API
              </h3>
              <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                完成 M5Stack CoreS3 硬件端<strong className="text-[#161719] font-semibold">单角色语音对话的基础 API 调用</strong>与单点联调跑通。
              </p>
            </div>
          </div>

          {/* Concise Collaboration & Scope Note */}
          <div className="p-5 rounded-2xl bg-[#ffe600]/25 border-2 border-[#161719] flex items-start gap-3 text-xs sm:text-sm text-[#161719]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">协作分工与内容脉络：</strong>
              双角色语音对话功能由另一位团队成员完成；下文「Beyond the Toy」部分围绕共同成长记忆、IP 碰碰车与 PopBox Daily 展开平行世界玩法设想。
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            5. FROM CONCEPT TO PROTOTYPE: 宣传视频、硬件交互演示（缺省占位自动隐藏）
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 sm:mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-[#161719] text-[#ccff00] border-2 border-[#161719] shadow-[3px_3px_0px_#ccff00] text-xs font-mono font-black mb-3">
                04 · FROM CONCEPT TO PROTOTYPE
              </span>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-black text-[#161719]">
                原型成果与演示记录
              </h2>
            </div>
            <span className="text-xs text-[#5e626b]">
              概念宣传片、实体交互录像与 Web 端界面
            </span>
          </div>

          {/* 5A. Product Concept Promo Video */}
          {POPBOX_MEDIA.promoVideoUrl && (
            <div className="mb-8 sm:mb-10">
              <div className="rounded-3xl border-2 border-[#161719] bg-[#161719] text-white p-4 sm:p-7 shadow-[8px_8px_0px_#ffe600]">
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ffe600] text-[#161719] text-[10px] font-bold rounded-sm">
                      <Film size={12} /> 概念宣传片
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      产品概念宣传片 · 让潮玩成为会陪伴、会辩论的 AI 角色剧场
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-white/10 border border-white/20 text-[10px] font-mono text-stone-300 rounded-sm">
                    AI 概念演绎
                  </span>
                </div>

                <video
                  src={POPBOX_MEDIA.promoVideoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video rounded-2xl border border-white/20 bg-black"
                />

                <p className="mt-3.5 text-xs text-stone-300 leading-relaxed">
                  以深夜日常抉择情境切入，呈现“把盲盒请上灯光舞台、让不同角色各自表达观点”的理想产品愿景。
                </p>
              </div>
            </div>
          )}

          {/* 5B. Unified Interaction Process: Stacked Video + Flow Diagram (Left) & Animated Visual Steps (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
            {/* Left 7 cols: Video + Interaction Flowchart stacked vertically */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {POPBOX_MEDIA.coreS3InteractionVideoUrl && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[6px_6px_0px_#161719]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold">
                      <Cpu size={15} /> 实体装置与 M5Stack CoreS3 交互演示
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#ccff00] border border-[#161719] text-[10px] font-mono font-bold">
                      实拍交互录像
                    </span>
                  </div>
                  <video
                    src={POPBOX_MEDIA.coreS3InteractionVideoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video rounded-xl border-2 border-[#161719] bg-black"
                  />
                </div>
              )}

              {hasFlowShot && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[6px_6px_0px_#161719] flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold">
                      <GitBranch size={15} /> 交互流程图
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFlowZoomed(true)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f8f6f0] hover:bg-[#ffe600] border border-[#161719] text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        <Maximize2 size={11} />
                        <span>查看大图</span>
                      </button>
                      <span className="px-2.5 py-0.5 bg-[#67e8f9] border border-[#161719] text-[10px] font-bold">
                        交互流程
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => setIsFlowZoomed(true)}
                    className="rounded-xl overflow-hidden border-2 border-[#161719] bg-[#fff8e8] cursor-zoom-in group"
                  >
                    <img
                      src={POPBOX_MEDIA.interactionFlowShot}
                      alt="PopBox 交互流程图"
                      loading="lazy"
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 cols: Interactive Visual Steps Pipeline */}
            <aside
              onMouseEnter={() => setIsStepPaused(true)}
              onMouseLeave={() => setIsStepPaused(false)}
              className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#161719] shadow-[6px_6px_0px_#161719] flex flex-col justify-between gap-5"
            >
              <div>
                {/* Panel Header */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b-2 border-dashed border-[#161719]/20">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ffe600] border border-[#161719] text-[10px] font-bold mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#161719] animate-ping" />
                      <span>步骤演示</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-editorial-cn font-black text-[#161719]">
                      五步串联实拍与交互流程
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#161719] text-[#ccff00] font-mono text-xs font-black tabular-nums shrink-0">
                    {String(activeStep + 1).padStart(2, "0")} / 05
                  </span>
                </div>

                {/* Vertical Connected Step Timeline */}
                <div className="relative space-y-3">
                  {/* Connector Track Line */}
                  <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-[#161719]/15 pointer-events-none">
                    <div
                      className="w-full bg-[#161719] transition-all duration-500 ease-out"
                      style={{
                        height: `${(activeStep / (INTERACTION_STEPS.length - 1)) * 100}%`,
                      }}
                    />
                  </div>

                  {INTERACTION_STEPS.map((item, idx) => {
                    const isActive = idx === activeStep;
                    const isPassed = idx < activeStep;
                    const StepIcon =
                      idx === 0
                        ? ScanFace
                        : idx === 1
                        ? GitBranch
                        : idx === 2
                        ? Mic
                        : idx === 3
                        ? Zap
                        : Trophy;

                    return (
                      <div
                        key={item.step}
                        onClick={() => {
                          setActiveStep(idx);
                          setIsStepPaused(true);
                        }}
                        onMouseEnter={() => {
                          setActiveStep(idx);
                          setIsStepPaused(true);
                        }}
                        className="relative flex items-start gap-3.5 cursor-pointer group"
                      >
                        {/* Step Node Badge on Rail */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-xl border-2 border-[#161719] flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? `${item.accentBg} shadow-[3px_3px_0px_#161719] scale-105 -rotate-3`
                              : isPassed
                              ? "bg-[#161719] text-[#ccff00]"
                              : "bg-white text-[#161719] group-hover:bg-[#f8f6f0]"
                          }`}
                        >
                          <StepIcon size={17} />
                        </div>

                        {/* Step Visual Card */}
                        <div
                          className={`flex-1 min-w-0 p-3 rounded-xl border-2 transition-all duration-300 ${
                            isActive
                              ? `border-[#161719] ${item.cardTint} shadow-[4px_4px_0px_#161719] translate-x-1`
                              : "border-[#161719]/15 bg-[#f8f6f0]/65 hover:border-[#161719]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-[#161719] text-white tabular-nums">
                                步骤 {item.step}
                              </span>
                              <span className="text-xs sm:text-sm font-editorial-cn font-black text-[#161719] truncate">
                                {item.title}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-xs text-[#44474f] leading-relaxed">
                            {item.summary}
                          </p>

                          {/* Per-Step Custom Visual Micro-Widgets */}
                          {idx === 0 && (
                            <div className="mt-2 pt-2 border-t border-dashed border-[#161719]/15 flex items-center justify-between gap-2 text-[10px] font-mono">
                              <div className="flex items-center gap-1.5">
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#161719] font-bold transition-colors ${isActive ? "bg-[#ffe600]" : "bg-white"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full bg-[#16a34a] ${isActive ? "animate-pulse" : ""}`} />
                                  P1 齐妃
                                </span>
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-[#161719] font-bold transition-colors ${isActive ? "bg-[#c084fc]" : "bg-white"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full bg-[#0284c7] ${isActive ? "animate-pulse" : ""}`} />
                                  P2 库里
                                </span>
                              </div>
                              <span className="text-[#5e626b] font-sans">人设加载</span>
                            </div>
                          )}

                          {idx === 1 && (
                            <div className="mt-2 pt-2 border-t border-dashed border-[#161719]/15 flex flex-wrap items-center gap-1.5 text-[10px]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveStep(1);
                                  setIsStepPaused(true);
                                  setFlowBranch("chat");
                                }}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#161719] font-bold transition-all cursor-pointer ${
                                  flowBranch === "chat"
                                    ? "bg-[#67e8f9] text-[#161719] shadow-[2px_2px_0px_#161719]"
                                    : "bg-white text-[#5e626b]"
                                }`}
                              >
                                <MessageCircle size={10} />
                                <span>群聊互动 · 自由交流</span>
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveStep(1);
                                  setIsStepPaused(true);
                                  setFlowBranch("debate");
                                }}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#161719] font-bold transition-all cursor-pointer ${
                                  flowBranch === "debate"
                                    ? "bg-[#ffe600] text-[#161719] shadow-[2px_2px_0px_#161719]"
                                    : "bg-white text-[#5e626b]"
                                }`}
                              >
                                <Zap size={10} />
                                <span>限时辩论 · 设定主题</span>
                              </button>
                              <div className="w-full text-[10px] text-[#5e626b] pt-0.5">
                                {flowBranch === "chat"
                                  ? "→ 随时开口闲聊，由角色各自性格接话互动"
                                  : "→ 设定辩题并倒计时，双方轮流输出观点、按键拉票"}
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            <div className="mt-2 pt-2 border-t border-dashed border-[#161719]/15 flex items-center justify-between gap-2">
                              <div className="flex items-end gap-1 h-4 px-1.5 py-0.5 rounded bg-[#161719]">
                                {[0.5, 0.9, 0.65, 1, 0.45].map((h, barIdx) => (
                                  <span
                                    key={barIdx}
                                    className="w-1 rounded-full bg-[#c084fc] origin-bottom"
                                    style={{
                                      height: `${Math.round(h * 11)}px`,
                                      animation: isActive
                                        ? `popbox-eq 0.75s ease-in-out ${barIdx * 0.12}s infinite`
                                        : "none",
                                    }}
                                  />
                                ))}
                              </div>
                              <span className="text-[10px] text-[#5e626b]">
                                语音输入 → 多轮角色回应
                              </span>
                            </div>
                          )}

                          {idx === 3 && (
                            <div className="mt-2 pt-2 border-t border-dashed border-[#161719]/15 space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-bold text-[#161719]">
                                <span>P1 齐妃支持率</span>
                                <span>P2 库里支持率</span>
                              </div>
                              <div className="h-2.5 w-full rounded-full border border-[#161719] bg-white overflow-hidden flex">
                                <div
                                  className="h-full bg-[#ffe600] transition-all duration-700 ease-out"
                                  style={{ width: isActive ? "62%" : "50%" }}
                                />
                                <div
                                  className="h-full bg-[#67e8f9] transition-all duration-700 ease-out"
                                  style={{ width: isActive ? "38%" : "50%" }}
                                />
                              </div>
                            </div>
                          )}

                          {idx === 4 && (
                            <div className="mt-2 pt-2 border-t border-dashed border-[#161719]/15 flex items-center justify-between gap-2 text-[10px]">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#161719] font-bold transition-colors ${isActive ? "bg-[#ffe600]" : "bg-white"}`}>
                                <Sparkles size={10} />
                                <span>胜出立场结算</span>
                              </span>
                              <span className="text-[#5e626b] font-sans">双路径结算输出</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scope & Credit Note */}
              <div className="p-3.5 rounded-xl bg-[#f8f6f0] border-2 border-dashed border-[#161719]/25 text-[11px] text-[#44474f] leading-relaxed">
                <strong className="text-[#161719] font-bold">模块分工：</strong>
                本人负责整体交互方案、Web 前端与 CoreS3 单角色语音基础 API 调用；双角色语音对话由队友完成。
              </div>
            </aside>
          </div>

          {/* 5C. Real Web Interface Screenshots (Character-specific views when activated) */}
          {webShots.length > 0 && (
            <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#161719] shadow-[6px_6px_0px_#161719]">
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#c084fc] border border-[#161719]">
                    网页端 · 激活角色示例
                  </span>
                  <span className="text-sm sm:text-base font-editorial-cn font-bold text-[#161719]">
                    Web 端界面截图（激活「齐妃」角色时 · 本人完成前端开发）
                  </span>
                </div>
                <p className="text-xs text-[#44474f] leading-relaxed">
                  每个角色被激活时，Web 端都会切换展示该角色对应的专属互动内容、口吻与记忆片段。以下为激活「齐妃」时的「小纸条（留言墙）」与「出行照片墙」页面实录：
                </p>
              </div>

              <div
                className={
                  webShots.length === 1
                    ? "grid grid-cols-1 max-w-2xl"
                    : webShots.length === 2
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                    : "grid grid-cols-1 sm:grid-cols-3 gap-5"
                }
              >
                {webShots.map((shot, idx) => (
                  <div
                    key={shot.title}
                    className={`p-3 rounded-2xl bg-[#f8f6f0] border-2 border-[#161719] shadow-[4px_4px_0px_#161719] ${shot.rotate}`}
                  >
                    <div className="rounded-lg overflow-hidden border border-[#161719] bg-white mb-2.5">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{`${String(idx + 1).padStart(2, "0")} · ${shot.title}`}</span>
                      <span className="text-[10px] text-[#5e626b]">网页界面 · 齐妃视角</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ═════════════════════════════════════════════════════════════
            6. BEYOND THE TOY: 共同成长记忆、IP 碰碰车、A Parallel Universe for Toys
               + PopBox Daily 正反面（紧凑双列一排）
           ═════════════════════════════════════════════════════════════ */}
        <section className="pt-10 border-t-2 border-[#161719]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black">
              05 · BEYOND THE TOY
            </span>
            <span className="px-3 py-1 bg-[#161719] text-[#ffe600] text-xs font-bold rounded-sm">
              玩法设想
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-editorial-cn font-black text-[#161719] mb-4">
            玩具的平行宇宙
          </h2>
          <p className="text-sm sm:text-base text-[#3a3d45] max-w-3xl leading-relaxed mb-8">
            在完成舞台原型之外，我们还推演了一个更远的设想：<strong className="text-[#161719]">如果潮玩角色在不被唤醒的时候，也拥有自己的日常，它们会寄来怎样的一份日报？</strong>
          </p>

          {/* 3 Speculative Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#ffe600]">
              <span className="text-[10px] font-bold text-[#5e626b] block mb-1">
                设想 01
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                共同成长记忆
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想角色能够随互动积累共同经历与个人化记忆节点，让玩具与用户之间逐渐沉淀出专属故事线索。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#c084fc]">
              <span className="text-[10px] font-bold text-[#5e626b] block mb-1">
                设想 02
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                IP 碰碰车
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想打破单一 IP 边界，让来自不同时代与世界观的角色（如齐妃、杜尚、Zsiga）在同一场景中相遇、争论与串门。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#67e8f9]">
              <span className="text-[10px] font-bold text-[#5e626b] block mb-1">
                设想 03
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                PopBox Daily 平行日报
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想角色各自出游后，将跨 IP 互动、故事记录与今日记忆物排版成一份专属报纸「PopBox Daily」寄回给收藏者。
              </p>
            </div>
          </div>

          {/* PopBox Daily Front & Back AI Concept Spread (Semi-transparent Frosted Backdrop) */}
          <div className="relative p-4 sm:p-6 rounded-3xl bg-[#161719]/85 backdrop-blur-md text-white border-2 border-[#161719] shadow-[8px_8px_0px_#c084fc] overflow-hidden">
            {/* Subtle Atmospheric Translucent Glows */}
            <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-[#c084fc]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-12 w-56 h-56 rounded-full bg-[#ffe600]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-5 border-b border-white/15">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#ccff00] text-[#161719] text-[10px] font-bold rounded-sm">
                  概念玩法
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  PopBox Daily 正反面概念报纸
                </span>
              </div>
              <span className="text-[11px] text-stone-300">
                AI 概念示意图
              </span>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto grid grid-cols-2 gap-3 sm:gap-6 items-start">
              {/* Front Page */}
              <div className="space-y-2.5 p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/15">
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span className="px-2 py-0.5 bg-[#ffe600] text-[#161719] font-bold rounded-sm">
                    正面
                  </span>
                </div>
                <div className="w-fit mx-auto rounded-lg overflow-hidden border border-white/25 bg-white/10">
                  <img
                    src={POPBOX_MEDIA.dailyFront}
                    alt="PopBox Daily 正面玩法概念图"
                    loading="lazy"
                    className="w-auto max-h-[240px] sm:max-h-[340px] object-contain mx-auto block"
                  />
                </div>
                <p className="text-[11px] text-stone-200 leading-relaxed">
                  正面示意：齐妃、杜尚与 Zsiga 闯入白色展厅围绕《泉》展开争论，以头版形式呈现跨 IP 出游事件。
                </p>
              </div>

              {/* Back Page */}
              <div className="space-y-2.5 p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/15">
                <div className="flex items-center justify-between gap-1 text-[10px]">
                  <span className="px-2 py-0.5 bg-[#67e8f9] text-[#161719] font-bold rounded-sm">
                    反面
                  </span>
                </div>
                <div className="w-fit mx-auto rounded-lg overflow-hidden border border-white/25 bg-white/10">
                  <img
                    src={POPBOX_MEDIA.dailyBack}
                    alt="PopBox Daily 反面故事续页概念图"
                    loading="lazy"
                    className="w-auto max-h-[240px] sm:max-h-[340px] object-contain mx-auto block"
                  />
                </div>
                <p className="text-[11px] text-stone-200 leading-relaxed">
                  反面示意：记录对话续篇、今日记忆物与角色互评短评，探讨“玩具平行日常”的叙事呈现方式。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          7. POPBOX FOOTER: Inspired by PopBoxProductWeb "The Attitude"
             Bright Yellow + Halftone Dots + Hard Black Border + Tilted Stickers
         ═════════════════════════════════════════════════════════════ */}
      <footer className="w-full mt-auto bg-[#ffe600] border-t-[6px] border-[#161719] relative z-10 overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-14 px-5 sm:px-8 lg:px-12">
        {/* Polka-Dot Halftone Background Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.14]"
          style={{
            backgroundImage: "radial-gradient(#161719 2.5px, transparent 2.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Tilted Dark Pill Tag */}
          <div className="inline-block px-5 py-1.5 bg-[#161719] text-[#ffe600] font-bold tracking-widest rounded-full border-[3px] border-[#161719] shadow-[4px_4px_0px_#ffffff] mb-8 -rotate-2 text-xs sm:text-sm">
            PopBox · 尾声
          </div>

          {/* Main Chinese Finale Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial-cn font-black tracking-tight text-[#161719] leading-[1.15] mb-8">
            我们的故事才刚刚开始...
          </h2>

          {/* Editorial Body Card + Tilted Brand Sticker */}
          <div className="relative w-full max-w-2xl mb-10 sm:mb-12">
            <div className="bg-white px-6 py-7 sm:px-10 sm:py-9 border-[4px] border-[#161719] shadow-[10px_10px_0px_#161719] rounded-[2rem] sm:rotate-[0.8deg]">
              <p className="text-base sm:text-xl text-[#161719] font-bold leading-relaxed">
                从桌面上的一场辩论，到想象中的角色日报，PopBox 记录了我们对潮玩互动的一次探索。
              </p>
            </div>

            <div className="inline-block sm:absolute sm:-bottom-4 sm:right-6 mt-5 sm:mt-0 px-3.5 py-1 bg-[#c084fc] text-[#161719] border-[2.5px] border-[#161719] shadow-[4px_4px_0px_#161719] font-bold text-[10px] sm:text-[11px] tracking-wider -rotate-2">
              玩具的平行宇宙
            </div>
          </div>

          {/* Single Action Button Returning to Homepage Selected Work */}
          <div className="mb-12 sm:mb-14">
            <Link
              to="/#work-popbox"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 rounded-full bg-[#161719] text-white hover:bg-white hover:text-[#161719] font-black text-base sm:text-lg border-[3px] border-[#161719] shadow-[6px_6px_0px_#06b6d4] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_#06b6d4] transition-all active:scale-95"
            >
              <span>← 返回作品列表</span>
            </Link>
          </div>

          {/* Bottom Metadata Line */}
          <div className="w-full pt-6 border-t-2 border-[#161719]/25 text-center text-xs font-mono font-bold tracking-wider text-[#161719]">
            POPBOX · 2026
          </div>
        </div>
      </footer>

      {/* Lightbox Modal for Interaction Flowchart */}
      {isFlowZoomed && (
        <div
          className="fixed inset-0 z-50 bg-[#161719]/90 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="PopBox 交互流程图大图预览"
          onClick={() => setIsFlowZoomed(false)}
        >
          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 bg-[#67e8f9] text-[#161719] border border-[#161719] text-[10px] font-bold rounded-sm">
                交互流程图
              </span>
              <span className="text-sm sm:text-base font-bold">PopBox 双路径交互流程图</span>
            </div>
            <button
              type="button"
              onClick={() => setIsFlowZoomed(false)}
              aria-label="关闭大图预览"
              className="w-10 h-10 rounded-full bg-white text-[#161719] border-2 border-[#161719] shadow-[3px_3px_0px_#ffe600] hover:bg-[#ffe600] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="max-w-6xl w-full mx-auto flex-1 min-h-0 flex items-center justify-center my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-full max-w-full rounded-2xl overflow-hidden border-[3px] border-[#161719] bg-[#fff8e8] shadow-[10px_10px_0px_#ffe600]">
              <img
                src={POPBOX_MEDIA.interactionFlowShot}
                alt="PopBox 交互流程图"
                className="max-h-[80vh] w-auto object-contain block"
              />
            </div>
          </div>

          <div className="h-2" />
        </div>
      )}
    </div>
  );
}
