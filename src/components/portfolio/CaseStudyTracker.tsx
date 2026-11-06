"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function CaseStudyTracker({ slug }: { slug: string }) {
  useEffect(() => track("case_study_view", { project: slug }), [slug]);
  return null;
}
