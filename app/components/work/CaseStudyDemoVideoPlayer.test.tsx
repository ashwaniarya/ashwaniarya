import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { pulseboardCaseStudyConfiguration } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";

import { CaseStudyDemoVideoPlayer } from "./CaseStudyDemoVideoPlayer";

const { demoVideo } = pulseboardCaseStudyConfiguration;
const renderedMarkup = renderToStaticMarkup(<CaseStudyDemoVideoPlayer demoVideo={demoVideo} />);

describe("CaseStudyDemoVideoPlayer", () => {
  it("defers the video download until play and shows the poster", () => {
    expect(renderedMarkup).toContain('preload="none"');
    expect(renderedMarkup).toContain(`poster="${demoVideo.posterSrc}"`);
    expect(renderedMarkup).toContain(`src="${demoVideo.mp4Src}"`);
  });

  it("plays inline without native controls until playback starts", () => {
    expect(renderedMarkup).toContain("playsInline");
    expect(renderedMarkup).not.toMatch(/<video[^>]*\scontrols/);
  });

  it("ships an English captions track", () => {
    expect(renderedMarkup).toContain('kind="captions"');
    expect(renderedMarkup).toContain(`src="${demoVideo.captionsSrc}"`);
  });

  it("labels the video and its play button", () => {
    expect(renderedMarkup).toContain(`aria-label="${demoVideo.videoAriaLabel}"`);
    expect(renderedMarkup).toContain(`aria-label="${demoVideo.playButtonAriaLabel}"`);
  });
});
