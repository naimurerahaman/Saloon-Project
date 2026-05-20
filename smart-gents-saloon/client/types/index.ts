export interface NavLink {
  href: string
  label: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration: number
  image?: string
  category: string
}

export interface Barber {
  id: string
  name: string
  specialty: string
  experience: number
  image?: string
  bio?: string
}

export interface Appointment {
  id: string
  serviceId: string
  barberId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  status: 'pending' | 'approved' | 'cancelled' | 'completed'
}

export interface GalleryItem {
  id: string
  url: string
  caption?: string
  category?: string
}

export interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
}
