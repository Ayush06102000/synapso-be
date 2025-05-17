import express, { Request, Response } from 'express';
import cors from 'cors';



const app = express();

//configure the cors to restrict domain
app.use(cors());

app.use(express.json());

app.get('/',(_req:Request,res:Response)=>{
    res.send("server health check - synapso running");
});



export default app;