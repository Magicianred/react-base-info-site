import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '../Partials/Layout';
import AboutSectionMenu from './../Partials/AboutSectionMenu';

/* START LOCAL FILE */
// import pageData from './../../data/pages/about.md';
/* END LOCAL FILE */

const publicUrl = process.env.PUBLIC_URL;

/**
 * Component for showing the About Page page. 
 * 
 * @component
 * @example
 * return (
 *   <About />
 * )
 */
class About extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            mdText: undefined,
        };
    }

    componentDidMount() {
        let mdText = undefined;
        this.serverRequest = 
            axios
                .get(`${publicUrl}/data/pages/about.md`)
                .then((result) => {
                    mdText = result.data;
                    console.log(mdText);
                    this.setState({ mdText });
            });
    }

    /* START LOCAL FILE */
    // componentWillMount() {
    //     fetch(pageData).then((response) => response.text()).then((text) => {
    //       this.setState({ mdText: text })
    //     })
    // }
    /* END LOCAL FILE */

    render() {
        const { hasError, mdText } = this.state;
        return (
            <Layout>
                {hasError ? <h1>Something went wrong.</h1> : null}
                <Jumbotron>
                    <Container>
                        <h1 className="display-4">About Us</h1>
                        <p className="lead">This is the about us page</p>
                    </Container>
                </Jumbotron>
                <AboutSectionMenu />
                <Container id="content_main">
                    <ReactMarkdown source={mdText} />
                </Container>
                <Container className="file_contents">
                    <span>file: /data/pages/about.md</span>
                    <SyntaxHighlighter language={'markdown'} style={coy}>
                        {mdText}
                    </SyntaxHighlighter>
                </Container>
            </Layout>
        );
    }
}

export default About;