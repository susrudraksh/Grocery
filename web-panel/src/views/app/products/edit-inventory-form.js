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
    min_inventory: Yup.string()
    .required("Please enter minimum inventory")
    .matches(priceRegExp, "Invalid minimum inventory value")
    .max(5, "Too Long! Atmost 5 letters."),
    

    sgst_rate: Yup.string()
    .when("tax_type",{
      is:(tax_type)=>tax_type=="1",
      then:Yup.string()
    .required("Please enter sgst rate")
    .matches(priceRegExp, "Invalid sgst rate"),
    }),
  price: Yup.string()
    .required("Please enter price")
    .matches(priceRegExp, "Invalid price value")
    .max(15, "Too Long! Atmost 15 letters."),
  quantity: Yup.string()
    .required("Please enter quantity")
    .matches(quantityRegExp, "Invalid quantity value")
    .max(5, "Too Long! Atmost 5 letters."),
  is_discount: Yup.number().required("Please select a type"),
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

const optionsType = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const taxoptionsType = [
  { value: "1", label: "GST" },
  { value: "0", label: "IGST" },
];

const CustomizeFormSchema = Yup.object().shape({
  custom_type: Yup.string().required("Please select a type"),
  custom_type_value: Yup.string().required("Please select a value"),
});
const CustomizeWarehouseFormSchema = Yup.object().shape({
  warehouse_id: Yup.string().required("Please select a warehouse"),
  quantity: Yup.string().required("Please enter quantity"),
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

      is_discount: "",
      discount_type: "",
      discount_value: "",
      discounted_product_price: "",

      sku_code: "",
      sku_name: "",
      batch: "",
      // customRadioGroup:"",
      currentPage: this.props.history.location.state ? this.props.history.location.state.pageIndex :1,

      custoimzations: [],

      customizeForms: [],
      customizeWarehouseForms: [],
      customizeFormsList: [
        {
          customTypeValuesList: [{ _id: "", name: "Select" }],
        },
      ],
      warhousesList: [{ _id: "", name: "Select" }],
      customTypesList: [{ _id: "", name: "Select" }],
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
      min_inventory:0
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
      this.getCustomTypeValuesList(customizeTypeId, i);

      this.addCustomizeForm(selectedId, customizeTypeId, customizeValueId);
    }
    var warehouseData = inventoryData.warehouseinventry || [];
    // Set auto filled warehouse customize forms by data
    if (warehouseData.length > 0) {
      for (var i = 0; i < warehouseData.length; i++) {
        var selectedId = warehouseData[i]._id;
        var warehouseTypeId = warehouseData[i].warehouse_id;
        var warhouseQuantity = warehouseData[i].quantity;

        this.addCustomizeWarehouseForm(
          selectedId,
          warehouseTypeId,
          warhouseQuantity
        );
      }
    }

    // Set an additional customize form empty
    this.addCustomizeForm();
    this.addCustomizeWarehouseForm();
    this.setState({
      inventoryIndex: inventoryIndex,
      inventoryId: inventoryData._id,
      productId: inventoryData.product_id,
      inventory_name: inventoryData.inventory_name,
      price: inventoryData.price,
      is_discount: inventoryData.is_discount,
    
      discount_type: inventoryData.discount_type,
      discount_value: inventoryData.discount_value,
      discounted_product_price: inventoryData.discounted_product_price,
      quantity: inventoryData.product_quantity,

      sku_code: inventoryData.sku_code,
      sku_name: inventoryData.sku_name,
      batch: inventoryData.batch,

     
      tax_type:inventoryData.tax_type?inventoryData.tax_type:1,
      hsn_code: inventoryData.hsn_code,
      inventory_product_code: inventoryData.inventory_product_code,
      tax_rate: inventoryData.tax_rate,
      taxable_amount: inventoryData.taxable_amount,
      gst_amount: inventoryData.gst_amount,
      cgst_rate: inventoryData.cgst_rate,
      cgst_amount: inventoryData.cgst_amount,
      sgst_rate: inventoryData.sgst_rate,
      sgst_amount: inventoryData.sgst_amount,
      igst_rate: inventoryData.igst_rate,
      igst_amount: inventoryData.igst_amount,
      min_inventory:inventoryData.min_inventory
    });
    this.getCustomTypesList();
    this.getWarehouseList();
  }
  // GET WAREHOUSE LIST
  getWarehouseList = async () => {
    this.state.isLoading = true;
    var warhousesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_WAREHOUSES;
    const res = await Http("GET", path);
if(res){
    if (res.status == 200) {
      var warehouseTypesArr = res.data.docs.map((item) => {
        return { _id: item._id, name: item.name };
      });

      this.setState({
        warhousesList: [...warhousesList, ...warehouseTypesArr],
      });
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }}else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };
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
  getCustomTypesList = async () => {
    this.state.isLoading = true;
    var customTypesList = [{ _id: "", name: "Select" }];

    let path = ApiRoutes.GET_PRODUCT_CUSTOM_TYPES;
    const res = await Http("GET", path);
if(res){
    if (res.status == 200) {
      var customTypesArr = res.data.docs.map((item) => {
        return { _id: item._id, name: item.name };
      });

      this.setState({
        customTypesList: [...customTypesList, ...customTypesArr],
      });
    } else {
      NotificationManager.error(res.message, "Error!", 3000);
    }}else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  getCustomTypeValuesList = async (type_id, index) => {
    this.state.isLoading = true;
    var customTypeValuesList = [{ _id: "", name: "Select" }];

    if (type_id) {
      let path = ApiRoutes.GET_PRODUCT_CUSTOM_SUBTYPES + "/" + type_id;
      const res = await Http("GET", path);
if(res){
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
      }}else {
        NotificationManager.error("Server Error", "Error!", 3000);
      }
    } else {
      this.setState({
        customTypeValuesList: customTypeValuesList,
      });
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
          custom_type_value: selectedValue,
        },
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
  onSubmitCustomizeForm = async (inputValues) => {
    this.addCustomizeForm();
  };
  onSubmitCustomizeWarehouseForm = async (inputValues) => {
    this.addCustomizeWarehouseForm();
  };
  onRemoveCustomizeForm = async (index) => {
    let customizeFormsClone = Object.assign([], this.state.customizeForms);

    if (customizeFormsClone.length > 2) {
      if (customizeFormsClone[index].id != "") {
        let path =
          ApiRoutes.DELETE_CUSTOMIZE_DATA + "/" + customizeFormsClone[index].id;
        const res = await Http("DELETE", path);
if(res){
        if (res.status == 200) {
          customizeFormsClone.splice(index, 1);
          this.setState({ customizeForms: customizeFormsClone });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }}else {
          NotificationManager.error("Server Error", "Error!", 3000);
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
  onRemoveWarehouseCustomizeForm = async (index) => {
    let customizeWarehouseFormsClone = Object.assign(
      [],
      this.state.customizeWarehouseForms
    );
    //console.log(customizeWarehouseFormsClone.length);
    if (customizeWarehouseFormsClone.length > 2) {
      if (customizeWarehouseFormsClone[index].id != "") {
        let path =
          ApiRoutes.DELETE_INVENTORY_DATA +
          "/" +
          this.state.inventoryId +
          "/" +
          customizeWarehouseFormsClone[index].id;
        const res = await Http("DELETE", path);
if(res){
        if (res.status == 200) {
          customizeWarehouseFormsClone.splice(index, 1);
          this.setState({
            customizeWarehouseForms: customizeWarehouseFormsClone,
          });
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }}else {
          NotificationManager.error("Server Error", "Error!", 3000);
        }
      } else {
        setTimeout(() => {
          customizeWarehouseFormsClone.splice(index, 1);
          this.setState({
            customizeWarehouseForms: customizeWarehouseFormsClone,
          });
        }, 500);
      }
    } else {
      let message =
        "Please add a new record to delete this. There should atleast one record for an warehouse inventory.";
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
    if(this.state.tax_type && this.state.tax_type==1){
      await this.setState({
        igst_rate:0,
        igst_amount:0,
      })
    }else{
      await this.setState({
        cgst_rate:0,
        cgst_amount:0,
        sgst_rate:0,
        sgst_amount:0,
      })
    }
    this.inventoryFormBtnRef.current.click();

    let customizeFormsClone = Object.assign([], this.state.customizeForms);
    customizeFormsClone.pop();
    let customizeWarehouseFormsClone = Object.assign(
      [],
      this.state.customizeWarehouseForms
    );
    

    setTimeout(async () => {
      customizeWarehouseFormsClone.pop();
      let formData = new FormData();
      formData.append("inventory_id", this.state.inventoryId);
      formData.append("product_id", this.state.productId);
      formData.append("inventory_name", this.state.inventory_name);
      formData.append("price", this.state.price);
      formData.append("is_discount", this.state.is_discount?this.state.is_discount:0);
      formData.append("mrp", this.state.mrp);
      formData.append("tax_type", this.state.tax_type?this.state.tax_type:0);
      formData.append("hsn_code", this.state.hsn_code);
      formData.append("inventory_product_code", this.state.inventory_product_code);
      formData.append("tax_rate", this.state.tax_rate);
      formData.append("taxable_amount", this.state.taxable_amount);
      formData.append("gst_amount", this.state.gst_amount);
      formData.append("cgst_rate", this.state.cgst_rate);
      formData.append("cgst_amount", this.state.cgst_amount);
      formData.append("sgst_rate", this.state.sgst_rate);
      formData.append("sgst_amount", this.state.sgst_amount);
      formData.append("igst_rate", this.state.igst_rate);
      formData.append("igst_amount", this.state.igst_amount);
      formData.append("min_inventory", this.state.min_inventory);
      
     

      formData.append("discount_type", this.state.discount_type?this.state.discount_type:2);
      formData.append("discount_value", this.state.discount_value?this.state.discount_value:0);
      formData.append("discounted_product_price", this.state.discounted_product_price);

      formData.append("sku_code", this.state.sku_code);
      formData.append("sku_name", this.state.sku_name);
      formData.append("batch", this.state.batch);

      formData.append("quantity", this.state.quantity);
      formData.append("customize", JSON.stringify(customizeFormsClone));
      formData.append(
        "warehouse_inventory",
        JSON.stringify(customizeWarehouseFormsClone)
      );
      if (this.validateFinalSubmit(this.state, customizeFormsClone)) {

        let path = ApiRoutes.UPDATE_INVENTORY_DETAILS;
        const res = await Http("POST", path, formData);
if(res){
        if (res.status == 200) {
          NotificationManager.success(res.message, "Success!", 3000);
          //this.props.history.push("/app/products");
          this.props.history.push({pathname:`/app/products`, state:{pageIndex:this.state.currentPage}})
          // window.location.reload();
        } else {
          NotificationManager.error(res.message, "Error!", 3000);
        }}else {
          NotificationManager.error("Server Error", "Error!", 3000);
        }
      }
    }, 2000)


  };

  onChangeProductValue = (value, setFieldValue) => {

    var price = this.state.price;
    var tax_type = this.state.tax_type;

    var tax_rate = this.state.tax_rate||0;
    var {cgst_rate,sgst_rate,igst_rate,old_cgst_rate=cgst_rate,old_sgst_rate=sgst_rate,old_igst_rate=igst_rate}= this.state;
    var cgst_rate  = this.state.cgst_rate||0;
    var sgst_rate = this.state.sgst_rate||0;
    var igst_rate  = this.state.igst_rate||0;
    
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

    
    

    console.log("discount_type",discount_type)
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
    console.log(discountedPrice)

    
    taxable_amount   = tax_rate!=0 ? (discountedPrice / tax_rate):0;
    taxable_amount = taxable_amount.toFixed(2);
    gst_amount = tax_rate!=0 ? discountedPrice - taxable_amount:0;
    gst_amount = gst_amount.toFixed(2);
    if(tax_type==1){
      old_igst_rate = 0;
      cgst_amount =  (taxable_amount * cgst_rate);
      cgst_amount = cgst_amount.toFixed(2);
      sgst_amount =  (taxable_amount * sgst_rate);
      sgst_amount = sgst_amount.toFixed(2);
    }else{
      old_cgst_rate = 0;
      old_sgst_rate = 0;
      igst_amount =  (taxable_amount * igst_rate);
      igst_amount = igst_amount.toFixed(2);
    }
    this.setState({
      taxable_amount:taxable_amount,
      gst_amount:gst_amount,
      cgst_amount:cgst_amount,
      sgst_amount:sgst_amount,
      igst_amount:igst_amount,
      // cgst_rate:old_cgst_rate,
      // sgst_rate:old_sgst_rate,
      // igst_rate:old_igst_rate

    })
    setFieldValue("discounted_product_price", discountedPrice)
    setFieldValue("taxable_amount", taxable_amount)
    setFieldValue("gst_amount", gst_amount);
    setFieldValue("cgst_amount", cgst_amount)
    setFieldValue("sgst_amount", sgst_amount)
    setFieldValue("igst_amount", igst_amount)
    // setFieldValue("igst_rate", old_igst_rate)
    // setFieldValue("cgst_rate", old_cgst_rate)
    // setFieldValue("sgst_rate", old_sgst_rate)
   // setFieldValue("discounted_product_price", discountedPrice)
  }

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
                  <h6 className="mb-4">Product Inventory Details</h6>

                  <Formik
                    enableReinitialize
                    initialValues={{
                      inventory_name: this.state.inventory_name,
                      price: this.state.price,
                      quantity: this.state.quantity,
                      is_discount: this.state.is_discount,
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
                      min_inventory:this.state.min_inventory
                    }}
                    validationSchema={InventoryFormSchema}
                    onSubmit={this.handleInventorySubmit}
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
                        onChange={this.handleInventoryFormChange}
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
                                    this.setState({ discount_type: event.target.value }, () => { this.onChangeProductValue(this.state.discount_value,setFieldValue); });

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
                                    this.setState({ discount_value: event.target.value }, () => { this.onChangeProductValue(this.state.discount_value,setFieldValue); });

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
                                this.setState({ tax_type: value },()=>this.onChangeProductValue(value,setFieldValue));
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
                       {values.tax_type == "0" ? (
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
                          innerRef={this.inventoryFormBtnRef}
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
