import { execPromise } from "../utils/execPromise"

export const montage = ({ columns, sourceFileGlob, destFile }) =>
    execPromise(`montage -mode concatenate -tile "${columns}x" "${sourceFileGlob}" "${destFile}"`)
