import { wrapper } from "../helpers"
import { prepareFolders } from "../../utils/prepareFolders"
import { thumbstrip } from "../../processors"

export const createThumbStrip = wrapper(async (parsed, options) => {
    const destDir = await prepareFolders(parsed,'thumbnails')
    await thumbstrip({
        sourcePath: parsed.fullPath,
        destDir
    })
    return destDir
})