import { useEffect, useState } from 'react';
import { retrieveMovieList, searchMovies } from '@/services/movie-service';
import { Spinner } from '@/components/ui/spinner';
import { Card } from '@/components/ui/card';
import { useSearch } from '@/contexts/SearchContext';
import { MovieDetailsDialog } from './MovieDetailsDialog';

function MovieList() {
    interface Movie {
        id: number,
        name: string,
        title: string,
        media_type: string,
        overview: string
    }

    const [movieList, setMovieList] = useState<{ [key: string]: any }[]>([])
    const [fetchingMovieList, setFetching] = useState<boolean | null>(null);
    const { searchValue } = useSearch();
    const [showDialog, setShowDialogValue] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();

    const fetchMovieList = async () => {
        setFetching(true);

        try {
            for (let pageNumber = 1; pageNumber <= 6; pageNumber++) {
                const response = await retrieveMovieList(pageNumber)
                createNewMovieList(response);
            }
        } catch (error) {

        } finally {
            setFetching(false);
        }
    }

    const searchMovie = async () => {
        setFetching(true);
        try {
            const response = await searchMovies(searchValue);
            createNewMovieList(response);
        } catch (error) {

        } finally {
            setFetching(false)
        }
    }

    function createNewMovieList(response: any) {
        const localMovieList: {
            [key: string]: any
        }[] = [];

        response?.data?.results?.forEach((movieItem: any) => {
            movieItem.imageForDisplayInUi = 'https://image.tmdb.org/t/p/original' + movieItem.poster_path;
            localMovieList.push(movieItem);
        })

        setMovieList((searchValue && searchValue.length > 0) ? localMovieList : (prev => [...prev, ...localMovieList]));
    }

    useEffect(() => {
        (searchValue && searchValue.length > 0) ? searchMovie() : fetchMovieList();
    }, [searchValue])

    function setUpMovieDetailsDialog(movie: any) {
        setShowDialogValue(true)
        setSelectedMovie(movie);
    }

    return (
        <div>
            {
                fetchingMovieList ? <div className="vertical-and-hz-center"><Spinner className="size-20" /></div> :
                    <div className="movie-list-container">
                        {
                            (movieList && movieList.length > 0) ? movieList.map((movie, index) => {
                                return (
                                    <div
                                        onClick={() => setUpMovieDetailsDialog(movie)}
                                        key={index}
                                        className="w-[70px] sm:w-[75px] md:w-[120px] lg:w-[130px] movie-item cursor-pointer"
                                    >
                                        <Card className="h-[90px] sm:h-[90px] md:h-[180px] lg:h-[180px] image-card p-[unset] rounded-[4px]">
                                            <img src={movie.imageForDisplayInUi}
                                                alt={movie.name}
                                                className="h-[90px] sm:h-[90px] md:h-[180px] lg:h-[180px]
                                                rounded-[4px] movie-poster-img"
                                            />
                                        </Card>

                                        <div className="name text-[12px]">{movie.title ? movie.title : movie.name}</div>
                                    </div>
                                )
                            }) : <div className="vertical-and-hz-center text-[grey] italic">No movies found</div>


                        }

                        {(showDialog == true && selectedMovie) ? <MovieDetailsDialog
                            movie={selectedMovie}
                            setShowDialogValue={setShowDialogValue}
                            showDialog={showDialog}
                        /> : null}
                    </div>
            }
        </div>
    )
}

export default MovieList;