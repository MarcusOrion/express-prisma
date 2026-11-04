import express from 'express'

const router = express.Router()

// INDEX
router.get("/", (req, res) => {
    res.send('List of books')
})

export default router;