import { createHLS } from "../createHLS"
import { createDash } from "../createDash"
import { createMp4 } from "../createMp4"
import { createVP9 } from "../createVP9"
import { createH265 } from "../createH265"

export const createAll = async (inputFile, options) => {
    await createHLS(inputFile, options)
    await createDash(inputFile, options)
    await createMp4(inputFile, options)
    await createVP9(inputFile, options)
    await createH265(inputFile, options)
}
