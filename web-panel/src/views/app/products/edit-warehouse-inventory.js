import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import IntlMessages from "../../../helpers/IntlMessages";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";

var priceRegExp = /^\d+(?:[.]\d+)*$/;
var quantityRegExp = /^\d*$/;

const CustomizeFormSchema = Yup.object().shape({
  warehouse_type: Yup.string().required("Please select a warehouse type"),
  quantity: Yup.string()
    .required("Please enter quantity")
    .matches(quantityRegExp, "Invalid quantity value")
    .max(5, "Too Long! Atmost 5 letters."),
});

class InventoryForm extends Component {
  constructor(props) {
    super(props);
    this.inventoryFormBtnRef = React.createRef();
    this.handleInventorySubmit = this.handleInventorySubmit.bind(this);

    this.state = {
      inventoryIndex: "",
      productId: "",
      inventoryId: "",
      inventory_name: "",
      price: "",
      quantity: "",
      custoimzations: [],

      customizeForms: [],
      customizeFormsList: [
        {
          customTypeValuesList: [{ _id: "", name: "Select" }],
        },
      ],

      warhousesList: [{ _id: "", name: "Select" }],
    };
  }

  componentDidMount() {
    var inventoryData = this.props.inventoryItem;
    var inventoryIndex = this.props.inventoryIndex;
    var customizationData = inventoryData.ProductCustomizationData;

    // Set auto filled customize forms by data
    for (var i = 0; i < customizationData.length; i++) {
      var selectedId = customizationData[i]._id;
      var customizeTypeId = customizationData[i].title._id;
      var customizeValueId = customizationData[i].title.value._id;

      this.addCustomizeForm(selectedId, customizeTypeId, customizeValueId);
    }

    // Set an additional customize form empty
    this.addCustomizeForm();

    this.setState({
      inventoryIndex: inventoryIndex,
      inventoryId: inventoryData._id,
      productId: inventoryData.product_id,
      inventory_name: inventoryData.inventory_name,
      price: inventoryData.price,
      quantity: inventoryData.product_quantity,
    });
    this.getWarehouseList();
  }

  // PRODUCT INVENTORY FORM METHODS
  handleInventoryFormChange = (e) => {
    if (e.target.type != "file") {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ images: e.target.files });
    }
  };

  handleInventorySubmit = async (inputValues, formOptions) => { };

  // PRODUCT CUSTOMIZATION METHODS
  getWarehouseList = async () => {
    this.state.isLoading = true;
    var warhousesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_WAREHOUSES;
    const res = await Http("GET", path);

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
  };

  addCustomizeForm = (
    selectedId = "",
    selectedType = "",
    selectedValue = ""
  ) => {
    var customTypeValuesList = [{ _id: "", name: "Select" }];
    var prevCustomizeFormsList = this.state.customizeFormsList;
    var index = prevCustomizeFormsList.length;

    prevCustomizeFormsList.push({ customTypeValuesList: customTypeValuesList });
    this.setState({ customizeFormsList: prevCustomizeFormsList });

    this.setState((prevState) => ({
      customizeForms: [
        ...prevState.customizeForms,
        {
          id: selectedId,
          custom_type: selectedType,
        },
      ],
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
  };

  onRemoveCustomizeForm = async (index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);

    if (customizeFormsClone.length > 2) {
      if (customizeFormsClone[index].id != "") {
        let path =
          ApiRoutes.DELETE_INVENTORY_DATA + "/" + customizeFormsClone[index].id;
        const res = await Http("DELETE", path);

        if (res.status == 200) {
          customizeFormsClone.splice(index, 1);
          this.setState({ customizeForms: customizeFormsClone });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }
      } else {
        setTimeout(() => {
          customizeFormsClone.splice(index, 1);
          this.setState({ customizeForms: customizeFormsClone });
        }, 500);
      }
    } else {
      let message =
        "Please add a new record to delete this. There should atleast one customization record for an inventory.";
      NotificationManager.error(message, "Error!", 3000);
    }
  };

  // Final Submit Methods
  validateFinalSubmit = (stateData, customizeData) => {
    var valid = false;
    var error = "";

    if (
      stateData.inventory_name == "" ||
      stateData.price == "" 
    ) {
    } else if (customizeData.length == 0) {
      error = "Please select atleast 1 customization.";
      NotificationManager.error(error, "Error!", 3000);
    } else {
      valid = true;
    }

    return valid;
  };

  handleFinalSubmit = async (e) => {
    this.inventoryFormBtnRef.current.click();

    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    customizeFormsClone.pop();

    let formData = new FormData();
    /* formData.append("inventory_id", this.state.inventoryId);
    formData.append("product_id", this.state.productId);
    formData.append("inventory_name", this.state.inventory_name);
    formData.append("price", this.state.price);
    formData.append("quantity", this.state.quantity); */
    formData.append("customize", JSON.stringify(customizeFormsClone));

    if (this.validateFinalSubmit(this.state, customizeFormsClone)) {
      let path = ApiRoutes.UPDATE_INVENTORY_DETAILS;
      const res = await Http("POST", path, formData);

      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
        window.location.reload();
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    }
  };

  render() {
    const { messages } = this.props.intl;
    const { inventoryItem, inventoryIndex, onDeleteInventory } = this.props;

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
                          warehouse_type: this.state.customizeForms[index]
                            .warehouse_type,
                          quantity: this.state.customizeForms[index].quantity,
                        }}
                        validationSchema={CustomizeFormSchema}
                        onSubmit={this.onSubmitCustomizeForm}
                      >
                        {({
                          handleInventorySubmit,
                          setFieldValue,
                          setFieldTouched,
                          handleChange,
                          values,
                          errors,
                          touched,
                          isSubmitting,
                        }) => (
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
                                      value={
                                        this.state.customizeForms[index]
                                          .warehouse_type
                                      }
                                      onChange={(event) => {
                                        setFieldValue(
                                          "warehouse_type",
                                          event.target.value
                                        );
                                        this.onChangeWarehosueType(
                                          event.target.value,
                                          index
                                        );
                                      }}
                                    >
                                      {this.state.warhousesList.map(
                                        (item, index) => {
                                          return (
                                            <option key={index} value={item._id}>
                                              {item.name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </select>
                                    {errors.warehouse_type &&
                                      touched.warehouse_type ? (
                                        <div className="invalid-feedback d-block">
                                          {errors.warehouse_type}
                                        </div>
                                      ) : null}
                                  </FormGroup>
                                </Colxx>
                                <Colxx xxs="12" sm="3">
                                  <FormGroup className="form-group has-float-label">
                                    <Label>Quantity</Label>
                                    <Field
                                      className="form-control"
                                      name="quantity"
                                      type="text"
                                    />
                                    {errors.quantity && touched.quantity ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.quantity}
                                      </div>
                                    ) : null}
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
              <Button
                color="primary"
                type="submit"
                onClick={this.handleFinalSubmit}
              >
                <IntlMessages id="button.save" />
              </Button>{" "}
              <Button
                color="danger"
                type="submit"
                title="Delete Inventory"
                onClick={() => {
                  onDeleteInventory(inventoryItem._id, inventoryIndex);
                }}
              >
                <IntlMessages id="button.delete" />
              </Button>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
export default injectIntl(InventoryForm);
