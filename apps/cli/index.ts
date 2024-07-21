#! /usr/bin/env node

import figlet from "figlet"
import "./src/cli"

console.log(
    figlet.textSync("AUTO-FFMPEG", {
        // font: "speed",
        // font: "isometric3",
        font: 'cosmike'
        // font: 'colossal'
    })
)
