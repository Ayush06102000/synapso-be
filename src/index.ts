import dotenv from 'dotenv';

dotenv.config();
const PORT= process.env.PORT;

import app from "./app"
import { signin, signup } from './controllers/authController';
import { authMidlleware } from './middleware/auth';
import { addContent } from './controllers/contentController';

app.post("/api/v1/signup",signup);
app.post("/api/v1/signin",signin);
app.post("/api/v1/addContent",authMidlleware,addContent)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})