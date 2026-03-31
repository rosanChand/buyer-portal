import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'
import logger from './utils/logger'

dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

const properties = [
  {
    title: 'Luxury Villa in Budhanilkantha',
    location: 'Budhanilkantha, Kathmandu',
    price: 45000000,
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    description: 'Stunning 5-bedroom villa with panoramic mountain views, modern amenities, and a beautiful garden. Located in the peaceful Budhanilkantha area.',
  },
  {
    title: 'Modern Apartment in Lazimpat',
    location: 'Lazimpat, Kathmandu',
    price: 18500000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    description: 'Contemporary 3-bedroom apartment in the heart of Lazimpat. Walking distance to embassies, restaurants, and shopping centers.',
  },
  {
    title: 'Traditional Newari House in Bhaktapur',
    location: 'Bhaktapur Durbar Square',
    price: 32000000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    description: 'Beautifully restored traditional Newari house near Bhaktapur Durbar Square. Heritage architecture with modern comforts.',
  },
  {
    title: 'Lakeside Cottage in Pokhara',
    location: 'Lakeside, Pokhara',
    price: 25000000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    description: 'Charming lakeside cottage with direct views of Phewa Lake and the Annapurna range. Perfect for a peaceful lifestyle.',
  },
  {
    title: 'Penthouse in Jhamsikhel',
    location: 'Jhamsikhel, Lalitpur',
    price: 55000000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3800,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    description: 'Luxurious penthouse with rooftop terrace, city skyline views, and premium finishes. Located in the upscale Jhamsikhel neighborhood.',
  },
  {
    title: 'Cozy Studio in Thamel',
    location: 'Thamel, Kathmandu',
    price: 8500000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: 650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    description: 'Modern studio apartment in vibrant Thamel. Ideal for young professionals or as an investment property.',
  },
  {
    title: 'Family Home in Sanepa',
    location: 'Sanepa, Lalitpur',
    price: 38000000,
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    description: 'Spacious family home with a large garden, parking for 3 cars, and close proximity to international schools.',
  },
  {
    title: 'Mountain View Bungalow in Nagarkot',
    location: 'Nagarkot, Bhaktapur',
    price: 28000000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    description: 'Beautiful bungalow with breathtaking Himalayan views from every room. A perfect weekend retreat or permanent residence.',
  },
]

async function seed() {
  logger.info('Starting seed...')

  // check if properties already exist
  const count = await prisma.property.count()
  if (count > 0) {
    logger.info(`Database already has ${count} properties, skipping seed.`)
    return
  }

  // insert properties
  for (const property of properties) {
    await prisma.property.create({ data: property })
  }

  logger.info(`Seeded ${properties.length} properties.`)
}

seed()
  .catch((err) => {
    logger.error('Seed error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
