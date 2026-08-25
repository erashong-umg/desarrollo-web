import pcGamerNovaJpg from '../img/products/pc-gamer-nova.jpg'
import pcGamerNovaWebp from '../img/products/pc-gamer-nova.webp'

export const categories = [
  {
    slug: 'escritorio',
    name: 'Computadoras de escritorio',
    description: 'Equipos armados y listos para trabajar, crear o jugar.',
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    description: 'Equipos portátiles para estudio, trabajo y movilidad.',
  },
  {
    slug: 'procesadores',
    name: 'Procesadores',
    description: 'El núcleo de rendimiento para computadoras nuevas o actualizaciones.',
  },
  {
    slug: 'tarjetas-graficas',
    name: 'Tarjetas gráficas',
    description: 'Potencia visual para juegos, diseño y creación de contenido.',
  },
  {
    slug: 'tarjetas-madre',
    name: 'Tarjetas madre',
    description: 'La base para conectar y ampliar todos los componentes.',
  },
  {
    slug: 'memoria-ram',
    name: 'Memoria RAM',
    description: 'Mayor capacidad y velocidad para trabajar sin interrupciones.',
  },
  {
    slug: 'almacenamiento',
    name: 'Almacenamiento',
    description: 'Más espacio y velocidad para archivos, programas y juegos.',
  },
  {
    slug: 'monitores',
    name: 'Monitores',
    description: 'Pantallas para productividad, entretenimiento y juegos fluidos.',
  },
  {
    slug: 'perifericos',
    name: 'Periféricos',
    description: 'Accesorios precisos y cómodos para completar tu espacio.',
  },
  {
    slug: 'redes',
    name: 'Redes',
    description: 'Conectividad rápida y estable para todos tus dispositivos.',
  },
]

