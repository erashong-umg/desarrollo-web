import mongoose from 'mongoose'

const specRowSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
)

const productoSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    specs: { type: String, default: '' },
    category: { type: String, required: true },
    availability: {
      type: String,
      enum: ['En existencia', 'Últimas unidades', 'Agotado'],
      default: 'En existencia',
    },
    price: { type: Number, required: true, min: 0 },
    featured: { type: Boolean, default: false },
    description: { type: String, default: '' },
    delivery: { type: String, default: '' },
    specTable: { type: [specRowSchema], default: [] },
    thumbnail: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
)

export default mongoose.model('Producto', productoSchema)
