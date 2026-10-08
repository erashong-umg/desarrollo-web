import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import Producto from '../models/Producto.js'

const productos = [
  {
    code: 'TC-001',
    name: 'PC Gamer Nova',
    specs: 'Ryzen 7 · 16 GB RAM · 1 TB SSD',
    category: 'escritorio',
    availability: 'En existencia',
    price: 8995,
    featured: true,
    description:
      'Computadora de escritorio lista para jugar, transmitir y trabajar con aplicaciones exigentes. Combina rendimiento rápido, almacenamiento amplio y refrigeración eficiente en un gabinete compacto.',
    delivery: 'Entrega estimada de 2 a 4 días hábiles dentro del departamento de Guatemala. Información demostrativa.',
    specTable: [
      { label: 'Procesador', value: 'AMD Ryzen 7 de 8 núcleos' },
      { label: 'Memoria', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: 'SSD NVMe de 1 TB' },
      { label: 'Gráficos', value: 'Tarjeta dedicada de 12 GB' },
      { label: 'Código', value: 'TC-001' },
    ],
    thumbnail: 'pc-gamer-nova.jpg',
  },
  {
    code: 'TC-002',
    name: 'Laptop Pro 15',
    specs: 'Core i7 · 16 GB RAM · 512 GB SSD',
    category: 'laptops',
    availability: 'En existencia',
    price: 7299,
    featured: true,
    specTable: [
      { label: 'Procesador', value: 'Intel Core i7' },
      { label: 'Memoria', value: '16 GB DDR5' },
      { label: 'Almacenamiento', value: 'SSD NVMe de 512 GB' },
      { label: 'Pantalla', value: '15" Full HD' },
      { label: 'Código', value: 'TC-002' },
    ],
    description: 'Movilidad y rendimiento para estudio y trabajo profesional.',
    thumbnail: 'TC-002.webp',
  },
  {
    code: 'TC-003',
    name: 'Tarjeta gráfica RX 7800 XT',
    specs: '16 GB GDDR6',
    category: 'tarjetas-graficas',
    availability: 'Últimas unidades',
    price: 5499,
    featured: true,
    specTable: [
      { label: 'Memoria de video', value: '16 GB GDDR6' },
      { label: 'Interfaz', value: 'PCIe 4.0' },
      { label: 'Código', value: 'TC-003' },
    ],
    description: 'Gráficos fluidos en alta resolución para equipos de alto desempeño.',
    thumbnail: 'TC-003.jpg',
  },
  {
    code: 'TC-004',
    name: 'Monitor QHD 27',
    specs: '2560 × 1440 · 165 Hz',
    category: 'monitores',
    availability: 'En existencia',
    price: 2395,
    thumbnail: 'Monitor-QHD-27.jpg',
  },
  {
    code: 'TC-005',
    name: 'SSD NVMe 1 TB',
    specs: 'PCIe 4.0 · 5,000 MB/s',
    category: 'almacenamiento',
    availability: 'En existencia',
    price: 695,
    thumbnail: 'SSD-NVMe-1-TB.jpg',
  },
  {
    code: 'TC-006',
    name: 'Kit RAM 32 GB',
    specs: 'DDR5 · 6000 MHz',
    category: 'memoria-ram',
    availability: 'Agotado',
    price: 1195,
  },
  {
    code: 'TC-007',
    name: 'PC Oficina Core',
    specs: 'Core i5 · 16 GB RAM · 512 GB SSD',
    category: 'escritorio',
    availability: 'En existencia',
    price: 5495,
    thumbnail: 'PC-Oficina-Core.jpg',
  },
  {
    code: 'TC-008',
    name: 'Laptop Air 14',
    specs: 'Ryzen 5 · 8 GB RAM · 512 GB SSD',
    category: 'laptops',
    availability: 'En existencia',
    price: 4895,
    thumbnail: 'Laptop-Air-14.jpg',
  },
  {
    code: 'TC-009',
    name: 'Procesador Ryzen 7',
    specs: '8 núcleos · frecuencia turbo de 5.4 GHz',
    category: 'procesadores',
    availability: 'En existencia',
    price: 3195,
    thumbnail: 'Procesador-Ryzen-7.jpg',
  },
  {
    code: 'TC-010',
    name: 'Procesador Core i5',
    specs: '14 núcleos · gráficos integrados',
    category: 'procesadores',
    availability: 'Últimas unidades',
    price: 2695,
    thumbnail: 'Procesador-Core-i5.jpg',
  },
  {
    code: 'TC-011',
    name: 'Tarjeta gráfica RTX 4060',
    specs: '8 GB GDDR6 · doble ventilador',
    category: 'tarjetas-graficas',
    availability: 'En existencia',
    price: 3895,
    thumbnail: 'Tarjeta-gráfica-RTX-4060.webp',
  },
  {
    code: 'TC-012',
    name: 'Tarjeta madre B650 WiFi',
    specs: 'AM5 · DDR5 · formato ATX',
    category: 'tarjetas-madre',
    availability: 'En existencia',
    price: 1695,
    thumbnail: 'Tarjeta-madre-B650-WiFi.jpg',
  },
  {
    code: 'TC-013',
    name: 'Tarjeta madre B760M',
    specs: 'LGA1700 · DDR5 · formato Micro-ATX',
    category: 'tarjetas-madre',
    availability: 'En existencia',
    price: 1395,
    thumbnail: 'Tarjeta-madre-B760M.jpg',
  },
  {
    code: 'TC-014',
    name: 'Kit RAM 16 GB',
    specs: 'DDR4 · 3200 MHz · 2 módulos',
    category: 'memoria-ram',
    availability: 'En existencia',
    price: 495,
    thumbnail: 'Kit-RAM-16-GB.jpg',
  },
  {
    code: 'TC-015',
    name: 'Disco externo 2 TB',
    specs: 'USB-C · formato portátil',
    category: 'almacenamiento',
    availability: 'En existencia',
    price: 795,
    thumbnail: 'Disco-externo-2-TB.jpg',
  },
  {
    code: 'TC-016',
    name: 'Monitor Full HD 24',
    specs: '1920 × 1080 · 100 Hz',
    category: 'monitores',
    availability: 'En existencia',
    price: 1195,
    thumbnail: 'Monitor-Full-HD-24.jpg',
  },
  {
    code: 'TC-017',
    name: 'Teclado mecánico TKL',
    specs: 'Interruptores rojos · conexión USB',
    category: 'perifericos',
    availability: 'En existencia',
    price: 595,
    thumbnail: 'Teclado-mecánico-TKL.jpg',
  },
  {
    code: 'TC-018',
    name: 'Mouse inalámbrico Pro',
    specs: '12,000 DPI · batería recargable',
    category: 'perifericos',
    availability: 'En existencia',
    price: 395,
    thumbnail: 'Mouse-inalámbrico-Pro.webp',
  },
  {
    code: 'TC-019',
    name: 'Router WiFi 6 AX3000',
    specs: 'Doble banda · 4 antenas',
    category: 'redes',
    availability: 'Últimas unidades',
    price: 895,
    thumbnail: 'Router-WiFi-6-AX3000.jpg',
  },
  {
    code: 'TC-020',
    name: 'Adaptador USB WiFi 6',
    specs: 'Doble banda · antena ajustable',
    category: 'redes',
    availability: 'En existencia',
    price: 295,
  },
]

async function seed() {
  await connectDB()

  for (const producto of productos) {
    await Producto.findOneAndUpdate({ code: producto.code }, producto, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
  }

  console.log(`Seed completo: ${productos.length} productos sincronizados.`)
  await mongoose.connection.close()
}

seed().catch((error) => {
  console.error('Error al ejecutar el seed:', error)
  process.exit(1)
})
