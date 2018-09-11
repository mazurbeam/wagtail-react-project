import React from 'react';

import { Card, Heading, Text } from 'rebass';

const BlogIndexPage = ({ page, childPages }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: page.intro }} />
    {childPages.items.map(child => (
      <Card key={child.id}>
        <Heading>{child.title}</Heading>
        <Text>{child.intro}</Text>
      </Card>
    ))}
  </div>
);

export default BlogIndexPage;
