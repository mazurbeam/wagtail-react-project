import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Dimmer, Header, Image, Label } from "semantic-ui-react";

class DimmerCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const { item, parent } = this.props;
    console.log(item);
    const content = (
      <Link
        to={{
          pathname: `${parent}/${item.meta.slug}`,
          state: { type: item.meta.type, id: item.id }
        }}
      >
        <Header as="h2" inverted>
          {item.title}
        </Header>
        <Header as="h4" inverted>
          {item.intro}
        </Header>

        <Button>More..</Button>

        <Label.Group style={{ paddingTop: "20px" }}>
          {item.tags.map(tag => (
            <Label key={tag} basic color="blue">
              {tag}
            </Label>
          ))}
        </Label.Group>
      </Link>
    );

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size="large"
        src={item.gallery_images[0].image_medium.url}
        style={{
          width: "300px",
          height: "300px"
        }}
      />
    );
  }
}

export default DimmerCard;
