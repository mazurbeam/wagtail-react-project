import React from 'react';

import { Box } from 'rebass';
import styled from 'styled-components';
import { color, space, width } from 'styled-system';

const StickyFooter = styled.footer`
  width: 100%;
  // height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  color: #f5f5f5;
  background-color: #232741;
`;

const FooterLink = styled.a`
${space}
${width}
${color}
width: 50%;
text-align: center;
padding: 20px 10px;
text-decoration: none;
`;

const Footer = () => (
  <StickyFooter>
    <Box className="uk-height-1-1 uk-overlay" ml="auto" mr="" width={1 / 6}>
      <FooterLink
        className="uk-nav-header"
        color="whitish"
        href="https://github.com/mazurbeam/"
        target="_blank"
      >
        {' '}
        <span uk-icon="icon: github-alt" />{' '}
      </FooterLink>
      <FooterLink
        className="uk-nav-header"
        color="whitish"
        href="https://www.linkedin.com/in/walter-mazur-02803453/"
        target="_blank"
      >
        <span uk-icon="icon: linkedin" />
      </FooterLink>
    </Box>
  </StickyFooter>
);

export default Footer;
