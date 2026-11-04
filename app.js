import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('This is the shop API homepage')
})
app.listen(port, () => console.log(`Server connected to http://localhost:${port}`))