import Ffmpeg, { FfprobeData } from "fluent-ffmpeg"

export const getMediaMetadata = (inputFile: string): Promise<FfprobeData> =>
    new Promise(resolve => {
        Ffmpeg(inputFile).ffprobe(0, function (err, data) {
            if (err) throw new Error(err)
            resolve(data)
        })
    })
