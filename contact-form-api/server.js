const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', (req, res) => {
    const contactData = req.body;

    const dataFilePath = path.join(__dirname, 'contactData.json');

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        let jsonData = [];
        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        jsonData.push(contactData);

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            res.status(200).send('Contact data saved successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});