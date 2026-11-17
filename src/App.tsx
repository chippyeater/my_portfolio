/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { PopBoxProject } from "./pages/PopBoxProject";
import { LifelogProject } from "./pages/LifelogProject";
import { LearningOverlayProject } from "./pages/LearningOverlayProject";
import { ThesisProject } from "./pages/ThesisProject";
import { LogicWeaverProject } from "./pages/LogicWeaverProject";
import { MeseeProject } from "./pages/MeseeProject";
import { ResonanceProject } from "./pages/ResonanceProject";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
      
      {/* Project detail pages */}
      <Route path="/project/popbox" element={<PopBoxProject />} />
      <Route path="/project/lifelog" element={<LifelogProject />} />
      <Route path="/project/learning-overlay" element={<LearningOverlayProject />} />
      <Route path="/project/thesis" element={<ThesisProject />} />
      <Route path="/project/logicweaver" element={<LogicWeaverProject />} />
      <Route path="/project/mesee" element={<MeseeProject />} />
      <Route path="/project/resonance" element={<ResonanceProject />} />

      {/* Fallback route */}
      <Route path="*" element={<div className="min-h-screen pt-32 text-center text-xl font-mono text-stone-400">404 · 档案条目不存在</div>} />
    </Routes>
  );
}
