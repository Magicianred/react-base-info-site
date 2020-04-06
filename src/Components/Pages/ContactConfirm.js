import React, { Component } from 'react';
import PropTypes from "prop-types";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Layout from '../Partials/Layout';

class ContactConfirmInner extends Component {
    static propTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };

    render() {
        const { location } = this.props;
        const params = queryString.parse(location.search)

        return (
            <Layout>
                <Jumbotron>
                    <Container>
                        <h1 className="display-4">Thanks for your contact</h1>
                        <p className="lead">This is the tahking page</p>
                    </Container>
                </Jumbotron>
                <Container id="content_main">
                    <p>
                        Kind <i>{params.name} {params.surname}</i>, we have received your message.
                        <br />
                        We reply soon.
                    </p>
                </Container>
            </Layout>
        );
    }
}

/**
 * Component for thanking user to contact
 * 
 * @component
 * @example
 * return (
 *   <ContactConfirm />
 * )
 */
const ContactConfirm = withRouter(ContactConfirmInner);

export default ContactConfirm;