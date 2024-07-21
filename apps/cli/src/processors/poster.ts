import Ffmpeg from "fluent-ffmpeg"
import { executeAndWatch } from "./executeAndWatch"

interface Params {
    sourcePath: string
    destDir: string
    resolution?: number
}

export const poster = async ({ sourcePath, destDir, resolution }: Params) => {
    const command = Ffmpeg(sourcePath)
        .setStartTime("00:01:00")
        .frames(1)
        .output(`${destDir}/poster.png`)
    if (resolution) {
        command.size(`${resolution}x?`)
    }
    await executeAndWatch(command)
}
