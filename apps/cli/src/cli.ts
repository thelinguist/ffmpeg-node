import { Command } from "commander"
import packageJson from "../../../package.json"
import { createHLS } from "./actions/createHLS"

const program = new Command()
program
    .version(packageJson.version)
    .description("scripts ffmpeg\n" + "\n  This is a CLI tool for ffmpeg")
    .argument("<inputFile>", 'the file to process."\n')
    .option("-d, --dry-run", "dry run: WIP. doesn't do anything for now.")
    .option("-s --sample-time [value]", "a duration in seconds to sample instead of doing the whole thing. FYI starts 10 seconds in")
    .option("-f --fps-override [value]", "fps override (if needed)")
    .parse(process.argv)

const options = program.opts()
program
    .command("hls [inputFile]")
    .action(args => createHLS(args, options))

program.parse()
