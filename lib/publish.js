const types = {
    x: 'major',
    y: 'minor',
    z: 'patch'
}
const Arr = {
    x: 0,
    y: 1,
    z: 2
}
async function publish(type = "z") {
    try {
        let version = require('./version')(false),
            arr = version.split('.'),
            newVersion = [],
            urls=path.join(process.cwd(), 'package.json')
            package = require(urls)
        if (type == 'y')
            arr[2] = 0
        if (type == 'x')
            arr[2] = arr[1] = 0
        arr[Arr[type]]++
        newVersion = arr.join('.')
        package.version = newVersion
        let str = JSON.stringify(package, '', '\t')
        fs.writeFileSync(urls, str);
        echo.succ(version + ' -> ' + newVersion)
        // await l_process.execSync(`npm version ${types[type]}`)
        // await l_process.execSync(`npm publish`)
        // You must be logged in to publish packages.
    } catch (err) {
        echo.log(err)
    }

}
module.exports = publish