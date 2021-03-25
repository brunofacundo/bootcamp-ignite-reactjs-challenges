import { NextApiRequest, NextApiResponse } from 'next';
import { Document } from '@prismicio/client/types/documents';

import { getPrismicClient } from '../../services/prismic';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { token, documentId } = req.query;

    const redirectUrl = await getPrismicClient()
        .getPreviewResolver(String(token), String(documentId))
        .resolve((doc: Document) => {
            if (doc.type === 'posts') {
                return `/post/${doc.uid}`;
            }

            return '/';
        }, '/');

    if (redirectUrl) {
        res.setPreviewData({ ref: token });
        res.writeHead(302, { Location: `${redirectUrl}` });
        res.end();
    } else {
        res.status(401).json({ message: 'Invalid token' });
    }
};
