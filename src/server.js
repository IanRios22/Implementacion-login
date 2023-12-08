import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import userRouter from './routes/user.router.js';
import './db/database.js';
import MongoStore from 'connect-mongo';
import { connectionString } from './db/database.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import path from 'path'; // Importa el módulo 'path' para trabajar con rutas de archivos
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';
import logoutMiddleware from './middlewares/logoutmiddleware.js';

const app = express();

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectionString,
        crypto: {
            secretKey: "1234",
        },
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 12000,
    },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views')); // Utiliza 'path.join' para construir la ruta correcta
app.use('/public', express.static(path.join(__dirname, 'public'))); // Configura la ruta estática correctamente
app.use(session(mongoStoreOptions));

app.use('/users', userRouter);
app.use('/views', viewsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(logoutMiddleware);
// app.use('/realtime', viewsRouter);
app.use(errorHandler);

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor conectado al puerto ${port}`);
});
