import React from "react";
import "../css/dash.css";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import Fire from "../config/Fire";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/ButtonGroup";

class ParentDashboard extends React.Component {
  state = {
    details: this.props.data,
    user: this.props.user,
    Acheivements: [],
  };

  componentDidMount = () => {
    this.getAcheivements();
  };

  Signout = () => {
    Fire.SignoutUser();
  };

  getAcheivements = () => {
    Fire.GetSpecificData(this.state.user.uid, "Acheivements")
      .then((data) => {
        if (data !== null) {
          this.setState({
            Acheivements: data,
          });
        }
      })
      .catch((e) => {
        this.setState({ Acheivements: [] });
        console.log(e);
      });
  };

  render() {
    return (
      <div className="whole">
        <nav class="navbar navbar-dark bg-dark" style={{ height: "60px" }}>
          <ButtonGroup style={{ alignSelf: "flex-end" }}>
            <Button
                className="textbutton hover_btn"
                style={{ color: "#ffffff" }}
              onClick={this.Signout}
            >
              Log Out
            </Button>
          </ButtonGroup>
        </nav>
        <div class="dashboard-header">
          <nav class="navbar navbar-expand-lg ">
            <img
              src="/image/trans_logo.png"
              width="200px"
              height="80rem"
              alt="logo"
            />
            <ul class="navbar-nav ml-auto navbar-right-top">
              <div
                class="nav-item"
                id="custom-search"
                className="top-search-bar"
              >
                <input class="form-control" type="text" placeholder="Search" />{" "}
              </div>
            </ul>
          </nav>
        </div>

        <div
          class="container"
          className="Parent_dashboard_container"
          style={{ paddingLeft: "15px", paddingRight: "15px" }}
        >
          <h3
            className="h3"
            class="Parent_dash"
            style={{color:"teal"}}
          >
            <b>Parent's Dashboard</b>
          </h3>
          <div class="row first_container" style={{ marginLeft: "45px" }}>
            <div class="">
              <a href="#kids_achievements" style={{ textDecoration: "none" }}>
                <div
                  class="card text-center dash_navs"
                  className="skill_cards hover_transition dash_navs"
                  style={{ backgroundColor: "#ddf5f5" }}
                >
                  <div className="card-body map">
                    <h6 class="card-title-center h6 " href="#tests" 
            style={{color:"teal"}}
            >
                      See kid's achievements
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div class="">
              {" "}
              <a href="#skills" style={{ textDecoration: "none" }}>
                <div
                  class="card text-center"
                  className="skill_cards hover_transition dash_navs"
                  style={{ backgroundColor: "#F4F5DD" }}
                >
                  <div className="card-body map">
                    <h6 class="card-title-center h6" 
            style={{color:"teal"}}
            >Learn Essential Skills</h6>
                  </div>
                </div>{" "}
              </a>
            </div>
            <div class="">
              <div
                class="card text-center "
                className="skill_cards hover_transition Pune_card"
                style={{ width: "300px", height: "340.075px" }}
              >
                <img
                  src="image/ParentProfile.jpg"
                  class="card-img-top"
                  alt=""
                />
                <div className="card-body map ">
                  <h2 class="card-title-center h4">Pune</h2>
                </div>
              </div>
            </div>
            <div class="">
              {" "}
              <a href="#tests" style={{ textDecoration: "none" }}>
                <div
                  class="card text-center"
                  className="skill_cards hover_transition dash_navs"
                  style={{ backgroundColor: "#F4F5DD" }}
                >
                  <div className="card-body map">
                    <h6 class="card-title-center h6" 
            style={{color:"teal"}}
            >
                      Take Tests and View Results
                    </h6>
                  </div>
                </div>
              </a>
            </div>
            <div class="">
              {" "}
              <a href="#activity_providers" style={{ textDecoration: "none" }}>
                <div
                  class="card text-center"
                  className="skill_cards hover_transition dash_navs"
                  style={{ backgroundColor: "#ddf5f5" }}
                >
                  <div className="card-body map">
                    <h6 class="card-title-center h6" 
            style={{color:"teal"}}
            >
                      Connect to Activity Providers
                    </h6>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="row cop" id="kids_achievements">
          <div class="container">
          <h4 className="h4" style={{color:"teal", textAlign:"center"}}><b>Kid's Achievements</b></h4>

            <div class="row">
              <div class="col-xs-12 col-lg-6 col-md-6 achieve">
                <div class="card" style={{ width: "20rem", marginTop: "25px" }}>
                  <div class="card-block">
                    <img
                      class="card-img-top rounded mx-auto d-block  hover_transition"
                      src="image/kidsachievement1.jpg"
                      style={{
                        border: "solid",
                      }}
                      alt="KidsFuture"
                    />
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-xs-12 h4_bes_img3" >
                <br />
                <ul>
                  {this.state.Acheivements ? (
                    Object.keys(this.state.Acheivements).map((val, index) => {
                      if (index < 5) {
                        return (
                          <li style={{ marginLeft: "150px" }}>
                            {this.state.Acheivements[val]["description"]}
                          </li>
                        );
                      }
                    })
                  ) : (
                    <Spinner />
                  )}
                </ul>

                <br />
                <div className="achieve_btn">
                <Link
                  className="btn btn-sm hover_btn "
                  
                  to={{
                    pathname: "/AddAcheivements",
                    userID: this.state.user.uid,
                  }}
                >
                  Add Achievements
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#F4F5DD", paddingTop: "5px" }} className="skill_container" id="skills">
          <h4 class="h4 text-center" className="h4_center" 
            style={{color:"teal"}}
            >
            <b>
              {" "}
              Skills that will up your child's game! Teach your child essential
              skills in innovative ways.
            </b>
          </h4>
          <br />
          <div class="container">
            <div class="row skills_row">
              <div class="col-md-3">
                <div
                  class="card text-center"
                  className="skill_cards hover_transition "
                >
                  <img
                    src="image/kids achievements.jpg"
                    class="card-img-top"
                    alt=""
                    // style={{ border: "solid" }}
                  />
                  <div className="card-body map">
                    <h6 class="card-title-center h6">
                      Self Directed Engaged Learning
                    </h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div
                  class="card text-center"
                  className="skill_cards hover_transition"
                >
                  <img
                    src="image/Communication.jpg"
                    class="card-img-top"
                    alt=""
                    style={{ height: "256.575px" }}
                  />
                  <div className="card-body map">
                    <h6 class="card-title-center h6">Communication</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div
                  class="card text-center"
                  className="skill_cards hover_transition"
                >
                  <img
                    src="image/Critical  thinking.jpg"
                    class="card-img-top"
                    alt=""
                    // style={{ border: "solid" }}
                  />
                  <div className="card-body map">
                    <h6 class="card-title-center h6">Critical Thinking</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div
                  class="card text-center"
                  className="skill_cards hover_transition"
                >
                  <img
                    src="image/Focus and Self control.jpg"
                    class="card-img-top"
                    alt=""
                    // style={{ border: "solid" }}
                  />
                  <div className="card-body map last_skill">
                    <h6 class="card-title-center h6">Focus and Self-Control</h6>
                  </div>
                </div>
              </div>

              <Link
                class="btn btn-sm text-white hover_btn learn_skills_btn"
              style={{ marginLeft:"auto",
              marginRight:"auto",
              marginTop:"50px",
              backgroundColor:"rgb(241, 109, 54)",
              width:"138px"}}
                to={{ pathname: "/enroll", userID: this.state.user.uid }}
              >
                Learn Skills
              </Link>
            </div>
          </div>
        </div>

        <div class="row" style={{ backgroundColor: "#ddf5f5" }} id="tests">
          
          <div 
            className="col-8 mx-auto dop "
            style={{ marginTop: "3%", border: "solid black" }}
          >
            <div
              className=" text-center test_container"
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <h5 className="h5 text-white h5_text_white activists_btn">
                Activity test
                <Link
                  class="btn btn-sm text-white hover_btn"
                 
                  to={{
                    pathname: "/ListTests",
                    userID: this.state.user.uid,
                    userType: this.props.data.type,
                    type: "Activists",
                  }}
                >
                  Click here
                </Link>
              </h5>
            </div>
            <div
              className=" text-center test_container"
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <h5 className="h5 text-white h5_text_white counselor_btn ">
                Counselors test
                <Link
                  class="btn btn-sm text-white hover_btn"
                  to={{
                    pathname: "/ListTests",
                    userID: this.state.user.uid,
                    userType: this.state.details.type,
                    type: "counselor",
                  }}
                >
                  Click here
                </Link>
              </h5>
            </div>
            <div
              className=" text-center test_container"
              style={{ marginTop: "2%", marginBottom: "2%" }}
            >
              <h5 className="h5 text-white h5_text_white mentor_btn">
                Mentors test
                <Link
                  class="btn btn-sm text-white hover_btn"
                  to={{
                    pathname: "/ListTests",
                    userID: this.state.user.uid,
                    userType: this.state.details.type,
                    type: "mentors",
                  }}
                >
                  Click here
                </Link>
              </h5>
            </div>
          </div>

          <div
           
            id="activity_providers"
            style={{paddingTop:"50px"}}
          >
            <div
              id="leftbox"
              style={{
                backgroundColor: "#ffffff",
                width: "270px",
                marginRight: "35px",
              }}
              class="hover_transition"
            >
              <h5
                class="card-title-center"
                style={{ marginTop: "30px", textAlign: "center" }}
              >
                Nearby Acitvity Providers
              </h5>

              <Link
                class="btn btn-sm bot hover_btn test_btn"
                style={{
                  backgroundColor: "#f16d36",
                  color: "white",
                  marginLeft: " 78px",
                  width: "108px",
                }}
                to={{
                  pathname: "/Add",
                  userID: this.state.user.uid,
                  type: "Activists",
                  userType: "parent",
                }}
              >
                Click here
              </Link>
            </div>

            <div id="middlebox" style={{ backgroundColor: "#e6e6e6" }}>
              <img
                // class="card-img-top rounded mx-auto d-block"
                class="hover_transition"
                style={{ width: "268px", border: "solid darkgrey" }}
                src="/image/people.jpg"
                alt=""
              />
            </div>
            <div
              id="middlebox"
              style={{
                backgroundColor: "#ffffff",
                width: "270px",
                marginLeft: "-285px",
                marginTop: "215px",
              }}
              class="hover_transition"
            >
              <h5
                class="card-title-center"
                style={{ marginTop: "30px", textAlign: "center" }}
              >
                Nearby Mentors
              </h5>

              <Link
                class="btn btn-sm bot hover_btn"
                style={{
                  backgroundColor: "#f16d36",
                  color: "white",
                  marginLeft: " 78px",
                  width: "108px",
                  marginTop: "30px",
                }}
                to={{
                  pathname: "/Add",
                  userID: this.state.user.uid,
                  type: "mentors",
                  userType: "parent",
                }}
              >
                Click here
              </Link>
            </div>
            <div
              id="rightbox"
           
              class="hover_transition"
            >
              <h5
                class="card-title-center"
                style={{ marginTop: "30px", textAlign: "center" }}
              >
                Nearby Counselors
              </h5>

              <Link
                class="btn btn-sm bot hover_btn"
                style={{
                  backgroundColor: "#f16d36",
                  color: "white",
                  marginLeft: " 78px",
                  width: "108px",
                  marginTop: "30px",
                }}
                to={{
                  pathname: "/Add",
                  userID: this.state.user.uid,
                  type: "counselor",
                  userType: "parent",
                }}
              >
                Click here
              </Link>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#F4F5DD", paddingTop: "10px" }}>
          <h4
            class="h4 text-center text_center_h4"
            style={{ fontWeight: "bold" ,color:"teal"}}
          >
            Vitamins for your child's brain!
          </h4>

          <div class="row">
            <div class="col-md-4">
              <div
                class="card text-center hover_transition"
                style={{ width: "18rem" }}
              >
                <img src="image/creative.jpg" class="card-img-top" />
                <div class="card-body ">
                  <h5 className="card-title-center h5">
                    For the Creative Brain
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div
                class="card text-center hover_transition"
                style={{ width: "18rem" }}
              >
                <img src="/image/logical.jpg" class="card-img-top" alt="" />
                <div class="card-body ">
                  <h5 className="card-title-center h5">
                    For the Logical Brain
                  </h5>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div
                class="card text-center hover_transition"
                style={{ width: "18rem" }}
              >
                <img
                  src="/image/technical.jpg"
                  class="card-img-top"
                  alt=""
                  style={{ height: "18rem" }}
                />
                <div class="card-body ">
                  <h5 className="card-title-center h5">
                    For the Technical Brain
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="footer">
          <div class="container">
            <div class="col" style={{ textAlign: "left" }}>
              <h5 className="h5">About</h5>
              <ul class="list-unstyled quick-links">
                <li>
                  <a href="/help">
                    <i class="fa fa-angle-double-right"></i>Help
                  </a>
                </li>
                <li>
                  <a href="/tour">
                    <i class="fa fa-angle-double-right"></i>Quick Tour
                  </a>
                </li>
                <li>
                  <a href="/contact-us">
                    <i class="fa fa-angle-double-right"></i>Contact us
                  </a>
                </li>
              </ul>
            </div>

            <hr />
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p className="p text-white">kidsfuture © All rights Reserved.</p>
              <p className="p text-white">
                <a href="/terms">
                  Terms of use | Privacy | Threadmarks and Copyright |
                  Accessibility | Sidemap{" "}
                </a>
              </p>
            </div>
            <hr />
          </div>
        </section>
      </div>
    );
  }
}

export default ParentDashboard;
