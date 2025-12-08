export interface CartItem {
    id: string
    slug: string
    title: string
    price: number
    quantity: number
    stock: number
  }
  
  const CART_KEY = 'bookdragons-cart'
  
  export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    
    try {
      const cart = localStorage.getItem(CART_KEY)
      if (!cart) return []
      
      const parsed = JSON.parse(cart)
      // Validate that it's an array
      if (!Array.isArray(parsed)) {
        // Clear corrupted data
        localStorage.removeItem(CART_KEY)
        return []
      }
      
      return parsed
    } catch (error) {
      // Clear corrupted data
      console.error('Error reading cart from localStorage:', error)
      localStorage.removeItem(CART_KEY)
      return []
    }
  }
  
  export function addToCart(item: Omit<CartItem, 'quantity'>) {
    const cart = getCart()
    const existingItem = cart.find(i => i.id === item.id)
    
    if (existingItem) {
      // Sjekk at vi ikke overstiger lagerbeholdning
      if (existingItem.quantity < item.stock) {
        existingItem.quantity += 1
      }
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
    
    // Trigger custom event for cart update
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function updateQuantity(id: string, quantity: number) {
    const cart = getCart()
    const item = cart.find(i => i.id === id)
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else if (quantity <= item.stock) {
        item.quantity = quantity
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
        window.dispatchEvent(new Event('cart-updated'))
      }
    }
  }
  
  export function removeFromCart(id: string) {
    const cart = getCart()
    const newCart = cart.filter(i => i.id !== id)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function clearCart() {
    localStorage.removeItem(CART_KEY)
    window.dispatchEvent(new Event('cart-updated'))
  }
  
  export function getCartTotal(): number {
    const cart = getCart()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
  
  export function getCartItemCount(): number {
    const cart = getCart()
    return cart.reduce((count, item) => count + item.quantity, 0)
  }