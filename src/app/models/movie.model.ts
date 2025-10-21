export interface movieModel {
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  backdrop_path: string;
  vote_average: number;
  original_language: string;
  logo_path: string;
  runtime: number;
  reviews: ReviewResponse;
  genres: genres[];
  results: [];
}

export interface genres {
  id: number;
  name: string;
}

export interface ReviewResponse {
  results: ReviewItem[];
}
export interface ReviewItem {
  author: string;
  content: string;
  id: string;
  updated_at: string;
}
