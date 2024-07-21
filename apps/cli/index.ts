#! /usr/bin/env node

import { Command } from "commander"
import packageJson from "../../package.json"
import { createHLS, createAll, createDash, createMp4 } from "./src/actions"
import { printTitle } from "./src/utils/printTitle"
import { createVP9 } from "./src/actions/createVP9"

class MyRootCommand extends Command {
    createCommand(name) {
        const cmd = new Command(name)
        cmd.version(packageJson.version)
            .hook("preAction", () => printTitle())
            .description("scripts ffmpeg\n" + "\n  This is a CLI tool for ffmpeg")
            .argument("<inputFile>", 'the file to process."\n')
            .option("-d, --dry-run", "dry run: WIP. doesn't do anything for now.")
            .option("-o, --one-conversion", "run a single conversion for the given conversion type")
            .option(
                "-s --sample-time [value]",
                "a duration in seconds to sample instead of doing the whole thing. FYI starts 10 seconds in"
            )
            .option("-f --fps-override [value]", "fps override (if needed)")

        return cmd
    }
}

const program = new MyRootCommand()

program.command("hls").description("do an hls conversion").action(createHLS)
program.command("dash").description("do a dash conversion").action(createDash)
program.command("mp4").description("do an mp4 conversion").action(createMp4)
program.command("vp9").description("do an vp9 conversion").action(createVP9)
program
    .command("all")
    .description("do all the conversions!")
    .action((args, options) => createAll(args, options))

program.parse()
