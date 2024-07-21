#! /usr/bin/env node

import figlet from "figlet"
import "./src/cli"

console.log(
    figlet.textSync("File Manager CLI Tools", {
        font: "Shimrod",
    })
)
