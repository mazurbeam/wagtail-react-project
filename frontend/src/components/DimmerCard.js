import React, { Component } from "react";
import { Button, Dimmer, Header, Image, Label } from "semantic-ui-react";

class DimmerCard extends Component {
  state = {};

  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  render() {
    const { active } = this.state;
    const { item } = this.props;
    console.log(item);
    const content = (
      <div>
        <Header as="h2" inverted>
          {item.title}
        </Header>
        <Header as="h4" inverted>
          {item.intro}
        </Header>
        <a href={item.project_url} target="_blank" rel="noopener noreferrer">
          <Button primary>View</Button>
        </a>
        <Label.Group style={{ paddingTop: "20px" }}>
          {item.tags.map(tag => (
            <Label key={tag} basic color="blue">
              {tag}
            </Label>
          ))}
        </Label.Group>
      </div>
    );

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size="large"
        src={item.gallery_images[0].image_full.url}
      />
    );
  }
}

export default DimmerCard;
