import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

var quantityRegExp = /^\d*$/;

const CustomizeFormSchema = Yup.object().shape({
  warehouse_type: Yup.string().required("Please select a warehouse"),
  quantity: Yup.string().required("Please enter quantity").matches(quantityRegExp, "Invalid quantity value").max(5, "Too Long! Atmost 5 letters."),
});

class InventoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",

      customizeForms: [{ warehouse_type: "", quantity: "" }],
      customizeFormsList: [
        {
          customTypeValuesList: [{ _id: "", name: "Select" }],
        },
      ],

      warhousesList: [{ _id: "", name: "Select" }],
      // customTypeValuesList: [{ _id: "", name: "Select" }],
    };
  }

  componentDidMount() {
    this.getWarehouseList();
  }

  // PRODUCT CUSTOMIZATION METHODS
  getWarehouseList = async () => {
    this.state.isLoading = true;
    var warhousesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_WAREHOUSES;
    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        var warehouseTypesArr = res.data.docs.map((item) => {
          return { _id: item._id, name: item.name };
        });

        this.setState({
          warhousesList: [...warhousesList, ...warehouseTypesArr],
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  addCustomizeForm = (e) => {
    var prevCustomizeFormsList = this.state.customizeFormsList;
    var index = prevCustomizeFormsList.length;

    this.setState({ customizeFormsList: prevCustomizeFormsList });

    this.setState((prevState) => ({
      customizeForms: [...prevState.customizeForms, { warehouse_type: "", quantity: "" }],
    }));
  };

  onChangeWarehosueType = (value, index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    var customTypeIds = customizeFormsClone.map(function (a) {
      return a.warehouse_type;
    });

    if (!customTypeIds.includes(value)) {
      customizeFormsClone[index]["warehouse_type"] = value;
      this.setState({ customizeForms: customizeFormsClone });
    } else {
      customizeFormsClone[index]["warehouse_type"] = "";
      customizeFormsClone[index]["quantity"] = "";
      this.setState({ customizeForms: customizeFormsClone });
    }
  };

  onSubmitCustomizeForm = async (inputValues) => {
    this.addCustomizeForm();
    this.props.handleCustomizationSubmit(this.state.customizeForms);
  };

  onRemoveCustomizeForm = (index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    customizeFormsClone.splice(index, 1);

    setTimeout(() => {
      this.setState({ customizeForms: customizeFormsClone });
    }, 500);

    this.props.handleCustomizationSubmit(customizeFormsClone);
  };

  render() {
    const { messages } = this.props.intl;
    const { handleInventoryFormChange, handleInventorySubmit, inventoryFormBtnRef } = this.props;

    return (
      <Row style={{ marginTop: 30 }}>
        <Colxx xxs="12" sm="12">
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12" sm="12">
                  <h6 className="mb-4">Warehouse Inventory</h6>
                  {this.state.customizeForms.map((value, index) => {
                    return (
                      <Formik
                        key={index}
                        initialValues={{
                          warehouse_type: this.state.customizeForms[index].warehouse_type,
                          quantity: this.state.customizeForms[index].quantity,
                        }}
                        validationSchema={CustomizeFormSchema}
                        onSubmit={this.onSubmitCustomizeForm}
                      >
                        {({ handleInventorySubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                          <Form
                            //onChange={this.handleCustomzeFormChange}
                            className="av-tooltip tooltip-label-bottom"
                          >
                            <Row>
                              <Colxx xxs="12" sm="3">
                                <FormGroup className="form-group has-float-label">
                                  <Label>Warehouse Type</Label>
                                  <select
                                    name="warehouse_type"
                                    className="form-control"
                                    id={"warehouse_type" + index}
                                    data-id={index}
                                    value={this.state.customizeForms[index].warehouse_type}
                                    onChange={(event) => {
                                      setFieldValue("warehouse_type", event.target.value);
                                      this.onChangeWarehosueType(event.target.value, index);
                                    }}
                                  >
                                    {this.state.warhousesList.map((item, index) => {
                                      return (
                                        <option key={index} value={item._id}>
                                          {item.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                  {errors.warehouse_type && touched.warehouse_type ? <div className="invalid-feedback d-block">{errors.warehouse_type}</div> : null}
                                </FormGroup>
                              </Colxx>
                              <Colxx xxs="12" sm="3">
                                <FormGroup className="form-group has-float-label">
                                  <Label>Quantity</Label>
                                  <Field className="form-control" name="quantity" type="text" />
                                  {errors.quantity && touched.quantity ? <div className="invalid-feedback d-block">{errors.quantity}</div> : null}
                                </FormGroup>
                              </Colxx>

                              <Colxx xxs="12" sm="2">
                                {this.state.customizeForms[index + 1] ? (
                                  <Button
                                    outline
                                    color="danger"
                                    type="button"
                                    onClick={() => {
                                      this.onRemoveCustomizeForm(index);
                                    }}
                                  >
                                    <div className="glyph-icon simple-icon-trash"></div>
                                  </Button>
                                ) : (
                                  <Button outline color="primary" type="submit">
                                    Add
                                  </Button>
                                )}
                              </Colxx>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    );
                  })}
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
export default injectIntl(InventoryForm);
