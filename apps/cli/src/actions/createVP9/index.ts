import { prepareFolders } from "../../utils/prepareFolders"
import { wrapper } from "../helpers"
import { vp9 } from "../../processors"

export const createVP9 = wrapper(async (parsed, options) => {
    const destDir = await prepareFolders(parsed, "vp9")

    const resolutions = options.resolutions ?? [undefined, 720]
    const bitRates = options.bitRates ?? [undefined]

    let counter = 0
    for (const resolution of resolutions) {
        for (const bitRate of bitRates) {
            if (counter > 0 && options.oneConversion) {
                break
            }
            await vp9({
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
