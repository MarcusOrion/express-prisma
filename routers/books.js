import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// INDEX
router.get("/", (req, res) => {
    res.send('List of books')
})

export default router;