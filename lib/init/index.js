'use strict';

const mkdir = async (dir) => {
    return new Promise(async (resolve, reject) => {
        if (dir == undefined)
            throwError('mkdir fail, Please add init name!!!')
        if (fs.existsSync(dir))
            throwError(`${dir} has exists!!!`)
        await l_process.execSync(`mkdir ${dir}`)
        resolve()
    })
}

function addPackage(dir) {
    echo.succ(`add ${dir} package.json start...`)
    const data = require('./package')
    data.name = data.name.replace('NPM_NAME', dir)
    data.description = data.description.replace(/NPM_NAME/g, dir)
    let str = JSON.stringify(data, '', '\t')
    fs.writeFileSync(path.join(process.cwd(), dir, 'package.json'), str);
    echo.succ(`√ add ${dir} package.json success!!!`)
}

function addReadme(dir) {
    echo.succ(`add ${dir} README.md start...`)
    const data = fs.readFileSync(path.resolve(__dirname, './README.md')).toString().replace(/NPM_NAME/g, dir)
    fs.writeFileSync(path.join(process.cwd(), dir, 'README.md'), data);
    echo.succ(`√ add ${dir} README.md success!!!`)
}

function addExtry(dir) {
    echo.succ(`add ${dir} entry start...`)
    fs.writeFileSync(path.join(process.cwd(), dir, 'index.js'), `console.log('${dir}')`);
    fs.writeFileSync(path.join(process.cwd(), dir, 'test.js'), `console.log('test')`);
    echo.succ(`√ add ${dir} entry success!!!`)
}
function addIgnore(dir) {
    echo.succ(`add ${dir} .gitignore start...`)
    const data = fs.readFileSync(path.resolve(__dirname, 'gitignore'))
    fs.writeFileSync(path.join(process.cwd(), dir, '.gitignore'), data);
    echo.succ(`√ add ${dir} .gitignore success!!!`)
}
const init = async (dir) => {
    await mkdir(dir)
    addPackage(dir)
    addReadme(dir)
    addExtry(dir)
    addIgnore(dir)
}
module.exports = init