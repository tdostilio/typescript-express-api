import express, { Request, Response } from 'express'
import PetModel, { PetDocument, CreationParams } from '../../db/models/pet'
import { UserRequest } from '../middleware/authMiddleware'

const petRouter = express.Router()

// Create a new pet
petRouter.post('/', async (req: UserRequest, res: Response) => {
  try {
    const { color, species, name } = req.body

    const petData: CreationParams = {
      color,
      species,
      name,
      owner: req.user,
    }

    const pet = await PetModel.createPet(petData)
    res.status(201).json(pet)
  } catch (error) {
    console.error('Error creating pet:', error)
    res.status(500).json({ error: 'Failed to create pet' })
  }
})

// Get all pets for a specific owner
petRouter.get('/', async (req: UserRequest, res: Response) => {
  try {
    const pets = await PetModel.getAllPets(req.user)
    res.status(200).json(pets)
  } catch (error) {
    console.error('Error fetching pets:', error)
    res.status(500).json({ error: 'Failed to fetch pets' })
  }
})

// Get a specific pet by ID for a specific owner
petRouter.get('/:id', async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.params
    const pet = await PetModel.getPetById(id, req.user)

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
petRouter.put('/:id', async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.params
    const { color, species, name } = req.body

    const petData: Partial<PetDocument> = {
      color,
      species,
      name,
      owner: req.user, // Update the owner field with the new ownerId
    }

    const pet = await PetModel.updatePet(id, petData, req.user)

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
petRouter.delete('/:id', async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.params

    const deleted = await PetModel.deletePet(id, req.user)

    if (!deleted) {
      return res.status(404).json({ error: 'Pet not found' })
    }

    res.status(204).json({ message: 'Success' }).end()
  } catch (error) {
    console.error('Error deleting pet:', error)
    res.status(500).json({ error: 'Failed to delete pet' })
  }
})

export default petRouter
