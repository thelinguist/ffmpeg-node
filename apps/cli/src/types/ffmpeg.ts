// see https://www.npmjs.com/package/fluent-ffmpeg
export type ProgressEvent = {
    /**
     * total processed frame count
     */
    frames: number
    /**
     * framerate at which FFmpeg is currently processing
     */
    currentFps: number
    /**
     * throughput at which FFmpeg is currently processing
     */
    currentKbps: number
    /**
     *  current size of the target file in kilobytes
     */
    targetSize: number
    /**
     * the timestamp of the current frame in seconds
     */
    timemark: number
    /**
     * an estimation of the progress percentage
     */
    percent: number
}
