import { config } from 'src/config'

export class Session {
  trackMessage: Array<[string, string]>
  last_time: Date
  constructor (trackMessage: Array<[string, string]>, last_time: Date) {
    this.trackMessage = trackMessage
    this.last_time = last_time
  }

  pushTrackMessage (q: string, a: string) {
    if (this.trackMessage.length === config.officialAPI.maxTrackCount) {
      this.trackMessage.shift()
    }
    this.trackMessage.push([q, a])
  }
}
