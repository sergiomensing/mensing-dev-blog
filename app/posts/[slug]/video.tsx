export const Video = ({
  videoKey,
  caption,
}: { videoKey: string; caption?: string }) => {
  const videoEl = (
    <video
      autoPlay={true}
      muted
      loop
      playsInline={true}
      controls={false}
      poster={`/videos/${videoKey}.jpg`}
    >
      <source src={`/videos/${videoKey}.webm`} type="video/webm" />
      <source src={`/videos/${videoKey}.mp4`} type="video/mp4" />
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
