import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoadingState } from "@/shared/components/LoadingState";
import { HomeRedirect } from "./HomeRedirect";
import { routes } from "@/routes";

export function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Routes>
        {routes.map(({ path, element, guard: Guard }) => {
          const el = Guard ? <Guard>{element}</Guard> : element;
          return <Route key={path} path={path} element={el} />;
        })}
        <Route path="/" element={<HomeRedirect />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}
