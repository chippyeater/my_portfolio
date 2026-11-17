import { ArrowLeft, CheckCircle2, Sliders, Cpu, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import meseeHero from "../assets/images/showcase_mesee_agent_1791698603974.jpg";

export function MeseeProject() {
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
              STATUS: 概念工作台
            </span>
            <span>·</span>
            <span>Agent 生产力 · 情境识别 · 动态工作流</span>
            <span>·</span>
            <span>2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            Mesee ｜ 情境感知智能体工作台
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            探索 Agent 如何在用户不离开主要创作界面的前提下，完成辅助搜集、多轮校验与结果组装，降低智能介入干扰。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">我的职责</span>
              <span className="text-[#161719] font-medium">交互概念设计与人机控制度分级策略</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">介入机制</span>
              <span className="text-[#161719] font-medium">静默提示 ➔ 预览确认 ➔ 完全执行</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">记忆管理</span>
              <span className="text-[#161719] font-medium">显式组织与审查面板</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">设计理念</span>
              <span className="text-[#161719] font-semibold">非侵入式脚手架</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={meseeHero} 
            alt="Mesee Context-Aware Agent Workspace" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            界面原型 · 情境感知触发带与任务编排反馈
          </div>
        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#161719] font-bold text-xs uppercase tracking-wider mb-2">/* 设计构想 */</div>
          “最好的协助是无声的脚手架。当人类处于高浓度的心流中时，任何跳出的弹窗和自作主张都是干扰。Mesee 探索的是一种分级介入的优雅节奏——看得见、调得了、随时可撤销。”
        </div>

      </div>
    </div>
  );
}
