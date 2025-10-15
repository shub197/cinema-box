import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { retrieveVideoDetailsById } from '@/services/movie-service';
import { Spinner } from '@/components/ui/spinner';

interface ChildProps {
    movie: Movie,
    showDialog: boolean,
    setShowDialogValue: (value: boolean) => void
}

interface Movie {
    id: number,
    name: string,
    title: string,
    media_type: string,
    overview: string
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
    }, [showDialog])

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialogValue}>
            <DialogContent className="min-w-[300px] max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{movie ? (movie.name ? movie.name : movie.title) : 'Details'}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="">
                    {
                        fetching ? <div className="place-items-center"><Spinner className="size-20" /></div> :
                            <>
                                <div className="mb-[6px]">
                                    <iframe
                                        className="min-h-[400px] rounded-[4px]"
                                        src={(videoDetails && videoDetails.embeddedUrl) ? videoDetails.embeddedUrl : undefined}
                                        width="100%"
                                        height="200"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                </div>

                                <div className="text-xs">
                                    {movie.overview}
                                </div>
                            </>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { MovieDetailsDialog }