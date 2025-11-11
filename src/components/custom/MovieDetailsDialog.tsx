import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { retrieveVideoDetailsById } from '@/services/movie-service';
import { Spinner } from '@/components/ui/spinner';
import { type Movie } from '@/interfaces/Movie';

interface ChildProps {
    movie: Movie,
    showDialog: boolean,
    setShowDialogValue: (value: boolean) => void
}

interface VideoDetails {
    key: string,
    embeddedUrl: string,
    site: string
}

function MovieDetailsDialog({ movie, showDialog, setShowDialogValue }: ChildProps) {
    const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
    const [fetching, setFetching] = useState<boolean | null>(null)

    const fetchVideDetailsById = async () => {
        setFetching(true);
        try {
            const response = await retrieveVideoDetailsById(movie.media_type, movie.id);

            if (response && response.data && response.data.results && response.data.results.length > 0) {
                const localVideoDetails: VideoDetails = response.data.results[0];
                localVideoDetails.embeddedUrl = 'https://www.youtube.com/embed/' + response.data.results[0].key;
                setVideoDetails(localVideoDetails);
            }
        } catch (error) {

        } finally {
            setFetching(false);
        }
    }

    useEffect(() => {
        if (showDialog) fetchVideDetailsById();

        return () => {
            setVideoDetails(null);
            setFetching(null);
        }
    }, [showDialog])

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialogValue}>
            <DialogContent className="max-h-[85vh] overflow-hidden max-w-[800px] w-[95%]">
                <DialogHeader className="dialog-header gap-[18px]">
                    <DialogTitle>
                        {movie ? (movie.name ? movie.name : movie.title) : 'Details'}

                        {
                            movie.releaseYear && <span className="ml-[3px]">({movie.releaseYear})</span>
                        }

                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {
                    fetching ? <div className="place-items-center m-[12px]"><Spinner className="size-20" /></div> :
                        <div className="dialog-body overflow-y-auto max-h-[60vh]">
                            <div className="m-[0px_16px_16px_16px]">
                                <div className="mb-[8px]">
                                    {
                                        (videoDetails && videoDetails.embeddedUrl) ?
                                            <iframe
                                                className="h-[200px] sm:h-[250px] md:h-[380px] lg:h-[380px] xl:h-[380px] rounded-[4px]"
                                                src={(videoDetails && videoDetails.embeddedUrl) ? videoDetails.embeddedUrl : undefined}
                                                width="100%"
                                                height="200"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            ></iframe>
                                            : <div className="text-center text-[grey] italic">No Video Available</div>
                                    }
                                </div>

                                <div className="text-xs font-bold">
                                    {movie.overview}
                                </div>
                            </div>
                        </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export { MovieDetailsDialog }