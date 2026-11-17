import { ArrowLeft, CheckCircle2, Clock, Terminal, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import popboxHero from "../assets/images/popbox_cores3_prototype_1791702790117.jpg";

export function PopBoxProject() {
  return (
    <div className="w-full bg-[#f8f6f0] text-[#161719] min-h-screen pt-28 px-6 lg:px-12 pb-24 selection:bg-[#ccff00] selection:text-black relative bg-tactile-paper">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-10">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] hover:border-black text-xs font-semibold text-[#5e626b] hover:text-[#161719] transition-all paper-shadow"
          >
            <ArrowLeft size={14} /> 返回精选作品列表
          </Link>
        </div>

        {/* Header Block with Editorial Metadata */}
        <div className="border-b border-black/[0.08] pb-10 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#5e626b] mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#161719] text-[#ccff00] font-semibold">
              STATUS: 已完成可运行硬件原型
            </span>
            <span>·</span>
            <span>CoreS3 硬件交互 · 角色工作流 · 软硬件闭环</span>
            <span>·</span>
            <span>2024</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-editorial-cn font-bold tracking-tight text-[#161719] mb-6">
            PopBox ｜ 智能潮玩陪伴系统
          </h1>

          <p className="text-base sm:text-lg text-[#44474f] max-w-3xl font-light leading-relaxed mb-8">
            让用户收藏的实体潮玩或盲盒角色具备数字身份，能够与现实生活中的用户对话、互动，并在固定工作流下实现多角色跨界交互。
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs">
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">我的职责</span>
              <span className="text-[#161719] font-medium">网页前端与硬件端代码实现 (AI 辅助编程)</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">硬件载体</span>
              <span className="text-[#161719] font-medium">M5Stack CoreS3</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">交互模态</span>
              <span className="text-[#161719] font-medium">角色识别 · 语音对话 · 双角色状态机</span>
            </div>
            <div>
              <span className="text-[#5e626b] block text-[11px] mb-1">项目性质</span>
              <span className="text-[#161719] font-semibold">原型构建与功能验证</span>
            </div>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-black/[0.08] bg-white mb-12 relative paper-shadow-lg">
          <img 
            src={popboxHero} 
            alt="PopBox CoreS3 Physical Computing Prototype" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs text-[#161719] font-medium border border-black/[0.08] shadow-xs">
            实物测试台 · M5Stack CoreS3 屏幕角色面部与按键工作流
          </div>
        </div>

        {/* Feature Breakdown: What's Built vs What's Speculative */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Completed Features */}
          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-4 uppercase tracking-wider">
              <CheckCircle2 size={16} />
              <span>已完整实现的功能（Verified Prototype）</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">核心硬件与对话闭环</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-mono font-bold mt-0.5">01.</span>
                <div>
                  <strong className="text-[#161719] font-medium">角色人设与背景驱动对话：</strong>
                  为每个潮玩编写独立的性格设定、知识边界与说话语气，支持根据上下文生成拟真情绪反馈。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-mono font-bold mt-0.5">02.</span>
                <div>
                  <strong className="text-[#161719] font-medium">固定工作流下的双角色群聊：</strong>
                  构建两个不同人设角色的轮流发言状态机，实现用户旁听或插话参与的群聊场景。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-mono font-bold mt-0.5">03.</span>
                <div>
                  <strong className="text-[#161719] font-medium">CoreS3 硬件端识别与语音互动：</strong>
                  完成 CoreS3 的固件通信、麦克风拾音、屏幕表情渲染与扬声器语音播报链路联调。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-mono font-bold mt-0.5">04.</span>
                <div>
                  <strong className="text-[#161719] font-medium">AI 辅助编程协同开发：</strong>
                  在硬件驱动与前后端联调过程中，探索利用 LLM 辅助编写串口协议与状态机代码的高效范式。
                </div>
              </li>
            </ul>
          </div>

          {/* Subsequent Speculations (Strictly marked as future ideas) */}
          <div className="p-7 rounded-2xl bg-white border border-black/[0.08] paper-shadow">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5e626b] mb-4 uppercase tracking-wider">
              <Clock size={16} />
              <span>后续设想（尚未实装，未来探索方向）</span>
            </div>
            <h3 className="text-lg font-bold text-[#161719] mb-4 font-editorial-cn">长期陪伴与空间生态规划</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-[#44474f] font-light leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">A.</span>
                <div>
                  <strong className="text-[#161719] font-medium">异步留言信箱：</strong>
                  当用户离家或未开启设备时，角色根据环境与时间主动留下的关怀便签（设想中）。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">B.</span>
                <div>
                  <strong className="text-[#161719] font-medium">生活照片墙互换：</strong>
                  用户与潮玩基于日常经历的共同图像档案与回忆挂饰系统（设想中）。
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#5e626b] font-mono font-bold mt-0.5">C.</span>
                <div>
                  <strong className="text-[#161719] font-medium">共同叙事与羁绊成长：</strong>
                  基于多周交互历史沉淀的动态小说式共同故事生成机制（设想中）。
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Reflection Note */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] paper-shadow text-xs sm:text-sm text-[#44474f] leading-relaxed">
          <div className="text-[#161719] font-bold text-xs uppercase tracking-wider mb-2 font-mono">/* 项目复盘与交互反思 */</div>
          “潮玩的生命感并非来自复杂的全知大模型，而是来自特定的具身限制与人设边界。CoreS3 小屏幕上的像素表情和轻巧按键，反而比网页端的长文对话框更有玩具的实体感。这次软硬件闭环让我深刻体会到：把 AI 带入物理世界的关键，是设计能让人会心一笑的轻巧物理反馈。”
        </div>

      </div>
    </div>
  );
}
