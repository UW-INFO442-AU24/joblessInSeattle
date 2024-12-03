import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { NavBar } from "./Navbar.js";
import { Link } from "react-router-dom";

export default function MyBuddy() {
        
  return (   
    <div>
        <Col className='m-4'>
            {/* BUDDY GOES HERE */}
            <div className='d-flex flex-row'>
                <div>
                    <button className="btn border-0"> <Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                        </Link>
                    </button>
                </div>
                <div>
                    <h1>My Buddy</h1>
                </div>
            </div>
            
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