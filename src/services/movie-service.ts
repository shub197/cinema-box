import axios from 'axios';

interface QueryParams {
    [key: string]: any;
}

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmZmY2I1ZTUyZmEzOTE5N2JlNjZlMjFiNmMzMDc4OCIsIm5iZiI6MTc1OTMxNzI2NC4yNzYsInN1YiI6IjY4ZGQwZDEwNDJmNDI2YTU5YWJiMWIwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qHhcS1NqvAtPsAjSHl2BAKMRPo_xV0aGfD7i5IgO0x8';

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

const retrieveMovieList = async (pageNumber: number) => {
    try {
        var endPoint = '3/trending/all/day';

        const params: QueryParams = {
            language: 'en-US',
            page: pageNumber
        }

        var response = await apiProperties.get(endPoint, { params: params })
        return response;
    } catch (error) {
        throw error;
    } finally {

    }
}

const retrievePopularMovieList = async () => {
    try {
        var endPoint = '3/movie/popular';
        var response = await apiProperties.get(endPoint)
        return response;
    } catch (error) {
        throw error;
    } finally {

    }
}

const searchMovies = async (searchString: string | null) => {
    try {
        const endPoint = '3/search/multi';

        const params: QueryParams = {
            query: searchString
        }

        const response = await apiProperties.get(endPoint, { params: params })
        return response;
    } catch (error) {
        throw error;
    } finally {

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
    } finally {

    }
}

export { retrieveMovieList, retrievePopularMovieList, searchMovies, retrieveVideoDetailsById }