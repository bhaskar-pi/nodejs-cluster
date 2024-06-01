const cluster = require('node:cluster');
const os = require('os')
const express = require('express')

const totalCPUs = os.cpus().length

if (cluster.isPrimary){
    for (let i=0; i< totalCPUs; i++){
        cluster.fork();
    }
}else{
    const app = express()
    app.use(express.json())
    const PORT = 8000

    app.get('/', (request, response) => {
        response.send(`Hello, am express server ${process.pid}`)
    })

    app.listen(PORT, () => {
        console.log(`SERVER is running at PORT:${PORT}`)
    })
}