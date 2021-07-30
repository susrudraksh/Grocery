import React, { useEffect, useState } from "react";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";

import { Formik, Form, Field } from "formik";
import { Colxx } from "../../../components/common/CustomBootstrap";
import * as Yup from "yup";
import { NotificationManager } from "../../../components/common/react-notifications";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import { getKM } from "../../../helpers/Utils";

function App() {
  const [inputList, setInputList] = useState([
    {
      min_distance: "",
      max_distance: "",
      delivery_fees: "",
      max_normal_delivery_time: "",
      max_special_order_delivery_time: "",
    },
  ]);
  const [min_km_val, SetMinKmVal] = useState("0");
  const [max_km_val, SetMaxKmVal] = useState("0");
  const CustomizeFormSchema = Yup.object().shape({
    // warehouse_type: Yup.string().required("Please select a warehouse"),
    min_distance: Yup.number().required("Please enter quantity"),
  });

  const onChangeKM = (km_val) => {
    let i = km_val;
    var kmArr = [];
    for (i = km_val; i <= 50; i++) {
      kmArr[i] = i;
    }
    return kmArr;
  };

  const onSubmitCustomizeForm = async (inputValues) => {
    handleInputChange(inputValues);
    this.props.handleCustomizationSubmit(this.state.customizeForms);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    if (e.target.id == "min_distance" + index) {
      SetMaxKmVal(e.target.value);
    }

    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { min_distance: "", max_distance: "", delivery_fees: "", max_normal_delivery_time: "", max_special_order_delivery_time: "" }]);
  };

  // LifeCycle Methods
  useEffect(() => {
    dataListRender();
  }, []);

  // Methods for Data Rendering
  const dataListRender = async () => {
    let path = ApiRoutes.GET_DELIVERY_SETTINGS;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        if (res.data.length > 0) {
          setInputList(res.data);
        } else {
          setInputList(inputList);
        }
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  const onSubmit = async () => {
    let formData = new FormData();

    formData.append("settingsData", JSON.stringify(inputList));

    let path = ApiRoutes.ADD_DELIVERY_SETTINGS;
    const res = await Http("POST", path, formData);
    if (res) {
      if (res.status == 200) {
        NotificationManager.success(res.message, "Success!", 3000);
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  return (
    <Row style={{ marginTop: 30 }}>
      <Colxx xxs="12" sm="12">
        <Card>
          <CardBody>
            <Row>
              <Colxx xxs="12" sm="12">
                <h6 className="mb-4">Delivery Settings</h6>
                {inputList.map((x, index) => {
                  return (
                    <Formik validationSchema={CustomizeFormSchema} onSubmit={onSubmitCustomizeForm}>
                      {({ handleInventorySubmit, setFieldValue, setFieldTouched, handleChange, values, errors, touched, isSubmitting }) => (
                        <Form className="av-tooltip tooltip-label-bottom">
                          <Row>
                            <Colxx xxs="12" sm="2">
                              <FormGroup className="form-group has-float-label">
                                <Label>Min distance(KM)</Label>
                                <select name="min_distance" className="form-control" id={"min_distance" + index} data-id={index} value={x.min_distance} onChange={(e) => handleInputChange(e, index)}>
                                  {onChangeKM(min_km_val).map((item, index) => {
                                    return (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    );
                                  })}
                                </select>
                              </FormGroup>
                            </Colxx>

                            <Colxx xxs="12" sm="2">
                              <FormGroup className="form-group has-float-label">
                                <Label>Max distance(KM)</Label>
                                <select name="max_distance" className="form-control" id={"max_distance" + index} data-id={index} value={x.max_distance} onChange={(e) => handleInputChange(e, index)}>
                                  {onChangeKM(max_km_val).map((item, index) => {
                                    return (
                                      <option key={index} value={item}>
                                        {item}
                                      </option>
                                    );
                                  })}
                                </select>
                              </FormGroup>
                            </Colxx>

                            <Colxx xxs="12" sm="2">
                              <FormGroup className="form-group has-float-label">
                                <Label>Delivery Fees</Label>
                                <Field className="form-control" name="delivery_fees" type="text" value={x.delivery_fees} onChange={(e) => handleInputChange(e, index)} />
                              </FormGroup>
                            </Colxx>

                            <Colxx xxs="12" sm="2">
                              <FormGroup className="form-group has-float-label">
                                <Label>Max Delivery Time</Label>
                                <Field className="form-control" name="max_normal_delivery_time" type="text" value={x.max_normal_delivery_time} onChange={(e) => handleInputChange(e, index)} />
                              </FormGroup>
                            </Colxx>

                            <Colxx xxs="12" sm="2">
                              <FormGroup className="form-group has-float-label">
                                <Label>Max Special Delivery Time</Label>
                                <Field
                                  className="form-control"
                                  name="max_special_order_delivery_time"
                                  type="text"
                                  value={x.max_special_order_delivery_time}
                                  onChange={(e) => handleInputChange(e, index)}
                                />
                              </FormGroup>
                            </Colxx>

                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button outline color="danger" type="submit" onClick={() => handleRemoveClick(index)}>
                                  Remove
                                </Button>
                              )}{" "}
                              {inputList.length - 1 === index && (
                                <Button outline color="primary" type="submit" onClick={handleAddClick}>
                                  Add
                                </Button>
                              )}
                            </div>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  );
                })}
                <Button color="primary" type="button" onClick={onSubmit}>
                  Save
                </Button>{" "}
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
              </Colxx>
            </Row>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
}

export default App;
