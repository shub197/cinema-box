import axios from 'axios';

interface QueryParams {
    [key: string]: any;
}

const token = import.meta.env.VITE_ACCESS_TOKEN;

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
        console.error('Error occurred during API call:', error);
        return Promise.reject(error);
    }
)

const retrieveMovieList = async () => {
    try {
        var endPoint = '3/trending/all/day';

        const params: QueryParams = {
            language: 'en-US',
            page: 1
        }

        var response = await apiProperties.get(endPoint, { params: params })
        return response;
    } catch (error) {
        console.error(error);

    } finally {

    }
}

const retrievePopularMovieList = async () => {
    try {
        var endPoint = '3/movie/popular';
        var response = await apiProperties.get(endPoint)
        return response;
    } catch (error) {

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

    } finally {

    }
}

export { retrieveMovieList, retrievePopularMovieList, searchMovies }