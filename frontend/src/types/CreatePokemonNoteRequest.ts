export interface CreatePokemonNoteRequest {
  name: string;
  attribute: string;
  combatPower: number;
  description?: string;
  attachmentUrl: string;
}
