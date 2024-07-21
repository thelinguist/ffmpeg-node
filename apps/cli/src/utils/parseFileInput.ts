import * as path from "path"

export interface FileParts {
    /**
     * path only, ex ~/folder1/childFolder
     */
    basePath: string
    /**
     * full file name, ex:
     * video.mp4
     */
    baseName: string
    /**
     * file name, ex:
     * video
     */
    fileName: string
    /**
     * extension, ex:
     * .mp4
     */
    ext: string
    /**
     * everything but the ext
     */
    fileNameAndPath: string
    /**
     * everything
     */
    fullPath: string
}
export const parseFileInput = (inputFile: string): FileParts => {
    const realPath = path.resolve(process.cwd(), inputFile)
    const parsed = path.parse(realPath)
    const { ext } = parsed
    return {
        basePath: parsed.dir || ".",
        baseName: parsed.name,
        fileName: parsed.base,
        ext: ext,
        fileNameAndPath: [parsed.dir, parsed.base].join("/"),
        fullPath: realPath,
    }
}
