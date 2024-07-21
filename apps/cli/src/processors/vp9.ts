import Ffmpeg from "fluent-ffmpeg"
import { addHandlers } from "./addHandlers"
import { getSegmentName } from "./fileNames"

interface Params {
    sourcePath: string
    destDir: string
    fps?: number
    sampleTime?: number
    fileBaseName: string
    resolution?: number
    bitRate: string // ex 500k
}

export const vp9 = async ({ sourcePath, fps, sampleTime, destDir, fileBaseName, resolution, bitRate }: Params) => {
    const command = Ffmpeg(sourcePath).videoCodec("libvpx-vp9").audioCodec("libvorbis").format("segment")
    if (resolution) {
        command.size(`${resolution}x?`)
    }
    if (fps) {
        command.fps(fps)
    }
    if (sampleTime) {
        command.setStartTime(10).duration(sampleTime)
    }

    const segmentFileName = getSegmentName(destDir, fileBaseName, resolution, bitRate, 'm3u8')
    const outputName = getSegmentName(destDir, fileBaseName, resolution, bitRate, 'webm', true)

    command
        .videoBitrate(0)
        .addOption("-crf", "30")
        .addOption("-segment_time", "10") // this splits up the hls into 10min chunks
        .addOption("-segment_list", segmentFileName)
        .addOption("-segment_format", "webm")
        .output(outputName)
    await addHandlers(command)
}