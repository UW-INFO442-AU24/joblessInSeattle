import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";

export default function MyBuddy() {
  return (   
    <div>
        <Col className='m-4'>
            {/* BUDDY GOES HERE */}
            <h1>My Buddy</h1>
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Buddy's Name here</Card.Title>
                        <Card.Text>Buddy will go here</Card.Text>
                    </Card.Body>
                </Card>
            </Row>
                
            {/* HEALTH BARS FOR BUDDY? */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                    <Card.Title>Buddy's health today</Card.Title>
                    </Card.Body>
                </Card>
            </Row>

            {/* ICONS TO CUSTOMIZE BUDDY OR SHOP */}
            <Row className='m-4'>
                <Card>
                    <Card.Body>
                      <Card.Title>Customize your buddy</Card.Title>
                      <Card.Text>
                        Icon buttons here which would lead to shop and closet for buddy (will not be implemented for MVP)
                      </Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Col>
        <NavBar></NavBar>
    </div>
  );
}