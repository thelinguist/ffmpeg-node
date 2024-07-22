import { describe, it, expect } from "vitest"
import { createVTTDocument } from "./vtt"

describe("vtt", () => {
    it("creates a vtt file", () => {
        const filenames = [
            "thumb0001-0.000.png",
            "thumb0002-15.000.png",
            "thumb0003-30.000.png",
            "thumb0004-45.000.png",
            "thumb0005-60.000.png",
            "thumb0006-75.000.png",
            "thumb0007-90.000.png",
            "thumb0008-105.000.png",
            "thumb0009-120.000.png",
            "thumb0010-135.000.png",
        ]
        const result = createVTTDocument(filenames, 15, 320, 240, 2)
        expect(result).toEqual(`WEBVTT

00:00:00.000 --> 00:00:15.000
thumbstrip.png#xywh=0,0,320,240

00:00:15.000 --> 00:00:30.000
thumbstrip.png#xywh=320,0,320,240

00:00:30.000 --> 00:00:45.000
thumbstrip.png#xywh=0,240,320,240

00:00:45.000 --> 00:01:00.000
thumbstrip.png#xywh=320,240,320,240

00:01:00.000 --> 00:01:15.000
thumbstrip.png#xywh=0,480,320,240

00:01:15.000 --> 00:01:30.000
thumbstrip.png#xywh=320,480,320,240

00:01:30.000 --> 00:01:45.000
thumbstrip.png#xywh=0,720,320,240

00:01:45.000 --> 00:02:00.000
thumbstrip.png#xywh=320,720,320,240

00:02:00.000 --> 00:02:15.000
thumbstrip.png#xywh=0,960,320,240

00:02:15.000 --> 00:02:30.000
thumbstrip.png#xywh=320,960,320,240
`)
    })
})
