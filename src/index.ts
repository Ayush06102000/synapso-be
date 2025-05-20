import dotenv from 'dotenv';

dotenv.config();
const PORT= process.env.PORT;

import app from "./app"
import { signin, signup } from './controllers/authController';

app.post("/api/v1/signup",signup)
app.post("/api/v1/signin",signin)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})