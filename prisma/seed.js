import prisma from '../lib/prisma.js'
// Utility per il random del categoryId
const randomArrayIndex = (length) => Math.floor(Math.random() * length)
async function main() {
    console.log('Seeding started')
    // Rimuove le categorie precedenti
    await prisma.book.deleteMany()
    await prisma.category.deleteMany()
    // Creazione delle categorie (ne crea 3)
    const categoriesName = ['Author', 'Description', 'Year of pubblication'];
    await prisma.category.createMany({
        data: categoriesName.map((category) => ({
            name: category
        }))
    })
    const categories = await prisma.category.findMany();
    console.log(categories)
    // Creazione delle categorie
    const books = [];
    for (let index = 0; index < 10; index++) {
        books.push({
            titolo: `Book ${index + 1}`,
            autore: `Author ${index + 1}`,
            descrizione: `Description for book ${index + 1}`,
            prezzo: 12.50,
            categoryId: categories[randomArrayIndex(categories.length)].id,
        })
    }
    // Invio della query al database per l'inserimento
    await prisma.book.createMany({
        data: books,
    })
}
main()
.catch(err => {
    console.log(err)
    process.exit(1)
})
.finally(() => prisma.$disconnect())