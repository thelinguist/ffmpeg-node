import { hls } from "../../processors"
import { prepareFolders } from "../../utils/prepareFolders"
import { wrapper } from "../helpers"

export const createHLS = wrapper(async (parsed, options) => {
    const hlsDir = await prepareFolders(parsed, "hls")

    await hls({
        sourcePath: parsed.fullPath,
        fps: options.fpsOverride,
        destDir: hlsDir,
        fileBaseName: parsed.baseName,
        sampleTime: options.sampleTime,
    })
    if (!options.oneConversion) {
        await hls({
            resolution: 720,
            sourcePath: parsed.fullPath,
            fps: options.fpsOverride,
            destDir: hlsDir,
            fileBaseName: parsed.baseName,
            sampleTime: options.sampleTime,
        })
    }
    return hlsDir
})