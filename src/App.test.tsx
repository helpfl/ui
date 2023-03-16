import { render, screen } from '@testing-library/react';
import 'antd/dist/reset.css';
import './App.css';

import App from './App';

test('display "Hello World" on initial render', () => {
    render(
        <App />
    )

    expect(screen.getByRole('heading')).toHaveTextContent("Hello World")
})


// import { describe, afterAll, afterEach, beforeAll } from 'vitest';
// import { setupServer } from 'msw/node';
// import { rest } from 'msw';
// describe('App', () => {

//     const url = 'https://example.com';

//     const posts = [
//         {
//             content: 'Hello World'
//         }
//     ];

//     const restHandlers = [
//         rest.get(url, (req, res, ctx) => {
//             return res(ctx.status(200), ctx.json(posts));
//         })
//     ];

//     const server = setupServer(...restHandlers);


//     beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

//     afterAll(() => server.close());

//     afterEach(() => server.resetHandlers());

//     it('renders content', async () => {
//         render(<App contentServiceUrl={url}/>);

//         await waitFor(() => {
//             expect(screen.getByText('Hello World')).toBeInTheDocument();
//         });
//     });
// });
