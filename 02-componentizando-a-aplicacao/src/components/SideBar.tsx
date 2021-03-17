import { Button } from './Button';

interface SideBarProps {
    selectedGenreId: Number;
    genres: {
        id: number;
        name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
        title: string;
    }[];
    onClick: (id: number) => void;
}

export function SideBar({ selectedGenreId, genres, onClick }: SideBarProps) {
    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map(genre => (
                    <Button
                        id={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => onClick(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    );
}
