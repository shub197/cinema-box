import { retrievePopularMovieList } from '@/services/movie-service';
import { useState, useEffect } from 'react';
import {
    Carousel, CarouselContent,
    CarouselItem, CarouselNext, CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from 'embla-carousel-autoplay';
import { Spinner } from '@/components/ui/spinner';

function MovieSlider() {
    const [popularMovieList, setPopularMovieList] = useState<{ [key: string]: any }[]>([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        async function fetchPopularMovieList() {
            try {
                const response = await retrievePopularMovieList();
                console.log(response);

                const localPopularMovieList: { [key: string]: any }[] = [];

                if (response && response.data && response.data.results && response.data.results.length > 0) {
                    response.data.results.forEach((movieItem: any) => {
                        movieItem.imageForDisplayInUi = 'https://image.tmdb.org/t/p/w1280' + movieItem.backdrop_path;
                        localPopularMovieList.push(movieItem);
                    })
                }

                setPopularMovieList(localPopularMovieList);
                console.log(localPopularMovieList)
            } catch (error) {

            } finally {
                setFetching(false);
            }
        }

        fetchPopularMovieList();
    }, [])

    return (
        fetching ? <div className="vertical-and-hz-center"><Spinner className="size-20" /></div>
            :
            <>
                <Carousel className="movie-slider-container"
                    plugins={[Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true
                    })
                    ]}>
                    <CarouselContent>
                        {
                            popularMovieList.map((movieItem, index) => {
                                return (
                                    <CarouselItem key={index}>
                                        <Card className="p-[unset]">
                                            <CardContent className="p-[unset]">
                                                <div className="movie-slide rounded-[13px_13px_0px_0px]">
                                                    <img src={movieItem.imageForDisplayInUi}
                                                        className="w-full rounded-[13px_13px_0px_0px] h-[450px] object-cover"
                                                    />

                                                    <div className="pl-[8px] pt-[8px] font-bold text-[24px]">
                                                        {movieItem.title}
                                                    </div>

                                                    <div className="pl-[8px] pb-[8px] text-sm text-[grey]">
                                                        {movieItem.overview}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </>
    )
}

export default MovieSlider;