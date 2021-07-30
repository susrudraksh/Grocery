import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, FormGroup, Label, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { NotificationManager } from "../../../components/common/react-notifications";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import { FormikCustomRadioGroup } from "../../../containers/form-validations/FormikFields";

var priceRegExp = /^\d+(?:[.]\d+)*$/;
var quantityRegExp = /^\d*$/;

const InventoryFormSchema = Yup.object().shape({
  inventory_name: Yup.string()
    .required("Please enter inventory name")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(50, "Too Long! Atmost 50 letters."),
  hsn_code: Yup.string()
    .required("Please enter hsn code")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(50, "Too Long! Atmost 50 letters."),
  inventory_product_code: Yup.string()
    .required("Please enter inventory product code")
    .min(2, "Too Short! Atleast 2 letters.")
    .max(50, "Too Long! Atmost 50 letters."),

    tax_rate: Yup.string()
    .required("Please enter tax rate")
    .matches(priceRegExp, "Invalid tax rate"),

    cgst_rate: Yup.string()
    .when("tax_type",{
      is:(tax_type)=>tax_type=="1",
      then:Yup.string()
      .required("Please enter tax rate")
      .matches(priceRegExp, "Invalid cgst  value"),
    }),
    

    sgst_rate: Yup.string()
    .when("tax_type",{
      is:(tax_type)=>tax_type=="1",
      then:Yup.string()
    .required("Please enter sgst rate")
    .matches(priceRegExp, "Invalid sgst rate"),
    }),

    igst_rate: Yup.string()
    .when("tax_type",{
      is:(tax_type)=>tax_type=="0",
      then:Yup.string()
    .required("Please enter igst rate")
    .matches(priceRegExp, "Invalid igst rate"),
    }),

    min_inventory: Yup.string()
    .required("Please enter minimum inventory")
    .matches(priceRegExp, "Invalid minimum inventory value")
    .max(5, "Too Long! Atmost 5 letters."),

    
  price: Yup.string()
    .required("Please enter price")
    .matches(priceRegExp, "Invalid price value")
    .max(15, "Too Long! Atmost 15 letters."),
  is_discount: Yup.string().required("Please select a type"),
  discount_type: Yup
    .string()
    .when("is_discount", {
      is: (is_discount) => is_discount == "1",
      then: Yup.string().required("Please select discount type")
    }),
  discount_value: Yup
    .string()
    .when("is_discount", {
      is: (is_discount) => is_discount == "1",
      then: Yup.string().required("Please enter discount value")
    }),
});

const CustomizeFormSchema = Yup.object().shape({
  custom_type: Yup.string().required("Please select a type"),
  custom_type_value: Yup.string().required("Please select a value"),
});
const CustomizeWarehouseFormSchema = Yup.object().shape({
  warehouse_id: Yup.string().required("Please select a warehouse"),
  quantity: Yup.string().required("Please enter quantity"),
});

const optionsType = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];
const taxoptionsType = [
  { value: "1", label: "GST" },
  { value: "0", label: "IGST" },
];
class InventoryForm extends Component {
  constructor(props) {
    super(props);
    var userData = JSON.parse(localStorage.getItem("userData")) || {};
    this.state = {
      userRole: userData ? userData.user_role : "",
      inventory_name: "",
      price: "",
      quantity: "",

      is_discount: "",
      discount_type: "",
      discount_value: "",
      discounted_product_price: "",
      
      sku_code: "",
      sku_name: "",
      batch: "",

      customizeForms: [{ custom_type: "", custom_type_value: "" }],
      customizeWarehouseForms: [{ warehouse_id: "", quantity: "" }],
      customizeFormsList: [{customTypeValuesList: [{ _id: "", name: "Select" }]}],

      warhousesList: [{ _id: "", name: "Select" }],
      customTypesList: [{ _id: "", name: "Select" }],
      // customTypeValuesList: [{ _id: "", name: "Select" }],
      mrp:0,
      tax_type:1,
      hsn_code: "",
      inventory_product_code:"",
      tax_rate: 0,
      taxable_amount: 0,
      gst_amount: 0,
      cgst_rate: 0,
      cgst_amount: 0,
      sgst_rate: 0,
      sgst_amount: 0,
      igst_rate: 0,
      igst_amount: 0,
      min_inventory:0,
    };
  }

