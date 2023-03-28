import React from 'react';
import ContentCard from './ContentCard';
import { Row } from 'antd';
// import { Card } from 'antd';


const Home: React.FC = () => {
    return (

        <div className='cards-grid'>
            <Row>
                {
                    [...Array(5)].map((x, i) =>

                        <ContentCard key={i} />

                    )
                }
            </Row>

        </div>

    );
}

export default Home;