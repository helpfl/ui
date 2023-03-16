import React from 'react';
import { Routes, Route } from 'react-router-dom'
import NotFound1 from './notFound1';
import NotFound2 from './notFound2';
import NotFound3 from './notFound3';
import Home from './Home';

const Nav: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/notfound1" element={<NotFound1 />}></Route>
                <Route path="/notfound2" element={<NotFound2 />}></Route>
                <Route path="/notfound3" element={<NotFound3 />}></Route>

            </Routes>
        </div>
    );
}

export default Nav;