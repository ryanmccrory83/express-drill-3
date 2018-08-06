const express = require('express');
const app = express();
const cors = require('cors');
const port = parseInt(process.env.PORT || 3000);
const csvToJson = require('convert-csv-to-json');
const data = csvToJson.fieldDelimiter(',').getJsonFromCsv('students.csv');

function findById(data, id){
    for (let i = 0; i < data.length; i++){
        if (data[i].id === id){
            return data[i];
        }
    }return null;
}

app.get('/', (request,response) => {
    response.json({data: data});
});

app.get('/:id', (request,response) => {
    var student = findById(data, request.params.id);
    if(!student){
        response.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    }else {
        response.json({data: student});
    }
});

app.listen(port);