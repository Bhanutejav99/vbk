// === VBK Designs: Shared product catalog ===
// Single source of truth for products + categories.
// Tries Supabase first; falls back to local data when the DB is empty
// or env vars are missing, so the site always renders.

import { createClient } from '@/utils/supabase/client'
import type { Product } from '@/types'

export interface CategoryDef {
  slug: string
  label: string
  blurb: string
}

// Navigation / filter categories. `all` is handled specially in the UI.
export const CATEGORIES: CategoryDef[] = [
  { slug: 'blouses', label: 'Blouses', blurb: 'Maggam, zardosi & designer necklines' },
  { slug: 'wedding', label: 'Wedding', blurb: 'Heavy bridal sets & lehangas' },
  { slug: 'top-designs', label: 'Top Designs', blurb: 'Statement embroidered tops' },
  { slug: 'maggam-designs', label: 'Maggam Work', blurb: 'Hand-crafted aari & maggam' },
  { slug: 'lehanga-designs', label: 'Lehangas', blurb: 'Festive & bridal lehangas' },
  { slug: 'materials', label: 'Materials', blurb: 'Fabrics, tassels & supplies' },
]

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.slug, c.label]),
)

// Secondary gallery placeholders themed to the site palette.
const alt = (label: string) =>
  `https://placehold.co/600x800/1c2136/f9b17a?text=${encodeURIComponent(label)}`

