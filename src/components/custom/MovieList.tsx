import { Spinner } from '@/components/ui/spinner';
import useMovies from '@/hooks/useMovies';
import MovieCard from '@/components/custom/MovieCard';

function MovieList() {
    const { fetchingMovieList, movieList, trackedElement, totalPages, pageNumber, hasMoreItems } = useMovies();

    return (
        <>
            <div className="movie-list-container">
                {
                    (movieList && movieList.length > 0) ?
                        movieList.map((movie) => {
                            return (
                                <MovieCard
                                    movie={movie}
                                    key={movie.id}
                                ></MovieCard>
                            )
                        }) : (!fetchingMovieList) &&
                        <div className="vertical-and-hz-center text-[grey] italic">No movies and shows found</div>
                }
            </div>

            {
                (fetchingMovieList) &&
                <div className={`${(pageNumber == 1) ? 'vertical-and-hz-center' : 'place-items-center'}`}>
                    <Spinner className="size-20" />
                </div>
            }

            {
                ((pageNumber != totalPages.current) && hasMoreItems) &&
                <div ref={trackedElement} className="mt-[10px] place-items-center"></div>
            }

            {
                ((pageNumber == totalPages.current) && !fetchingMovieList && movieList.length > 0) &&
                <div className="mb-[12px] text-center italic text[grey]">All movies and shows are loaded!</div>
            }
        </>
    )
}

export default MovieList;