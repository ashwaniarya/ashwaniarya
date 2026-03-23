import {
  footerConfiguration,
  layoutConfiguration,
  siteIdentityConfiguration,
} from "@/app/config/siteConfiguration";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-backgroundPage">
      <div
        className={[
          "mx-auto w-full text-sm text-textPrimary/70",
          layoutConfiguration.maximumPageWidthClassName,
          layoutConfiguration.pageHorizontalPaddingClassName,
          layoutConfiguration.footerVerticalPaddingClassName,
        ].join(" ")}
      >
        <p>
          © {new Date().getFullYear()} {siteIdentityConfiguration.ownerName}.{" "}
          {footerConfiguration.footerTagline}
        </p>
      </div>
    </footer>
  );
}


