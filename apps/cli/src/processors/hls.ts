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

export const hls = async ({ sourcePath, fps, sampleTime, destDir, fileBaseName, resolution }: Params) => {
    const command = Ffmpeg(sourcePath).videoCodec("libx264").audioCodec("aac").format("hls")
    if (resolution) {
        command.size(`${resolution}x?`)
    }
    if (fps) {
        command.fps(fps)
    }
    if (sampleTime) {
        command.setStartTime(10).duration(sampleTime)
    }

    const segmentFileName = resolution
        ? `${destDir}/${fileBaseName}_${resolution}-%d.ts`
        : `${destDir}/${fileBaseName}-%d.ts`
    const outputName = resolution ? `${destDir}/${fileBaseName}_${resolution}.m3u8` : `${destDir}/${fileBaseName}.m3u8`
    command
        .addOption("-hls_time", "10") // this splits up the hls into 10 second chunks
        .addOption("-hls_list_size", "0")
        .addOption("-hls_segment_filename", segmentFileName)
        .output(outputName)
    await addHandlers(command)
}
