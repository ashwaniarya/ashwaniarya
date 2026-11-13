import {
  footerConfiguration,
  layoutConfiguration,
} from "@/app/config/siteConfiguration";

export function SiteFooter() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="border-t border-borderDefault bg-backgroundPage">
      <div
        className={[
          "mx-auto w-full text-sm text-textSecondary",
          layoutConfiguration.maximumPageWidthClassName,
          layoutConfiguration.pageHorizontalPaddingClassName,
          layoutConfiguration.footerVerticalPaddingClassName,
        ].join(" ")}
      >
        <p>
          © {copyrightYear}{" "}
          {footerConfiguration.footerCopyrightAttributionLine}
        </p>
      </div>
    </footer>
  );
}


