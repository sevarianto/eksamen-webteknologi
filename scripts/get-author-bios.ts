import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function getAuthorBios() {
  try {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'authors',
      limit: 1000,
      depth: 1,
    })
    
    const authors = result.docs || []
    
    console.log('\n=== FORFATTER BIOGRAFIER ===\n')
    
    authors.forEach((author, index) => {
      console.log(`\n--- Forfatter ${index + 1}: ${author.name} ---`)
      console.log(`Slug: ${author.slug}`)
      if (author.bio) {
        console.log(`\nBiografi:\n${author.bio}`)
      } else {
        console.log('\nBiografi: (ingen biografi satt)')
      }
      console.log('\n' + '='.repeat(50))
    })
    
    console.log(`\n\nTotalt ${authors.length} forfattere`)
    
    process.exit(0)
  } catch (error: any) {
    console.error('Error fetching author bios:', error.message)
    process.exit(1)
  }
}

getAuthorBios()

