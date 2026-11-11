import express from 'express'
import prisma from '../lib/prisma.js'
import {index, show, store, update, destroy} from '../controllers/bookController.js'

const router = express.Router()

// INDEX
router.get("/", index)
// SHOW
router.get("/:id", show)
// STORE
router.post("/", store)
// UPDATE
router.patch("/:id", update)
// DESTROY
router.delete("/:id", destroy)

export default router;