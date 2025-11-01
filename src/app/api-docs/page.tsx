import { DevOnlyScalarApi } from "@/presentation/components/DevOnlyScalarApi";
import { notFound } from "next/navigation";

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default function ApiDocsPage() {
  if (!IS_DEVELOPMENT) {
    notFound();
  }

  return (
    <div style={{ height: "100vh" }}>
      <DevOnlyScalarApi />
    </div>
  );
}
