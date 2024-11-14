import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function sleepTracker() {

    return (
        <Col>

            {/* Log sleep (start/end) */}
            <Row>
                <Card>
                    <Card.Body>
                        <Card.Title>Going to Bed?</Card.Title>
                        <Button variant='primary'>Bed time :D</Button>
                        <Button variant='success'>Wakey wakey</Button>
                    </Card.Body>
                </Card>
            </Row>
                
            {/* Sleep stat with graph - Day, Week, Month, 6 months, Year? */}
            <Row>
                <Card>
                    <Card.Body>
                    <Card.Title>Your Sleep</Card.Title>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            {/* Goal setting for sleep hours? */}
            <Row>
                <Card>
                    <Card.Body>
                        <Card.Title>Sleep Goals</Card.Title>
                    </Card.Body>
                </Card>
            </Row>

            {/* Overall trends or buddy's level of sleep relative to yours? */}
            <Row>
                <Card>
                    <Card.Body>
                        <Card.Title>Buddy's Sleep</Card.Title>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    );
}