import Ffmpeg from "fluent-ffmpeg"
import { executeAndWatch } from "./executeAndWatch"
import fs from 'fs/promises'
interface Params {
    sourcePath: string
    destDir: string
    count: number
    dimensions?: string
}

/**
 * # save thumbnails with the timecode as the filename
 *
 * @param sourcePath
 * @param destDir
 * @param resolution
 * @param count
 * @param dimensions string
 */

export const thumbnails = async ({ sourcePath, destDir, count, dimensions }: Params): Promise<string[]> => {
    let filenames: string[]
    const command = Ffmpeg(sourcePath)
        .screenshots({
            folder: destDir,
            filename: "thumb%s.png",
            count,
            size: dimensions,
        })
        .on("filenames", function (newFilenames) {
            filenames = newFilenames
        })
        .output(`${destDir}/thumb%s.png`)
    await executeAndWatch(command)
    await removeFile(`${destDir}/thumb%s.png`)
    return filenames!
}

const removeFile = async (fileName: string): Promise<void> => {
    await fs.rm(fileName)
}