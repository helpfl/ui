import React from 'react';
import { Card } from 'antd';
import { Lorem } from 'react-lorem-generator';


const ContentCard: React.FC = () => (
    <Card

        title={<Lorem paragraphs={1} maxSentences={0} maxWords={2} />}
        hoverable
        style={{ width: 450, height: 300, borderColor: 'black', margin: 0, padding: 0 }}
        headStyle={{ borderColor: 'black' }}
        cover={<img alt="placeholder" src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png" style={{ width: 150, height: 150, textAlign: 'center', margin: 0, padding: 0 }} />}
    >
        <p><Lorem paragraphs={1} maxSentences={4} maxWords={6} /></p>
    </Card>
);

export default ContentCard;

