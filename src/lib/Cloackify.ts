import axios from 'axios'

export class Clockify {
  static async getWorkspaces (token: string) {
    const url = 'https://api.clockify.me/api/v1/workspaces/'
    const headers = {
      'X-Api-Key': token
    }

    const { data, status } = await axios.get(url, { headers })

    if (status !== 200) {
      throw new Error()
    }

    // @ts-ignore
    return JSON.parse(data).map(({ id, name }) => {
      return { id, name }
    })
  }

  static async addTimeEntry (token: string, workspace: string, entry: Entry) {
    const url = `https://api.clockify.me/api/v1/workspaces/${workspace}/time-entries`
    const headers = {
      'X-Api-Key': token
    }
    const body = JSON.stringify(entry)

    const { status } = await axios.post(url, body, { headers })

    if (status !== 201) {
      throw new Error()
    }
  }
}

export type Entry = {
  start: string
  end: string
  description: string
  project?: string
  task?: string
  tags?: string[]
}
