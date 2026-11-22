import { useEffect, useState } from "react";
import { ArrowLeft, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";

const RESONANCE_MEDIA = {
  mainWorkspace: "/assets/aistudio/2_218f39fc.png",
  manualSliders: "/assets/resonance/resonance_manual_sliders_clean.png",
  naturalSchemes: "/assets/aistudio/3_1c27e851.png",
  quoteSummary: "/assets/aistudio/4_ecbc4657.png",
  demoVideo: "/assets/aistudio/_____1__04e28acd.mp4",
};

interface ZoomTarget {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

const SYSTEM_FLOW = [
  {
    step: "01",
    title: "表达定制需求",
    detail: "自然语言对话或参数滑杆调节",
  },
  {
    step: "02",
    title: "LLM 意图映射",
    detail: "将设计偏好转换为桌子参数变化",
  },
  {
    step: "03",
    title: "Rhino.Compute 几何计算",
    detail: "基于教师提供的 Grasshopper 桌子模型更新几何",
  },
  {
    step: "04",
    title: "Three.js 预览与规则反馈",
    detail: "实时三维渲染并按预设规则估算报价与结构提示",
  },
];

export function ResonanceProject() {
  const [nlMode, setNlMode] = useState<"chat" | "schemes">("chat");
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

  const activeNlImage =
    nlMode === "chat"
      ? {
          src: RESONANCE_MEDIA.mainWorkspace,
          alt: "Resonance 自然语言对话调参界面：输入小一点的需求后系统自动更新三维桌子参数并回复",
          title: "自然语言调整 · 对话驱动参数更新",
          subtitle: "02 交互体验 · 对话修改尺寸并继续请求备选方案",
        }
      : {
          src: RESONANCE_MEDIA.naturalSchemes,
          alt: "Resonance 自然语言生成两套桌子方案对比界面：现代简约方案与经典复古方案支持预览与应用",
          title: "自然语言调整 · 生成对比设计方案",
          subtitle: "02 交互体验 · AI 生成现代简约与经典复古两套可切换方案",
        };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F7F4EC] text-[#3B2014] selection:bg-[#D33A2C]/15 selection:text-[#3B2014] overflow-x-clip">
      {/* Top Quiet Editorial Navigation */}
      <header className="w-full border-b border-[#3B2014]/12 bg-[#F7F4EC]/92 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-6">
          <Link
            to="/#work-resonance"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#6B4E3D] hover:text-[#D33A2C] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={15} />
            <span>返回精选作品列表</span>
          </Link>

          <nav
            aria-label="页面章节导览"
            className="hidden sm:flex items-center gap-6 text-xs font-medium text-[#7C5E4D]"
          >
            <a href="#hero" className="hover:text-[#3B2014] transition-colors whitespace-nowrap shrink-0">
              01 概览
            </a>
            <a href="#interaction" className="hover:text-[#3B2014] transition-colors whitespace-nowrap shrink-0">
              02 交互体验
            </a>
            <a href="#architecture" className="hover:text-[#3B2014] transition-colors whitespace-nowrap shrink-0">
              03 系统实现
            </a>
          </nav>

          <span className="text-xs font-mono tabular-nums text-[#8A7263] whitespace-nowrap shrink-0">
            2026.03—2026.06
          </span>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
        {/* ==================== 01｜HERO ==================== */}
        <section id="hero" className="pt-10 sm:pt-14 pb-14 sm:pb-16 border-b border-[#3B2014]/12 scroll-mt-16">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#7C5E4D] font-medium">
              <span className="font-display font-bold tracking-tight text-[#3B2014]">
                RESONANCE<span className="text-[#D33A2C]">.</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>个人固定命题课程作品</span>
              <span aria-hidden="true">·</span>
              <span>参数化设计</span>
              <span aria-hidden="true">·</span>
              <span>自然语言交互</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-editorial-cn font-bold text-[#3B2014] leading-[1.2] tracking-tight text-balance">
              让家具定制，从理解参数变成表达需求。
            </h1>

            <p className="text-[15px] sm:text-[17px] text-[#593E31] leading-[1.82] font-normal">
              Resonance 是一项个人完成的固定命题课程作品。基于教师提供的 Grasshopper 参数化桌子模型，我将自然语言交互、三维预览与设计反馈整合到 Web 界面中，让用户无需掌握专业建模工具，也能参与家具设计。
            </p>
          </div>

          {/* Unboxed Editorial Scope Line */}
          <div className="mt-8 pt-5 border-t border-[#3B2014]/12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-[13px]">
            <div>
              <span className="block text-[11px] font-mono text-[#8A7263] mb-1">项目周期与性质</span>
              <span className="font-medium text-[#3B2014]">2026.03—2026.06 · 个人固定命题课程作品</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-[#8A7263] mb-1">参数化几何基础</span>
              <span className="font-medium text-[#3B2014]">教师提供的 Grasshopper 参数化桌子模型</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-[#8A7263] mb-1">个人完成内容</span>
              <span className="font-medium text-[#3B2014]">Web 交互原型 · LLM 与 Rhino.Compute 整合</span>
            </div>
          </div>

          {/* Large Main Workspace Visual */}
          <figure className="mt-10 sm:mt-12 space-y-3">
            <button
              type="button"
              onClick={() =>
                setZoomTarget({
                  src: RESONANCE_MEDIA.mainWorkspace,
                  alt: "Resonance 系统主界面：左侧尺寸参数滑杆、中央 Three.js 三维桌子模型、右侧 Design Notes 自然语言交互与底部实时报价栏",
                  title: "Resonance 系统主界面",
                  subtitle: "01 概览 · 参数调节、三维预览与自然语言设计对话一体视图",
                })
              }
              className="group relative block w-full border border-[#3B2014]/15 bg-[#FAF7F0] p-2 sm:p-3 transition-colors duration-200 hover:border-[#3B2014]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D33A2C] cursor-zoom-in"
              aria-label="放大查看 Resonance 系统主界面"
            >
              <img
                src={RESONANCE_MEDIA.mainWorkspace}
                alt="Resonance 系统主界面：左侧尺寸参数滑杆、中央 Three.js 三维桌子模型、右侧 Design Notes 自然语言交互与底部实时报价栏"
                className="w-full h-auto aspect-[1280/595] object-contain mx-auto"
              />
              <span className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1.5 px-3 py-1 bg-[#F7F4EC]/95 text-[#3B2014] border border-[#3B2014]/20 text-[11px] font-medium">
                <Expand size={11} className="text-[#D33A2C]" />
                <span>查看大图</span>
              </span>
            </button>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7C5E4D]">
              <span>Resonance 真实系统主界面 · 左侧滑杆参数 / 中央三维桌子预览 / 右侧自然语言对话</span>
              <span className="text-[11px] text-[#8A7263]">真实系统截图</span>
            </figcaption>
          </figure>
        </section>

        {/* ==================== 02｜交互体验 ==================== */}
        <section id="interaction" className="py-14 sm:py-16 border-b border-[#3B2014]/12 scroll-mt-16">
          <div className="max-w-3xl mb-10 space-y-4">
            <p className="text-xs font-mono tracking-[0.12em] text-[#D33A2C] font-semibold">
              02 / INTERACTION EXPERIENCE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#3B2014] leading-snug">
              两种方式，探索自己的设计
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#593E31] leading-[1.8]">
              用户既可以通过滑杆调整桌子的尺寸、框架和桌腿参数，也可以直接用自然语言描述设计偏好。系统将设计意图转换为参数变化，并更新三维模型。
            </p>
          </div>

          {/* Left-Right Split: Manual Sliders vs Natural Language */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left: 手动调节 */}
            <article className="space-y-3.5">
              <div className="flex items-baseline justify-between gap-3 border-b border-[#3B2014]/12 pb-2.5">
                <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#3B2014]">
                  手动调节
                </h3>
                <span className="text-xs text-[#8A7263]">底座 · 框架 · 桌腿</span>
              </div>
              <p className="text-sm text-[#593E31] leading-relaxed">
                在左侧底座、框架与桌腿分页中直接拖动滑杆，精确设定长宽高尺寸，并同步刷新三维桌子模型与参考工期。
              </p>

              <button
                type="button"
                onClick={() =>
                  setZoomTarget({
                    src: RESONANCE_MEDIA.manualSliders,
                    alt: "Resonance 手动调节界面截图：参数滑杆设置长 140cm、宽 65cm、高 73cm，并同步展示三维长桌模型",
                    title: "手动调节 · 参数滑杆与三维桌子预览",
                    subtitle: "02 交互体验 · 140 × 65 × 73 cm 参数同步视图",
                  })
                }
                className="group relative block w-full border border-[#3B2014]/15 bg-[#FAF7F0] p-2 transition-colors duration-200 hover:border-[#3B2014]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D33A2C] cursor-zoom-in"
                aria-label="放大查看手动调节截图"
              >
                <img
                  src={RESONANCE_MEDIA.manualSliders}
                  alt="Resonance 手动调节界面截图：参数滑杆设置长 140cm、宽 65cm、高 73cm，并同步展示三维长桌模型"
                  className="w-full h-auto aspect-[1280/598] object-contain mx-auto"
                />
                <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F4EC]/95 text-[#3B2014] border border-[#3B2014]/20 text-[11px] font-medium">
                  <Expand size={10} className="text-[#D33A2C]" />
                  <span>放大</span>
                </span>
              </button>
            </article>

            {/* Right: 自然语言调整 */}
            <article className="space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3B2014]/12 pb-2.5">
                <h3 className="text-lg sm:text-xl font-editorial-cn font-bold text-[#3B2014]">
                  自然语言调整
                </h3>

                <div className="inline-flex items-center border border-[#3B2014]/18 bg-[#F1EDE2] p-0.5 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => setNlMode("chat")}
                    className={`px-2.5 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                      nlMode === "chat"
                        ? "bg-[#3B2014] text-[#F7F4EC]"
                        : "text-[#6B4E3D] hover:text-[#3B2014]"
                    }`}
                  >
                    对话改参
                  </button>
                  <button
                    type="button"
                    onClick={() => setNlMode("schemes")}
                    className={`px-2.5 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                      nlMode === "schemes"
                        ? "bg-[#3B2014] text-[#F7F4EC]"
                        : "text-[#6B4E3D] hover:text-[#3B2014]"
                    }`}
                  >
                    多方案对比
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#593E31] leading-relaxed">
                在右侧 Design Notes 输入尺寸或风格倾向，系统直接将口语需求映射为参数更新，并可进一步生成不同参数方案供预览切换。
              </p>

              <button
                type="button"
                onClick={() => setZoomTarget(activeNlImage)}
                className="group relative block w-full border border-[#3B2014]/15 bg-[#FAF7F0] p-2 transition-colors duration-200 hover:border-[#3B2014]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D33A2C] cursor-zoom-in"
                aria-label={`放大查看${activeNlImage.title}`}
              >
                <img
                  src={activeNlImage.src}
                  alt={activeNlImage.alt}
                  className="w-full h-auto aspect-[1280/598] object-contain mx-auto"
                />
                <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F4EC]/95 text-[#3B2014] border border-[#3B2014]/20 text-[11px] font-medium">
                  <Expand size={10} className="text-[#D33A2C]" />
                  <span>放大</span>
                </span>
              </button>
            </article>
          </div>

          {/* Below Split: Quote & Structural Feedback + Interactive Demo Video */}
          <div className="mt-12 pt-10 border-t border-[#3B2014]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Quote Summary Screenshot */}
            <article className="lg:col-span-6 space-y-3.5">
              <div className="flex items-baseline justify-between gap-3 border-b border-[#3B2014]/12 pb-2.5">
                <h3 className="text-lg font-editorial-cn font-bold text-[#3B2014]">
                  报价与结构反馈
                </h3>
                <span className="text-xs text-[#8A7263]">报价摘要</span>
              </div>
              <p className="text-sm text-[#593E31] leading-relaxed">
                随参数变化实时展示基于预设规则的参考成本、稳定评分与结构提示，辅助方案比较与设计探索。
              </p>

              <button
                type="button"
                onClick={() =>
                  setZoomTarget({
                    src: RESONANCE_MEDIA.quoteSummary,
                    alt: "Resonance Quote Summary 报价与结构反馈界面：展示稳定评分 93、结构等级高、桌面偏大提示及分项成本估算",
                    title: "报价与结构反馈视图",
                    subtitle: "02 交互体验 · 基于预设规则的价格估算与结构表现反馈",
                  })
                }
                className="group relative block w-full border border-[#3B2014]/15 bg-[#FAF7F0] p-2 transition-colors duration-200 hover:border-[#3B2014]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D33A2C] cursor-zoom-in"
                aria-label="放大查看报价与结构反馈截图"
              >
                <img
                  src={RESONANCE_MEDIA.quoteSummary}
                  alt="Resonance Quote Summary 报价与结构反馈界面：展示稳定评分 93、结构等级高、桌面偏大提示及分项成本估算"
                  className="w-full h-auto aspect-[1280/598] object-contain mx-auto"
                />
                <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 px-2.5 py-1 bg-[#F7F4EC]/95 text-[#3B2014] border border-[#3B2014]/20 text-[11px] font-medium">
                  <Expand size={10} className="text-[#D33A2C]" />
                  <span>放大</span>
                </span>
              </button>
            </article>

            {/* Real Interaction Video */}
            <article className="lg:col-span-6 space-y-3.5">
              <div className="flex items-baseline justify-between gap-3 border-b border-[#3B2014]/12 pb-2.5">
                <h3 className="text-lg font-editorial-cn font-bold text-[#3B2014]">
                  实机操作演示视频
                </h3>
                <span className="text-xs text-[#D33A2C]">实机操作录像</span>
              </div>
              <p className="text-sm text-[#593E31] leading-relaxed">
                完整记录滑杆调参、自然语言修改参数、方案预览切换与报价反馈的真实运行过程。
              </p>

              <div className="border border-[#3B2014]/15 bg-[#FAF7F0] p-2">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={RESONANCE_MEDIA.manualSliders}
                  className="w-full h-auto aspect-[1280/598] object-contain bg-[#F7F4EC] block"
                >
                  <source src={RESONANCE_MEDIA.demoVideo} type="video/mp4" />
                  您的浏览器暂不支持内嵌视频播放。
                </video>
              </div>
            </article>
          </div>
        </section>

        {/* ==================== 03｜系统实现 ==================== */}
        <section id="architecture" className="pt-14 sm:pt-16 scroll-mt-16">
          <div className="max-w-3xl mb-10 space-y-4">
            <p className="text-xs font-mono tracking-[0.12em] text-[#D33A2C] font-semibold">
              03 / SYSTEM ARCHITECTURE
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-editorial-cn font-bold text-[#3B2014] leading-snug">
              从设计意图到参数化几何
            </h2>
            <p className="text-[15px] sm:text-[17px] text-[#593E31] leading-[1.8]">
              系统以教师提供的 Grasshopper 模型为基础，通过 LLM 将自然语言映射为参数调整，使用 Rhino.Compute 计算几何模型，并由 Three.js 展示结果。报价和结构反馈基于预设规则估算，用于辅助设计探索。
            </p>
          </div>

          {/* Concise Architecture Flow Strip */}
          <div className="border border-[#3B2014]/18 bg-[#FAF7F0] p-5 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {SYSTEM_FLOW.map((node, index) => (
                <div
                  key={node.step}
                  className={`relative space-y-2 ${
                    index < SYSTEM_FLOW.length - 1
                      ? "lg:pr-5 lg:border-r lg:border-[#3B2014]/14"
                      : ""
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-[#D33A2C] tabular-nums block">
                    {node.step}
                  </span>
                  <h3 className="text-base font-editorial-cn font-bold text-[#3B2014]">
                    {node.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B4E3D] leading-relaxed">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#3B2014]/12 text-xs text-[#7C5E4D] leading-relaxed">
              系统说明：基础 Grasshopper 参数化桌子模型由课程教师提供；Web 端基于该模型完成自然语言交互、三维联动预览，以及依预设规则生成的参考报价与结构提示。
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Return Navigation Footer */}
      <footer className="mt-auto w-full border-t border-[#3B2014]/12 bg-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-7 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#7C5E4D]">
            <span className="font-display font-bold text-[#3B2014]">
              RESONANCE<span className="text-[#D33A2C]">.</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>个人固定命题课程作品 · 2026.03—2026.06</span>
          </div>

          <Link
            to="/#work-resonance"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#3B2014]/25 bg-[#F7F4EC] hover:bg-[#3B2014] text-xs sm:text-sm font-medium text-[#3B2014] hover:text-[#F7F4EC] transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} />
            <span>返回精选作品列表</span>
          </Link>
        </div>
      </footer>

      {/* Lightbox Modal for Inspecting Full-Resolution Screenshots */}
      {zoomTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomTarget.title}
          onClick={() => setZoomTarget(null)}
          className="fixed inset-0 z-50 bg-[#23130C]/82 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full bg-[#F7F4EC] p-4 sm:p-6 shadow-2xl border border-[#3B2014]/25 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4 pr-12">
              <div className="min-w-0">
                {zoomTarget.subtitle && (
                  <p className="text-[11px] font-mono text-[#D33A2C] mb-0.5 truncate">
                    {zoomTarget.subtitle}
                  </p>
                )}
                <h3 className="text-sm sm:text-base font-semibold text-[#3B2014] truncate">
                  {zoomTarget.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomTarget(null)}
                aria-label="关闭大图预览"
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-[#FAF7F0] border border-[#3B2014]/20 text-[#3B2014] hover:bg-[#3B2014] hover:text-[#F7F4EC] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border border-[#3B2014]/15 bg-[#FAF7F0] p-2 sm:p-3 flex items-center justify-center">
              <img
                src={zoomTarget.src}
                alt={zoomTarget.alt}
                className="w-auto max-w-full max-h-[80vh] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
