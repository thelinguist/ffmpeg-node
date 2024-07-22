import { it, expect, describe } from 'vitest'
import { secondsToTimecode } from "./secondsToTimecode"

describe('secondsToTimecode', () => {
    it('works', () => {
        const result = secondsToTimecode(123)
        expect(result).toEqual('00:02:03.000')
    })

    it('works with long decimal', () => {
        const result = secondsToTimecode(123.4567890123)
        expect(result).toEqual('00:02:03.456')
    })

    it('works with hours', () => {
        const time = (60 * 60 * 2) + (60 * 30) + 0.1234
        expect(secondsToTimecode(time)).toEqual('02:30:00.123')
    })
})