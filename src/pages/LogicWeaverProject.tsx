import { ArrowLeft, CheckCircle2, Network, GitBranch, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import logicweaverHero from "../assets/images/showcase_logicweaver_graph_1791698627262.jpg";

export function LogicWeaverProject() {
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
              STATUS: 探索性概念界面
            </span>
            <span>·</span>
            <span>空间推理界面 · 证据树图谱 · 白盒系统</span>
            <span>·</span>
            <span>2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            LogicWeaver ｜ 复杂信息生成式推理系统
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            针对多维、碎片化、高认知负荷的复杂事实，跳出线性对话框，将碎片卷宗重构为空间逻辑拓扑与证据链。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">我的职责</span>
              <span className="text-[#161719] font-medium">交互架构推演与界面原型设计</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">解决痛点</span>
              <span className="text-[#161719] font-medium">长文本线性堆叠导致的逻辑断裂</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">交互形式</span>
              <span className="text-[#161719] font-medium">非线性图谱画布 · 矛盾节点检测</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">项目性质</span>
              <span className="text-[#161719] font-semibold">白盒协同推理界面概念</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={logicweaverHero} 
            alt="LogicWeaver Spatial Reasoning Graph Interface" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            界面原型 · 树状推理推演拓扑与矛盾线索标注
          </div>
        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#161719] font-bold text-xs uppercase tracking-wider mb-2">/* 设计构想 */</div>
          “人类的深度思考从来不是一条单向流淌的文字流。在处理复杂证据调查和法律案卷时，把思考过程铺展在二维空间中，让人与智能体共同搬动论点与证据卡片，才是符合人类认知直觉的白盒协同方式。”
        </div>

      </div>
    </div>
  );
}
