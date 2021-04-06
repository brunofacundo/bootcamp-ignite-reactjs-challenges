import { NextApiRequest, NextApiResponse } from 'next';

import db from './db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { slug } = req.query;

        res.json(db.find(continent => continent.slug == slug) || {});
    } else {
        res.status(404).send('');
    }
}
