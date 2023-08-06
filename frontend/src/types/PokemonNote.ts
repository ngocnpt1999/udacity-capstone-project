export interface PokemonNote {
  userId: string;
  noteId: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  attribute: string;
  combatPower: number;
  description?: string;
  attachmentUrl: string;
}
