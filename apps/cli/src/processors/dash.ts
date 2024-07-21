import Ffmpeg from "fluent-ffmpeg"
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

    const segmentFileName = resolution ? `${destDir}/${fileBaseName}_${resolution}_%03d.ts` : `${destDir}/${fileBaseName}_%03d.ts`
    const outputName = resolution ? `${destDir}/${fileBaseName}_${resolution}.mpd` : `${destDir}/${fileBaseName}.mpd`
    command
        .addOption("-seg_duration", "10") // this splits up the hls into 10min chunks
        .addOption("-window_size", "5")
        // .addOption("-extra-window_size", "5")
        .addOption("-hls_segment_filename", segmentFileName)
        .output(outputName)
    await addHandlers(command)
    return destDir
}
