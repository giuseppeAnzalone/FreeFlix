export interface CastResponse {
  cast: Cast[];
}

export interface Cast {
  name: string;
  profile_path: string;
  cast_id: number;
}
