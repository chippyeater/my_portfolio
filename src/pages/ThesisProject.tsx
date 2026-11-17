import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import thesisHero from "../assets/images/thesis_relational_agent_1791702819224.jpg";

export function ThesisProject() {
  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-28 px-6 lg:px-12 pb-24 selection:bg-[#ccff00] selection:text-black relative bg-tactile-paper">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-[#4e6b56] text-xs font-semibold text-[#5e626b] hover:text-[#4e6b56] transition-all paper-shadow"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>
        </div>

        {/* Header Block with Editorial Metadata */}
        <div className="border-b border-black/[0.08] pb-10 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#5e626b] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4e6b56]/15 text-[#4e6b56] font-semibold">
              STATUS: 毕业设计在研课题 (Thesis Research)
            </span>
            <span>·</span>
            <span>人机交互与主动式智能体</span>
            <span>·</span>
            <span>2025—2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6 leading-[1.15]">
            面向移动社交媒体的情境自适应个人智能体交互设计研究
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            聚焦图文类移动社交媒体信息流场景，探究情境自适应型个人智能体的交互机制：从自主浏览中的多样化支持需求与决策情境特征出发，研究系统如何权衡帮助价值、打扰成本与用户自主感，动态判断介入时机、帮助内容与呈现控制方式。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">研究性质</span>
              <span className="text-[#161719] font-medium">毕业论文独立设计研究</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">聚焦场景</span>
              <span className="text-[#161719] font-medium">图文类移动社交信息流</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">核心评估维度</span>
              <span className="text-[#161719] font-medium">帮助价值 · 打扰成本 · 自主感</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">预期成果</span>
              <span className="text-[#4e6b56] font-semibold">分类框架 + 移动原型 + 对照实验</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={thesisHero} 
            alt="Context-Adaptive Personal Agent for Mobile Social Media" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            系统机制推演 · 使用场景、浏览活动片段、决策情境与自适应主动介入
          </div>
        </div>

        {/* Core Research Questions / Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          
          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] paper-shadow space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#4e6b56]/15 text-[#4e6b56] flex items-center justify-center font-bold text-xs font-mono">
              RQ1
            </div>
            <h3 className="text-base font-bold text-[#161719] font-editorial-cn">
              支持需求与决策情境特征
            </h3>
            <p className="text-xs text-[#44474f] leading-relaxed">
              区分使用场景、浏览活动片段与 Agent 决策情境三个层次，从真实连续浏览经历中归纳不同活动下的多样化支持需求，及影响介入接受度的情境线索。
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] paper-shadow space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#1d3e6d]/15 text-[#1d3e6d] flex items-center justify-center font-bold text-xs font-mono">
              RQ2
            </div>
            <h3 className="text-base font-bold text-[#161719] font-editorial-cn">
              情境自适应主动交互机制
            </h3>
            <p className="text-xs text-[#44474f] leading-relaxed">
              依据混合主动交互权衡行动收益、不确定性与打断成本，定义保持静默、延迟介入、主动提示、建议呈现与用户确认控制等适配策略。
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] paper-shadow space-y-3">
            <div className="w-8 h-8 rounded-full bg-[#161719] text-[#ccff00] flex items-center justify-center font-bold text-xs font-mono">
              RQ3
            </div>
            <h3 className="text-base font-bold text-[#161719] font-editorial-cn">
              双模式原型与系统级评价
            </h3>
            <p className="text-xs text-[#44474f] leading-relaxed">
              在共享信息流与基础能力的受控移动原型下，开展约 40 名被试内对照实验，对比“响应式通用助手”与“情境自适应 Agent”的综合体验差异。
            </p>
          </div>

        </div>

        {/* Research Roadmap & Technical Architecture */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] paper-shadow space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#4e6b56]">
              01 / 四阶段研究路径
            </div>
            <ul className="space-y-3 text-xs text-[#44474f] leading-relaxed">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#161719] shrink-0">01</span>
                <span><strong className="text-[#161719]">文献归纳与形成性研究：</strong>招募 12–16 名社交信息流用户开展半结构化访谈与情境化共同设计，梳理支持需求分类与情境判据。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#161719] shrink-0">02</span>
                <span><strong className="text-[#161719]">主动交互策略设计：</strong>明确不同支持需求下的介入时机、帮助内容、界面呈现形式及用户控制权边界。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#161719] shrink-0">03</span>
                <span><strong className="text-[#161719]">统一移动原型与先导测试：</strong>基于移动 Web 与 Python 后端实现可控图文社交信息流，完成 6 人先导测试校准。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#161719] shrink-0">04</span>
                <span><strong className="text-[#161719]">两条件对照实验与设计归纳：</strong>结合 Session 主观评价、NASA-TLX 负担指标及回顾性线索回忆，提炼可复用设计原则。</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-black/[0.08] paper-shadow space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1d3e6d]">
              02 / 实验原型系统构成
            </div>
            <ul className="space-y-3 text-xs text-[#44474f] leading-relaxed">
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#1d3e6d] shrink-0">A</span>
                <span><strong className="text-[#161719]">信息流交互与采集：</strong>支持图文浏览、搜索、评论与收藏的可控信息流，及自然语言 / 屏幕圈选调用。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#1d3e6d] shrink-0">B</span>
                <span><strong className="text-[#161719]">会话情境状态与事件调度：</strong>区分可观察事实与模型推断状态，通过关键事件、冷却与去重控制评估节奏。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#1d3e6d] shrink-0">C</span>
                <span><strong className="text-[#161719]">条件 A · 响应式通用助手：</strong>由用户按需主动发起请求，提供内容解释、信息整理与经授权辅助。</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono font-bold text-[#1d3e6d] shrink-0">D</span>
                <span><strong className="text-[#161719]">条件 B · 情境自适应 Agent：</strong>保留按需调用并结合连续浏览情境决定何时介入、如何呈现，依据不足时保持静默。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#4e6b56] font-bold text-xs uppercase tracking-wider mb-2">/* 研究导向声明与课题初衷 */</div>
          “社交媒体信息流中的浏览体验往往在明确意图与开放探索间动态摇摆。情境感知能力本身并不自动等于恰当的帮助——个人智能体不仅需要知道能提供什么帮助，更需要理解何时介入、何时克制静默，并将最终控制权留给用户。”
        </div>

      </div>
    </div>
  );
}

