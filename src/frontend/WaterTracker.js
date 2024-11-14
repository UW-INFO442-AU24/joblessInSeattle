import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function WaterTracker() {

  return (   

    <div>
        <Col className='m-4'>
            {/* WATER TRACKER TODAY */}
            <h1>Water Tracker</h1>
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Water Consumed Today</Card.Title>
                        <Button variant='primary'>-</Button>
                        <span id="counter" class="mx-3">0 fl oz</span>
                        <Button variant='primary'>+</Button>
                    </Card.Body>
                </Card>
            </Row>
                
            {/* WATER DRANK THIS WEEK */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                    <Card.Title>This Week</Card.Title>
                    <Card.Text>
                        this is a placeholder for a graph that shows how much water has been drank throughout
                        the week.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            {/* WATER GOALS*/}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                      <Card.Title>Water Goals</Card.Title>
                      <Card.Text>
                        this is a placeholder for the user to input their water goal for the day/week?
                      </Card.Text>
                    </Card.Body>
                </Card>
            </Row>

            {/* BUDDY  WATER INTAKE */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>My Buddy's Water Intake</Card.Title>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
    </div>
  );
}