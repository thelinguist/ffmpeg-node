import fs from "fs/promises"
import { FileParts } from "./parseFileInput"
export const prepareFolders = async ({ basePath, baseName }: FileParts, type?: string) => {
    const dir = `${basePath}/${baseName}/${type??''}`
    await fs.mkdir(dir, { recursive: true })

    return dir
}
