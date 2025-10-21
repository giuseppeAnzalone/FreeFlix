import {Component} from '@angular/core';
import {SwiperCarouselComponent} from '../swiper-carousel/swiper-carousel.component';
import {MovieListComponent} from '../movie-list/movie-list.component';
import {LogoComponent} from '../logo/logo.component';
import {SearchInputComponent} from '../search-input/search-input.component';
import {IconMenuComponent} from '../icon-menu/icon-menu.component';

@Component({
  selector: 'app-home-page',
  imports: [
    SwiperCarouselComponent,
    MovieListComponent,
    LogoComponent,
    SearchInputComponent,
    IconMenuComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
