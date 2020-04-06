import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const publicUrl = process.env.PUBLIC_URL;

/**
 * Component for showing the menu of About Section
 * @component
 * @example
 * return (
 *  <Footer />
 * )
 */
const AboutSectionMenu = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <h3>Who Are</h3>
                        <p className="lead">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut est non mauris iaculis vulputate. Vivamus luctus sapien et nisl mattis consequat. Vestibulum nec varius sem.
                        </p>
                        <p>
                            <Button href={`${publicUrl}/#/about/whoare`} className="btn-default btn-lg">More...</Button>
                        </p>
                    </Col>
                    <Col md={6}>
                        <h3>Where Are</h3>
                        <p className="lead">
                        Sed imperdiet nunc eget ante aliquam auctor. Aliquam rhoncus quam sed sodales imperdiet. Aliquam erat volutpat. Sed mattis luctus pretium. 
                        </p>
                        <p>
                            <Button href={`${publicUrl}/#/about/whereare`} className="btn-default btn-lg">More...</Button>
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutSectionMenu;