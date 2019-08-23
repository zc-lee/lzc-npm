
module.exports = function () {
    let version = require('../package.json').version
    echo.bold(version)
    return version
}