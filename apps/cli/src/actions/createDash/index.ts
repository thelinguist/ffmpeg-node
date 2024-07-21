import { prepareFolders } from "../../utils/prepareFolders"
import { dash } from "../../processors"
import { AutoFfmpegSubCommand } from "../helpers"

export const createDash: AutoFfmpegSubCommand = async (parsed, options) => {
    const destDir = await prepareFolders(parsed, "dash")

    await dash({
        sourcePath: parsed.fullPath,
        fps: options.fpsOverride,
        destDir,
        fileBaseName: parsed.baseName,
        sampleTime: options.sampleTime,
    })
    if (!options.oneConversion) {
        await dash({
            resolution: 720,
            sourcePath: parsed.fullPath,
            fps: options.fpsOverride,
            destDir,
            fileBaseName: parsed.baseName,
            sampleTime: options.sampleTime,
        })
    }
    return destDir
}
