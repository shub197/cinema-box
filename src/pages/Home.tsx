import Header from '@/components/custom/Header';
import MovieList from '@/components/custom/MovieList';
import SearchBar from '@/components/custom/SearchBar';

function Home() {
    return (
        <>
            <Header />

            <main className="movie-container-body">
                <MovieList />
                <div>
                    <SearchBar />
                </div>
            </main>
        </>
    )
}

export default Home;