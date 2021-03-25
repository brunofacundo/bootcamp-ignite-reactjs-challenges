import { useState } from 'react';
import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';

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
    preview: boolean;
}

export default function Home({ postsPagination, preview }: HomeProps): JSX.Element {
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
                <div className={styles.content}>
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
                        <button type="button" className={styles.loadingMoreButton} onClick={handleLoadMore}>
                            Carregar mais posts
                        </button>
                    )}

                    {preview && (
                        <Link href="/api/exit-preview">
                            <a className={styles.previewButton}>Sair do modo Preview</a>
                        </Link>
                    )}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ preview = false, previewData }) => {
    const prismic = getPrismicClient();
    const postsPagination = await prismic.query('', {
        pageSize: 10,
        ref: previewData?.ref ?? null
    });

    return {
        props: {
            postsPagination,
            preview
        }
    };
};
