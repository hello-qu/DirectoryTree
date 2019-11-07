const fs = require('fs');
const path = require('path');
const http = require('http');
const rootDir = 'g:/vue'
const serve = http.createServer(async (req, res) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    const filePath = path.resolve(rootDir)
    const result = await getStatus(filePath);
    res.end(JSON.stringify(result))
});

serve.listen(8899,'localhost',()=>{
    console.log('server is running')
})

function readDir(filePath){
    return new Promise((resolve, reject) => {
        fs.readdir(filePath, (err, fileList) => {
            if(err) reject(err);
            resolve(fileList)
        })
    })
}

async function  getStatus(filePath){
    const dirList = await readDir(filePath);
    const list = dirList.map(item => {
        const itemDir = path.resolve(rootDir, item)
        const stat = fs.statSync(itemDir);
        const desc = stat.isFile() ? '文件' : '目录'
        return {name:item, type:desc}
    })
    return list;
}
