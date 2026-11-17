import { ArrowLeft, CheckCircle2, Users, FileText, Database } from "lucide-react";
import { Link } from "react-router-dom";
import lifelogHero from "../assets/images/lifelog_video_pipeline_1791702799420.jpg";

export function LifelogProject() {
  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-28 px-6 lg:px-12 pb-24 selection:bg-[#ccff00] selection:text-black relative bg-tactile-paper">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-[#1d3e6d] text-xs font-semibold text-[#5e626b] hover:text-[#1d3e6d] transition-all paper-shadow"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>
        </div>

        {/* Header Block with Editorial Metadata */}
        <div className="border-b border-black/[0.08] pb-10 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#5e626b] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1d3e6d]/10 text-[#1d3e6d] font-semibold">
              STATUS: 团队项目 · 技术实现与算法迭代
            </span>
            <span>·</span>
            <span>多模态视频理解 · 视觉证据溯源</span>
            <span>·</span>
            <span>2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            Lifelog ｜ 视频理解与生活记录系统
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            基于多模态长视频理解的生活回忆与关键事件检索系统。通过全上下文视频特征解构与视觉实体证据溯源，辅助用户高效整理日常记录并消除大模型的事实幻觉。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">团队协作角色</span>
              <span className="text-[#161719] font-medium">技术实现与算法流程迭代</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">核心路径</span>
              <span className="text-[#161719] font-medium">full_context 全量时序解构</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">仲裁机制</span>
              <span className="text-[#161719] font-medium">实体视觉证据 Bounding Box 关联</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">协作边界</span>
              <span className="text-[#1d3e6d] font-semibold">前期设计与部署由组员分工负责</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={lifelogHero} 
            alt="Lifelog Video Pipeline Technical Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            算法流水线拓扑 · 关键帧提取、独立实体定位与语义仲裁节点
          </div>
        </div>

        {/* Detailed Responsibilities */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1d3e6d] mb-4 uppercase tracking-wider">
              <CheckCircle2 size={16} />
              <span>Clara 主导实现的技术模块</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">算法流程落地与工程验证</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#1d3e6d] font-mono font-bold mt-0.5">01.</span>
                <div>
                  <strong className="text-[#161719] font-medium">full_context 理解主干路径确立：</strong>
                  放弃传统粗暴切片丢失因果关系的方案，确立长视频全时序上下文主干特征提取。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1d3e6d] font-mono font-bold mt-0.5">02.</span>
                <div>
                  <strong className="text-[#161719] font-medium">实体视觉证据核验与关键帧提取：</strong>
                  设计实体在时间轴中的对应关键帧定位与目标框关联算法，提供客观可视证据链。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#1d3e6d] font-mono font-bold mt-0.5">03.</span>
                <div>
                  <strong className="text-[#161719] font-medium">语义冲突仲裁与提问生成：</strong>
                  设计基于置信度判定与实体特征比对的仲裁状态节点，在出现矛盾时生成针对性澄清问题。
                </div>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5e626b] mb-4 uppercase tracking-wider">
              <Users size={16} />
              <span>团队分工与诚信边界说明</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">客观边界与角色定位</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">A.</span>
                <div>
                  <strong className="text-[#161719] font-medium">前期产品与交互定义：</strong>
                  由课题组师姐牵头主导，明确生活记录与回忆检索的痛点需求与概念框架。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">B.</span>
                <div>
                  <strong className="text-[#161719] font-medium">线上环境运维与部署：</strong>
                  由负责后端运维与集群部署的组员推进，非个人独立运维全套服务。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">C.</span>
                <div>
                  <strong className="text-[#161719] font-medium">技术学习收益：</strong>
                  通过本次深度工程实践，扎实积累了多模态模型幻觉消除、视觉推理链路与工程调优经验。
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#1d3e6d] font-bold text-xs uppercase tracking-wider mb-2">/* 项目复盘与技术反思 */</div>
          “在生活回忆这种容错率极低、依赖真实事实的场景下，任何虚构的幻觉都会迅速摧毁用户对系统的信任。这也是我为什么坚持确立 full_context 证据核验与语义仲裁链路：智能体必须诚实指出‘我为什么得出这个结论’，甚至在无法确定时坦诚向用户求证，而不是自信地给出错误回答。”
        </div>

      </div>
    </div>
  );
}
