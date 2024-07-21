import { createHLS } from "../createHLS"
import { createDash } from "../createDash"
import { createMp4 } from "../createMp4"
import { wrapper } from "../helpers"

export const createAll = async (inputFile, options) => {
    await wrapper(createHLS)(inputFile, options)
    await wrapper(createDash)(inputFile, options)
    await wrapper(createMp4)(inputFile, options)
}
