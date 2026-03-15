import mongoose from 'mongoose';

export interface IFabric extends mongoose.Document {
  name: string;
  sku: string;
  hex: string;
  image_url: string;
  price: number;
  stock: number;
  tags: string[];
  description: string;
}

const FabricSchema = new mongoose.Schema<IFabric>({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  hex: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: [{ type: String }],
  description: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Fabric || mongoose.model<IFabric>('Fabric', FabricSchema);
