require('lzc-node')

const argus = process.argv.splice(2);
const args = argus.splice(1)
let command = argus[0]
const commands = {}

let libs = fs.readdirSync(path.resolve(__dirname, './lib')).map(v => path.parse(path.join(__dirname, './lib/', v)).name).forEach(v => {
    commands[v] = require(path.join(__dirname, './lib/', v))
});

Object.assign(commands, {
    v: commands.version,
    push:commands.publish
})

if (command == undefined)
    throwError('Pleace input command!!!')
command = command.toLowerCase().replace(/-/g, '')
if (!Reflect.has(commands, command)) {
    echo.error(`Don't have command of ${command}!!!`)
    echo.info(Object.keys(commands))
    return;
}

commands[command](...args)