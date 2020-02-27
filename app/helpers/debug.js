const {debug}  = require('../../config/config.json')

const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",
    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}

module.exports = app => {
    if( debug.log )
    {
        app.table = (title, payload) => {
            console.log(`${colors.FgYellow}%s\x1b[0m`, `\r\n..............:: ${title.toUpperCase()} ::..............`)
            console.table(payload)
            console.log('\r\n') 
        }

        app.log = (title, payload) => {
            console.log(`${colors.FgYellow}%s\x1b[0m`, `\r\n..............:: ${title.toUpperCase()} ::..............`)
            console.log(payload)
            console.log('\r\n') 
        }

        app.error = (title, payload) => {
            console.log(`${colors.FgRed}%s\x1b[0m`, `\r\n..............:: ${title.toUpperCase()} ::..............`)
            console.error(payload)
            console.log('\r\n') 
        }
    }
}
