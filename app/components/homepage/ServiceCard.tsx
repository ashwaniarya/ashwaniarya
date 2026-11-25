import { Card } from "@/app/components/content/Card";
import {
  formatServicePriceUsd,
  homepageServicesSectionCopyConfiguration,
  type ContraServiceRecord,
} from "@/app/config/homepageServicesConfiguration";
import { homepageServicesSectionPolicy } from "@/app/constants/policy";

export function ServiceCard({ service }: Readonly<{ service: ContraServiceRecord }>) {
  const policy = homepageServicesSectionPolicy;
  const { maxVisibleTags, bookLinkLabel } = homepageServicesSectionCopyConfiguration;
  const visibleTags = service.tags.slice(0, maxVisibleTags);
  const hiddenTagCount = service.tags.length - visibleTags.length;
  return (
    <Card className={policy.cardClassName}>
      <h3 className={policy.cardTitleClassName}>{service.title}</h3>
      <p className={policy.priceClassName} data-test="service-price">
        {formatServicePriceUsd(service.priceUsd)}
      </p>
      <ul className={policy.tagRowClassName} aria-label="Tags">
        {visibleTags.map((tag) => (
          <li key={tag} className={policy.tagClassName}>
            {tag}
          </li>
        ))}
        {hiddenTagCount > 0 ? (
          <li className={policy.tagClassName} title={service.tags.slice(maxVisibleTags).join(", ")}>
            <span aria-hidden="true">+{hiddenTagCount}</span>
            <span className="sr-only" data-test="service-hidden-tags">
              more tags: {service.tags.slice(maxVisibleTags).join(", ")}
            </span>
          </li>
        ) : null}
      </ul>
      <div className={policy.cardFooterClassName}>
        <a
          href={service.contraUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={policy.bookLinkClassName}
          data-test="service-book-link"
        >
          {bookLinkLabel}
          <span className="sr-only">: {service.title} (opens in a new tab)</span>
        </a>
      </div>
    </Card>
  );
}
