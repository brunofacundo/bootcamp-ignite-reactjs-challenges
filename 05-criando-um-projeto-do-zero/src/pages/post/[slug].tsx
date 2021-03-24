/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatDate';
import styles from './post.module.scss';

interface Post {
    first_publication_date: string | null;
    data: {
        title: string;
        banner: {
            url: string;
        };
        author: string;
        content: {
            heading: string;
            body: {
                text: string;
            }[];
        }[];
    };
}

interface PostProps {
    post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
    const router = useRouter();

    const words = post.data.content.reduce((sum, { heading, body }) => {
        let wordsPerContent = 0;
        wordsPerContent += heading.match(/\w+/g).length;
        wordsPerContent += RichText.asText(body).match(/\w+/g).length;
        return sum + wordsPerContent;
    }, 0);
    const readingTime = `${Math.ceil(words / 200)} min`;

    return (
        <>
            <Header title={`Spacetraveling | ${post.data.title}`} />

            {router.isFallback ? (
                <div className={styles.loading}>Carregando...</div>
            ) : (
                <>
                    <main className={styles.container}>
                        <img src={post.data.banner.url} alt="banner" />
                        <div className={styles.content}>
                            <header>
                                <strong>{post.data.title}</strong>
                                <div>
                                    <span>
                                        <FiCalendar />
                                        {formatDate(post.first_publication_date, 'dd MMM yyyy')}
                                    </span>
                                    <span>
                                        <FiUser />
                                        {post.data.author}
                                    </span>
                                    <span>
                                        <FiClock />
                                        {readingTime}
                                    </span>
                                </div>
                            </header>

                            {post.data.content.map(content => (
                                <section key={content.heading}>
                                    <strong>{content.heading}</strong>
                                    {content.body.map((item, i) => (
                                        <p key={i}>{item.text}</p>
                                    ))}
                                </section>
                            ))}
                        </div>
                    </main>
                </>
            )}
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const prismic = getPrismicClient();
    const posts = await prismic.query('', { pageSize: 10 });

    return {
        paths: posts.results.map(post => ({
            params: { slug: post.uid }
        })),
        fallback: true
    };
};

export const getStaticProps: GetStaticProps = async context => {
    const prismic = getPrismicClient();
    const post = await prismic.getByUID('posts', String(context.params.slug), {});

    return {
        props: {
            post
        }
    };
};
