import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { NavBar } from "./Navbar.js";

export default function Dashboard() {
  return (
    <div>
        <Col className='m-4' >
            <h1>MY DASHBOARD</h1>

            {/* WATER TRACKER */}
            <Row className='m-4'>
                <Card className='bg-primary bg-opacity-75 text-white'>
                  <Card.Body><Link to="/watertracker" class="stretched-link"></Link>
                    <div class='d-flex flex-row justify-content-between'>
                      <div>
                        <Card.Title>Water</Card.Title>
                          <Card.Text>
                              16/64 fl oz.
                          </Card.Text>
                      </div>
                      <div class="pt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                          </svg>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
            </Row>
                
            {/* SLEEP TRACKER */}
            <Row className='m-4'>
                <Card className='bg-info bg-opacity-50 text-black-50'>
                  <Card.Body><Link to="/sleeptracker" class="stretched-link"></Link>
                    <div class='d-flex flex-row justify-content-between'>
                        <div>
                          <Card.Title>Sleep</Card.Title>
                          <Card.Text>
                              placeholder for amount of sleep today.
                          </Card.Text>
                        </div>
                        <div class="pt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                  </Card.Body>
                </Card>
            </Row>

            {/* MEDICATIONS */}
            <Row className='m-4'>
                <Card className='bg-success bg-opacity-75 text-white'>
                  <Card.Body><Link to="/medications" class="stretched-link"></Link>
                    <div class='d-flex flex-row justify-content-between'>
                      <div>
                        <Card.Title>Medications</Card.Title>
                        <Card.Text>
                            allergy pills!
                        </Card.Text>
                      </div>
                      <div class="pt-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                          </svg>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
            </Row>

            {/* MY BUDDY */}
            <Row className='m-4'>
                <Card className='bg-warning bg-opacity-75 text-black-50'>
                  <Card.Body><Link to="/buddy" class="stretched-link"></Link>
                    <div class='d-flex flex-row justify-content-between'>
                      <div>
                        <Card.Title>My Buddy</Card.Title>
                        <Card.Text>
                          :D
                        </Card.Text>
                      </div>
                      <div class="pt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                      </div>
                    </div>
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