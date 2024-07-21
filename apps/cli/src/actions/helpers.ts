import { FileParts, parseFileInput } from "../utils/parseFileInput"

export type AutoFfmpegSubCommand = (parsed: FileParts, options: any) => Promise<string>
/**
 * parses files nicely first and then does any post encode actions (report)
 * @param handler
 */
export const wrapper = (handler: AutoFfmpegSubCommand) => async (inputFile, options) => {
    const parsed = prepareActions(inputFile)
    const dir = await handler(parsed, options)
    beforeFinish(dir)
}

export const beforeFinish = (dir) => {
    console.log('all done, your files can be found at', dir)
}


export const prepareActions = (inputFile) => {
    if (!inputFile) {
        console.error("missing input file")
        process.exit(1)
    }
    const parsed = parseFileInput(inputFile)
    return parsed
}