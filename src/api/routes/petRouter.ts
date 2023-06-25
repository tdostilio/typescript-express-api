import express, { Request, Response } from 'express'
import PetModel, { PetDocument, CreatePetParams } from '../../db/models/pet'

const petRouter = express.Router()

// Create a new pet
petRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { color, species, name, ownerId } = req.body

    const petData: CreatePetParams = {
      color,
      species,
      name,
      owner: ownerId, // Assign the ownerId to the owner field
    }

    const pet = await PetModel.createPet(petData)
    res.status(201).json(pet)
  } catch (error) {
    console.error('Error creating pet:', error)
    res.status(500).json({ error: 'Failed to create pet' })
  }
})

// Get all pets for a specific owner
petRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.query
    const pets = await PetModel.getAllPets(ownerId as string)
    res.status(200).json(pets)
  } catch (error) {
    console.error('Error fetching pets:', error)
    res.status(500).json({ error: 'Failed to fetch pets' })
  }
})

// Get a specific pet by ID for a specific owner
petRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { ownerId } = req.query
    const pet = await PetModel.getPetById(id, ownerId as string)

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' })
    }

    res.status(200).json(pet)
  } catch (error) {
    console.error('Error fetching pet:', error)
    res.status(500).json({ error: 'Failed to fetch pet' })
  }
})

// Update a specific pet by ID for a specific owner
petRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { color, species, name, ownerId } = req.body

    const petData: Partial<PetDocument> = {
      color,
      species,
      name,
      owner: ownerId, // Update the owner field with the new ownerId
    }

    const pet = await PetModel.updatePet(id, petData, ownerId as string)

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' })
    }

    res.status(200).json(pet)
  } catch (error) {
    console.error('Error updating pet:', error)
    res.status(500).json({ error: 'Failed to update pet' })
  }
})

// Delete a specific pet by ID for a specific owner
petRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { ownerId } = req.query

    const deleted = await PetModel.deletePet(id, ownerId as string)

    if (!deleted) {
      return res.status(404).json({ error: 'Pet not found' })
    }

    res.status(204).end()
  } catch (error) {
    console.error('Error deleting pet:', error)
    res.status(500).json({ error: 'Failed to delete pet' })
  }
})

export default petRouter
