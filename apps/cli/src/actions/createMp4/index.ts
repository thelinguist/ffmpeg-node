import { prepareFolders } from "../../utils/prepareFolders"
import { mp4 } from "../../processors"
import { AutoFfmpegSubCommand } from "../helpers"

export const createMp4: AutoFfmpegSubCommand = async (parsed, options) => {
    const destDir = await prepareFolders(parsed, "mp4")

    const resolutions = options.resolutions ?? [undefined, 720]
    const bitRates = options.bitRates ?? ["500k", "1000k", "2000k", "4000k"]

    let counter = 0
    for (const resolution of resolutions) {
        for (const bitRate of bitRates) {
            if (counter > 0 && options.oneConversion) {
                break
            }
            await mp4({
                resolution,
                bitRate,
                sourcePath: parsed.fullPath,
                fps: options.fpsOverride,
                destDir,
                fileBaseName: parsed.baseName,
                sampleTime: options.sampleTime,
            })
            counter++
        }
    }
    return destDir
}
