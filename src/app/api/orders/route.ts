import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    // Validate required fields
    if (!body.orderNumber || !body.customerName || !body.customerEmail || !body.items || !Array.isArray(body.items)) {
      return NextResponse.json(
        { message: 'Manglende påkrevde felt' },
        { status: 400 }
      )
    }

    // Validate items
    if (body.items.length === 0) {
      return NextResponse.json(
        { message: 'Handlekurven er tom' },
        { status: 400 }
      )
    }

    // Validate each item
    for (const item of body.items) {
      if (!item.book || typeof item.book !== 'number' || item.book <= 0) {
        return NextResponse.json(
          { message: 'Ugyldig bok-ID i handlekurven' },
          { status: 400 }
        )
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return NextResponse.json(
          { message: 'Ugyldig antall i handlekurven' },
          { status: 400 }
        )
      }
      if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
        return NextResponse.json(
          { message: 'Ugyldig pris i handlekurven' },
          { status: 400 }
        )
      }
    }

    // Validate total amount
    if (!body.totalAmount || typeof body.totalAmount !== 'number' || body.totalAmount <= 0) {
      return NextResponse.json(
        { message: 'Ugyldig totalt beløp' },
        { status: 400 }
      )
    }

    // Create order in Payload
    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber: body.orderNumber,
        customerName: body.customerName.trim(),
        customerEmail: body.customerEmail.trim(),
        customerPhone: body.customerPhone?.trim() || undefined,
        items: body.items.map((item: any) => ({
          book: Number(item.book), // Ensure it's a number
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        totalAmount: Number(body.totalAmount),
        status: body.status || 'pending',
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    
    // Handle Payload validation errors
    if (error.data?.errors) {
      return NextResponse.json(
        { 
          message: 'Valideringsfeil',
          errors: error.data.errors 
        },
        { status: 400 }
      )
    }

    // Handle duplicate order number
    if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
      return NextResponse.json(
        { message: 'Ordrenummeret eksisterer allerede. Vennligst prøv igjen.' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: error.message || 'Kunne ikke opprette bestilling' },
      { status: 500 }
    )
  }
}

