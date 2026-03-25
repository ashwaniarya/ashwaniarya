import { SiGithub } from "react-icons/si";
import { describe, expect, it } from "vitest";

import { resolveContactChannelIcon } from "@/app/config/contactChannelIconRegistry";

describe("resolveContactChannelIcon", () => {
  it("returns GitHub icon for github channel key", () => {
    expect(resolveContactChannelIcon("github")).toBe(SiGithub);
  });
});
