import React from "react";
import { Routes, Route } from "react-router-dom";

import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";

export const useRoutes = (isAuthentificated) => {
  if (isAuthentificated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/details/:id" element={<DetailPage />} />

        <Route path="*" element={<CreatePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
