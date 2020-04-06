import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Layout from '../Partials/Layout';
import Person from './../../Models/Person';

/* START LOCAL FILE */
// import data from './../../data/people.json';
/* END LOCAL FILE */

const publicUrl = process.env.PUBLIC_URL;

/**
 * Component for showing the Who Are page.
 * 
 * @component
 * @example
 * return (
 *   <WhoAre />
 * )
 */
class WhoAre extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            peopleJson: undefined,
            currentPersonId: undefined,
            hasError: false,
        };
        // this.onShowPerson = this.onShowPerson.bind(this);
    }

    componentDidMount() {
        const people = [];
        let peopleJson = '';
        this.serverRequest = 
            axios
                .get(`${publicUrl}/data/people.json`)
                .then((result) => {
                    peopleJson = JSON.stringify(result.data, null, 2);
                    result.data.map(person => people.push(new Person(person.id, person.name, person.surname, person.shortbio, person.email, person.profilesrc)));
                    let currentPersonId = undefined;
                    if (people && people.length > 0) currentPersonId = people[0].id;
                    this.setState({ people, currentPersonId, peopleJson });
            });
        let mdText = undefined;
        this.serverRequest = 
            axios
                .get(`${publicUrl}/data/pages/whoare.md`)
                .then((result) => {
                    mdText = result.data;
                    console.log(mdText);
                    this.setState({ mdText });
            });
    }

    /* START LOCAL FILE */
    // componentDidMount() {
    //     const peopleJson = JSON.stringify(data, null, 2);
    //     const people = [];
    //     data.map(person => people.push(new Person(person.id, person.name, person.surname, person.shortbio, person.email, person.profilesrc)));
    //     let currentPersonId = undefined;
    //     if (people && people.length > 0) currentPersonId = people[0].id;
    //     this.setState({ people, currentPersonId, peopleJson });
    // }
    /* END LOCAL FILE */

    static getDerivedStateFromError(error) {       
        return { hasError: true };  
    }

    onShowPerson = (personId) => {
        this.setState({ currentPersonId: personId });
    }

    render() {
        const { mdText, people, peopleJson, currentPersonId, hasError } = this.state;
        return (
            <Layout>
                {hasError ? <h1>Something went wrong.</h1> : null}
                <Jumbotron>
                    <Container>
                        <h1 className="display-4">Who Are</h1>
                        <p className="lead">This is the who are page</p>
                        <p>
                            <Button href={`${publicUrl}/#/about`} className="btn-default btn-sm">Back to About Us...</Button>
                        </p>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col sm={8}>
                            <Jumbotron className="page whoare">
                                <ReactMarkdown source={mdText} />
                                {people && people.length > 0 ?
                                    <ListGroup>
                                    {people.map((person, index) =>
                                        <ListGroup.Item key={index} action onClick={() => this.onShowPerson(person.id)}>
                                        {person.name} {person.surname} 
                                        <Badge className="badge-list-group" variant="secondary">show details</Badge>
                                        </ListGroup.Item>)}
                                        </ListGroup> : null}
                            </Jumbotron>
                        </Col>
                        <Col sm={4}>
                            {people && people.length > 0 ?
                                people.map(person => (person.id === currentPersonId) ?
                                    person.toDisplay() : null) 
                                : null}
                        </Col>
                    </Row>
                </Container>
                <Container className="file_contents">
                    <span>file: /data/pages/whoare.md</span>
                    <SyntaxHighlighter language={'markdown'} style={coy}>
                        {mdText}
                    </SyntaxHighlighter>
                </Container>
                <Container className="file_contents">
                    <span>file: /data/people.json</span>
                    <SyntaxHighlighter language={'json'} style={coy}>
                        {peopleJson}
                    </SyntaxHighlighter>
                </Container>
            </Layout>
        );
    }
}

export default WhoAre;