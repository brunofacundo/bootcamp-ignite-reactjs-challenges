import { memo } from 'react';
import { MovieCard } from './MovieCard';

interface ContentProps {
    title: string;
    movies: {
        Title: string;
        Poster: string;
        Ratings: Array<{
            Source: string;
            Value: string;
        }>;
        Runtime: string;
    }[];
}

function ContentComponent({ title, movies }: ContentProps) {
    return (
        <div className="container">
            <header>
                <span className="category">
                    Categoria:<span> {title}</span>
                </span>
            </header>

            <main>
                <div className="movies-list">
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.Title}
                            title={movie.Title}
                            poster={movie.Poster}
                            runtime={movie.Runtime}
                            rating={movie.Ratings[0].Value}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps));
