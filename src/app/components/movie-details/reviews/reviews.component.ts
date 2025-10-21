import {Component, Input} from '@angular/core';
import {ReviewItem} from '../../../models/movie.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [
    DatePipe
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  @Input() reviews: ReviewItem[] = [];
}
