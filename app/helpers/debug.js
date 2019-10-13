const {debug}  = require('../../config/config.json')

module.exports = (title, msg, type='log') => {
    if( debug.log )
    {
        try {
            console.log(`\r\n..............:: ${title.toUpperCase()} ::..............`)
            console[type](msg)
            console.log('\r\n') 
        } 
        catch (error) {
            console.error(error.message)
        }
    }
}
