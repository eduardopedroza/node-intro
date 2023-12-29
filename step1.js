const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.error(`Error reading ${path}: ${err.message}`);
            process.exit(1);
        }
        console.log(data);
    })
}

let filePath = process.argv[2];

if(!filePath) {
    console.error('Please provide file path');
    process.exit(1);
}

cat(filePath);