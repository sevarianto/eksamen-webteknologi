import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const authorBios: Record<string, string> = {
  'jo-nesbo': `Jo Nesbø er en norsk forfatter og musiker, født i 1960. Han er best kjent for sin krimserie om politietterforskeren Harry Hole. Nesbø har vunnet flere priser for sine bøker, inkludert Rivertonprisen og Glassnøkkelen. Hans bøker er oversatt til over 50 språk og har solgt millioner av eksemplarer verden over.`,
  
  'erlend-loe': `Erlend Loe er en norsk forfatter født i 1969. Han er best kjent for sin humoristiske og absurde stil, særlig i bøker som "Naiv. Super." og "L" som har gjort ham til en av Norges mest populære forfattere. Loes bøker er preget av en lett og tilgjengelig stil med filosofiske undertoner.`,
  
  'agatha-christie': `Agatha Christie (1890-1976) var en britisk krimforfatter, ofte kalt "Krimdronningen". Hun er verdens mest solgte forfatter etter Shakespeare og Bibelen. Christie skapte legendariske detektiver som Hercule Poirot og Miss Marple, og hennes bøker har solgt over 2 milliarder eksemplarer verden over.`,
  
  'stephen-king': `Stephen King er en amerikansk forfatter født i 1947, kjent som "Skrekkens mester". Han har skrevet over 60 romaner og 200 noveller, og mange av dem er blitt filmatisert. King er en av verdens mest suksessfulle forfattere med bøker som "The Shining", "It", og "The Stand" som har definert skrekkgenren.`,
  
  'jk-rowling': `J.K. Rowling er en britisk forfatter født i 1965, best kjent for Harry Potter-serien. Hun er en av verdens rikeste forfattere og har solgt over 500 millioner eksemplarer av Harry Potter-bøkene. Serien har blitt filmatisert og har inspirert en hel generasjon lesere verden over.`,
}

async function addAuthorBios() {
  try {
    const payload = await getPayload({ config })
    
    const result = await payload.find({
      collection: 'authors',
      limit: 1000,
    })
    
    const authors = result.docs || []
    let updated = 0
    
    console.log('\n=== LEGGER TIL BIOGRAFIER ===\n')
    
    for (const author of authors) {
      const bio = authorBios[author.slug]
      
      if (bio && !author.bio) {
        await payload.update({
          collection: 'authors',
          id: author.id,
          data: {
            bio: bio,
          },
        })
        
        console.log(`✓ Lagt til biografi for: ${author.name}`)
        updated++
      } else if (bio && author.bio) {
        console.log(`⚠ ${author.name} har allerede biografi, hopper over`)
      } else if (!bio) {
        console.log(`⚠ Ingen biografi funnet for slug: ${author.slug}`)
      }
    }
    
    console.log(`\n✓ Ferdig! Oppdatert ${updated} forfattere`)
    
    process.exit(0)
  } catch (error: any) {
    console.error('Error adding author bios:', error.message)
    process.exit(1)
  }
}

addAuthorBios()

