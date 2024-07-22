import fs from "fs/promises"
import { secondsToTimecode } from "../utils/secondsToTimecode"
import * as path from "node:path"

export const createVTTDocument = (filenames: string[], thumbnailIntervalSec, width, height, columns) => {
    const lines = ["WEBVTT\n"]
    const sortedFiles = sortFiles(filenames)

    for (let i = 0; i < sortedFiles.length; i++) {
        const filename = sortedFiles[i]
        const [fileStartTime] = filename.match(/\d+(.?\d+)?/g) as string[]
        const startTime = secondsToTimecode(parseFloat(fileStartTime))
        const endTime = secondsToTimecode(parseFloat(fileStartTime) + thumbnailIntervalSec)
        lines.push(`${startTime} --> ${endTime}`)

        const xCoordinate = width * (i % columns)
        const yCoordinate = height * Math.floor(i / columns)
        lines.push(`thumbstrip.png#xywh=${xCoordinate},${yCoordinate},${width},${height}\n`)
    }
    return lines.join("\n")
}

export const saveVTTDocument = async ({ outputName, filenames, interval, width, height, columns }) => {
    const file = createVTTDocument(filenames, interval, width, height, columns)
    await fs.writeFile(outputName, file)
}

const sortFiles = filenames =>
    filenames
        .map(filename => path.basename(filename))
        .sort((fileA, fileB) => {
            const [a] = fileA.match(/\d+(.?\d+)?/g) as string[]
            const [b] = fileB.match(/\d+(.?\d+)?/g) as string[]
            return parseFloat(a) - parseFloat(b)
        })
