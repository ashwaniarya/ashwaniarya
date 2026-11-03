"use client";

import { useRef, useState } from "react";
import { TbPlayerPlayFilled } from "react-icons/tb";

import type { CaseStudyDemoVideoConfiguration } from "@/app/config/caseStudyDemoVideoConfiguration";
import { caseStudyDemoVideoPolicy } from "@/app/constants/policy";

export type CaseStudyDemoVideoPlayerProps = Readonly<{
  demoVideo: CaseStudyDemoVideoConfiguration;
}>;

/**
 * Poster-first demo video. Native controls appear once playback starts, so the idle state is just
 * the poster and one labelled play button; `preload="none"` means only the poster loads up front.
 */
export function CaseStudyDemoVideoPlayer({ demoVideo }: CaseStudyDemoVideoPlayerProps) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [hasPlaybackStarted, setHasPlaybackStarted] = useState(false);

  function startPlayback() {
    setHasPlaybackStarted(true);
    void videoElementRef.current?.play();
  }

  return (
    <div className={caseStudyDemoVideoPolicy.frameClassName}>
      <video
        ref={videoElementRef}
        className={caseStudyDemoVideoPolicy.videoClassName}
        width={demoVideo.width}
        height={demoVideo.height}
        poster={demoVideo.posterSrc}
        preload={caseStudyDemoVideoPolicy.videoPreload}
        controls={hasPlaybackStarted}
        playsInline
        aria-label={demoVideo.videoAriaLabel}
        onPlay={() => setHasPlaybackStarted(true)}
      >
        <source src={demoVideo.mp4Src} type="video/mp4" />
        <track
          kind="captions"
          src={demoVideo.captionsSrc}
          srcLang={demoVideo.captionsLanguage}
          label={demoVideo.captionsLabel}
        />
      </video>
      {hasPlaybackStarted ? null : (
        <button
          type="button"
          onClick={startPlayback}
          aria-label={demoVideo.playButtonAriaLabel}
          className={caseStudyDemoVideoPolicy.playButtonClassName}
        >
          <span aria-hidden="true" className={caseStudyDemoVideoPolicy.playButtonDiscClassName}>
            <TbPlayerPlayFilled className={caseStudyDemoVideoPolicy.playButtonIconClassName} />
            {demoVideo.title}
            <span className={caseStudyDemoVideoPolicy.durationLabelClassName}>{demoVideo.durationLabel}</span>
          </span>
        </button>
      )}
    </div>
  );
}
