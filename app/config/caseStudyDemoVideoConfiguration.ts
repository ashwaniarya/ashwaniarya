/** A case study's demo video: an MP4 with a poster frame and a WebVTT captions track, all served from `public/`. */
export type CaseStudyDemoVideoConfiguration = Readonly<{
  mp4Src: string;
  posterSrc: string;
  captionsSrc: string;
  captionsLanguage: string;
  captionsLabel: string;
  /** Intrinsic pixel size of the encode; sets the frame's aspect ratio before anything loads. */
  width: number;
  height: number;
  title: string;
  durationLabel: string;
  playButtonAriaLabel: string;
  videoAriaLabel: string;
}>;
