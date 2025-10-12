import Header from '@/components/custom/Header';
import MovieList from '@/components/custom/MovieList';

function Home() {
    return (
        <>
            <Header />

            <main className="movie-container-body">
                <MovieList />
            </main>
        </>
    )
}

export default Home;