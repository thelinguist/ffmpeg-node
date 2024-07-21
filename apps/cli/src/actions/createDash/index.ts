import { prepareFolders } from "../../utils/prepareFolders"
import { dash } from "../../processors"
import { wrapper } from "../helpers"

export const createDash = wrapper(async (parsed, options) => {
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
})
