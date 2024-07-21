import Ffmpeg from "fluent-ffmpeg"
import { parseFileInput } from "../../utils/parseFileInput"
import { prepareFolders } from "../../utils/prepareFolders"
import { ProgressEvent } from "../../types/ffmpeg"
export const createHLS = async (inputFile, options) => {
    if (!inputFile) {
        console.error("missing input file")
        process.exit(1)
    }
    const parsed = parseFileInput(inputFile)
    const { hlsDir } = await prepareFolders(parsed)

    const command = Ffmpeg(parsed.fullPath).videoCodec("libx264").audioCodec("aac").format("hls")
    if (options.fpsOverride) {
        command.fps(options.fpsOverride)
    }
    if (options.sampleTime) {
        command.setStartTime(10).duration(options.sampleTime)
    }
    command
        .addOption("-hls_time", "10") // this splits up the hls into 10min chunks
        .addOption("-hls_list_size", "0")
        .addOption("-hls_segment_filename", `${hlsDir}/${parsed.baseName}.ts`)
        .addOption("-strftime", "1")
        .output(`${hlsDir}/${parsed.fileName}.m3u8`)
    command.addListener("progress", (event: ProgressEvent) => {
        console.clear()
        console.log(event)
    })
    command.on("error", function (err, stdout, stderr) {
        console.error(err)
        console.error(stdout)
        console.error(stderr)
    })
    command.run()
}
