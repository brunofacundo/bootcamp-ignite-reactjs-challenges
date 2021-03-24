import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/formatDate';
import styles from './home.module.scss';

interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
        title: string;
        subtitle: string;
        author: string;
    };
}

interface PostPagination {
    next_page: string;
    results: Post[];
}

interface HomeProps {
    postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
    const [posts, setPosts] = useState(postsPagination.results);
    const [nextPage, setNextPage] = useState(postsPagination.next_page);

    function handleLoadMore(): void {
        fetch(nextPage)
            .then(response => response.json())
            .then((data: PostPagination) => {
                setPosts(oldPosts => [...oldPosts, ...data.results]);
                setNextPage(data.next_page);
            });
    }

    return (
        <>
            <Header title="Spacetraveling | Home" />
            <main className={styles.container}>
                <ul className={styles.posts}>
                    {posts.map(post => (
                        <li key={post.uid}>
                            <Link href={`/post/${post.uid}`}>
                                <a>{post.data.title}</a>
                            </Link>
                            <p>{post.data.subtitle}</p>
                            <div>
                                <time>
                                    <FiCalendar />
                                    {formatDate(post.first_publication_date, 'dd MMM yyyy')}
                                </time>
                                <span>
                                    <FiUser />
                                    {post.data.author}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

                {nextPage && (
                    <button type="button" className={styles.loadingMore} onClick={handleLoadMore}>
                        Carregar mais posts
                    </button>
                )}
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();
    const postsPagination = await prismic.query('', { pageSize: 20 });

    return {
        props: {
            postsPagination
        }
    };
};
