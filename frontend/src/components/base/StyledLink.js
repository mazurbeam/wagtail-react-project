import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { color, space, width, fontFamily } from 'styled-system'

const StyledLink = styled(Link)`
${space}
${width}
${color}
${fontFamily}
padding: 20px;
text-decoration: none;
display: inline-block;

`

export default StyledLink
