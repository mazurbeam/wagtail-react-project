import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const Wrapper = styled.h1`
`;

function App() {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        axios.get(`/4`).then((response) => {
            setBlog(response.data);
            console.log(blog)
        });
    }, []);
    return (
        <Wrapper>
            <p>Hi {blog.title}</p>
        </Wrapper>
    );
}
export default App;