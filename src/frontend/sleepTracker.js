import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';

export default function sleepTracker() {

    return (

        <Col className='m-4'>
            <h1>Sleep</h1>
            {/* Log sleep (start/end) */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Going to Bed?</Card.Title>
                        <ButtonGroup vertical>
                            <Button variant='primary' className='my-2'>Bed time :D</Button>
                            <Button variant='success' className='my-2'>Wakey wakey</Button>
                        </ButtonGroup>
                        <Card.Text>Manually log time</Card.Text>
                        <Button variant='secondary'>blah</Button>
                    </Card.Body>
                </Card>
            </Row>
                
            {/* Sleep stat with graph - Day, Week, Month, 6 months, Year? */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Your Sleep</Card.Title>
                        <Card.Text>
                            Bar chart for single day and line chart for the others?
                            MUI X has bar and line chart components that can be used
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            {/* Goal setting for sleep hours? */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Sleep Goals</Card.Title>
                        <Card.Text>Current Goal: 8 hr 00 min</Card.Text>
                        <Card.Text>You've reached it X% of times</Card.Text>
                        <Card.Text>Icon somewhere to edit goal</Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            {/* Overall trends or buddy's level of sleep relative to yours? */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Buddy's Sleep</Card.Title>
                        <Card.Text>Buddy's health in relation to your sleep</Card.Text>
                        <Card.Text>Maybe some sort of status bar or something</Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    );
}