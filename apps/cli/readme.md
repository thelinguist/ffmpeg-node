# Intro
This project makes web optimized videos by breaking them up and encoding them in different formats.
## Technical
This project is a light node.js based wrapper around ffmpeg (must be installed separate). It has some predefined commands that format the video.

# How to
1. install ffmpeg
2. install node
3. install this project (pnpm i)
4. run the script (see `pnpm run demo`, it will run the `all` command)

As a manual step, ffmpeg might throw an error making thumbnails near the end. If it's created all of them, just proceed with the final step, the thumbstrip.

Lastly, you may want to tend the thumbstrip.vtt because the vidstack that uses it does not do relative spaths.