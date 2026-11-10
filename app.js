import express from 'express';
import booksRouter from './routers/books.js'
import handleErrors from './middlewares/handleErrors.js'
import notFound from './middlewares/notFound.js'
// Setup
const app = express();
const port = 3000;
// Routing
app.get('/', (req,res) => {
    res.send('This is the shop API homepage')
})
// CRUD
app.use("/books", booksRouter);
// Gestione errori
app.use(handleErrors)
app.use(notFound)
// Server start
app.listen(port, () => console.log(`Server connected to http://localhost:${port}`))