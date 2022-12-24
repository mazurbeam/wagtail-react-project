import React from 'react';
import axios from 'axios';

class BlogPostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  // componentDidMount() {
  //   // Fetch the list of posts from the server
  //   fetch('/api/v2/pages')
  //     .then(response => response.json())
  //     .then(posts => {
  //       this.setState({ posts });
  //     });
  // }
  
  const getData = async () => {
    let response = await fetch("https://jessiebelle-refactored-space-giggle-p9qp69477pqh7qj6-8000.preview.app.github.dev/api/v2/pages");
  
    let data = await response.json();
    console.log(data);  // line 29
  
    return data;
  };
  let data = await getData();
  console.log(columnFromBackend);  // line 34
//   componentDidMount() {
  
//     let data ;

//     axios.get('https://jessiebelle-refactored-space-giggle-p9qp69477pqh7qj6-8000.preview.app.github.dev/api/v2/pages')
//     .then(res => {
//         data = res.data;
//         this.setState({
//             details : data    
//         });
//     })
//     .catch(err => {})
// }


  render() {
    return (
      <div className="BlogPostIndex">
        {this.state.data.map(post => (
          <div className="BlogPostIndex-item" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <a href={`/posts/${post.id}`}>Read more</a>
          </div>
        ))}
      </div>
    );
  }
}

export default BlogPostIndex;