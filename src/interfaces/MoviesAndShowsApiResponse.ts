import { type Movie } from '@/interfaces/Movie';

export interface MoviesAndShowsApiResponse {
    data: {
        results: Movie[],
        page: number,
        total_pages: number,
        total_results: number
    }
}