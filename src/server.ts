import express from 'express';
import routes from './router';
import cors from 'cors'

const app = express()
const port = 3333;

app.use(express.json())
app.use(cors())
app.use(routes)
app.listen(process.env.PORT||port,()=>{
    console.log("server started at port "+port)
}) 