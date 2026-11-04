import express from 'express';
import booksRouter from './routers/books.js'
const app = express();
const port = 3000;
// Routing
app.get('/', (req,res) => {
    res.send('This is the shop API homepage')
})
// CRUD
app.use("/books", booksRouter);
// Server start
app.listen(port, () => console.log(`Server connected to http://localhost:${port}`))