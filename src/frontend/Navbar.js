import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export function NavBar(props) {
  const NAV_DATA = [
    { name: "Dashboard", image: '/assets/icons8-home-48.png', alt: "Dashboard Page" },
    {
      name: "Diary",
      image: '/assets/icons8-journal-50.png',
      alt: "Diary entries",
    },
    {
      name: "Buddy",
      image: '/assets/icons8-wolf-32.png',
      alt: "Buddy",
    },
    { name: "Settings", image: '/assets/icons8-settings-50.png', alt: "Settings" },
  ];
  const navArray = NAV_DATA.map((navObj) => {
    const navElem = (
        <Container>
            <Navbar.Brand href={navObj.name}>
                <img
                src={navObj.image}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt={navObj.alt}
                />
            </Navbar.Brand>
        </Container>
    );
    return navElem;
  });
  return (
    <Navbar className="bg-body-tertiary" fixed='bottom'>{navArray}</Navbar>
  );
}