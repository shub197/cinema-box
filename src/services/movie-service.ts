import axios from 'axios';

interface QueryParams {
    [key: string]: unknown;
}

const token = import.meta.env.VITE_API_ACCESS_TOKEN;

const apiProperties = axios.create({
    baseURL: 'https://api.themoviedb.org',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + token
    }
})

apiProperties.interceptors.response.use(
    response => response,
    (error) => {
        return Promise.reject(error);
    }
)

const retrieveMovieList = async (pageNumber: number | null, signal: AbortSignal) => {
    try {
        const endPoint = '3/trending/all/day';

        const params: QueryParams = {
            language: 'en-US',
            page: pageNumber
        }

        const response = await apiProperties.get(endPoint, {
            params: params,
            signal: signal
        })

        return response;

    } catch (error) {
        throw error;
    }
}

const searchMovies = async (searchString: string | null, pageNumber: number | null, signal: AbortSignal) => {
    try {
        const endPoint = '3/search/multi';

        const params: QueryParams = {
            query: searchString,
            page: pageNumber
        }

        const response = await apiProperties.get(endPoint, { params: params, signal: signal })
        return response;

    } catch (error) {
        throw error;
    }
}

const retrieveVideoDetailsById = async (type: string, movieId: number) => {
    try {
        if (!type) return;
        const endPoint = '3/' + type + '/' + movieId + '/videos';
        const response = await apiProperties.get(endPoint);
        return response;

    } catch (error) {
        throw error;
    }
}

const retrievePopularMovieList = async () => {
    try {
        const endPoint = '3/movie/popular';
        const response = await apiProperties.get(endPoint)
        return response;
    } catch (error) {
        throw error;
    } finally {

    }
}

export { retrieveMovieList, retrievePopularMovieList, searchMovies, retrieveVideoDetailsById }