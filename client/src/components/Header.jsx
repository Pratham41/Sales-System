import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../redux/actions/user";

const Header = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate(true);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <Navbar
        className="py-4"
        bg="primary"
        expand="lg"
        variant="dark"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <span>PRATHAM</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ">
              <LinkContainer activeClassName="primary" to="/">
                <Nav.Link>
                  <i className="fa-solid fa-house"></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer activeClassName="primary" to="/topfive">
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i> Top Five
                </Nav.Link>
              </LinkContainer>
              <LinkContainer activeClassName="primary" to="/todaysale">
                <Nav.Link>
                  <i className="fa-solid fa-sack-dollar"></i> Todays's Sale
                </Nav.Link>
              </LinkContainer>
              {userInfo && !userInfo.isAdmin && (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/addproduct">
                    <NavDropdown.Item>Add Product</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
