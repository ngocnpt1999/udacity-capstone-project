import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deletePokemonNote } from '../../services/pokemonNoteService'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const noteId = event.pathParameters.noteId
    const value = await deletePokemonNote(userId, noteId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: value
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)
