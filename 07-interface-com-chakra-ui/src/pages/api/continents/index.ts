import { NextApiRequest, NextApiResponse } from 'next';

import db from './db.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.json(db);
    } else {
        res.status(404).send('');
    }
}
