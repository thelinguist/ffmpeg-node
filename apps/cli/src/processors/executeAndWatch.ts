import { ProgressEvent } from "../types/ffmpeg"
import { FfmpegCommand } from "fluent-ffmpeg"

export const executeAndWatch = (command: FfmpegCommand) => {
    return new Promise((resolve, reject) => {
        let error
        command.addListener("progress", (event: ProgressEvent) => {
            !error && console.clear()
            console.log(
                `frames: ${event.frames}, currentFPS: ${event.currentFps}. progress: ${event.percent}`
            )
        })
        command.on("error", function (err, stdout, stderr) {
            error = true
            console.error(err)
            console.error(stdout)
            console.error(stderr)
            reject()
        })
        command.on("end", () => {
            resolve(undefined)
        })
        command.run()
    })
}
