export interface Property {
    id: string
    title: string
    location: string
    price: number
    bedrooms: number | null
    bathrooms: number | null
    areaSqft: number | null
    imageUrl: string | null
    description: string | null
    createdAt: string
}

export interface Favourite {
    id: string
    userId: string
    propertyId: string
    createdAt: string
    property: Property
}

export interface User {
    id: string
    name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}
