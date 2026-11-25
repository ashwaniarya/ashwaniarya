/**
 * Claims that must never ship again: retired by Ashwani or not in the approved about text.
 * Case-insensitive. One shared list, asserted against every public-copy config in
 * `retiredClaimPatterns.test.ts`. The sourced "24s → 6s" and "90% → 98%" must not match.
 */
export const retiredClaimPatterns: readonly RegExp[] = [
  /since apr(il)? 2026/i,
  /\bYC\b|\bP26\b|y combinator/i,
  /100k ?(\/ ?day|per day|sessions a day|a day|daily)/i,
  /150k arr|\$0 ?(→|to) ?\$?150k/i,
  /30k ?(\/ ?month|conversations)|30,000 conversations/i,
  /20k mrr|\bmrr\b/i,
  /80 (sales )?agents|LG US/i,
  /\b5 ?s(ec(onds?)?)?\b[^.]*\bjoin|\bjoin[^.]*\b5 ?s(ec(onds?)?)?\b/i,
  /\b99(\.\d+)?\s?%/i,
  /\b(257|264|10|17) tests\b/i,
  /18\.7 ?MB|2\.0 ?MB|9\.34 ?x/i,
  /\b57 ms|\b238 ms|4\.1 to 5\.9|under 0\.1 s/i,
  /52[,.]?555|52k(-| )row/i,
  /about (twenty|20) components/i,
  /113 to between 4 and 47/i,
  /1,?900 commits|500 PR merges|225,?000 lines|45,?000 removed/i,
  /153\.9|30\.9 s|106\.8|1\.9 s\b|1\.92 GiB|55 GiB/i,
  /2,?399 ms|316 ms|78 cache scans|26 webhooks|78 commits/i,
  /90 of 90 days|163 to 190/i,
  /1,?814|5,?674|16,?502|38,?804/i,
  /13\.4 ?%|15\.8 ?%|174 snapshots/i,
  /64\.7 ms|10\.2 ms|16\.7 ms|lines ≥ ?90|branches ≥ ?85/i,
  /5K-10K prompts|3-4 days to about 4 hours|about 40 KB|9 e2e specs/i,
];

export function findRetiredClaims(text: string): string[] {
  return retiredClaimPatterns.filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);
}
