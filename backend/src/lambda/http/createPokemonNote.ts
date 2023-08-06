import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreatePokemonNoteRequest } from '../../requests/CreatePokemonNoteRequest'
import { getUserId } from '../utils'
import { createPokemonNote } from '../../services/pokemonNoteService'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const request: CreatePokemonNoteRequest = JSON.parse(event.body)
    const newPkmNote = await createPokemonNote(userId, request)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(newPkmNote)
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
