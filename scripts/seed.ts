#!/usr/bin/env node
/**
 * Seed script to populate database with example data
 * All data can be edited and deleted through the admin panel
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import type { Media, Author, Genre, Book } from '../src/payload-types'

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  try {
    // Create example authors
    console.log('📝 Creating authors...')
    const authors: Author[] = []
    
    const authorData = [
      {
        name: 'J.K. Rowling',
        slug: 'jk-rowling',
        nationality: 'Britisk',
        birthYear: 1965,
        biography: 'Joanne Rowling, bedre kjent som J.K. Rowling, er en britisk forfatter best kjent for Harry Potter-serien.',
      },
      {
        name: 'Stephen King',
        slug: 'stephen-king',
        nationality: 'Amerikansk',
        birthYear: 1947,
        biography: 'Stephen King er en amerikansk forfatter av skrekk- og fantasy-bøker. Han har skrevet over 60 bøker.',
      },
      {
        name: 'Agatha Christie',
        slug: 'agatha-christie',
        nationality: 'Britisk',
        birthYear: 1890,
        biography: 'Agatha Christie var en britisk krimforfatter kjent for sine detektivromaner med Hercule Poirot og Miss Marple.',
      },
      {
        name: 'Erlend Loe',
        slug: 'erlend-loe',
        nationality: 'Norsk',
        birthYear: 1969,
        biography: 'Erlend Loe er en norsk forfatter kjent for sin humoristiske og absurde stil.',
      },
      {
        name: 'Jo Nesbø',
        slug: 'jo-nesbo',
        nationality: 'Norsk',
        birthYear: 1960,
        biography: 'Jo Nesbø er en norsk forfatter og musiker, best kjent for krimromanene om Harry Hole.',
      },
    ]

    for (const authorInfo of authorData) {
      const author = await payload.create({
        collection: 'authors',
        data: {
          ...authorInfo,
          ageRating: ['voksen'],
        },
      })
      authors.push(author as Author)
      console.log(`  ✓ Created author: ${authorInfo.name}`)
    }

    // Create example genres
    console.log('📚 Creating genres...')
    const genres: Genre[] = []
    
    const genreData = [
      {
        name: 'Fantasy',
        slug: 'fantasy',
        description: 'Bøker med magi, mytologi og fantastiske verdener.',
      },
      {
        name: 'Krim',
        slug: 'krim',
        description: 'Spennende kriminalromaner og detektivhistorier.',
      },
      {
        name: 'Skrekk',
        slug: 'skrekk',
        description: 'Skrekkromaner som gir deg gåsehud.',
      },
      {
        name: 'Humor',
        slug: 'humor',
        description: 'Morsomme og underholdende bøker.',
      },
      {
        name: 'Ungdom',
        slug: 'ungdom',
        description: 'Bøker skrevet for ungdom.',
      },
    ]

    for (const genreInfo of genreData) {
      const genre = await payload.create({
        collection: 'genres',
        data: genreInfo,
      })
      genres.push(genre as Genre)
      console.log(`  ✓ Created genre: ${genreInfo.name}`)
    }

    // Create example books
    console.log('📖 Creating books...')
    
    const bookData = [
      {
        title: 'Harry Potter og De Vises Stein',
        slug: 'harry-potter-og-de-vises-stein',
        author: authors[0].id,
        genres: [genres[0].id],
        ageRating: ['barn', 'ungdom'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 299,
        stock: 15,
        isbn: '9788203220011',
        publishedYear: 1997,
        description: 'Den første boken i Harry Potter-serien. Harry oppdager at han er en trollmann og begynner på Galtvort høyere skole for hekseri og trolldom.',
      },
      {
        title: 'The Shining',
        slug: 'the-shining',
        author: authors[1].id,
        genres: [genres[2].id],
        ageRating: ['voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 349,
        stock: 8,
        isbn: '9780307743657',
        publishedYear: 1977,
        description: 'En skrekkroman om en familie som flytter inn i et isolert hotell om vinteren, hvor faren gradvis blir gal.',
      },
      {
        title: 'Mord på Orientekspressen',
        slug: 'mord-pa-orientekspressen',
        author: authors[2].id,
        genres: [genres[1].id],
        ageRating: ['voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 279,
        stock: 12,
        isbn: '9788203220028',
        publishedYear: 1934,
        description: 'En klassisk krimroman hvor Hercule Poirot løser et mord om bord på Orientekspressen.',
      },
      {
        title: 'Naiv. Super.',
        slug: 'naiv-super',
        author: authors[3].id,
        genres: [genres[3].id, genres[4].id],
        ageRating: ['ungdom', 'voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 249,
        stock: 20,
        isbn: '9788203220035',
        publishedYear: 1996,
        description: 'En humoristisk roman om en mann som sliter med livet og finner trøst i enkle ting.',
      },
      {
        title: 'Flaggermusmannen',
        slug: 'flaggermusmannen',
        author: authors[4].id,
        genres: [genres[1].id],
        ageRating: ['voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 399,
        stock: 10,
        isbn: '9788203220042',
        publishedYear: 1997,
        description: 'Den første boken i Harry Hole-serien. En norsk politimann jakter på en seriemorder i Australia.',
      },
      {
        title: 'Harry Potter og Mysteriekammeret',
        slug: 'harry-potter-og-mysteriekammeret',
        author: authors[0].id,
        genres: [genres[0].id],
        ageRating: ['barn', 'ungdom'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 299,
        stock: 18,
        isbn: '9788203220059',
        publishedYear: 1998,
        description: 'Den andre boken i Harry Potter-serien. Harry må finne ut hvem som har åpnet Mysteriekammeret.',
      },
      {
        title: 'It',
        slug: 'it',
        author: authors[1].id,
        genres: [genres[2].id],
        ageRating: ['voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 449,
        stock: 6,
        isbn: '9780307743664',
        publishedYear: 1986,
        description: 'En skrekkroman om en gruppe venner som møter en ond klovn som terroriserer deres hjemby.',
      },
      {
        title: 'Døden på Nilen',
        slug: 'doden-pa-nilen',
        author: authors[2].id,
        genres: [genres[1].id],
        ageRating: ['voksen'] as ('barn' | 'ungdom' | 'voksen')[],
        price: 279,
        stock: 14,
        isbn: '9788203220066',
        publishedYear: 1937,
        description: 'En klassisk krimroman hvor Hercule Poirot løser et mord om bord på en båt på Nilen.',
      },
    ]

    for (const bookInfo of bookData) {
      const book = await payload.create({
        collection: 'books',
        data: bookInfo,
      })
      console.log(`  ✓ Created book: ${bookInfo.title}`)
    }

    console.log('✅ Seed completed successfully!')
    console.log('\n📋 Summary:')
    console.log(`  - ${authors.length} authors created`)
    console.log(`  - ${genres.length} genres created`)
    console.log(`  - ${bookData.length} books created`)
    console.log('\n💡 All data can be edited and deleted through the admin panel at /admin')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()

