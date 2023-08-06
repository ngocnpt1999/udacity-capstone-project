import { apiEndpoint } from "../config";
import { PokemonNote } from "../types/PokemonNote";
import { CreatePokemonNoteRequest } from "../types/CreatePokemonNoteRequest";
import { UpdatePokemonNoteRequest } from "../types/UpdatePokemonNoteRequest";
import Axios from "axios";

export async function getPokemonNotes(idToken: string): Promise<PokemonNote[]> {
  console.log("Fetching pokemon notes");

  const response = await Axios.get(`${apiEndpoint}/pokemon-notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log("PokemonNotes:", response.data);
  return response.data.items;
}

export async function createPokemonNote(
  idToken: string,
  newPokemonNote: CreatePokemonNoteRequest
): Promise<PokemonNote> {
  const response = await Axios.post(
    `${apiEndpoint}/pokemon-notes`,
    JSON.stringify(newPokemonNote),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}

export async function patchPokemonNote(
  idToken: string,
  noteId: string,
  updatedPokemonNote: UpdatePokemonNoteRequest
): Promise<void> {
  await Axios.patch(
    `${apiEndpoint}/pokemon-notes/${noteId}`,
    JSON.stringify(updatedPokemonNote),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
}

export async function deletePokemonNote(
  idToken: string,
  noteId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/pokemon-notes/${noteId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });
}

export async function getUploadUrl(
  idToken: string,
  keyName: string
): Promise<string> {
  const response = await Axios.post(
    `${apiEndpoint}/attachment/${keyName}`,
    "",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.uploadUrl;
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await Axios.put(uploadUrl, file);
}
