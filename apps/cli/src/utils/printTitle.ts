import figlet from "figlet"

export const printTitle = () => {
    console.log(
        figlet.textSync("AUTO-FFMPEG", {
            // font: "speed",
            // font: "isometric3",
            font: "cosmike",
            // font: 'colossal'
        })
    )
}
