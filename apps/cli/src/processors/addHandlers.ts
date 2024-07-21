import { ProgressEvent } from "../types/ffmpeg"
import { FfmpegCommand } from "fluent-ffmpeg"

export const addHandlers = (command: FfmpegCommand) => {
    return new Promise((resolve, reject) => {
        command.addListener("progress", (event: ProgressEvent) => {
            console.clear()
            console.log(
                `frames: ${event.frames}, currentFPS: ${event.currentFps}. progress: ${event.percent}`
            )
        })
        command.on("error", function (err, stdout, stderr) {
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
