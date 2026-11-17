import { ArrowLeft, CheckCircle2, Layers, Compass, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import overlayHero from "../assets/images/learning_overlay_browser_1791702809534.jpg";

export function LearningOverlayProject() {
  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-28 px-6 lg:px-12 pb-24 selection:bg-[#ccff00] selection:text-black relative bg-tactile-paper">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-[#d69836] text-xs font-semibold text-[#5e626b] hover:text-[#d69836] transition-all paper-shadow"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>
        </div>

        {/* Header Block with Editorial Metadata */}
        <div className="border-b border-black/[0.08] pb-10 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#5e626b] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#d69836]/15 text-[#9e6918] font-semibold">
              STATUS: 个人在研 · 最小可运行闭环搭建中 (MVP)
            </span>
            <span>·</span>
            <span>Chrome 扩展 · DOM 选区解析 · 原地回指</span>
            <span>·</span>
            <span>2025 (进行中)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            Adaptive Learning Overlay ｜ 浏览器内嵌学习 Agent
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            消除学习复杂技术文档时，在浏览器网页与独立 AI 对话窗口之间频繁复制粘贴与跳转割裂的认知摩擦。让智能体像半透明薄纸一样贴在网页之上。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">项目性质</span>
              <span className="text-[#161719] font-medium">Clara 独立全栈原型实验</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">形态载体</span>
              <span className="text-[#161719] font-medium">Chrome Extension + 后端推理</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">核心技术</span>
              <span className="text-[#161719] font-medium">DOM Range 捕捉与锚点回指</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">当前进度</span>
              <span className="text-[#d69836] font-semibold">正在解决动态网页重渲染漂移</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={overlayHero} 
            alt="Adaptive Learning Overlay Browser Extension UI" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            界面原型 · 原地划选解析气泡与知识卡片剪藏抽屉
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#d69836] mb-4 uppercase tracking-wider">
              <CheckCircle2 size={16} />
              <span>核心设计点与已完成架构</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">零跳转的原地阅读辅助</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#d69836] font-mono font-bold mt-0.5">01.</span>
                <div>
                  <strong className="text-[#161719] font-medium">选区拦截与微小工具条呼出：</strong>
                  当用户划选陌生代码或术语，原地浮现非侵入式轻量控件，提供分级解释（速查 vs 深度溯源）。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d69836] font-mono font-bold mt-0.5">02.</span>
                <div>
                  <strong className="text-[#161719] font-medium">显式证据回指（Anchor Link）：</strong>
                  模型生成的解答必须附带原文依据锚点，点击直接平滑滚动并闪烁高亮原文段落。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d69836] font-mono font-bold mt-0.5">03.</span>
                <div>
                  <strong className="text-[#161719] font-medium">轻量知识卡片抽取：</strong>
                  一键提取结构化概念，沉淀为个人学习笔记，避免信息随对话结束而遗忘。
                </div>
              </li>
            </ul>
          </div>

          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5e626b] mb-4 uppercase tracking-wider">
              <Compass size={16} />
              <span>当前挑战与工程攻关</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">真实 Web 环境的工程复杂度</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">A.</span>
                <div>
                  <strong className="text-[#161719] font-medium">SPA 动态重渲染的锚点失效：</strong>
                  现代网页频繁销毁与重建 DOM 树，正探索结合文本指纹与相对路径的模糊锚定策略。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">B.</span>
                <div>
                  <strong className="text-[#161719] font-medium">低延时流式推理体验：</strong>
                  为避免破坏阅读心流，在后端微服务中采用 Server-Sent Events 流式推流与前端局部渲染。
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#d69836] font-bold text-xs uppercase tracking-wider mb-2">/* 项目复盘与交互反思 */</div>
          “把工具从独立的 Tab 页搬进用户的实际工作场景中，看似只是一个插件形态，背后却需要重构人机交互的注意力分配。我不希望 AI 是一个每次都要‘切换视线去请教’的导师，而希望它像一把放大镜，随时随地就地展开。”
        </div>

      </div>
    </div>
  );
}
