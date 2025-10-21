import {Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, OnInit,} from '@angular/core';
import {DatePipe, DecimalPipe, NgForOf, SlicePipe, UpperCasePipe,} from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { movieModel } from '../../models/movie.model';
import {StarIconComponent} from '../../icons/star-icon.component';
import {GlobeIconComponent} from '../../icons/globe-icon.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-swiper-carousel',
  imports: [
    UpperCasePipe,
    NgForOf,
    SlicePipe,
    DatePipe,
    DecimalPipe,
    StarIconComponent,
    GlobeIconComponent,
  ],
  templateUrl: './swiper-carousel.component.html',
  styleUrl: './swiper-carousel.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperCarouselComponent implements OnInit {
  private movieService = inject(MovieService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  public popularMovies: movieModel[] = [];

  ngOnInit() {
    this.getPopularMovies();
  }

  getPopularMovies() {
    const subscription = this.movieService
      .fetchMovieforCategories('popular')
      .subscribe((movie) => {
        this.popularMovies = movie.results;
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  getMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
