/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import Prismic from '@prismicio/client';

import Header from '../../components/Header';
import Comments from '../../components/Comments';
import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatDate';
import styles from './post.module.scss';

interface Post {
    first_publication_date: string | null;
    last_publication_date: string | null;
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

interface PaginatePost {
    slug: string;
    title: string;
}

interface PostProps {
    post: Post;
    preview: boolean;
    nextPost: PaginatePost | null;
    lastPost: PaginatePost | null;
}

export default function Post({ post, preview, lastPost, nextPost }: PostProps): JSX.Element {
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
                                <span>
                                    * editado em {formatDate(post.last_publication_date, "dd MMM yyyy', às 'HH:mm")}
                                </span>
                            </header>

                            {post.data.content.map(content => (
                                <section key={content.heading}>
                                    <strong>{content.heading}</strong>
                                    {content.body.map((item, i) => (
                                        <p key={i}>{item.text}</p>
                                    ))}
                                </section>
                            ))}

                            <div className={styles.paginateContainer}>
                                {lastPost && (
                                    <div>
                                        <span>{lastPost.title}</span>
                                        <Link href={`/post/${lastPost.slug}`}>
                                            <a>Post anterior</a>
                                        </Link>
                                    </div>
                                )}
                                {nextPost && (
                                    <div className={styles.nextPost}>
                                        <span>{nextPost.title}</span>
                                        <Link href={`/post/${nextPost.slug}`}>
                                            <a>Próximo post</a>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Comments />

                            {preview && (
                                <Link href="/api/exit-preview">
                                    <a className={styles.previewButton}>Sair do modo Preview</a>
                                </Link>
                            )}
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

export const getStaticProps: GetStaticProps = async ({ params, preview = false, previewData }) => {
    const prismic = getPrismicClient();

    const post = await prismic.getByUID('posts', String(params.slug), {
        ref: previewData?.ref ?? null
    });

    const nextPost = await prismic.queryFirst(
        [
            Prismic.Predicates.at('document.type', 'posts'),
            Prismic.Predicates.dateAfter('document.first_publication_date', post.first_publication_date)
        ],
        { orderings: '[document.first_publication_date]' }
    );

    const lastPost = await prismic.queryFirst(
        [
            Prismic.Predicates.at('document.type', 'posts'),
            Prismic.Predicates.dateBefore('document.first_publication_date', post.first_publication_date)
        ],
        { orderings: '[document.first_publication_date desc]' }
    );

    return {
        props: {
            post,
            preview,
            nextPost: nextPost ? { slug: nextPost.uid, title: nextPost.data.title } : null,
            lastPost: lastPost ? { slug: lastPost.uid, title: lastPost.data.title } : null
        }
    };
};
