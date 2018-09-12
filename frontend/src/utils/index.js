import React from 'react';
import styled from 'styled-components';

import HeadingBlock from '../components/HeadingBlock';

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
`;

const renderPageBody = body => {
  const result = (
    <Wrapper css="overflow: scroll; position: absolute;">
      {body.map(item => {
        if (item.type === 'heading_block') {
          return <HeadingBlock key={item.id} value={item.value} />;
        }
        return (
          <div
            key={item.id}
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      })}
    </Wrapper>
  );
  return result;
};

export default renderPageBody;
