import { thumbnails } from "./thumbnails"
import { montage } from "../services/imageMagick"
import { getMediaMetadata } from "../utils/getMediaMetadata"
import { saveVTTDocument } from "../services/vtt"
import { glob } from "glob"

interface Params {
    sourcePath: string
    destDir: string
    resolution?: number
    height?: number
    thumbnailColumns?: number
    thumbnailIntervalSec?: number
    skipThumbnails?: boolean
    sampleTime?: number
}

const HEIGHT = 160
const THUMBNAIL_COLS = 5
const THUMBNAIL_INTERVAL_SECONDS = 30

/**
 * creates a series of thumbnails and then a VTT file to reference them
 */
export const thumbstrip = async ({
    sourcePath,
    destDir,
    height,
    thumbnailColumns,
    thumbnailIntervalSec,
    skipThumbnails,
    sampleTime,
}: Params) => {
    const selHeight = height ?? HEIGHT
    const interval = thumbnailIntervalSec ?? THUMBNAIL_INTERVAL_SECONDS
    const columns = thumbnailColumns ?? THUMBNAIL_COLS
    const { streams } = await getMediaMetadata(sourcePath)

    const [{ height: screenHeight, width: screenWidth, duration }] = streams
    const ratio = screenHeight! / selHeight

    const thumbnailWidth = Math.floor(screenWidth! / ratio)
    const thumbnailHeight = Math.floor(selHeight!)
    const dimensions = `${thumbnailWidth}x${thumbnailHeight}`
    const count = Math.floor(parseFloat(duration ?? "0") / interval)

    let filenames
    if (skipThumbnails) {
        console.log('skipping')
        const sourceFileGlob = `${destDir}/thumb*.png`
        filenames = await glob(sourceFileGlob)
    } else {
        filenames = await thumbnails({ sourcePath, destDir, count, dimensions, sampleTime })
    }
    const sourceFileGlob = `${destDir}/thumb*.png`

    const thumbstripDir = destDir.replace(/\/thumbnails/g, "")
    await montage({
        columns,
        sourceFileGlob,
        destFile: `${thumbstripDir}/thumbstrip.png`,
    })

    await saveVTTDocument({
        outputName: `${thumbstripDir}/thumbstrip.vtt`,
        filenames,
        interval,
        width: thumbnailWidth,
        height: thumbnailHeight,
        columns,
    })
}
