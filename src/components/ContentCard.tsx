import React from 'react';
import { Card } from 'antd';
import { Lorem } from 'react-lorem-generator';


const ContentCard: React.FC = () => (
    <Card
        className='card'
        title={<Lorem paragraphs={1} maxSentences={0} maxWords={3} />}
        hoverable>
        <img alt="placeholder" src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png" />
        <p><Lorem paragraphs={1} maxSentences={4} maxWords={6} /></p>
    </Card>
);

export default ContentCard;

