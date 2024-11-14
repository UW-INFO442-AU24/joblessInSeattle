import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import { NavBar } from "../frontend/Navbar.js";

export default function Dashboard() {
  return (
    <div>
        <Col className='m-4' >
            <h1>MY DASHBOARD</h1>

            {/* WATER TRACKER */}
            <Row className='m-4'>
                <Card>
                  <Card.Body>
                    <Card.Title><Link to="/watertracker">Water</Link></Card.Title>
                      <Card.Text>
                          16/64 fl oz.
                      </Card.Text>
                  </Card.Body>
                </Card>
            </Row>
                
            {/* SLEEP TRACKER */}
            <Row className='m-4'>
                <Card>
                  <Card.Body>
                    <Card.Title><Link to="/sleeptracker">Sleep</Link></Card.Title>
                      <Card.Text>
                          placeholder for amount of sleep today.
                      </Card.Text>
                  </Card.Body>
                </Card>
            </Row>

            {/* MEDICATIONS */}
            <Row className='m-4'>
                <Card>
                  <Card.Body>
                    <Card.Title>Medications</Card.Title>
                      <Card.Text>
                          allergy pills!
                      </Card.Text>
                  </Card.Body>
                </Card>
            </Row>

            {/* MY BUDDY */}
            <Row className='m-4'>
                <Card>
                  <Card.Body>
                    <Card.Title>My Buddy</Card.Title>
                      <Card.Text>
                        :D
                      </Card.Text>
                  </Card.Body>
                </Card>
            </Row>
        </Col>

        <footer>
          <NavBar/>
        </footer>

    </div>
  );
}

//THIS IS THE VERSION I WANT