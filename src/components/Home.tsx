import React from 'react';
import ContentCard from './ContentCard';

const Home: React.FC = () => {
    return (
        <div>
            <div>
                {
                    [...Array(5)].map((x, i) =>
                        <ContentCard key={i} />
                    )}
            </div>
        </div>
    );
}

export default Home;