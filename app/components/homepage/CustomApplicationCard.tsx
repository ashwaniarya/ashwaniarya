"use client";

import { Card } from "@/app/components/content/Card";
import { useOpenServiceInquiry } from "@/app/components/homepage/ServiceInquiryDialog";
import { homepageServicesSectionCopyConfiguration } from "@/app/config/homepageServicesConfiguration";
import { homepageServicesSectionPolicy } from "@/app/constants/policy";

/** The 8th Services card. Its button opens the one inquiry dialog owned by ServiceInquiryDialogProvider. */
export function CustomApplicationCard() {
  const copy = homepageServicesSectionCopyConfiguration.customApplication;
  const policy = homepageServicesSectionPolicy;
  const openInquiry = useOpenServiceInquiry();
  return (
    <Card className={policy.cardClassName}>
      <h3 className={policy.cardTitleClassName}>{copy.title}</h3>
      <p className="text-sm text-textSecondary">{copy.summary}</p>
      <div className={policy.cardFooterClassName}>
        <button
          type="button"
          className={policy.bookLinkClassName}
          aria-haspopup="dialog"
          onClick={() => openInquiry?.()}
          data-test="custom-application-open"
        >
          {copy.buttonLabel}
        </button>
      </div>
    </Card>
  );
}
