import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { Weather } from 'src/app/_models/weather'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherUrl =
    'https://api.met.no/weatherapi/locationforecast/2.0/compact'

  constructor(private http: HttpClient) {}

  getWeatherByCity(
    lat: string | undefined,
    lon: string | undefined
  ): Observable<any> {
    return this.http
      .get(`${this.weatherUrl}?lat=${lat}&lon=${lon}`, {
        headers: { skip: 'true' },
      })
      .pipe(map((weather: any) => weather.properties.timeseries))
  }
}
