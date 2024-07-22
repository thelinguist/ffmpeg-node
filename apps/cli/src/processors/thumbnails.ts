import Ffmpeg from "fluent-ffmpeg"
import { executeAndWatch } from "./executeAndWatch"
import fs from 'fs/promises'
interface Params {
    sourcePath: string
    destDir: string
    count: number
    dimensions?: string
    sampleTime?: number
}

/**
 * # save thumbnails with the timecode as the filename
 *
 * @param sourcePath
 * @param destDir
 * @param resolution
 * @param count
 * @param dimensions string
 * @params sampleTime number
 */

export const thumbnails = async ({ sourcePath, destDir, count, dimensions, sampleTime }: Params): Promise<string[]> => {
    let filenames: string[]
    const command = Ffmpeg(sourcePath)
        .screenshots({
            folder: destDir,
            filename: "thumb%000i-%s.png",
            count,
            size: dimensions,
        })
        .on("filenames", function(newFilenames) {
            filenames = newFilenames
        })
        .output(`${destDir}/thumb%000i-%s.png`)
    if (sampleTime) {
        command.setStartTime(10).duration(sampleTime)
    }
    // TODO if indexOf error, thta's because fluent-ffmpeg cant handle the `%i` properly. It did finish though
    await executeAndWatch(command)
    await removeFile(`${destDir}/thumb%000i-%s.png`)
    return filenames!
}

const removeFile = async (fileName: string): Promise<void> => {
    await fs.rm(fileName)
}