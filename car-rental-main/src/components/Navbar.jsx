import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../images/logo/logo_for_site-removebg-preview.png";

import { useContext } from "react";
import { DataContext } from "../context/providerdata";

function Navbar() {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };
  
  const {account,setAccount} = useContext(DataContext);

  const userLogout=()=>{
      setAccount({...account,name:"",email:"",registered:0});
  }
  
  
  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Carpool
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* desktop */}

        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img style={{height:"6rem",width:"20rem"}} src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              {" "}
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              {" "}
              <Link className="testi-link" to="/testimonials"style={{color:'red'}} >
                CARPOOL
              </Link>
            </li>
            <li>
              {" "}
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {
            account.registered === 1?
            <div className="navbar__buttons">
            <Link className="navbar__buttons__sign-in" tp ="/" onClick={userLogout}>
              Logout
            </Link>
            <Link className="navbar__buttons__register" to="/">
            Welcome {account.name}
            </Link>
          </div>

            :

            <div className="navbar__buttons">
            <Link className="navbar__buttons__sign-in" to="/signin">
              Sign In
            </Link>
            <Link className="navbar__buttons__register" to="/register">
              Register
            </Link>
          </div>
          }
          

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
