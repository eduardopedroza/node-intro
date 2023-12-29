const fs = require('fs');
const axios = require('axios');

function cat(path, outputPath) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}: ${err.message}`);
            process.exit(1);
        }
        printOrWrite(data, outputPath);
    })
}

async function webCat(url, outputPath) {
    try {
        const response = await axios.get(url);
        printOrWrite(response.data, outputPath);
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function printOrWrite(data, outputPath) {
    if(outputPath){
        writeFile(outputPath, data);
    } else {
        console.log(data);
    }
}

function writeFile(filePath, data) {
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error(`Couldn't write ${filePath}:  ${err.message}`);
            process.exit(1);
        }
        console.log('successfuly copied contents');
    })
}

const args = process.argv.slice(2);
let outputPath;
let inputPath;

if (args[0] === '--out') {
    outputPath = args[1];
    inputPath = args[2];
} else {
    inputPath = args[0];
}

if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    webCat(inputPath, outputPath);
} else {
    cat(inputPath, outputPath);
}


