import { DocumentClient } from 'aws-sdk/clients/dynamodb'
const region = process.env.REGION!
const usersTableName = process.env.USERS_TABLE_NAME!

export class DB {
  private static client: DocumentClient

  private static getClient () {
    if (!DB.client) {
      this.client = new DocumentClient({ region })
    }
    return this.client
  }

  static async createUser (entity: User) {
    const client = DB.getClient()

    const params: DocumentClient.PutItemInput = {
      TableName: usersTableName,
      Item: entity
    }
    await client.put(params).promise()

    return await DB.getUser(entity.id)
  }

  static async updateUser (id: string, update: UserUpdate) {
    if (!Object.keys(update).length) {
      return
    }

    const client = DB.getClient()

    const params: DocumentClient.UpdateItemInput = {
      TableName: usersTableName,
      Key: { id },
      UpdateExpression: 'SET #a=:a',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {}
    }

    Object.keys(update).forEach(x => {
      params.UpdateExpression += `#${x}=:${x} `
      params.ExpressionAttributeNames!['#' + x] = x
      // @ts-ignore
      params.ExpressionAttributeValues![':' + x] = update[x]
    })

    await client.update(params).promise()

    return await DB.getUser(id)
  }

  static async getUser (id: string) {
    const client = DB.getClient()

    const params: DocumentClient.GetItemInput = {
      TableName: usersTableName,
      Key: { id }
    }

    const { Item: item } = await client.get(params).promise()

    if (item == null) {
      throw new Error('UserNotFound')
    }

    return item
  }
}

export type User = {
  id: string
  name: string
  token?: string
  defaultWorkspace?: string
}

export type UserUpdate = {
  name?: string
  token?: string
  defaultWorkspace?: string
}
