"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export function DevOnlyScalarApi() {
  return (
    <ApiReferenceReact
      configuration={{
        url: "/openapi.yaml",
        theme: "default",
        searchHotKey: "k",
      }}
    />
  );
}

export function ProductionPlaceholder() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>API Documentation</h1>
      <p>This page is only active in development mode.</p>
    </div>
  );
}
