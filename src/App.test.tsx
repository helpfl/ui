import { render } from '@testing-library/react';
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom'
// import './App.css';

import App from './App';

test('app renders without error', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )

    // expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
})

