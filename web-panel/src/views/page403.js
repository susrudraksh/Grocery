import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, CardBody, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx, Separator } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import Breadcrumb from "../containers/navs/Breadcrumb";

class Page403 extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="" />
        {/* <main> */}
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="form-side" style={{width:"100%",textAlign:"center"}}>
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      You don't have permission to access this page
                    </CardTitle>
                    <p className="display-1 font-weight-bold mb-5">403</p>

                    <NavLink
                      to="/"
                    >
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                      >
                        Go Back
                    </Button>
                    </NavLink>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        {/* </main> */}
      </Fragment>
    );
  }
}
export default Page403;
