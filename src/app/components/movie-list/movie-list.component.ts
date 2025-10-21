import {Component, DestroyRef, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {movieModel} from '../../models/movie.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  private movieService = inject(MovieService)
  private destroyRef = inject(DestroyRef)
  private router = inject(Router);
  @ViewChild('scrollContainer', {static: true}) scrollContainer!: ElementRef;
  @Input() categoryMovieList: string = '';
  @Input() categoryLabel: string = '';
  public movies: movieModel[] = [];


  ngOnInit(): void {
    const subscription = this.movieService.fetchMovieforCategories(this.categoryMovieList)
      .subscribe(movie => {
      this.movies = movie.results;
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }


  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({left: -300, behavior: 'smooth'});
  }


  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({left: 300, behavior: 'smooth'});
  }


  getMovieDetails(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
