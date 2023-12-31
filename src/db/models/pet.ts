import mongoose, { Document, Schema, Model } from 'mongoose'

// Define the interface for the pet document
export interface PetDocument extends Document {
  color: string
  species: string
  name: string
  owner: string // Store the Firebase user UID as a string
}

// Export a partial interface for creation params
export interface CreationParams extends Omit<PetDocument, keyof Document> {}

// Define a custom interface that extends the Model<PetDocument> interface
export interface PetDocumentModel extends Model<PetDocument> {
  createPet(petData: CreationParams): Promise<PetDocument>
  getAllPets(owner: string): Promise<PetDocument[]>
  getPetById(id: string, owner: string): Promise<PetDocument | null>
  updatePet(
    id: string,
    petData: Partial<PetDocument>,
    owner: string
  ): Promise<PetDocument | null>
  deletePet(id: string, owner: string): Promise<boolean>
}

// Create a new Mongoose schema for the pet
const PetSchema: Schema<PetDocument> = new Schema<PetDocument>({
  color: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    index: true, // Add index option
  },
})

// Create a new pet
PetSchema.statics.createPet = async function (
  petData: CreationParams
): Promise<PetDocument> {
  const pet = new this(petData)
  return pet.save()
}

PetSchema.statics.getAllPets = async function (
  owner: string
): Promise<PetDocument[]> {
  return this.find({ owner })
}

PetSchema.statics.getPetById = async function (
  id: string,
  owner: string
): Promise<PetDocument | null> {
  return this.findOne({ _id: id, owner })
}

PetSchema.statics.updatePet = async function (
  id: string,
  petData: Partial<PetDocument>,
  owner: string
): Promise<PetDocument | null> {
  return this.findOneAndUpdate({ _id: id, owner }, petData, {
    new: true,
  })
}

PetSchema.statics.deletePet = async function (
  id: string,
  owner: string
): Promise<boolean> {
  const result = await this.findOneAndDelete({ _id: id, owner })
  return !!result
}

// Create the pet model using the schema
const PetModel: PetDocumentModel = mongoose.model<
  PetDocument,
  PetDocumentModel
>('Pet', PetSchema)

export default PetModel
