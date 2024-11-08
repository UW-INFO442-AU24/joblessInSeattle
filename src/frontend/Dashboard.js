import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Dashboard() {
  return (
    <Row xs={2} md={2} className="g-4">
      {Array.from(['Water', 'Sleep', 'Medications', 'My Buddy']).map((category) => (
        <Col key={category}>
          <Card>
            <Card.Body>
              <Card.Title>{category}</Card.Title>
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
  );
}