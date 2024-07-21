export const getSegmentName = (destDir, fileBaseName, resolution, bitRate, ext, isVidFile = false) => {
    let stringBuilder = `${destDir}/${fileBaseName}`
    if (resolution) {
        stringBuilder += `_${resolution}`
    }
    if (bitRate) {
        stringBuilder += `_${bitRate}`
    }
    if (isVidFile) {
        stringBuilder += '_%3d'
    }
    return `${stringBuilder}.${ext}`
}