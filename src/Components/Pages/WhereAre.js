import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '../Partials/Layout';
import Place from './../../Models/Place';

/* START LOCAL FILE */
// import data from './../../data/places.json';
/* END LOCAL FILE */

const publicUrl = process.env.PUBLIC_URL;

/**
 * Component for showing the Where Are page.
 * 
 * @component
 * @example
 * return (
 *   <WhereAre />
 * )
 */
class WhereAre extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            placesJson: undefined,
            currentPlaceId: undefined,
            hasError: false,
        };
    }

    componentDidMount() {
        const places = [];
        let placeJson = '';
        this.serverRequest = 
            axios
                .get(`${publicUrl}/data/places.json`)
                .then((result) => {
                    placeJson = JSON.stringify(result.data, null, 2);
                    result.data.map(place => places.push(new Place(place.id, place.title, place.address, place.country, place.phone, place.description)));
                    this.setState({ places, placeJson });
            });
        let mdText = undefined;
        this.serverRequest = 
            axios
                .get(`${publicUrl}/data/pages/whereare.md`)
                .then((result) => {
                    mdText = result.data;
                    console.log(mdText);
                    this.setState({ mdText });
            });
    }

    /* START LOCAL FILE */
    // componentDidMount() {
    //     const placeJson = JSON.stringify(data, null, 2);
    //     const places = [];
    //     data.map(place => places.push(new Place(place.id, place.title, place.address, place.country, place.phone, place.description)));
    //     this.setState({ places, placeJson });
    // }
    /* END LOCAL FILE */

    static getDerivedStateFromError(error) {       
        return { hasError: true };  
    }

    // onShowPlace = (placeId) => {
    //     this.setState({ currentPlaceId: placeId });
    // }

    render() {
        const { mdText, places, placeJson, hasError } = this.state;
        return (
            <Layout>
                {hasError ? <h1>Something went wrong.</h1> : null}
                <Jumbotron>
                    <Container>
                        <h1 className="display-4">Where Are</h1>
                        <p className="lead">This is the where are page</p>
                        <p>
                            <Button href={`${publicUrl}/#/about`} className="btn-default btn-sm">Back to About Us...</Button>
                        </p>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Jumbotron className="page whereare">
                                <ReactMarkdown source={mdText} />
                                {places && places.length > 0 ?
                                    <ListGroup variant="flush">
                                        {places.map((place, index) =>
                                            <ListGroup.Item key={index}>{place.title} <Badge className="badge-list-group" variant="info">{place.country}</Badge></ListGroup.Item>)}
                                    </ListGroup> : null}
                            </Jumbotron>
                        </Col>
                        <Col sm={4}>
                            {places && places.length > 0 ?
                                <Accordion defaultActiveKey="0">
                                    {places.map((place, index) => place.toDisplay(index))}
                                </Accordion> : null}
                        </Col>
                    </Row>
                </Container>
                <Container className="file_contents">
                    <span>file: /data/pages/whereare.md</span>
                    <SyntaxHighlighter language={'markdown'} style={coy}>
                        {mdText}
                    </SyntaxHighlighter>
                </Container>
                <Container className="file_contents">
                    <span>file: /data/place.json</span>
                    <SyntaxHighlighter language={'json'} style={coy}>
                        {placeJson}
                    </SyntaxHighlighter>
                </Container>
            </Layout>
        );
    }
}

export default WhereAre;