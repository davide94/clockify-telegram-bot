
export class Clockify {

  static async getWorkspaces(token: string) {
    // GET https://api.clockify.me/api/v1/workspaces/
    // X-Api-Key: <token>

    //TODO: implement

  }

  static async addTimeEntry(token: string, entry: Entry) {
    // POST https://api.clockify.me/api/v1/workspaces/<workspace-id>/time-entries
    // X-Api-Key: <token>

    //TODO: implement

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