import prisma from '../lib/prisma.js'

export async function index (req, res) {
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
}
export async function show (req, res) {
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
}
export async function store (req, res) {
        const {titolo, descrizione, autore, prezzo, categoryId} = req.body;
    // Verifica id
    const category = await prisma.category.findUnique({
        where: {
            id : categoryId
        }
    })
    if (!category) {
        return res.status(400).json({
            message: 'CategoryId not valid'
        })
    }

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
}
export async function update (req, res) {
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
}
export async function destroy (req, res) {
        const id = Number(req.params.id)
    // Validazione formato ID
    if (!Number.isInteger(id)) {
       return res.status(400).json({
        error: 'Invalid product ID'
       })
    }
    const book = await prisma.book.findUnique({
        where: { 
            id
        }
    })
    // Prodotto inesistente
    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        })
    }
    await prisma.book.delete({
        where: {
            id,
        }
    })
    res.sendStatus(204)
}