export const products = [
  {
    id: 'tc-001',
    code: 'TC-001',
    name: 'PC Gamer Nova',
    specs: 'Ryzen 7 · 16 GB RAM · 1 TB SSD',
    category: 'escritorio',
    availability: 'En existencia',
    price: 8995,
    featured: true,
    image: { jpg: pcGamerNovaJpg, webp: pcGamerNovaWebp },
    description:
      'Computadora de escritorio lista para jugar, transmitir y trabajar con aplicaciones exigentes. Combina rendimiento rápido, almacenamiento amplio y refrigeración eficiente en un gabinete compacto.',
    delivery: 'Entrega estimada de 2 a 4 días hábiles dentro del departamento de Guatemala. Información demostrativa.',
    specTable: [
      ['Procesador', 'AMD Ryzen 7 de 8 núcleos'],
      ['Memoria', '16 GB DDR5'],
      ['Almacenamiento', 'SSD NVMe de 1 TB'],
      ['Gráficos', 'Tarjeta dedicada de 12 GB'],
      ['Código', 'TC-001'],
    ],
  },
  {
    id: 'tc-002',
    code: 'TC-002',
    name: 'Laptop Pro 15',
    specs: 'Core i7 · 16 GB RAM · 512 GB SSD',
    category: 'laptops',
    availability: 'En existencia',
    price: 7299,
    featured: true,
    specTable: [
      ['Procesador', 'Intel Core i7'],
      ['Memoria', '16 GB DDR5'],
      ['Almacenamiento', 'SSD NVMe de 512 GB'],
      ['Pantalla', '15" Full HD'],
      ['Código', 'TC-002'],
    ],
    description: 'Movilidad y rendimiento para estudio y trabajo profesional.',
  },
  {
    id: 'tc-003',
    code: 'TC-003',
    name: 'Tarjeta gráfica RX 7800 XT',
    specs: '16 GB GDDR6',
    category: 'tarjetas-graficas',
    availability: 'Últimas unidades',
    price: 5499,
    featured: true,
    specTable: [
      ['Memoria de video', '16 GB GDDR6'],
      ['Interfaz', 'PCIe 4.0'],
      ['Código', 'TC-003'],
    ],
    description: 'Gráficos fluidos en alta resolución para equipos de alto desempeño.',
  },
  {
    id: 'tc-004',
    code: 'TC-004',
    name: 'Monitor QHD 27',
    specs: '2560 × 1440 · 165 Hz',
    category: 'monitores',
    availability: 'En existencia',
    price: 2395,
  },
  {
    id: 'tc-005',
    code: 'TC-005',
    name: 'SSD NVMe 1 TB',
    specs: 'PCIe 4.0 · 5,000 MB/s',
    category: 'almacenamiento',
    availability: 'En existencia',
    price: 695,
  },
  {
    id: 'tc-006',
    code: 'TC-006',
    name: 'Kit RAM 32 GB',
    specs: 'DDR5 · 6000 MHz',
    category: 'memoria-ram',
    availability: 'Agotado',
    price: 1195,
  },
  {
    id: 'tc-007',
    code: 'TC-007',
    name: 'PC Oficina Core',
    specs: 'Core i5 · 16 GB RAM · 512 GB SSD',
    category: 'escritorio',
    availability: 'En existencia',
    price: 5495,
  },
  {
    id: 'tc-008',
    code: 'TC-008',
    name: 'Laptop Air 14',
    specs: 'Ryzen 5 · 8 GB RAM · 512 GB SSD',
    category: 'laptops',
    availability: 'En existencia',
    price: 4895,
  },
  {
    id: 'tc-009',
    code: 'TC-009',
    name: 'Procesador Ryzen 7',
    specs: '8 núcleos · frecuencia turbo de 5.4 GHz',
    category: 'procesadores',
    availability: 'En existencia',
    price: 3195,
    thumbnail: 'Procesador-Ryzen-7.jpg',
  },
  {
    id: 'tc-010',
    code: 'TC-010',
    name: 'Procesador Core i5',
    specs: '14 núcleos · gráficos integrados',
    category: 'procesadores',
    availability: 'Últimas unidades',
    price: 2695,
    thumbnail: 'Procesador-Core-i5.jpg',
  },
  {
    id: 'tc-011',
    code: 'TC-011',
    name: 'Tarjeta gráfica RTX 4060',
    specs: '8 GB GDDR6 · doble ventilador',
    category: 'tarjetas-graficas',
    availability: 'En existencia',
    price: 3895,
    thumbnail: 'Tarjeta-gráfica-RTX-4060.webp',
  },
  {
    id: 'tc-012',
    code: 'TC-012',
    name: 'Tarjeta madre B650 WiFi',
    specs: 'AM5 · DDR5 · formato ATX',
    category: 'tarjetas-madre',
    availability: 'En existencia',
    price: 1695,
    thumbnail: 'Tarjeta-madre-B650-WiFi.jpg',
  },
  {
    id: 'tc-013',
    code: 'TC-013',
    name: 'Tarjeta madre B760M',
    specs: 'LGA1700 · DDR5 · formato Micro-ATX',
    category: 'tarjetas-madre',
    availability: 'En existencia',
    price: 1395,
    thumbnail: 'Tarjeta-madre-B760M.jpg',
  },
  {
    id: 'tc-014',
    code: 'TC-014',
    name: 'Kit RAM 16 GB',
    specs: 'DDR4 · 3200 MHz · 2 módulos',
    category: 'memoria-ram',
    availability: 'En existencia',
    price: 495,
    thumbnail: 'Kit-RAM-16-GB.jpg',
  },
  {
    id: 'tc-015',
    code: 'TC-015',
    name: 'Disco externo 2 TB',
    specs: 'USB-C · formato portátil',
    category: 'almacenamiento',
    availability: 'En existencia',
    price: 795,
    thumbnail: 'Disco-externo-2-TB.jpg',
  },
  {
    id: 'tc-016',
    code: 'TC-016',
    name: 'Monitor Full HD 24',
    specs: '1920 × 1080 · 100 Hz',
    category: 'monitores',
    availability: 'En existencia',
    price: 1195,
    thumbnail: 'Monitor-Full-HD-24.jpg',
  },
  {
    id: 'tc-017',
    code: 'TC-017',
    name: 'Teclado mecánico TKL',
    specs: 'Interruptores rojos · conexión USB',
    category: 'perifericos',
    availability: 'En existencia',
    price: 595,
    thumbnail: 'Teclado-mecánico-TKL.jpg',
  },
  {
    id: 'tc-018',
    code: 'TC-018',
    name: 'Mouse inalámbrico Pro',
    specs: '12,000 DPI · batería recargable',
    category: 'perifericos',
    availability: 'En existencia',
    price: 395,
    thumbnail: 'Mouse-inalámbrico-Pro.webp',
  },
  {
    id: 'tc-019',
    code: 'TC-019',
    name: 'Router WiFi 6 AX3000',
    specs: 'Doble banda · 4 antenas',
    category: 'redes',
    availability: 'Últimas unidades',
    price: 895,
    thumbnail: 'Router-WiFi-6-AX3000.jpg',
  },
  {
    id: 'tc-020',
    code: 'TC-020',
    name: 'Adaptador USB WiFi 6',
    specs: 'Doble banda · antena ajustable',
    category: 'redes',
    availability: 'En existencia',
    price: 295,
  },
]

export function formatQuetzales(amount) {
  return `Q${amount.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

export function getCategoryBySlug(slug) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategory(slug) {
  return products.filter((product) => product.category === slug)
}
