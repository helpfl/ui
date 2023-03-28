import React from 'react';
import { Card } from 'antd';
import { Lorem } from 'react-lorem-generator';

// const gridStyle: React.CSSProperties = {
//     width: '25%',
//     textAlign: 'center',
// };


const ContentCard: React.FC = () => (

    <Card
        className='card'
        hoverable
        title={<Lorem paragraphs={1} maxSentences={0} maxWords={1} />}>
        <img alt="placeholder" src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png" />
        <p><Lorem paragraphs={1} maxSentences={1} maxWords={2} /></p>
    </Card>

);

export default ContentCard;

