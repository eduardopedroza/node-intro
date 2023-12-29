const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}: ${err.message}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}


let filePath = process.argv[2];

if(!filePath) {
    console.error('Please provide file path');
    process.exit(1);
}

if(filePath.startsWith('http://') || filePath.startsWith('https://')){
    webCat(filePath);
} else {
    cat(filePath);
}


