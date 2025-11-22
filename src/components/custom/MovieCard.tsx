import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { type Movie } from '@/interfaces/Movie';
import MovieDetailsDialog from './MovieDetailsDialog';

interface MovieCardProps {
    movie: Movie,
    key: number
}

function MovieCard({ movie }: MovieCardProps) {
    const [isDialogOpen, setIsDialogOpenValue] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();

    function setUpMovieDetailsDialog(movie: Movie) {
        setIsDialogOpenValue(true)
        setSelectedMovie(movie);
    }

    return (
        <>
            <div
                onClick={() => { setUpMovieDetailsDialog(movie) }}
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

            {(isDialogOpen == true && selectedMovie) ?
                <MovieDetailsDialog
                    movie={selectedMovie}
                    setIsDialogOpenValue={setIsDialogOpenValue}
                    isDialogOpen={isDialogOpen}
                />
                : null}
        </>
    )
}

export default MovieCard;