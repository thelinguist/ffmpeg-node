import { prepareFolders } from "../../utils/prepareFolders"
import { wrapper } from "../helpers"
import { h265 } from "../../processors"

export const createH265 = wrapper(async (parsed, options) => {
    const destDir = await prepareFolders(parsed, "h265")

    const resolutions = options.resolutions ?? [undefined, 720]
    const bitRates = options.bitRates ?? [undefined]

    let counter = 0
    for (const resolution of resolutions) {
        for (const bitRate of bitRates) {
            if (counter > 0 && options.oneConversion) {
                break
            }
            await h265({
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
})