export const FALLBACK_PRODUCTS: Product[] = [
  // --- Top Designs ---
  {
    id: 'T1', title: 'Royal Blue Maggam', cat: 'top-designs', sub: 'Maggam', price: 4500,
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', alt('Side View'), alt('Close Up')],
    is_bestseller: true,
    description: 'A regal royal-blue top with intricate hand maggam work across the yoke. Tailored for festive evenings and receptions.',
    features: ['Hand maggam embroidery', 'Premium raw-silk base', 'Fully customisable to your measurements', '7–10 day stitching time'],
  },
  {
    id: 'T2', title: 'Emerald Zardosi', cat: 'top-designs', sub: 'Zardosi', price: 5200, original_price: 6000,
    img: 'https://images.unsplash.com/photo-1583391733958-e004e45d8b60?w=600',
    images: ['https://images.unsplash.com/photo-1583391733958-e004e45d8b60?w=600', alt('Back View'), alt('Detail')],
    is_bestseller: true,
    description: 'Deep emerald top with antique gold zardosi. A timeless piece that pairs beautifully with silk sarees and lehangas.',
    features: ['Antique gold zardosi', 'Lined & comfort-finished', 'Custom neckline options', 'Dry clean only'],
  },
  {
    id: 'T4', title: 'Golden Tissue Top', cat: 'top-designs', sub: 'Thread', price: 3200,
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', alt('View 2'), alt('View 3')],
    is_new: true,
    description: 'Shimmering golden tissue top with delicate thread detailing — understated elegance for daytime functions.',
    features: ['Tissue fabric with thread work', 'Lightweight & breathable', 'Custom fit', '5–7 day stitching time'],
  },

  // --- Blouses ---
  {
    id: 'B1', title: 'Deep V Velvet', cat: 'blouses', sub: 'V Neck', price: 2800, original_price: 3500,
    img: 'https://i.pinimg.com/1200x/c2/ce/5e/c2ce5e3880b5baa996ce5192ce09aa07.jpg?w=600',
    images: ['https://i.pinimg.com/1200x/c2/ce/5e/c2ce5e3880b5baa996ce5192ce09aa07.jpg?w=600', alt('Side View'), alt('Close Up')],
    description: 'Plush velvet blouse with a flattering deep-V neckline and subtle bead accents. A wardrobe staple for silk drapes.',
    features: ['Premium velvet', 'Deep-V neckline', 'Padded & hooked', 'Custom measurements'],
  },
  {
    id: 'B2', title: 'Pot Neck Bridal', cat: 'blouses', sub: 'Maggam', price: 8500,
    img: 'https://i.pinimg.com/736x/8b/9c/7b/8b9c7bd565d8d04c5c66357c2a0d8cd5.jpg?w=600',
    images: ['https://i.pinimg.com/736x/8b/9c/7b/8b9c7bd565d8d04c5c66357c2a0d8cd5.jpg?w=600', alt('Side View'), alt('Close Up')],
    is_bestseller: true,
    description: 'An opulent bridal blouse with a pot-neck silhouette and dense maggam work — designed to be the centrepiece of your wedding look.',
    features: ['Heavy bridal maggam', 'Pot-neck design', 'Stone & bead embellishment', '14–18 day stitching time'],
  },
  {
    id: 'B3', title: 'Boat Neck with Oval Back', cat: 'blouses', sub: 'Boat Neck', price: 1299,
    img: 'https://i.pinimg.com/1200x/dd/9a/5c/dd9a5cd0f3a4a57d06befd57d14c501e.jpg?w=600',
    images: ['https://i.pinimg.com/1200x/dd/9a/5c/dd9a5cd0f3a4a57d06befd57d14c501e.jpg?w=600', alt('Side View'), alt('Close Up')],
    is_new: true,
    description: 'Minimal boat-neck blouse with an elegant oval cut-out back — clean lines for the modern bride.',
    features: ['Boat neckline', 'Oval back detail', 'Cotton-silk base', 'Custom fit'],
  },
  {
    id: 'B4', title: 'Dori Tassel Back', cat: 'blouses', sub: 'Back Dori', price: 1800,
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600',
    images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600', alt('Side View'), alt('Close Up')],
    description: 'Sleek blouse finished with hand-knotted dori tassels at the back. Comfortable, adjustable and effortlessly chic.',
    features: ['Adjustable dori back', 'Hand-knotted tassels', 'Breathable lining', 'Custom measurements'],
  },
  {
    id: 'B9', title: 'Floral V Neck Design', cat: 'blouses', sub: 'V Neck', price: 899, original_price: 1299,
    img: 'https://i.pinimg.com/1200x/da/83/77/da83773dcbbcdf88c375ee94168c7239.jpg?w=600',
    images: ['https://i.pinimg.com/1200x/da/83/77/da83773dcbbcdf88c375ee94168c7239.jpg?w=600', alt('Side View'), alt('Close Up')],
    is_new: true,
    description: 'Sweet floral-embroidered V-neck blouse — light, versatile and perfect for everyday silks.',
    features: ['Floral thread embroidery', 'V neckline', 'Budget-friendly', '5–7 day stitching time'],
  },

  // --- Maggam Work ---
  {
    id: 'M1', title: 'Aari Lotus Yoke', cat: 'maggam-designs', sub: 'Maggam', price: 6400,
    img: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600',
    images: ['https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=600', alt('Detail'), alt('Close Up')],
    is_bestseller: true,
    description: 'Lotus-motif aari maggam yoke with fine zari outlining. A graceful choice for engagements and pellikuthuru.',
    features: ['Aari + maggam blend', 'Lotus motif', 'Zari outlining', '10–14 day stitching time'],
  },

  // --- Lehangas ---
  {
    id: 'L1', title: 'Rose Gold Festive Lehanga', cat: 'lehanga-designs', sub: 'Party', price: 9800, original_price: 12000,
    img: 'https://images.unsplash.com/photo-1583391733981-3cc6f2f5f9b8?w=600',
    images: ['https://images.unsplash.com/photo-1583391733981-3cc6f2f5f9b8?w=600', alt('Lehanga Flare'), alt('Detail')],
    description: 'A flowing rose-gold lehanga with a hand-worked border and twirl-worthy flare for sangeet and reception nights.',
    features: ['Hand-worked border', 'Cancan flare', 'Matching blouse & dupatta', '14–21 day stitching time'],
  },

  // --- Wedding ---
  {
    id: 'W1', title: 'Peacock Motif Heavy', cat: 'wedding', sub: 'heavy', price: 12000,
    img: 'https://images.unsplash.com/photo-1595514020182-52695528d91f?w=600',
    images: ['https://images.unsplash.com/photo-1595514020182-52695528d91f?w=600', alt('Side View'), alt('Detail')],
    description: 'Grand peacock-motif bridal ensemble with layered maggam and stonework — a true heirloom statement piece.',
    features: ['Peacock maggam motif', 'Layered stonework', 'Bridal-grade lining', '18–25 day stitching time'],
  },
  {
    id: 'W4', title: 'Kundan Bridal Set', cat: 'wedding', sub: 'heavy', price: 18000, original_price: 22000,
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600',
    images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600', alt('Side View'), alt('Detail')],
    is_bestseller: true,
    description: 'Complete kundan-embellished bridal set, meticulously crafted for the muhurtham. The ultimate expression of VBK craftsmanship.',
    features: ['Kundan & maggam work', 'Full bridal set', 'Customised to your palette', '21–30 day stitching time'],
  },

  // --- Materials ---
  {
    id: 'MT1', title: 'Pure Banarasi Fabric (per metre)', cat: 'materials', sub: 'fabric', price: 650,
    img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600',
    images: [alt('Fabric Roll'), alt('Weave Detail'), alt('Colour Options')],
    description: 'Handloom Banarasi fabric sold by the metre — bring your own design to life with a premium base.',
    features: ['Sold per metre', 'Handloom weave', 'Multiple colours', 'Ships in 3–5 days'],
  },
  {
    id: 'MT2', title: 'Designer Tassel Set', cat: 'materials', sub: 'supplies', price: 350, original_price: 450,
    img: alt('Tassel Set'),
    images: [alt('Tassel Set'), alt('Colours'), alt('Detail')],
    is_new: true,
    description: 'Hand-knotted silk tassels to finish your blouse or saree pallu. Sold as a set of four.',
    features: ['Set of 4', 'Silk thread', 'Assorted colours', 'Ships in 2–4 days'],
  },
]

const TABLE = 'products'

export async function fetchProducts(): Promise<Product[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) return FALLBACK_PRODUCTS
    return data as Product[]
  } catch {
    return FALLBACK_PRODUCTS
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single()
    if (error || !data) return FALLBACK_PRODUCTS.find(p => p.id === id) ?? null
    return data as Product
  } catch {
    return FALLBACK_PRODUCTS.find(p => p.id === id) ?? null
  }
}
