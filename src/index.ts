import "dotenv/config"
import express, {Request, Response} from 'express';
import indexRouter from './routes/index';
import cookieParser from 'cookie-parser';
import swaggerRouter from './utiles/swagger';

const app =express();

app.use("/api-docs", swaggerRouter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",indexRouter);

app.get('/health', (req:Request, res:Response) => {
    res.send('ok');
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})