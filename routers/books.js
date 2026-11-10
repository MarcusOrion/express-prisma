import express from 'express'
import prisma from '../lib/prisma.js'

const router = express.Router()

// INDEX
router.get("/", async (req, res) => {
    const limit = req.query.limit
    const books = await prisma.book.findMany({
        select: {
            id: true,
            titolo: true,
            prezzo: true,
    },
         take: limit ? Number(limit) : undefined,
})
    res.json(books)
})
// SHOW
router.get("/:id", async(req, res) => {
    const id = Number(req.params.id)
    const books = await prisma.book.findUnique({
        where: {
            id
        }
    })
    res.json(books)
})
export default router;