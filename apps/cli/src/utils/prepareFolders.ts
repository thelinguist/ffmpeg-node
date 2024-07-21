import fs from 'fs/promises'
import { FileParts } from "./parseFileInput"
export const prepareFolders = async ({basePath, baseName}: FileParts) => {
    const hlsDir = `${basePath}/${baseName}/hls`
    await fs.mkdir(`${basePath}/${baseName}/hls`, { recursive: true })

    return {
        hlsDir
    }
}