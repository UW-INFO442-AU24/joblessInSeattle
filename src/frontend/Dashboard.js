import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Dashboard() {

    const HealthCategories = ['Water', 'Sleep', 'Medications', 'My Buddy'];
    const dashboardCards = HealthCategories.map((categories) => 
          <Row xs={2} md={2} className="g-4">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>{categories}</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        </Row>
    )
  return (
    dashboardCards
  );
}