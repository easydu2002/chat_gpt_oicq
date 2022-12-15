export class Session {
  trackMessage: string[]
  last_time: Date
  constructor (trackMessage: string[], last_time: Date) {
    this.trackMessage = trackMessage
    this.last_time = last_time
  }
}
