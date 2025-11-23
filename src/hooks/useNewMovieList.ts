import { type Movie } from '@/interfaces/Movie';
import { type MoviesAndShowsApiResponse } from '@/interfaces/MoviesAndShowsApiResponse';
import noImageAvailableImage from '@/assets/images/no-image-available.jpg';

function useNewMovieList(response: MoviesAndShowsApiResponse) {
    const newMovieList = response?.data?.results?.map((movieItem: Movie) => {
        const releaseDateString = movieItem.release_date ? movieItem.release_date :
            movieItem.first_air_date ? movieItem.first_air_date : null;

        const releaseDate: Date | null = releaseDateString ? new Date(releaseDateString) : null;

        return {
            ...movieItem,
            releaseYear: releaseDate ? releaseDate.getFullYear() : null,
            imageUrl: movieItem.poster_path ? `https://image.tmdb.org/t/p/original${movieItem.poster_path}` : noImageAvailableImage
        }
    })


    return newMovieList;
}

export default useNewMovieList;