import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import 'antd/dist/reset.css';
import { BrowserRouter } from 'react-router-dom'
// import './App.css';
//import Nav from './components/Nav';

import App from './App';




test('app renders without error', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )

    // expect(screen.getByRole('heading')).toHaveTextContent('Hello World')
})



test('get home page', () => {
    render(<App />, { wrapper: BrowserRouter })

    expect(screen.getByText('Home')).toBeInTheDocument();

})

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)

    return {
        user: userEvent.setup(),
        ...render(ui, { wrapper: BrowserRouter }),
    }
}


test('get link1', async () => {
    const { user } = renderWithRouter(<App />)

    await user.click(screen.getByText(/Link 1/i))

    expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument()

})

test('get link2', async () => {
    const { user } = renderWithRouter(<App />)

    await user.click(screen.getByText(/Link 2/i))

    expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument()

})

test('get link3', async () => {
    const { user } = renderWithRouter(<App />)

    await user.click(screen.getByText(/Link 3/i))

    expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument()

})