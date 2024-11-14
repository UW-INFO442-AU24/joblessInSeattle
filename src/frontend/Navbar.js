import React from "react";
import { Link } from 'react-router-dom'


function NavBarItem(props) {
  const navItemName = props.navItemName;
  const navItemImg = props.navItemImg;
  const navItemImgAlt = props.navItemImgAlt;

  return (
    <Link to={navItemName} className="nav-item nav-link">
      <img src={navItemImg} alt={navItemImgAlt} />
    </Link>
  );
}

export function NavBar(props) {
  const NAV_DATA = [
    { name: "Home", image: '/assets/icons8-home-48.png', alt: "Home Page" },
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
      <NavBarItem
        key={navObj.name}
        navItemName={navObj.name}
        navItemImg={navObj.image}
        navItemImgAlt={navObj.alt}
      />
    );
    return navElem;
  });
  return (
    <div>
      <nav className="navbar justify-content-around">{navArray}</nav>
    </div>
  );
}