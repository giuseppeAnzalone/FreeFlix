import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment_TMB} from '../environment/environment';
import { Observable } from 'rxjs';
import { movieModel } from '../models/movie.model';
import { CastResponse } from '../models/cast.model';
import { Video } from '../models/video.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http: HttpClient = inject(HttpClient);
  private BASE_URL: string = environment_TMB;

  fetchMovieforCategories(category: string): Observable<movieModel> {
    return this.http.get<movieModel>(`${this.BASE_URL}/movie/${category}`);
  }

  fetchMovieDetails(movieId: number): Observable<movieModel> {
    return this.http.get<movieModel>(
      `${this.BASE_URL}/movie/${movieId}?append_to_response=images,reviews`
    );
  }

  fetchMovieCredits(movieId: number): Observable<CastResponse> {
    return this.http.get<CastResponse>(
      `${this.BASE_URL}/movie/${movieId}/credits`
    );
  }

  fetchMovieVideo(movieId: number): Observable<Video[]> {
    return this.http
      .get<{ results: Video[] }>(`${this.BASE_URL}/movie/${movieId}/videos`)
      .pipe(map((res) => res.results));
  }
}
