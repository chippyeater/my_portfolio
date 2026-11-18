import { useEffect } from "react";
import { ArrowLeft, Play, Image as ImageIcon, GitBranch, MessageSquare, Sparkles, Cpu, Globe, Volume2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * PopBox 素材路径集中配置（便于后续替换或补充新素材）
 * 已放置素材位于：/public/assets/aistudio/
 * 建议后续新增实拍图、网页截图或视频可放入：/public/assets/popbox/
 */
const POPBOX_MEDIA = {
  // 已提供的正式素材
  logo: "/assets/aistudio/logo_59336cfa.png",
  physicalPrototype: "/assets/aistudio/popbox____b906b97a.png", // 真实实体原型透明背景照
  conceptStageRender: "/assets/aistudio/AI______2e63cf52.jpg", // AI 舞台概念效果图（Concept Render）
  playGuidePoster: "/assets/aistudio/_______36ae5e3d.png", // PopBox 玩法指引海报
  dailyFront: "/assets/aistudio/__1_670abe8a.png", // PopBox Daily 正面（AI 概念示意）
  dailyBack: "/assets/aistudio/__2_b826fb1b.png", // PopBox Daily 反面（AI 概念示意）

  // 预留待补充素材位（替换为实际文件 URL 即可自动展示，如 "/assets/popbox/demo.mp4"）
  demoVideoUrl: "" as string,
  coreS3VoiceShot: "" as string,
  interactionFlowShot: "" as string,
  webProfileShot: "" as string,
  webNotesShot: "" as string,
  webGalleryShot: "" as string,
};

export function PopBoxProject() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-10 md:pt-14 pb-24 selection:bg-[#ffe600] selection:text-[#161719] relative overflow-x-hidden">
      {/* Subtle Neo-Brutalist Halftone Dot Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.35] z-0"
        style={{
          backgroundImage: "radial-gradient(#161719 0.75px, transparent 0.75px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-5 border-b-2 border-[#161719]">
          <Link
            to="/#works"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#161719] shadow-[3px_3px_0px_#161719] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#161719] hover:bg-[#ffe600] text-xs font-bold text-[#161719] transition-all"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono font-bold">
            <span className="px-2.5 py-1 bg-[#161719] text-[#ccff00] rounded-sm">
              ARCHIVE 01
            </span>
            <span className="px-2.5 py-1 bg-[#ffe600] border-2 border-[#161719] rounded-sm">
              PHYSICAL + AI
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            1. HERO: PopBox · 让潮玩不止于观赏 · 混合式主视觉
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20">
          {/* Top Editorial Title Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 space-y-5">
              {/* Brand Logo + Playful Tag Stickers */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border-2 border-[#161719] shadow-[3px_3px_0px_#161719] px-3 py-1.5 rounded-xl inline-flex items-center">
                  <img
                    src={POPBOX_MEDIA.logo}
                    alt="PopBox Logo"
                    className="h-7 sm:h-8 w-auto object-contain"
                  />
                </div>
                <span className="px-3 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[11px] font-mono font-black tracking-wide rotate-[-1.5deg]">
                  A PARALLEL UNIVERSE FOR TOYS
                </span>
                <span className="px-2.5 py-1 bg-[#c084fc] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[11px] font-mono font-bold text-[#161719] rotate-[1deg]">
                  PHYSICAL + AI
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-editorial-cn font-black tracking-tight text-[#161719] leading-[1.1]">
                PopBox
                <span className="block text-2xl sm:text-4xl font-bold mt-2 text-[#161719]">
                  让潮玩不止于观赏
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#3a3d45] max-w-2xl leading-relaxed">
                把摆在桌角的潮玩请上带有按键与小屏幕的实体舞台。通过物理互动装置、M5Stack CoreS3 语音交互与轻量网页端记录，让静态摆件拥有开口回应与陪伴的可能。
              </p>
            </div>

            {/* Compact Editorial Metadata Strip (not heavy cards) */}
            <div className="lg:col-span-4 border-l-2 border-[#161719] pl-5 space-y-2.5 text-xs">
              <div>
                <span className="text-[#5e626b] font-mono text-[11px] block">YEAR · 时间</span>
                <span className="font-bold">2024</span>
              </div>
              <div>
                <span className="text-[#5e626b] font-mono text-[11px] block">MY SCOPE · 个人工作</span>
                <span className="font-semibold">产品交互 · Web 前端 · CoreS3 单角色语音 API</span>
              </div>
              <div>
                <span className="text-[#5e626b] font-mono text-[11px] block">PROTOTYPE · 形态</span>
                <span className="font-semibold">实体舞台装置 + M5Stack CoreS3 + 网页端</span>
              </div>
            </div>
          </div>

          {/* Hybrid Hero Visual Stage: Physical Prototype (65-75% Main Subject) + Juxtaposed Concept Render */}
          <div className="relative pt-4 pb-6">
            {/* Perimeter Decorative Stickers (Never covering physical prototype structure) */}
            <div className="hidden md:flex absolute -top-2 left-6 z-30 px-3 py-1 bg-[#67e8f9] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[11px] font-mono font-black rotate-[-2deg]">
              STAGE PROTOTYPE · 实拍原型主体
            </div>

            <div className="hidden lg:flex absolute -bottom-3 left-10 z-30 items-center gap-2">
              <span className="px-2.5 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[11px] font-bold rotate-[-1deg]">
                齐妃 · PLAYER 1
              </span>
              <span className="px-2.5 py-1 bg-[#c084fc] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-[11px] font-bold rotate-[2deg]">
                库里 · PLAYER 2
              </span>
            </div>

            {/* Circular Neo-Brutalist Stamp on Perimeter */}
            <div className="hidden sm:flex absolute -bottom-4 right-4 z-30 w-24 h-24 rounded-full bg-[#ffe600] border-2 border-[#161719] shadow-[4px_4px_0px_#161719] items-center justify-center text-center p-2 text-[9px] font-mono font-black leading-tight rotate-[10deg]">
              A PARALLEL
              <br />
              UNIVERSE
              <br />
              FOR TOYS
            </div>

            {/* Open Asymmetric Layout: ~70% Real Physical Prototype + ~30% Concept Render */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* MAIN SUBJECT (8/12 = ~67% width): Transparent Physical Prototype Photo, Unobstructed */}
              <div className="lg:col-span-8 relative">
                <div className="relative rounded-3xl border-2 border-[#161719] bg-white/95 shadow-[8px_8px_0px_#161719] p-4 sm:p-8 overflow-visible">
                  {/* Subtle studio floor gradient behind transparent cutout */}
                  <div
                    className="absolute inset-4 rounded-2xl pointer-events-none opacity-45"
                    style={{
                      backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
                      backgroundSize: "14px 14px",
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-center">
                    <img
                      src={POPBOX_MEDIA.physicalPrototype}
                      alt="PopBox 真实实体装置原型（Physical Prototype）"
                      className="w-full max-h-[460px] object-contain mx-auto"
                    />
                  </div>

                  {/* Unmistakable Label Below Image (zero obstruction of prototype) */}
                  <div className="relative z-10 mt-4 pt-3 border-t-2 border-dashed border-[#161719]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#161719] text-[#ccff00] font-mono font-bold rounded-sm">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                      PHYSICAL PROTOTYPE · 真实实体原型
                    </span>
                    <span className="text-[#44474f] text-[11px] font-medium">
                      实体舞台结构、M5Stack CoreS3 中控屏与实体角色按键底座（实物未做结构改动）
                    </span>
                  </div>
                </div>
              </div>

              {/* COMPANION VISUAL (4/12 = ~33% width): Juxtaposed AI Stage Concept Render */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="rounded-2xl border-2 border-[#161719] bg-[#161719] text-white shadow-[6px_6px_0px_#c084fc] p-3 transform lg:rotate-[1.5deg] hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 bg-[#c084fc] text-[#161719] text-[10px] font-mono font-black rounded-sm">
                      CONCEPT RENDER
                    </span>
                    <span className="text-[10px] font-mono text-white/70">
                      AI 概念效果图
                    </span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/20 bg-black">
                    <img
                      src={POPBOX_MEDIA.conceptStageRender}
                      alt="PopBox AI 舞台概念效果图（Concept Render）"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2.5 text-[11px] text-stone-300 leading-relaxed">
                    <strong className="text-[#ffe600]">概念视觉对比：</strong>
                    用于呈现 PopBox 理想中的剧场感产品氛围与灯光体验，与左侧实拍原型并置对照，非实体实拍。
                  </p>
                </div>

                {/* Small Playful Note Tag */}
                <div className="px-4 py-3 rounded-2xl bg-[#67e8f9]/30 border-2 border-[#161719] shadow-[4px_4px_0px_#161719] text-xs leading-relaxed">
                  <span className="font-mono font-bold block text-[10px] uppercase mb-1">
                    HYBRID ARCHIVE NOTE
                  </span>
                  用 AI 概念图表达「理想产品剧场」，用右侧/左侧独立实拍原型证明「真实落地成果」，两者明确区分。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            2. THE HOOK: 除了落灰，还能干嘛？
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 pt-10 border-t-2 border-[#161719]">
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

            {/* Playful Callout Speech Bubbles (loose, non-card-grid feel) */}
            <div className="lg:col-span-5 flex flex-col gap-4 lg:pt-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#ffe600] rotate-[-1deg]">
                <div className="text-[11px] font-mono font-bold text-[#5e626b] mb-1">
                  QUESTION 01 · 每日困惑
                </div>
                <div className="text-sm font-bold text-[#161719]">
                  “人生是旷野还是轨道？该不该回家乡发展？”
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#c084fc]/25 border-2 border-[#161719] shadow-[5px_5px_0px_#161719] rotate-[1deg] sm:ml-6">
                <div className="text-[11px] font-mono font-bold text-[#161719] mb-1">
                  POPBOX RESPONSE · 玩法回应
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
        <section className="mb-20 pt-10 border-t-2 border-[#161719]">
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
                  <span className="w-8 h-8 rounded-lg bg-[#ffe600] border-2 border-[#161719] flex items-center justify-center">
                    <Sparkles size={16} />
                  </span>
                  <h3 className="text-lg font-editorial-cn font-black">
                    Physical · 实体舞台与物理按键
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#44474f] leading-relaxed">
                  实体手办站在红白相间的舞台底座上，中间嵌入 M5Stack CoreS3 屏幕作为视觉与交互核心。在辩论模式下，用户可以拍下舞台前的实体按键为喜欢的角色「爆灯」支持，让原本留在手机里的对话拥有桌面手感。
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#67e8f9]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-[#67e8f9] border-2 border-[#161719] flex items-center justify-center">
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
                  <span className="w-8 h-8 rounded-lg bg-[#c084fc] border-2 border-[#161719] flex items-center justify-center">
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
                <div className="text-xs font-mono font-bold text-[#161719] mb-3">
                  HOW TO PLAY · 辩论舞台四步流程
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

            {/* Right 6 cols: PopBox Play Guide Poster (Real Project Poster) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border-2 border-[#161719] bg-white p-3 sm:p-4 shadow-[8px_8px_0px_#161719] relative">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 bg-[#161719] text-[#ccff00] text-[10px] font-mono font-bold rounded-sm">
                    PLAY GUIDE POSTER
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
        <section className="mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#c084fc] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black mb-3">
              03 · MY ROLE
            </span>
            <h2 className="text-2xl sm:text-4xl font-editorial-cn font-black text-[#161719]">
              Product & Interaction / Web Development / Hardware & Voice AI
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

          {/* Explicit Collaboration & Scope Boundary */}
          <div className="p-5 rounded-2xl bg-[#ffe600]/25 border-2 border-[#161719] flex items-start gap-3 text-xs sm:text-sm text-[#161719]">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">协作分工与边界说明：</strong>
              双角色语音对话功能由另一位团队成员完成；下文第六部分展示的「共同成长记忆、自动识别、跨 IP 联动与 PopBox Daily 日报」属于产品设想与玩法概念推演，并非已实现的工程功能。
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            5. FROM CONCEPT TO PROTOTYPE: 实体、网页、交互流程与硬件成果
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-20 pt-10 border-t-2 border-[#161719]">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-[#161719] text-[#ccff00] border-2 border-[#161719] shadow-[3px_3px_0px_#ccff00] text-xs font-mono font-black mb-3">
                04 · FROM CONCEPT TO PROTOTYPE
              </span>
              <h2 className="text-2xl sm:text-4xl font-editorial-cn font-black text-[#161719]">
                实体、网页、交互流程与硬件成果
              </h2>
            </div>
            <span className="text-xs text-[#5e626b]">
              真实项目成果记录与待补齐素材预留位
            </span>
          </div>

          {/* 5A. Reserved Video Showcase Slot */}
          <div className="mb-10">
            <div className="rounded-3xl border-2 border-[#161719] bg-[#161719] text-white p-5 sm:p-7 shadow-[8px_8px_0px_#ffe600]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#ffe600] text-[#161719] text-[10px] font-mono font-black rounded-sm">
                    VIDEO SHOWCASE SLOT
                  </span>
                  <span className="text-xs font-semibold text-white">
                    实拍运行演示视频（预留展示位）
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-400">
                  POPBOX_MEDIA.demoVideoUrl
                </span>
              </div>

              {POPBOX_MEDIA.demoVideoUrl ? (
                <video
                  src={POPBOX_MEDIA.demoVideoUrl}
                  controls
                  className="w-full aspect-video rounded-2xl border border-white/20 bg-black"
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/30 bg-white/[0.04] flex flex-col items-center justify-center text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-[#ccff00] text-[#161719] border-2 border-[#161719] flex items-center justify-center mb-3 shadow-[3px_3px_0px_#ffffff]">
                    <Play size={22} className="ml-0.5" />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white mb-1">
                    视频展示预留位置 · Demo Video Placeholder
                  </div>
                  <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                    此处已预留 16:9 实拍演示视频播放器位置，后续传入实体舞台按键操作或 CoreS3 语音交互实录视频即可直接展示。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 5B. Hardware Evidence + Interaction Flow Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* CoreS3 Hardware Slot */}
            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#161719]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <Cpu size={15} /> M5Stack CoreS3 实物与单角色语音运行
                </span>
                <span className="px-2 py-0.5 bg-[#ffe600] border border-[#161719] text-[10px] font-mono font-bold">
                  待补充实拍图
                </span>
              </div>
              {POPBOX_MEDIA.coreS3VoiceShot ? (
                <img
                  src={POPBOX_MEDIA.coreS3VoiceShot}
                  alt="M5Stack CoreS3 单角色语音运行画面"
                  className="w-full aspect-[16/10] object-cover rounded-xl border border-[#161719]"
                />
              ) : (
                <div className="w-full aspect-[16/10] rounded-xl border-2 border-dashed border-[#161719]/30 bg-[#f8f6f0] flex flex-col items-center justify-center text-center p-5">
                  <Cpu size={24} className="text-[#5e626b] mb-2" />
                  <div className="text-xs font-bold text-[#161719] mb-1">
                    CoreS3 硬件运行画面占位
                  </div>
                  <p className="text-[11px] text-[#5e626b] max-w-xs">
                    预留展示 M5Stack CoreS3 实物及单角色语音对话基础 API 调用运行画面（POPBOX_MEDIA.coreS3VoiceShot）。
                  </p>
                </div>
              )}
            </div>

            {/* Interaction Flow Slot */}
            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[5px_5px_0px_#161719]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                  <GitBranch size={15} /> 交互流程图
                </span>
                <span className="px-2 py-0.5 bg-[#67e8f9] border border-[#161719] text-[10px] font-mono font-bold">
                  待补充流程图
                </span>
              </div>
              {POPBOX_MEDIA.interactionFlowShot ? (
                <img
                  src={POPBOX_MEDIA.interactionFlowShot}
                  alt="PopBox 交互流程图"
                  className="w-full aspect-[16/10] object-contain rounded-xl border border-[#161719] bg-white"
                />
              ) : (
                <div className="w-full aspect-[16/10] rounded-xl border-2 border-dashed border-[#161719]/30 bg-[#f8f6f0] flex flex-col items-center justify-center text-center p-5">
                  <GitBranch size={24} className="text-[#5e626b] mb-2" />
                  <div className="text-xs font-bold text-[#161719] mb-1">
                    交互流程图占位
                  </div>
                  <p className="text-[11px] text-[#5e626b] max-w-xs">
                    预留展示角色触发、语音对话状态流转与网页记录关系图（POPBOX_MEDIA.interactionFlowShot）。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 5C. Small Interface Collage: Web Screenshots (3 compact placeholders, NOT main visual) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-[#161719] shadow-[6px_6px_0px_#161719]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <span className="text-[10px] font-mono font-black px-2 py-0.5 bg-[#c084fc] border border-[#161719] mr-2">
                  WEB INTERFACE COLLAGE
                </span>
                <span className="text-sm font-editorial-cn font-bold text-[#161719]">
                  Web 端界面截图拼贴（本人完成前端开发）
                </span>
              </div>
              <span className="text-[11px] text-[#5e626b]">
                小型界面证据拼贴 · 3 张截图占位中
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Shot 1: 角色档案 */}
              <div className="p-3 rounded-2xl bg-[#f8f6f0] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] sm:rotate-[-1deg]">
                {POPBOX_MEDIA.webProfileShot ? (
                  <img
                    src={POPBOX_MEDIA.webProfileShot}
                    alt="Web 端角色档案界面截图"
                    className="w-full aspect-[4/3] object-cover rounded-lg border border-[#161719] mb-2.5"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-[#161719]/30 bg-white flex flex-col items-center justify-center p-3 text-center mb-2.5">
                    <ImageIcon size={20} className="text-[#5e626b] mb-1.5" />
                    <span className="text-[11px] font-bold">角色档案截图占位</span>
                    <span className="text-[10px] text-[#5e626b] font-mono mt-0.5">webProfileShot</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>01 · 角色档案页</span>
                  <span className="font-mono text-[10px] text-[#5e626b]">WEB UI</span>
                </div>
              </div>

              {/* Shot 2: 小纸条 / 留言墙 */}
              <div className="p-3 rounded-2xl bg-[#f8f6f0] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] sm:rotate-[1deg]">
                {POPBOX_MEDIA.webNotesShot ? (
                  <img
                    src={POPBOX_MEDIA.webNotesShot}
                    alt="Web 端小纸条与留言墙界面截图"
                    className="w-full aspect-[4/3] object-cover rounded-lg border border-[#161719] mb-2.5"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-[#161719]/30 bg-white flex flex-col items-center justify-center p-3 text-center mb-2.5">
                    <MessageSquare size={20} className="text-[#5e626b] mb-1.5" />
                    <span className="text-[11px] font-bold">小纸条 / 留言墙占位</span>
                    <span className="text-[10px] text-[#5e626b] font-mono mt-0.5">webNotesShot</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>02 · 小纸条 / 留言墙</span>
                  <span className="font-mono text-[10px] text-[#5e626b]">WEB UI</span>
                </div>
              </div>

              {/* Shot 3: 照片墙 */}
              <div className="p-3 rounded-2xl bg-[#f8f6f0] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] sm:rotate-[-0.8deg]">
                {POPBOX_MEDIA.webGalleryShot ? (
                  <img
                    src={POPBOX_MEDIA.webGalleryShot}
                    alt="Web 端照片墙界面截图"
                    className="w-full aspect-[4/3] object-cover rounded-lg border border-[#161719] mb-2.5"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg border-2 border-dashed border-[#161719]/30 bg-white flex flex-col items-center justify-center p-3 text-center mb-2.5">
                    <ImageIcon size={20} className="text-[#5e626b] mb-1.5" />
                    <span className="text-[11px] font-bold">照片墙截图占位</span>
                    <span className="text-[10px] text-[#5e626b] font-mono mt-0.5">webGalleryShot</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>03 · 照片墙 & 小故事</span>
                  <span className="font-mono text-[10px] text-[#5e626b]">WEB UI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            6. BEYOND THE TOY: 共同成长记忆、IP 碰碰车、A Parallel Universe for Toys
               + PopBox Daily 正反面（明确标注为 AI 生成概念玩法示意）
           ═════════════════════════════════════════════════════════════ */}
        <section className="mb-16 pt-10 border-t-2 border-[#161719]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#ffe600] border-2 border-[#161719] shadow-[3px_3px_0px_#161719] text-xs font-mono font-black">
              05 · BEYOND THE TOY
            </span>
            <span className="px-3 py-1 bg-[#161719] text-[#ffe600] text-xs font-mono font-bold rounded-sm">
              FUTURE CONCEPT · 产品设想与玩法概念示意（未实装）
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-editorial-cn font-black text-[#161719] mb-4">
            A Parallel Universe for Toys
          </h2>
          <p className="text-sm sm:text-base text-[#3a3d45] max-w-3xl leading-relaxed mb-8">
            在完成舞台原型之外，我们还推演了一个更远的设想：<strong className="text-[#161719]">如果潮玩角色在不被唤醒的时候，也拥有自己的日常，它们会寄来怎样的一份日报？</strong>
          </p>

          {/* 3 Speculative Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#ffe600]">
              <span className="text-[10px] font-mono font-bold text-[#5e626b] block mb-1">
                CONCEPT 01 · 尚未实装
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                共同成长记忆
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想角色能够随互动积累共同经历与个人化记忆节点，让玩具与用户之间逐渐沉淀出专属故事线索。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#c084fc]">
              <span className="text-[10px] font-mono font-bold text-[#5e626b] block mb-1">
                CONCEPT 02 · 尚未实装
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                IP 碰碰车
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想打破单一 IP 边界，让来自不同时代与世界观的角色（如齐妃、杜尚、Zsiga）在同一场景中相遇、争论与串门。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-[#161719] shadow-[4px_4px_0px_#67e8f9]">
              <span className="text-[10px] font-mono font-bold text-[#5e626b] block mb-1">
                CONCEPT 03 · 尚未实装
              </span>
              <h3 className="text-base font-editorial-cn font-black mb-2">
                PopBox Daily 平行日报
              </h3>
              <p className="text-xs text-[#44474f] leading-relaxed">
                设想角色各自出游后，将跨 IP 互动、故事记录与今日记忆物排版成一份专属报纸「PopBox Daily」寄回给收藏者。
              </p>
            </div>
          </div>

          {/* PopBox Daily Front & Back AI Concept Spread */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#161719] text-white border-2 border-[#161719] shadow-[8px_8px_0px_#c084fc]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-white/15">
              <div>
                <span className="px-2.5 py-0.5 bg-[#ccff00] text-[#161719] text-[10px] font-mono font-black rounded-sm mr-2">
                  CONCEPT DESIGN · 玩法概念示意
                </span>
                <span className="text-sm font-bold text-white">
                  PopBox Daily 正反面概念报纸（AI 生成跨 IP 联动玩法示意）
                </span>
              </div>
              <span className="text-[11px] font-mono text-stone-300">
                非网页截图 · 非已实现功能
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Front Page */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-[#ffe600] text-[#161719] font-mono font-black rounded-sm">
                    FRONT PAGE · 正面概念图
                  </span>
                  <span className="text-[11px] text-stone-300 font-mono">
                    AI CONCEPT ILLUSTRATION
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-white/20 bg-white">
                  <img
                    src={POPBOX_MEDIA.dailyFront}
                    alt="PopBox Daily 正面玩法概念图（AI 生成，非已实现功能）"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  正面示意：齐妃、杜尚与 Zsiga 一同闯入白色展厅围绕《泉》展开争论——以报纸头版形式呈现角色出游与跨 IP 碰撞事件。
                </p>
              </div>

              {/* Back Page */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-[#67e8f9] text-[#161719] font-mono font-black rounded-sm">
                    BACK PAGE · 反面故事续页概念图
                  </span>
                  <span className="text-[11px] text-stone-300 font-mono">
                    AI CONCEPT ILLUSTRATION
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border-2 border-white/20 bg-white">
                  <img
                    src={POPBOX_MEDIA.dailyBack}
                    alt="PopBox Daily 反面故事续页概念图（AI 生成，非已实现功能）"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  反面示意：记录人物对话续篇、今日记忆物（空白标签）与三位角色的互评短评，探讨未来“玩具平行日常”的叙事呈现方式。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Return Action */}
        <div className="pt-8 border-t-2 border-[#161719] flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/#works"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#161719] text-[#ccff00] hover:bg-[#ffe600] hover:text-[#161719] border-2 border-[#161719] shadow-[4px_4px_0px_#161719] text-xs font-bold transition-all"
          >
            <ArrowLeft size={14} /> 返回首页精选作品
          </Link>
          <span className="text-xs font-mono text-[#5e626b]">
            POPBOX ARCHIVE · PHYSICAL + AI
          </span>
        </div>
      </div>
    </div>
  );
}
