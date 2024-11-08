import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function WaterTracker() {

  return (   
    <div>
        <h1>Water Tracker</h1>
        <Row xs={1} md={2} className="g-4">
        {Array.from({ length: 2 }).map((_, idx) => (
            <Col key={idx}>
            <Card>
                <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </div>
  );
}