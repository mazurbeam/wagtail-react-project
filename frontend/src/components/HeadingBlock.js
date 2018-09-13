import React from 'react';

import { Heading } from 'rebass';

const HeadingBlock = ({ value }) => {
  console.log(value);
  return (
    <Heading className="" as={value.size}>
      {value.heading_text}
    </Heading>
  );
};

export default HeadingBlock;
