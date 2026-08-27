import type { ReactNode } from "react";

import { layoutConfiguration } from "@/app/config/siteConfiguration";

export function PageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={[
        "mx-auto w-full",
        layoutConfiguration.maximumPageWidthClassName,
        layoutConfiguration.pageHorizontalPaddingClassName,
        layoutConfiguration.pageVerticalPaddingClassName,
        "focus:outline-none",
      ].join(" ")}
    >
      {children}
    </main>
  );
}


