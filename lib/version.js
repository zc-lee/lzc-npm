
module.exports = function (log=true) {
    let version = require('../package.json').version
    if(log)
    echo.bold(version)
    return version
}