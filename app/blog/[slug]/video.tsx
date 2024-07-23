"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";

export const Video = ({
  videoKey,
  caption,
}: { videoKey: string; caption?: string; autoPlay?: boolean }) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  const observer = useInView({
    triggerOnce: true,
    threshold: 0,
    onChange: (inView, entry) => {
      if (!inView) return;

      for (const child of Array.from(entry.target.childNodes)) {
        const source = child as HTMLSourceElement;

        if (typeof source.tagName === "string" && source.tagName === "SOURCE") {
          source.src = source.dataset.src as string;
        }
      }

      // We know it's a video element because we put the ref there.
      (entry.target as HTMLVideoElement).load();
    },
  });

  const videoEl = (
    <video
      ref={(el) => {
        observer.ref(el);
        ref.current = el;
      }}
      autoPlay={true}
      muted
      loop
      playsInline={true}
      poster={`/videos/${videoKey}.jpg`}
    >
      <source data-src={`/videos/${videoKey}.webm`} type="video/webm" />
      <source data-src={`/videos/${videoKey}.mp4`} type="video/mp4" />
    </video>
  );

  if (caption) {
    return (
      <figure>
        {videoEl}
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }

  return videoEl;
};
