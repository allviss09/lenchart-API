const fs = require('fs');

function writeFile(dataArray){
    let data = JSON.stringify(dataArray);
    fs.writeFileSync('./data/database.json',data, error => {
        if (error) {
            throw error;
        }
    });
    return true
}
module.exports = writeFile