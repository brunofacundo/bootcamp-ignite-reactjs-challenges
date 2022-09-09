import { memo } from 'react';
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

function SideBarComponent({ selectedGenreId, genres, onClick }: SideBarProps) {
    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map(genre => (
                    <Button
                        key={genre.id}
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

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => Object.is(prevProps, nextProps));
