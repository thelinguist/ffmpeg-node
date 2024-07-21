import { prepareFolders } from "../../utils/prepareFolders"
import { wrapper } from "../helpers"
import { poster } from "../../processors/poster"

export const createPoster = wrapper(async (parsed, options) => {
    const destDir = await prepareFolders(parsed)

    await poster({
        sourcePath: parsed.fullPath,
        destDir,
    })
    return destDir
})
