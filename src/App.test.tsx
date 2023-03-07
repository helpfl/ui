import {render, screen, waitFor} from '@testing-library/react';
import {describe, afterAll, afterEach, beforeAll} from 'vitest';
import {setupServer} from 'msw/node';
import {rest} from 'msw';

import App from './App';

describe('App', () => {

    const url = 'https://example.com';

    const posts = [
        {
            content: 'Hello World'
        }
    ];

    const restHandlers = [
        rest.get(url, (req, res, ctx) => {
            console.log('>>>>>>>>> req', req);
            return res(ctx.status(200), ctx.json(posts));
        })
    ];

    const server = setupServer(...restHandlers);


    beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

    afterAll(() => server.close());

    afterEach(() => server.resetHandlers());

    it('renders content', async () => {
        render(<App contentServiceUrl={url}/>);

        await waitFor(() => {
            expect(screen.getByText('Hello World')).toBeInTheDocument();
        });
    });
});
