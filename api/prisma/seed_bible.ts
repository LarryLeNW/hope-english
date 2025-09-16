// import { PrismaClient } from '@prisma/client'
// import { readFileSync } from 'fs'
// import { parse } from 'csv-parse/sync'

// const prisma = new PrismaClient()
// const CATEGORY_SLUG = 'old-testament'

// async function main() {
//     const category = await prisma.bookCategory.upsert({
//         where: { slug: CATEGORY_SLUG },
//         update: {},
//         create: {
//             name: 'Old Testament',
//             slug: CATEGORY_SLUG,
//             canonicalOrder: 1,
//         },
//     })

//     const csvStr = readFileSync('data/original_data.csv', 'utf8')
//     const rows: any[] = parse(csvStr, {
//         columns: false,
//         from_line: 2,
//         skip_empty_lines: true,
//         relax_quotes: true,
//         relax_column_count: true,
//         trim: true,
//     })

//     const bookIdCache = new Map<string, string>()
//     for (const row of rows) {
//         const [, bookTitle, chapterStr, verseStr, textRaw] = row
//         if (!bookTitle) continue

//         const chapter = Number(chapterStr)
//         const verse = Number(verseStr)
//         const text = String(textRaw ?? '').trim()
//         if (Number.isNaN(chapter) || Number.isNaN(verse) || !text) continue

//         let bookId = bookIdCache.get(bookTitle)
//         if (!bookId) {
//             const existing = await prisma.book.findFirst({
//                 where: { title: bookTitle },
//                 select: { id: true },
//             })
//             if (existing) {
//                 bookId = existing.id
//             } else {
//                 const created = await prisma.book.create({
//                     data: {
//                         title: bookTitle,
//                         abbrev: undefined,
//                         canonicalOrder: 1,
//                         chapters: undefined,
//                         categoryId: category.id,
//                     },
//                     select: { id: true },
//                 })
//                 bookId = created.id
//             }
//             bookIdCache.set(bookTitle, bookId)
//         }

//         await prisma.bibleVerse.upsert({
//             where: { bookId_chapter_verse: { bookId, chapter, verse } },
//             update: { text, version: 'WEB' },
//             create: { bookId, chapter, verse, text, version: 'WEB' },
//         })
//         console.log("Inserted/Updated:", bookTitle, chapter + ":" + verse)
//     }
//     console.log('✅ Seed xong verses từ original_data.csv vào Old Testament')
// }

// main()
//     .catch((e) => { console.error(e); process.exit(1) })
//     .finally(async () => { await prisma.$disconnect() })
