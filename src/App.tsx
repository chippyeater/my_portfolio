/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { PopBoxProject } from "./pages/PopBoxProject";
import { LifelogProject } from "./pages/LifelogProject";
import { ThesisProject } from "./pages/ThesisProject";
import { LogicWeaverProject } from "./pages/LogicWeaverProject";
import { MeseeProject } from "./pages/MeseeProject";
import { ResonanceProject } from "./pages/ResonanceProject";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Project detail pages */}
        <Route path="/project/popbox" element={<PopBoxProject />} />
        <Route path="/project/lifelog" element={<LifelogProject />} />
        <Route path="/project/thesis" element={<ThesisProject />} />
        <Route path="/project/logicweaver" element={<LogicWeaverProject />} />
        <Route path="/project/mesee" element={<MeseeProject />} />
        <Route path="/project/resonance" element={<ResonanceProject />} />

        {/* Fallback route */}
        <Route path="*" element={<div className="min-h-screen pt-32 text-center text-xl font-mono text-stone-400">404 · 档案条目不存在</div>} />
      </Routes>
    </>
  );
}
