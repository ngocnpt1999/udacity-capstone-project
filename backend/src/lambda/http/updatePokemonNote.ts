import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updatePokemonNote } from '../../services/pokemonNoteService'
import { UpdatePokemonNoteRequest } from '../../requests/UpdatePokemonNoteRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const noteId = event.pathParameters.noteId
    const request: UpdatePokemonNoteRequest = JSON.parse(event.body)
    const updatedPkmNote = await updatePokemonNote(userId, noteId, request)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(updatedPkmNote)
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