  componentDidMount() {
    this.getCustomTypesList();
    this.getWarehouseList();
  }
  // GET WAREHOUSE LIST
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
  // PRODUCT CUSTOMIZATION METHODS
  getCustomTypesList = async () => {
    this.state.isLoading = true;
    var customTypesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_PRODUCT_CUSTOM_TYPES;
    const res = await Http("GET", path);

    if (res.status == 200) {
      var customTypesArr = res.data.docs.map((item) => {
        return { _id: item._id, name: item.name };
      });

      this.setState({
        customTypesList: [...customTypesList, ...customTypesArr],
      });
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }
  };

  getCustomTypeValuesList = async (type_id, index) => {
    this.state.isLoading = true;
    var customTypeValuesList = [{ _id: "", name: "Select" }];

    if (type_id) {
      let path = ApiRoutes.GET_PRODUCT_CUSTOM_SUBTYPES + "/" + type_id;
      const res = await Http("GET", path);

      if (res.status == 200) {
        var customTypeValuesArr = res.data.map((item) => {
          return { _id: item._id, name: item.name };
        });

        var prevCustomizeFormsList = this.state.customizeFormsList;
        prevCustomizeFormsList[index].customTypeValuesList = [
          ...customTypeValuesList,
          ...customTypeValuesArr,
        ];
        this.setState({ customizeFormsList: prevCustomizeFormsList });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      this.setState({
        customTypeValuesList: customTypeValuesList,
      });
    }
  };

  addCustomizeForm = (e) => {
    var customTypeValuesList = [{ _id: "", name: "Select" }];
    var prevCustomizeFormsList = this.state.customizeFormsList;
    var index = prevCustomizeFormsList.length;

    prevCustomizeFormsList.push({ customTypeValuesList: customTypeValuesList });
    this.setState({ customizeFormsList: prevCustomizeFormsList });

    this.setState((prevState) => ({
      customizeForms: [
        ...prevState.customizeForms,
        { custom_type: "", custom_type_value: "" },
      ],
    }));
  };
  addCustomizeWarehouseForm = (
    selectedId = "",
    selectedWarehouseType = "",
    selectedQuantityValue = ""
  ) => {
    this.setState((prevState) => ({
      customizeWarehouseForms: [
        ...prevState.customizeWarehouseForms,
        {
          id: selectedId,
          warehouse_id: selectedWarehouseType,
          quantity: selectedQuantityValue,
        },
      ],
    }));
  };
  onChangeWarehouseType = (value, index) => {
    let customizeWarehouseFormsClone = Object.assign(
      [],
      this.state.customizeWarehouseForms
    );
    var customWarehouseTypeIds = customizeWarehouseFormsClone.map(function (a) {
      return a.warehouse_id;
    });

    if (!customWarehouseTypeIds.includes(value)) {
      customizeWarehouseFormsClone[index]["warehouse_id"] = value;
      this.setState({ customizeWarehouseForms: customizeWarehouseFormsClone });
    } else {
      customizeWarehouseFormsClone[index]["warehouse_id"] = "";
      customizeWarehouseFormsClone[index]["quantity"] = "";
      this.setState({ customizeWarehouseForms: customizeWarehouseFormsClone });
    }
  };
  onChangeQuantity = (value, index) => {
    //console.log(value);
    let customizeWarehouseFormsClone = Object.assign(
      [],
      this.state.customizeWarehouseForms
    );
    var customWarehouseTypeIds = value;

    customizeWarehouseFormsClone[index]["quantity"] = value;
    this.setState({ customizeWarehouseForms: customizeWarehouseFormsClone });
  };
  onChangeCustomType = (value, index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    var customTypeIds = customizeFormsClone.map(function (a) {
      return a.custom_type;
    });

    if (!customTypeIds.includes(value)) {
      customizeFormsClone[index]["custom_type"] = value;
      this.setState({ customizeForms: customizeFormsClone });
      this.getCustomTypeValuesList(value, index);
    } else {
      customizeFormsClone[index]["custom_type"] = "";
      customizeFormsClone[index]["custom_type_value"] = "";
      this.setState({ customizeForms: customizeFormsClone });
    }
  };

  onChangeCustomTypeValue = (value, index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    var customTypeValueIds = customizeFormsClone.map(function (a) {
      return a.custom_type_value;
    });

    if (!customTypeValueIds.includes(value)) {
      customizeFormsClone[index]["custom_type_value"] = value;
      this.setState({ customizeForms: customizeFormsClone });
    } else {
      customizeFormsClone[index]["custom_type_value"] = "";
      this.setState({ customizeForms: customizeFormsClone });
    }
  };

  onSubmitCustomizeForm = async (inputValues) => {
    this.addCustomizeForm();
    this.props.handleCustomizationSubmit(this.state.customizeForms);
  };
  onSubmitCustomizeWarehouseForm = async (inputValues) => {
    this.addCustomizeWarehouseForm();
    //console.log(this.state.customizeWarehouseForms);
    this.props.handleCustomizationWarehouseSubmit(
      this.state.customizeWarehouseForms
    );
  };

  onRemoveCustomizeForm = (index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    customizeFormsClone.splice(index, 1);

    setTimeout(() => {
      this.setState({ customizeForms: customizeFormsClone });
    }, 500);

    this.props.handleCustomizationSubmit(customizeFormsClone);
  };

  onRemoveWarehouseCustomizeForm = (index) => {
    let customizeWarehouseFormsClone = Object.assign(
      [],
      this.state.customizeWarehouseForms
    );
    customizeWarehouseFormsClone.splice(index, 1);

    setTimeout(() => {
      this.setState({ customizeWarehouseForms: customizeWarehouseFormsClone });
    }, 500);

    this.props.handleCustomizationWarehouseSubmit(customizeWarehouseFormsClone);
  };

  onChangeProductValue = (value, setFieldValue) => {

    var price = this.state.price;
    var tax_type = this.state.tax_type;

    var tax_rate = this.state.tax_rate||0;
    var cgst_rate = this.state.cgst_rate;
    var sgst_rate = this.state.sgst_rate;
    var igst_rate = this.state.igst_rate;
    
   tax_rate = (tax_rate && tax_rate!=0)? (parseFloat(1+(tax_rate/100))):0 ;
   cgst_rate = (cgst_rate && cgst_rate!=0)? cgst_rate/100:0 ;
   sgst_rate = (sgst_rate && sgst_rate!=0)? sgst_rate/100:0 ;
   igst_rate = (igst_rate && igst_rate!=0)? igst_rate/100:0 ;
    


    var cgst_amount = 0;
    var sgst_amount = 0;
    var igst_amount = 0;
    var taxable_amount = 0;
    var gst_amount = 0;
    var discount_type = this.state.discount_type;
    var discount_value = this.state.discount_value;
    var product_price = this.state.price;

    
    

   
    if (discount_type == 1 && discount_type != "") {

      var discountedPrice = (discount_value / 100) * product_price;
      discountedPrice = product_price - discountedPrice;
      this.setState({
        discounted_product_price: discountedPrice
      })
    } else {
      var discountedPrice = product_price - discount_value;
      this.setState({
        discounted_product_price: discountedPrice
      })
    }

    
    taxable_amount   = tax_rate!=0 ? (discountedPrice / tax_rate):0;
    taxable_amount = taxable_amount.toFixed(2);
    gst_amount = tax_rate!=0 ? discountedPrice - taxable_amount:0;
    gst_amount = gst_amount.toFixed(2);
    if(tax_type==1){

      cgst_amount =  (taxable_amount * cgst_rate);
      cgst_amount = cgst_amount.toFixed(2);
      sgst_amount =  (taxable_amount * sgst_rate);
      sgst_amount = sgst_amount.toFixed(2);
    }else{
      igst_amount =  (taxable_amount * igst_rate);
      igst_amount = igst_amount.toFixed(2);
    }
    this.setState({
      taxable_amount:taxable_amount,
      gst_amount:gst_amount,
      cgst_amount:cgst_amount,
      sgst_amount:sgst_amount,
      igst_amount:igst_amount,
    })
    setFieldValue("discounted_product_price", discountedPrice)
    setFieldValue("taxable_amount", taxable_amount)
    setFieldValue("gst_amount", gst_amount);
    setFieldValue("cgst_amount", cgst_amount)
    setFieldValue("sgst_amount", sgst_amount)
    setFieldValue("igst_amount", igst_amount)
   // setFieldValue("discounted_product_price", discountedPrice)
  }
  render() {
    const { messages } = this.props.intl;
    const {
      handleInventoryFormChange,
      handleInventorySubmit,
      inventoryFormBtnRef,
    } = this.props;

    return (
      <Row style={{ marginTop: 30 }}>
        <Colxx xxs="12" sm="12">
          <Card>
            <CardBody>
              <Row>
                <Colxx xxs="12" sm="12">
                  <h6 className="mb-4">Product Inventory Details</h6>
                  <Formik
                    initialValues={{
                      inventory_name: this.state.inventory_name,
                      price: this.state.price,
                      quantity: this.state.quantity,
                      is_discount: 0,
                      discount_type: this.state.discount_type,
                      discount_value: this.state.discount_value,
                      discounted_product_price: this.state.discounted_product_price,
                      sku_code: this.state.sku_code,
                      sku_name: this.state.sku_name,
                      batch: this.state.batch,

                      mrp: this.state.mrp,
                      tax_type: this.state.tax_type,
                      hsn_code: this.state.hsn_code,
                      inventory_product_code:this.state.inventory_product_code,
                      tax_rate: this.state.tax_rate,
                      taxable_amount: this.state.taxable_amount,
                      gst_amount: this.state.gst_amount,
                      cgst_rate: this.state.cgst_rate,
                      cgst_amount: this.state.cgst_amount,
                      sgst_rate: this.state.sgst_rate,
                      sgst_amount: this.state.sgst_amount,
                      igst_rate: this.state.igst_rate,
                      igst_amount: this.state.igst_amount,
                      min_inventory: this.state.min_inventory
                    }}
                    validationSchema={InventoryFormSchema}
                    onSubmit={handleInventorySubmit}
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
                        onChange={handleInventoryFormChange}
                        className="av-tooltip tooltip-label-bottom"
                      >
                        <Row>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Inventory Name</Label>
                              <Field
                                className="form-control"
                                name="inventory_name"
                                type="text"
                              />
                              {errors.inventory_name &&
                                touched.inventory_name ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.inventory_name}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>HSN Code</Label>
                              <Field
                                className="form-control"
                                name="hsn_code"
                                type="text"
                                
                              />
                              {errors.hsn_code && touched.hsn_code ? (
                                <div className="invalid-feedback d-block">
                                  {errors.hsn_code}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Inventory Product Code</Label>
                              <Field
                                className="form-control"
                                name="inventory_product_code"
                                type="text"
                                
                              />
                              {errors.inventory_product_code && touched.inventory_product_code ? (
                                <div className="invalid-feedback d-block">
                                  {errors.inventory_product_code}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          
                          
                        </Row>
                        <Row>
                        <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>MRP</Label>
                              <Field
                                className="form-control"
                                name="price"
                                type="text"
                                value={values.price}
                                onChange={(event) => {
                                  setFieldValue(
                                    "price",
                                    event.target.value
                                  );
                                  this.setState({ price: event.target.value }, () => { this.onChangeProductValue(this.state.price, setFieldValue); });
                                }}
                              />
                              {errors.price && touched.price ? (
                                <div className="invalid-feedback d-block">
                                  {errors.price}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Minimum Inventory</Label>
                              <Field
                                className="form-control"
                                name="min_inventory"
                                type="text"
                              />
                              {errors.min_inventory && touched.min_inventory ? (
                                <div className="invalid-feedback d-block">
                                  {errors.min_inventory}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="error-l-175">
                              <Label className="d-block">Discount</Label>
                              <FormikCustomRadioGroup
                                inline
                                name="is_discount"
                                id="is_discount"
                                value={(values.is_discount == 1) ? "1" : "0"}
                                onChange={(event, value) => {
                                  setFieldValue(
                                    "is_discount",
                                    value
                                  );
                                  this.setState({ is_discount: value });
                                }}
                                onBlur={setFieldTouched}
                                options={optionsType}
                              />
                              {errors.is_discount && touched.is_discount ? (
                                <div className="invalid-feedback d-block">
                                  {errors.is_discount}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                        {values.is_discount && values.is_discount == "1" && (
                          <Row>
                            <Colxx xxs="12" sm="3">
                              <FormGroup className="form-group has-float-label">
                                <Label>Discount Type</Label>
                                <select
                                  name="discount_type"
                                  className="form-control"
                                  value={values.discount_type}
                                  onChange={(event) => {
                                    setFieldValue(
                                      "discount_type",
                                      event.target.value
                                    );
                                    this.setState({ discount_type: event.target.value }, () => { this.onChangeProductValue(this.state.discount_type, setFieldValue); });

                                  }}
                                >
                                  <option value="">Select</option>,
                                  <option value="1">Percentage (%)</option>,
                                  <option value="2">Fixed</option>
                                </select>
                                {errors.discount_type && touched.discount_type ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.discount_type}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>

                            <Colxx xxs="12" sm="3">
                              <FormGroup className="form-group has-float-label">
                                <Label>Discount Value</Label>
                                <Field
                                  className="form-control"
                                  name="discount_value"
                                  type="text"
                                  value={values.discount_value}
                                  onChange={(event) => {
                                    setFieldValue(
                                      "discount_value",
                                      event.target.value
                                    );
                                    this.setState({ discount_value: event.target.value }, () => { this.onChangeProductValue(this.state.discount_value, setFieldValue); });

                                  }}
                                />
                                {errors.discount_value && touched.discount_value ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.discount_value}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            <Colxx xxs="12" sm="3">
                              <FormGroup className="form-group has-float-label">
                                <Label>Discount Product Price</Label>
                                <Field
                                  className="form-control"
                                  name="discounted_product_price"
                                  type="text"
                                  readOnly
                                  value={values.discounted_product_price}
                                />
                                {errors.discounted_product_price && touched.discounted_product_price ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.discounted_product_price}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </Colxx>
                            
                          </Row>
                        )}
                        <Row>
                        
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="error-l-175">
                              <Label className="d-block">Tax Type</Label>

                              <FormikCustomRadioGroup
                                inline
                                name="tax_type"
                                id="tax_type"
                                value={(values.tax_type == 1) ? "1" : "0"}
                                onChange={(event, value) => {
                                  console.log("value",value)
                                  setFieldValue(
                                    "tax_type",
                                    value
                                  );
                                  this.setState({ tax_type: value });
                                }}
                                onBlur={setFieldTouched}
                                options={taxoptionsType}
                              />
                              {errors.tax_type && touched.tax_type ? (
                                <div className="invalid-feedback d-block">
                                  {errors.tax_type}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      
                        <Row>
                           <Colxx xxs="12" sm="3">
                           <FormGroup className="form-group has-float-label">
                             <Label>Tax Rate</Label>
                             <Field
                               className="form-control"
                               name="tax_rate"
                               type="text"
                               onChange={(event, value) => {
                                 setFieldValue(
                                   "tax_rate",
                                   event.target.value
                                 );
                                 this.setState({ tax_rate: event.target.value }, () => { this.onChangeProductValue(this.state.tax_rate,setFieldValue) });
                               }}
                             />
                             {errors.tax_rate && touched.tax_rate ? (
                               <div className="invalid-feedback d-block">
                                 {errors.tax_rate}
                               </div>
                             ) : null}
                           </FormGroup>
                         </Colxx>
                          
                         <Colxx xxs="12" sm="3">
                         <FormGroup className="form-group has-float-label">
                           <Label>GST Amount</Label>
                           <Field
                             className="form-control"
                             name="gst_amount"
                             type="text"
                             onChange={(event, value) => {
                               setFieldValue(
                                 "gst_amount",
                                 event.target.value
                               );
                               this.setState({ gst_amount: event.target.value }, () => { this.onChangeProductValue(this.state.gst_amount,setFieldValue) });
                             }}
                           />
                           {errors.gst_amount && touched.gst_amount ? (
                             <div className="invalid-feedback d-block">
                               {errors.gst_amount}
                             </div>
                           ) : null}
                         </FormGroup>
                       </Colxx>
                       <Colxx xxs="12" sm="3">
                          <FormGroup className="form-group has-float-label">
                            <Label>Taxable Amount</Label>
                            <Field
                              className="form-control"
                              name="taxable_amount"
                              type="text"
                              onChange={(event, value) => {
                                setFieldValue(
                                  "taxable_amount",
                                  event.target.value
                                );
                                this.setState({ taxable_amount: event.target.value }, () => { this.onChangeProductValue(this.state.taxable_amount,setFieldValue) });
                              }}
                            />
                            {errors.taxable_amount && touched.taxable_amount ? (
                              <div className="invalid-feedback d-block">
                                {errors.taxable_amount}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                       </Row>
                        {values.tax_type && values.tax_type == "0" ? (
                           <Row>
                           <Colxx xxs="12" sm="3">
                           <FormGroup className="form-group has-float-label">
                             <Label>IGST Rate</Label>
                             <Field
                               className="form-control"
                               name="igst_rate"
                               type="text"
                               onChange={(event, value) => {
                                 setFieldValue(
                                   "igst_rate",
                                   event.target.value
                                 );
                                 this.setState({ igst_rate: event.target.value }, () => { this.onChangeProductValue(this.state.igst_rate,setFieldValue) });
                               }}
                             />
                             {errors.igst_rate && touched.igst_rate ? (
                               <div className="invalid-feedback d-block">
                                 {errors.igst_rate}
                               </div>
                             ) : null}
                           </FormGroup>
                         </Colxx>
                          <Colxx xxs="12" sm="3">
                          <FormGroup className="form-group has-float-label">
                            <Label>IGST Amount</Label>
                            <Field
                              className="form-control"
                              name="igst_amount"
                              type="text"
                              onChange={(event, value) => {
                                setFieldValue(
                                  "igst_amount",
                                  event.target.value
                                );
                                this.setState({ igst_amount: event.target.value }, () => { this.onChangeProductValue(this.state.igst_amount,setFieldValue) });
                              }}
                            />
                            {errors.igst_amount && touched.igst_amount ? (
                              <div className="invalid-feedback d-block">
                                {errors.igst_amount}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        
                       </Row>
                        ):(
                          <>
                          <Row>
                          <Colxx xxs="12" sm="3">
                          <FormGroup className="form-group has-float-label">
                            <Label>CGST Rate</Label>
                            <Field
                              className="form-control"
                              name="cgst_rate"
                              type="text"
                              onChange={(event, value) => {
                                setFieldValue(
                                  "cgst_rate",
                                  event.target.value
                                );
                                this.setState({ cgst_rate: event.target.value }, () => { this.onChangeProductValue(this.state.cgst_rate,setFieldValue) });
                              }}
                            />
                            {errors.cgst_rate && touched.cgst_rate ? (
                              <div className="invalid-feedback d-block">
                                {errors.cgst_rate}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                         <Colxx xxs="12" sm="3">
                         <FormGroup className="form-group has-float-label">
                           <Label>CGST Amount</Label>
                           <Field
                             className="form-control"
                             name="cgst_amount"
                             type="text"
                             readOnly
                             onChange={(event, value) => {
                               setFieldValue(
                                 "cgst_amount",
                                 event.target.value
                               );
                               this.setState({ cgst_amount: event.target.value }, () => { this.onChangeProductValue(this.state.cgst_amount,setFieldValue) });
                             }}
                           />
                           {errors.cgst_amount && touched.cgst_amount ? (
                             <div className="invalid-feedback d-block">
                               {errors.cgst_amount}
                             </div>
                           ) : null}
                         </FormGroup>
                       </Colxx>
                       </Row>
                       <Row>
                       <Colxx xxs="12" sm="3">
                         <FormGroup className="form-group has-float-label">
                           <Label>SGST Rate</Label>
                           <Field
                             className="form-control"
                             name="sgst_rate"
                             type="text"
                             onChange={(event, value) => {
                               setFieldValue(
                                 "sgst_rate",
                                 event.target.value
                               );
                               this.setState({ sgst_rate: event.target.value }, () => { this.onChangeProductValue(this.state.sgst_rate,setFieldValue) });
                             }}
                           />
                           {errors.sgst_rate && touched.sgst_rate ? (
                             <div className="invalid-feedback d-block">
                               {errors.sgst_rate}
                             </div>
                           ) : null}
                         </FormGroup>
                       </Colxx>
                       <Colxx xxs="12" sm="3">
                         <FormGroup className="form-group has-float-label">
                           <Label>SGST Amount</Label>
                           <Field
                             className="form-control"
                             name="sgst_amount"
                             type="text"
                             readOnly
                             onChange={(event, value) => {
                               setFieldValue(
                                 "sgst_amount",
                                 event.target.value
                               );
                               this.setState({ sgst_amount: event.target.value }, () => { this.onChangeProductValue(this.state.sgst_amount,setFieldValue) });
                             }}
                           />
                           {errors.sgst_amount && touched.sgst_amount ? (
                             <div className="invalid-feedback d-block">
                               {errors.sgst_amount}
                             </div>
                           ) : null}
                         </FormGroup>
                       </Colxx>
                      </Row>
                      </>
                        )
                        }
                      
                        <Row>
                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>SKU code</Label>
                              <Field
                                className="form-control"
                                name="sku_code"
                                type="text"
                              />
                              {errors.sku_code &&
                                touched.sku_code ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.sku_code}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>SKU name</Label>
                              <Field
                                className="form-control"
                                name="sku_name"
                                type="text"
                              />
                              {errors.sku_name &&
                                touched.sku_name ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.sku_name}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>

                          <Colxx xxs="12" sm="3">
                            <FormGroup className="form-group has-float-label">
                              <Label>Batch</Label>
                              <Field
                                className="form-control"
                                name="batch"
                                type="text"
                              />
                              {errors.batch &&
                                touched.batch ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.batch}
                                  </div>
                                ) : null}
                            </FormGroup>
                          </Colxx>
                        
                        </Row>
                        <Button
                          className="hide-element"
                          type="submit"
                          innerRef={inventoryFormBtnRef}
                        ></Button>
                      </Form>
                    )}
                  </Formik>
                </Colxx>
              </Row>

              <Row>
                <Colxx xxs="12" sm="12">
                  <h6 className="mb-4">Product Customizations</h6>
                  {this.state.customizeForms.map((value, index) => {
                    return (
                      <Formik
                        key={index}
                        initialValues={{
                          custom_type: this.state.customizeForms[index]
                            .custom_type,
                          custom_type_value: this.state.customizeForms[index]
                            .custom_type_value,
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
                                  <Label>Custom Type</Label>
                                  <select
                                    name="custom_type"
                                    className="form-control"
                                    id={"custom_type" + index}
                                    data-id={index}
                                    value={
                                      this.state.customizeForms[index]
                                        .custom_type
                                    }
                                    onChange={(event) => {
                                      setFieldValue(
                                        "custom_type",
                                        event.target.value
                                      );
                                      this.onChangeCustomType(
                                        event.target.value,
                                        index
                                      );
                                    }}
                                  >
                                    {this.state.customTypesList.map(
                                      (item, index) => {
                                        return (
                                          <option key={index} value={item._id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {errors.custom_type && touched.custom_type ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.custom_type}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Colxx>
                              <Colxx xxs="12" sm="3">
                                <FormGroup className="form-group has-float-label">
                                  <Label>Custom Type Value</Label>
                                  <select
                                    name="custom_type_value"
                                    className="form-control"
                                    id={"custom_type_value" + index}
                                    data-id={index}
                                    value={
                                      this.state.customizeForms[index]
                                        .custom_type_value
                                    }
                                    onChange={(event) => {
                                      setFieldValue(
                                        "custom_type_value",
                                        event.target.value
                                      );
                                      this.onChangeCustomTypeValue(
                                        event.target.value,
                                        index
                                      );
                                    }}
                                  >
                                    {this.state.customizeFormsList[
                                      index
                                    ].customTypeValuesList.map(
                                      (item, index) => {
                                        return (
                                          <option key={index} value={item._id}>
                                            {item.name}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                  {errors.custom_type_value &&
                                    touched.custom_type_value ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.custom_type_value}
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

                <Colxx xxs="12" sm="12">
                  <h6 className="mb-4">Warehouse Inventory</h6>
                  {this.state.customizeWarehouseForms.map((value, index) => {
                    return (
                      <Formik
                        key={index}
                        initialValues={{
                          warehouse_id: this.state.customizeWarehouseForms[
                            index
                          ].warehouse_id,
                          quantity: this.state.customizeWarehouseForms[index]
                            .quantity,
                        }}
                        validationSchema={CustomizeWarehouseFormSchema}
                        onSubmit={this.onSubmitCustomizeWarehouseForm}
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
                                    name="warehouse_id"
                                    className="form-control"
                                    id={"warehouse_id" + index}
                                    data-id={index}
                                    value={
                                      this.state.customizeWarehouseForms[index]
                                        .warehouse_id
                                    }
                                    onChange={(event) => {
                                      setFieldValue(
                                        "warehouse_id",
                                        event.target.value
                                      );
                                      this.onChangeWarehouseType(
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
                                  {errors.warehouse_id &&
                                    touched.warehouse_id ? (
                                      <div className="invalid-feedback d-block">
                                        {errors.warehouse_id}
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
                                    id={"quantity" + index}
                                    data-id={index}
                                    onChange={(event) => {
                                      setFieldValue(
                                        "quantity",
                                        event.target.value
                                      );
                                      this.onChangeQuantity(
                                        event.target.value,
                                        index
                                      );
                                    }}
                                  />
                                  {errors.quantity && touched.quantity ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.quantity}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Colxx>
                              <Colxx xxs="12" sm="2">
                                {this.state.customizeWarehouseForms[
                                  index + 1
                                ] ? (
                                    <Button
                                      outline
                                      color="danger"
                                      type="button"
                                      onClick={() => {
                                        this.onRemoveWarehouseCustomizeForm(
                                          index
                                        );
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
