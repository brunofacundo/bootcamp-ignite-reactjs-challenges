import { useEffect, useRef } from 'react';

import styles from './comments.module.scss';

export default function Comments(): JSX.Element {
    const anchorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (anchorRef.current && anchorRef.current.children.length === 0) {
            const script = document.createElement('script');
            script.setAttribute('src', 'https://utteranc.es/client.js');
            script.setAttribute('crossorigin', 'anonymous');
            script.setAttribute('async', 'true');
            script.setAttribute('issue-term', 'pathname');
            script.setAttribute('theme', 'github-dark');
            script.setAttribute('repo', process.env.NEXT_PUBLIC_UTTERANC_REPO);

            anchorRef.current.appendChild(script);
        }
    }, [anchorRef]);

    return <div ref={anchorRef} className={styles.container} />;
}
