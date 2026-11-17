import { ArrowLeft, CheckCircle2, Sliders, Volume2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import resonanceHero from "../assets/images/showcase_resonance_sound_1791698618041.jpg";

export function ResonanceProject() {
  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-28 px-6 lg:px-12 pb-24 selection:bg-[#ccff00] selection:text-black relative bg-tactile-paper">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-[#161719] text-xs font-semibold text-[#5e626b] hover:text-[#161719] transition-all paper-shadow"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>
        </div>

        {/* Header Block with Editorial Metadata */}
        <div className="border-b border-black/[0.08] pb-10 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#5e626b] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-black/10 text-[#161719] font-semibold">
              STATUS: 生成式声学实验
            </span>
            <span>·</span>
            <span>生成式美学 · Web Audio · 参数化界面</span>
            <span>·</span>
            <span>2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            Resonance ｜ 生成式声学参数画布
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            将生物频段信号转化为沉浸式动态三维声景，探讨非语言向机器状态反馈在情绪关怀中的感官可能。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">我的职责</span>
              <span className="text-[#161719] font-medium">参数化生成逻辑实验与动态视觉实现</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">交互形式</span>
              <span className="text-[#161719] font-medium">实时声波频段拟合与参数化网格</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">技术栈</span>
              <span className="text-[#161719] font-medium">Web Audio API · 交互阻尼算法</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">研究定位</span>
              <span className="text-[#161719] font-semibold">感官交互与生理数据艺术化</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={resonanceHero} 
            alt="Resonance Generative Acoustic Parameter Sculpting Canvas" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            声波拟合三维画布 · 频段振幅动态色彩响应
          </div>
        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#161719] font-bold text-xs uppercase tracking-wider mb-2">/* 实验反思 */</div>
          “声波与情绪的可视化雕塑，探索理性算法包裹下的温度感应。当人与机器交互时，不仅存在离散的文字输入，更存在连续的呼吸与共鸣。”
        </div>

      </div>
    </div>
  );
}
