import type { ReactNode } from "react";

import { layoutConfiguration } from "@/app/config/siteConfiguration";

export function PageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={[
        "mx-auto w-full focus:outline-none",
        layoutConfiguration.maximumPageWidthClassName,
        layoutConfiguration.pageHorizontalPaddingClassName,
        layoutConfiguration.pageVerticalPaddingClassName,
      ].join(" ")}
    >
      {children}
    </main>
  );
}


