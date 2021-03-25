import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
    res.clearPreviewData();
    res.writeHead(307, { Location: '/' });
    res.end();
};
