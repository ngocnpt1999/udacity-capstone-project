import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { PokemonNote } from '../models/PokemonNote'
import { PokemonNoteUpdate } from '../models/PokemonNoteUpdate'

const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const documentClient = new XAWS.DynamoDB.DocumentClient()

const logger = createLogger('PokemonNoteAccess')

const tableName = process.env.PKM_NOTE_TABLE

export async function findAllByUserId(userId: string): Promise<PokemonNote[]> {
  logger.info('Getting', { userId: userId })
  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeNames: {
      '#userId': 'userId'
    },
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }
  const result = await documentClient.query(params).promise()
  const items: PokemonNote[] = result.Items as PokemonNote[]
  logger.info('Count', { count: items.length })
  return items
}

export async function create(item: PokemonNote): Promise<PokemonNote> {
  logger.info('Creating')
  const params: DocumentClient.PutItemInput = {
    TableName: tableName,
    Item: item
  }
  await documentClient.put(params).promise()
  logger.info('Created', item)
  return item
}

export async function update(
  item: PokemonNoteUpdate,
  userId: string,
  noteId: string
): Promise<PokemonNoteUpdate> {
  logger.info('Updating', { userId: userId, noteId: noteId })
  const params: DocumentClient.UpdateItemInput = {
    TableName: tableName,
    Key: {
      userId,
      noteId
    },
    UpdateExpression:
      'set #updatedAtItem = :updatedAtItem, #nameItem = :nameItem, #attributeItem = :attributeItem, #combatPowerItem = :combatPowerItem, #descriptionItem = :descriptionItem',
    ExpressionAttributeNames: {
      '#updatedAtItem': 'updatedAt',
      '#nameItem': 'name',
      '#attributeItem': 'attribute',
      '#combatPowerItem': 'combatPower',
      '#descriptionItem': 'description'
    },
    ExpressionAttributeValues: {
      ':updatedAtItem': item.updatedAt,
      ':nameItem': item.name,
      ':attributeItem': item.attribute,
      ':combatPowerItem': item.combatPower,
      ':descriptionItem': item.description
    },
    ReturnValues: 'ALL_NEW'
  }
  const result = await documentClient.update(params).promise()
  const updatedNote: PokemonNoteUpdate = result.Attributes as PokemonNoteUpdate
  logger.info('Updated')
  return updatedNote
}

export async function remove(userId: string, noteId: string): Promise<string> {
  logger.info('Removing', { userId: userId, noteId: noteId })
  const params = {
    Key: {
      userId: userId,
      noteId: noteId
    },
    TableName: tableName
  }
  await documentClient.delete(params).promise()
  logger.info('Removed')
  return ''
}
