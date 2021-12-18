export interface Weather {
  time: string
  data: Data
}

export interface Data {
  instant: Instant
}

export interface Instant {
  details: Details
}

export interface Details {
  air_temperature: number
  relative_humidity: number
}
