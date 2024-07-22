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

/**
 * generated Ffmpeg.ffprobe()
 * or
 * ffprobe -of json -show_streams -show_format /path/to/file.avi
 */
export type StreamFormat = {
    index: number
    codec_name: string
    codec_long_name: string
    profile: string
    codec_type: string
    codec_time_base: string
    codec_tag_string: string
    codec_tag: string
    width: number
    height: number
    has_b_frames: string
    sample_aspect_ratio: string
    display_aspect_ratio: string
    pix_fmt: string
    level: number
    r_frame_rate: string
    avg_frame_rate: string
    time_base: string
    start_pts: number
    start_time: number
    duration_ts: number
    duration: number
    bit_rate: number
    nb_frames: number
    disposition: {
        default: number
        dub: number
        original: number
        comment: number
        lyrics: number
        karaoke: number
        forced: number
        hearing_impaired: number
        visual_impaired: number
        clean_effects: number
        attached_pic: number
    }
    tags: {
        creation_time: string // iso date
        language: string
        handler_name: string
    }
}

export type StreamFormats = {
    streams: StreamFormat[]
}
