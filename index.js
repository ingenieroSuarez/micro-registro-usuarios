require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app= express();

const PORT= process.env.PORT || 3003
app.use(cors())
app.use(express.json())

app.use('/api', require('./app/routes'));

app.listen(PORT, () => {
    console.log('Microservicio usuarios: ', PORT );
});