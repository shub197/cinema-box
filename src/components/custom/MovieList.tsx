import { useEffect, useState, useRef } from 'react';
import { retrieveMovieList, searchMovies } from '@/services/movie-service';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';
import { useSearch } from '@/contexts/SearchContext';
import { MovieDetailsDialog } from './MovieDetailsDialog';
import { type Movie } from '@/interfaces/Movie';
import noImageAvailableImage from '@/assets/images/no-image-available.jpg';

function MovieList() {
    const [movieList, setMovieList] = useState<Movie[]>([])
    const [fetchingMovieList, setFetching] = useState<boolean | null>(null);
    const { searchValue } = useSearch();
    const [isDialogOpen, setIsDialogOpenValue] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
    const loaderReference = useRef<HTMLDivElement>(null);
    let totalPages = useRef<number>(null);

    useEffect(() => {
        let fetchMoviesHandler: ReturnType<typeof setTimeout>;
        const milliseconds = (searchValue ? 1000 : 0)

        fetchMoviesHandler = setTimeout(() => {
            resetPageNumberAndHasMoreItems();
        }, milliseconds)

        return () => {
            clearTimeout(fetchMoviesHandler);
        }
    }, [searchValue]);

    function resetPageNumberAndHasMoreItems() {
        totalPages.current = 0;
        if (hasMoreItems == false) setHasMoreItems(true);

        if (pageNumber == 1) {
            if (movieList.length > 0 || (hasMoreItems == false)) {
                setPageNumber(0);
            }

        } else if (pageNumber > 1) {
            setPageNumber(1);
        }
    }

    useEffect(() => {
        if (fetchingMovieList) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];

                if (target.isIntersecting && hasMoreItems) {
                    setPageNumber((previousPageNumber) => previousPageNumber + 1);
                }
            }, { threshold: 1.0 }
        )

        if (loaderReference.current) observer.observe(loaderReference.current);
        return () => observer.disconnect();

    }, [fetchingMovieList, hasMoreItems])

    useEffect(() => {
        if (pageNumber == 0) {
            setPageNumber(1);

        } else if (pageNumber > 0) {
            if (pageNumber == 1 && movieList.length > 0) setMovieList([]);
            fetchMovieList();
        }
    }, [pageNumber])

    const fetchMovieList = async () => {
        setFetching(true);

        try {
            const response = await ((searchValue) ? searchMovies(searchValue, pageNumber) : retrieveMovieList(pageNumber));
            createNewMovieList(response);

            if (totalPages.current == 0) totalPages.current = response?.data?.total_pages;
            if (pageNumber == totalPages.current) setHasMoreItems(false);

        } catch (error) {

        } finally {
            setFetching(false);
        }
    }

    function createNewMovieList(response: any) {
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

        setMovieList((previousMovieList) => [...previousMovieList, ...newMovieList]);
    }

    function setUpMovieDetailsDialog(movie: Movie) {
        setIsDialogOpenValue(true)
        setSelectedMovie(movie);
    }

    return (
        <>
            {
                <div className="movie-list-container">
                    {
                        (movieList && movieList.length > 0) ?
                            movieList.map((movie) => {
                                return (
                                    <div
                                        onClick={() => setUpMovieDetailsDialog(movie)}
                                        key={movie.id}
                                        className="w-[70px] sm:w-[70px] md:w-[120px] lg:w-[120px] max-w-[100%] movie-item cursor-pointer"
                                    >
                                        <Card className="h-[100px] sm:h-[100px] md:h-[160px] lg:h-[160px] image-card p-[unset] rounded-[4px]">
                                            <img src={movie.imageUrl}
                                                alt={movie.name}
                                                className="h-[inherit] rounded-[4px] movie-poster-img"
                                            />
                                        </Card>

                                        <div className="name text-[12px]" >
                                            {movie.title ? movie.title : movie.name}
                                            <span className="ml-[3px]" >{movie.releaseYear && (movie.releaseYear)} </span>
                                        </div>
                                    </div>
                                )
                            }) : (!fetchingMovieList) &&
                            <div className="vertical-and-hz-center text-[grey] italic">No movies and shows found</div>
                    }

                    {
                        (isDialogOpen == true && selectedMovie) ?
                            <MovieDetailsDialog
                                movie={selectedMovie}
                                setIsDialogOpenValue={setIsDialogOpenValue}
                                isDialogOpen={isDialogOpen}
                            />
                            : null
                    }
                </div>
            }

            {
                (fetchingMovieList) &&
                <div className={`${(pageNumber == 1) ? 'vertical-and-hz-center' : 'place-items-center'}`}>
                    <Spinner className="size-20" />
                </div>
            }

            {
                ((pageNumber != totalPages.current) && movieList.length > 0) &&
                <div ref={loaderReference} className="mt-[10px] place-items-center"></div>
            }

            {
                ((pageNumber == totalPages.current) && !fetchingMovieList) &&
                <div className="mb-[12px] text-center italic text[grey]">All movies and shows are loaded!</div>
            }
        </>
    )
}

export default MovieList;