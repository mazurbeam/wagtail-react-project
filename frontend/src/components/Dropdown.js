import React, { Component } from "react";
// import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";
import { color, space, width } from "styled-system";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Card } from "rebass";


const NavLink = styled(Link)`
${space}
${width}
${color}
padding: 20px 10px;
text-decoration: none;
display: block;

`;

const NavList = styled.ul`
list-style-type: none;
`


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { list } = this.props;
    const { listOpen } = this.state;
    return (
      <Box className=""  p={3} position=''>
        <div className="" onClick={() => this.toggleList()} role="presentation">
          {listOpen
            ? <span uk-icon="icon: chevron-down; ratio: 2"/>
            : <span uk-icon="icon:  menu; ratio: 2"/>
          }
        </div>
        {listOpen &&
        <Card className='uk-position-top-left'
              p={3}
              position='absolute'
              color='white'
              width={1}
              borderRadius={8}
              mt={60}
              bg='slate'
              boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
        >
          <NavList className="">
            <li className=""><NavLink className="uk-nav-header" color='white' to='/' onClick={() => this.toggleList()}><span uk-icon="icon: home"/>Home</NavLink></li>

            {list.map((item) => (
              <li className="" key={item.id} ><NavLink className="uk-nav-header" color='white' to={item.meta.slug} onClick={() => this.toggleList()}><span uk-icon={item.icon}/>
                {item.title}</NavLink></li>
            ))}
          </NavList>
        </Card>
        }
      </Box>
    );
  }
}

// Dropdown.propTypes = {};

export default onClickOutside(Dropdown);
