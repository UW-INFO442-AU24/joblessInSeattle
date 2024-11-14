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

  //   <Row xs={2} md={2} className="g-4">
  //     {Array.from(['Water', 'Sleep', 'Medications', 'My Buddy']).map((category) => (
  //       <Col key={category}>
  //         <Card>
  //           <Card.Body>
  //             <Card.Title><Link to="/watertracker">{category}</Link></Card.Title>
  //             <Card.Text>
  //               This is a longer card with supporting text below as a natural
  //               lead-in to additional content. This content is a little bit
  //               longer.
  //             </Card.Text>
  //           </Card.Body>
  //         </Card>
  //       </Col>
  //     ))}
  //   </Row>
  );
}