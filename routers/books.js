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

    if (Number.isInteger(id)) {
        res.status(404).json({
            error: 'Invalid book id'
        })
    }
    const books = await prisma.book.findUnique({
        where: {
            id
        }
    })
    if (!books) {
        res.status(404).json({
            error: 'Book not found'
        })
        return
    }
    res.json(books)
})
// STORE
router.post("/", async(req, res) => {
    const {titolo, descrizione, autore, prezzo, categoryId} = req.body;
    const newProduct = await prisma.book.create({
        data: {
            titolo,
            descrizione,
            autore,
            prezzo,
            categoryId
        },
        select: {
            id: true,
        },
    })
    res.status(201).json(newProduct)
})
// UPDATE
router.patch("/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isInteger(id)) {
        res.status(400).json({
            message: 'Invalid book id'
        })
    }
    const {titolo, descrizione, autore, prezzo, isActive, categoryId} = req.body;
    const updateProducts = await prisma.book.update({
        where: {
            id
        },
        data: {
            titolo,
            descrizione,
            autore,
            prezzo,
            isActive,
            categoryId
        }
    })
    res.json(updateProducts)
})
// DESTROY
router.delete("/", async (req, res) => {
    await prisma.book.delete({
        where: {
            id,
        }
    })
    res.sendStatus(204)
})
export default router;