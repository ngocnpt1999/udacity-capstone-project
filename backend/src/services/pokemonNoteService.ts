import * as PokemonNoteAccess from '../helpers/pokemonNoteAccess'
import { PokemonNote } from '../models/PokemonNote'
import { PokemonNoteUpdate } from '../models/PokemonNoteUpdate'
import { CreatePokemonNoteRequest } from '../requests/CreatePokemonNoteRequest'
import { UpdatePokemonNoteRequest } from '../requests/UpdatePokemonNoteRequest'
import { v4 as uuidv4 } from 'uuid'
import * as dayjs from 'dayjs'

export async function getAllPokemonNote(
  userId: string
): Promise<PokemonNote[]> {
  return PokemonNoteAccess.findAllByUserId(userId)
}

export async function createPokemonNote(
  userId: string,
  request: CreatePokemonNoteRequest
): Promise<PokemonNote> {
  var noteId = uuidv4()
  return PokemonNoteAccess.create({
    userId: userId,
    noteId: noteId,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: '',
    ...request
  })
}

export async function updatePokemonNote(
  userId: string,
  noteId: string,
  request: UpdatePokemonNoteRequest
): Promise<PokemonNoteUpdate> {
  return PokemonNoteAccess.update(
    {
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ...request
    },
    userId,
    noteId
  )
}

export async function deletePokemonNote(
  userId: string,
  noteId: string
): Promise<string> {
  return PokemonNoteAccess.remove(userId, noteId)
}
