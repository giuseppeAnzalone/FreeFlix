export interface ReviewResponse {
  results: ReviewItem[];
}
export interface ReviewItem {
  author: string;
  content: string;
  id: string;
  updated_at: string;
}
