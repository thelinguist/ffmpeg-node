import Ffmpeg from "fluent-ffmpeg"
import { getSegmentName } from "./fileNames"
import { addHandlers } from "./addHandlers"

interface Params {
    sourcePath: string
    destDir: string
    fps?: number
    sampleTime?: number
    fileBaseName: string
    resolution?: number
}

export const dash = async ({ sourcePath, fps, sampleTime, destDir, fileBaseName, resolution }: Params) => {
    const command = Ffmpeg(sourcePath).videoCodec("libx264").audioCodec("aac").format("dash")
    if (resolution) {
        command.size(`${resolution}x?`)
    }
    if (fps) {
        command.fps(fps)
    }
    if (sampleTime) {
        command.setStartTime(10).duration(sampleTime)
    }

    const segmentFileName = getSegmentName(destDir, fileBaseName, resolution, undefined, "ts", true)
    const outputName = getSegmentName(destDir, fileBaseName, resolution, undefined, "mpd", false)
    command
        .addOption("-seg_duration", "10") // this splits up the hls into 10min chunks
        .addOption("-window_size", "5")
        // .addOption("-extra-window_size", "5")
        .addOption("-hls_segment_filename", segmentFileName)
        .output(outputName)
    await addHandlers(command)
    return destDir
}
