import Head from 'next/head';
import Link from 'next/link';

import styles from './header.module.scss';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps): JSX.Element {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <header className={styles.container}>
                <Link href="/">
                    <img src="/logo.svg" alt="logo" />
                </Link>
            </header>
        </>
    );
}
