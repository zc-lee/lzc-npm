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

function addPackage(dir,org) {
    echo.succ(`add ${dir} package.json start...`)
    const data = require('./package')
    data.name = data.name.replace('NPM_NAME', org+dir)
    data.description = data.description.replace(/NPM_NAME/g, org+dir)
    let str = JSON.stringify(data, '', '\t')
    fs.writeFileSync(path.join(process.cwd(), dir, 'package.json'), str);
    echo.succ(`√ add ${dir} package.json success!!!`)
}

function addReadme(dir,org) {
    echo.succ(`add ${dir} README.md start...`)
    const data = fs.readFileSync(path.resolve(__dirname, './README.md')).toString().replace(/NPM_NAME/g, org+dir)
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
    let org=(dir.match(/^@.+\//)||[])[0]
    dir=dir.replace(org,'')
    await mkdir(dir)
    mkdir(path.join(process.cwd(), dir,'lib'))
    addPackage(dir,org)
    addReadme(dir,org)
    addExtry(dir)
    addIgnore(dir)
}
module.exports = init