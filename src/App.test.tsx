import { render, screen } from '@testing-library/react';
import 'antd/dist/reset.css';
// import './App.css';

import App from './App';

test('display "Hello World" on initial render', () => {
    render(
        <App />
    )

    expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
})

