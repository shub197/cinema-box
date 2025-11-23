import { useState, useEffect, useRef } from 'react';
import { retrieveMovieList, searchMovies } from '@/services/movie-service';
import { useSearch } from '@/contexts/SearchContext';
import { type Movie } from '@/interfaces/Movie';
import useDebounceSearchValue from '@/hooks/useDebounceSearchValue';
import useNewMovieList from '@/hooks/useNewMovieList';

function useMovies() {
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [fetchingMovieList, setFetching] = useState<boolean | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true);
    const trackedElement = useRef<HTMLDivElement>(null);
    const totalPages = useRef<number>(null);
    const { searchValue } = useSearch();
    const debouncedSearchValue = useDebounceSearchValue(1000);
    const isDebouncedSearchFirstChange = useRef(true);
    const abortController = useRef<AbortController | null>(null);
    const [resetPageNumber, setResetPageNumber] = useState(0);

    useEffect(() => {
        if (isDebouncedSearchFirstChange.current == true) {
            isDebouncedSearchFirstChange.current = false;
            return;
        }

        resetForSearch();
    }, [debouncedSearchValue]);

    function resetForSearch() {
        totalPages.current = 0;
        setMovieList([]);
        setHasMoreItems(true);
        setPageNumber(1);
        setResetPageNumber(previous => previous + 1);
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

        if (trackedElement.current) observer.observe(trackedElement.current);
        return () => observer.disconnect();

    }, [fetchingMovieList, hasMoreItems])

    useEffect(() => {
        fetchMovieList();
    }, [pageNumber, resetPageNumber])

    const fetchMovieList = async () => {
        abortController?.current?.abort();
        abortController.current = new AbortController();

        setFetching(true);

        try {
            const response = await ((searchValue) ? searchMovies(searchValue, pageNumber, abortController.current.signal) : retrieveMovieList(pageNumber, abortController.current.signal));

            if (!response || response?.data?.results.length == 0) return;

            if (pageNumber == response.data.page) {
                setMovieList((previousMovieList) => [...previousMovieList, ...useNewMovieList(response)]);
            }

            if (totalPages.current == 0) totalPages.current = response?.data?.total_pages;
            if (pageNumber == totalPages.current) setHasMoreItems(false);

        } catch (error: any) {
            if (error.name == 'CanceledError') return;

        } finally {
            if (abortController.current?.signal.aborted == false) {
                setFetching(false);
            }
        }
    }

    return { fetchingMovieList, movieList, trackedElement, totalPages, pageNumber, hasMoreItems }
}

export default useMovies;