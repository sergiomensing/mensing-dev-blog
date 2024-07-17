## Optimizing videos

1. Put unoptimized videos in `public/videos/.unoptimized`
2. Run the following command:

```
npx tsx ./scripts/optimize-videos.ts
```

### Optimizing videos manually

Source: https://web.dev/learn/performance/video-performance

Use the following commands when inside the `public/videos` dir.

1. Generate a webm file
```
ffmpeg -i .unoptimized/input.mov -an output.webm
```

2. Generate a mp4 file
```
ffmpeg -i .unoptimized/input.mov -an output.mp4
```

3. Generate a poster file (thumbnail)
```
ffmpeg -i .unoptimized/input.mov -frames:v 1 output.jpg
```


> -an removes the audio track