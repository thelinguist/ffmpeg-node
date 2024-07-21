import { Command } from "commander"
import packageJson from "../../../package.json"
import { createHLS } from "./actions/createHLS"

const program = new Command()
program
    .version(packageJson.version)
    .description("scripts ffmpeg\n" + "\n  This is a CLI tool for ffmpeg")
    .argument("<inputFile>", 'the file to process."\n')
    .option("-d, --dry-run", "dry run: WIP. doesn't do anything for now.")
    .parse(process.argv)

const options = program.opts()
program.command("hls [inputFile]").action(args => createHLS(args, options))

program.parse()
