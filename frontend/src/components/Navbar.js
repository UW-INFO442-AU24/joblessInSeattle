import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';

export function NavBar(props) {
  const NAV_DATA = [
    { 
        name: "/dashboard",  
        image: '/assets/icons8-home-48.png', 
        alt: "Dashboard Page" 
    },
    {
        name: "/healthjournal",
        image: '/assets/icons8-journal-50.png',
        alt: "Diary entries",
    },
    {
        name: "/buddy",
        image: '/assets/icons8-wolf-32.png',
        alt: "Buddy",
    },
    { 
      name: "/resources", 
      image: '/assets/resources.png', 
      alt: "Resources" 
  },
    { 
        name: "/settings", 
        image: '/assets/icons8-settings-50.png', 
        alt: "Settings" 
    },
  ];
  const navArray = NAV_DATA.map((navObj) => {
    const navElem = (
      <Container key={navObj.name}>
        <a href={navObj.name}>
          <Navbar.Brand key={navObj.name}>
              <img
                  src={navObj.image}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt={navObj.alt}
              />
            </Navbar.Brand>
          </a>
      </Container>
    );
    return navElem;
  });
  return (
    <Navbar className="flex bg-body-tertiary" fixed='bottom'>{navArray}</Navbar>
  );
}