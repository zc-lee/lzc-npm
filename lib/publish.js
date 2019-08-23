const types = {
    x: 'major',
    y: 'minor',
    z: 'patch'
}
async function publish(type = "z") {
    try {
        await l_process.execSync(`npm version ${types[type]}`)
        // await l_process.execSync(`npm publish`)
        // You must be logged in to publish packages.
    } catch (err) {
        echo.log(err)
    }

}
module.exports = publish