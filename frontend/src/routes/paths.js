import React, {Fragment} from 'react'
import { Route } from "react-router";

import NoMatch from "../components/NoMatch";
import Home from "../containers/Home";
import Page from "../containers/Page";
import ContactPage from "../containers/ContactPage";

const Paths = () => (
    <Fragment>
        <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={ContactPage}/>
          <Route exact path="/:slug" component={Page}/>
          <Route exact path="/:slug/:child" component={Page}/>
        <Route component={NoMatch}/>
    </Fragment>
)

export default Paths;