/**
 * converts a number in second into a time code: HH:MM:SS.mmm
 * @param time
 */
export const secondsToTimecode = time => {
    const hoursCount = Math.floor(time / 3600)
    const minutesCount = Math.floor((time / 60) % 60)
    const secondsCount = time % 60

    const hours = hoursCount.toString().padStart(2, "0")
    const minutes = minutesCount.toString().padStart(2, "0")
    const seconds = Math.floor(secondsCount).toString().padStart(2, "0")
    const milliseconds = Math.floor((secondsCount * 1000) % 1000).toString().padStart(3, "0")
    return `${hours}:${minutes}:${seconds}.${milliseconds}`
}
