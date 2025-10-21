import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { ReviewItem, movieModel } from '../../models/movie.model';
import { DecimalPipe, NgClass, UpperCasePipe } from '@angular/common';
import { StarIconComponent } from '../../icons/star-icon.component';
import { ClockIconComponent } from '../../icons/clock-icon.component';
import { GlobeIconComponent } from '../../icons/globe-icon.component';
import { LogoComponent } from '../logo/logo.component';
import { IconMenuComponent } from '../icon-menu/icon-menu.component';
import { PlayIconComponent } from '../../icons/play-icon.component';
import { FavoriteIconComponent } from '../../icons/favorite-icon.component copy';
import { EyeIconComponent } from '../../icons/eye-icon.component';
import { PaperAirplaneIconComponent } from '../../icons/paper-airplane-icon.component';
import { Cast } from '../../models/cast.model';
import { CastComponent } from './cast/cast.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {SearchInputComponent} from '../search-input/search-input.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-detail.component.html',
  imports: [
    DecimalPipe,
    StarIconComponent,
    StarIconComponent,
    UpperCasePipe,
    ClockIconComponent,
    GlobeIconComponent,
    LogoComponent,
    IconMenuComponent,
    PlayIconComponent,
    FavoriteIconComponent,
    EyeIconComponent,
    PaperAirplaneIconComponent,
    NgClass,
    CastComponent,
    ReviewsComponent,
    SearchInputComponent,
  ],
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private destroyRef = inject(DestroyRef);
  private sanitizer = inject(DomSanitizer);

  public movie!: movieModel;
  public movieReviews: ReviewItem[] = [];
  public movieCast: Cast[] = [];
  public activeTab: 'cast' | 'reviews' = 'cast';

  trailerKey: string | null = null;
  showTrailer = false;
  safeTrailerUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    this.getMovieDetails();
    this.getMovieCredits();
    this.getMovieVideo();
  }

  getMovieDetails(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    if (movieId) {
      const subscription = this.movieService
        .fetchMovieDetails(movieId)
        .subscribe((res) => {
          this.movie = res;
          this.movieReviews = res.reviews.results;
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  getMovieCredits(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    const subscription = this.movieService
      .fetchMovieCredits(movieId)
      .subscribe((res) => {
        this.movieCast = res.cast;
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getMovieVideo(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    const subscription = this.movieService
      .fetchMovieVideo(movieId)
      .subscribe((videos) => {
        const trailer = videos.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer) {
          this.trailerKey = trailer.key;
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&enablejsapi=1`
          );
        } else {
          this.trailerKey = null;
          this.safeTrailerUrl = null;
        }
      });
  }
}
