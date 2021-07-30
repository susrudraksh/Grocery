import React, { Component, Fragment } from "react";
import ListPageHeading from "../../../containers/pages/ListPageHeading";
import { NotificationManager } from "../../../components/common/react-notifications";
import { Row, Card, CardBody, TabContent, TabPane, Table, Badge, InputGroup, InputGroupAddon, Button } from "reactstrap";
import Swal from "sweetalert2";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import ProductsList from "../../../data/products";
import moment from "moment";
import Http from "../../../helpers/Http";
import ApiRoutes from "../../../helpers/ApiRoutes";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { servicePath } from "../../../constants/defaultValues";

const swalWithBootstrapButtonsStatus = Swal.mixin({
  customClass: {
    confirmButton: "btn-pill mx-1 btn btn-success",
    cancelButton: "btn-pill mx-1 btn btn-neutral-secondary",
  },
  buttonsStyling: false,
});

const newstatus = ["", "", "Returned", "Reject", "Cancelled"];
const newstatus1 = ["", "Assigned", "Completed", "Rejected", "Cancelled", "Cancelled/Rejected"];
class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      orderId: props.match.params.itemId,
      items: ProductsList,
      orderData: "",
      userData: "",
      driverData: "",
      warehouseData: "",
      transitData: "",
      packedData: "",
      deliveredData: "",
      categoryData: [],
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }

  componentDidMount() {
    this.getOrderDetail();
  }

  getOrderDetail = async () => {
    this.state.isLoading = true;

    let path = ApiRoutes.GET_ORDER_DETAIL + "/" + this.state.orderId;

    const res = await Http("GET", path);
    if (res) {
      if (res.status == 200) {
        this.setState({
          categoryData: res.data.category,
          orderData: res.data,
          userData: res.data.userData,
          driverData: res.data.driver,
          warehouseData: res.data.warehouseData,
          transitData: res.data.tracking_status.In_Transit,
          packedData: res.data.tracking_status.Packed,
          deliveredData: res.data.tracking_status.Delivered,
        });
      } else {
        NotificationManager.error(res.message, "Error!", 3000);
      }
    } else {
      NotificationManager.error("Server Error", "Error!", 3000);
    }
  };

  saveAsPDF = async () => {
    let path = ApiRoutes.GET_PDF;
    console.log(this.state.orderData, "orderData");
    let formData = new FormData();
    formData.append("reqData", JSON.stringify(this.state.orderData));
    const res = await Http("POST", path, formData);
    if (res) {
      var link = document.createElement("a");
      link.href = res.data.path;
      link.target = "_blank";
      link.download = "file.pdf";
      link.dispatchEvent(new MouseEvent("click"));
    }
    // html2canvas(document.getElementById("capture")).then(canvas => {
    //   document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF("portrait", "mm", "a4");
    //   pdf.addImage(imgData, 'PNG', 0, 0);
    //   pdf.save("download.pdf");
    // });
    // const input = document.getElementById('capture');

    // html2canvas(input)
    //     .then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'px', 'a4');
    //         var width = pdf.internal.pageSize.getWidth();
    //         var height = pdf.internal.pageSize.getHeight();

    //         pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //         pdf.save("test.pdf");
    //     });
  };

  // Methods for Actions
  onChangeItemStatus = async (itemId, status, category_name, product_id) => {
    swalWithBootstrapButtonsStatus
      .fire({
        title: "<h5><b>Are you sure?</b></h5>",
        text: "You want change status !",
        type: "success",
        width: 315,
        heightAuto: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: '<span class="btn-wrapper--label">Yes</span>',
        cancelButtonText: '<span class="btn-wrapper--label">Cancel</span>',
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.value) {
          if (status == "accept") {
            var newStatus = 2;
          } else if (status == "reject") {
            var newStatus = 3;
          } else {
            var newStatus = 0;
          }
          var orderId = this.state.orderData._id;
          var userId = this.state.userData._id;
          let formData = new FormData();
          formData.append("status", newStatus);
          let path;

          if (category_name == 1) {
            path = ApiRoutes.UPDATE_GROCERY_ORDER_STATUS + "/" + orderId + "/" + newStatus + "/" + itemId + "/" + userId;
          } else {
            path = ApiRoutes.UPDATE_NORMAL_ORDER_STATUS + "/" + orderId + "/" + newStatus + "/" + product_id + "/" + userId;
          }

          const res = await Http("PUT", path, formData);
          if (res) {
            if (res.status == 200) {
              this.getOrderDetail();

              NotificationManager.success(res.message, "Success!", 3000);
            } else {
              NotificationManager.error(res.message, "Error!", 3000);
            }
          } else {
            NotificationManager.error("Server Error", "Error!", 3000);
          }
        }
      });
  };

  render() {
    const { match, item } = this.props;

    return (
      <Fragment>
        <Button onClick={this.saveAsPDF}>Save as PDF</Button>
        <div className="disable-text-selection">
          <ListPageHeading heading="menu.order-detail" match={match} />

          <h3>Order ID #{this.state.orderData.order_id} </h3>

          <Row>
            <Colxx xxs="12" id="capture">
              <Row>
                <Colxx xxs="12" xl="12" className="col-left">
                  <Card className="mb-4">
                    <TabContent activeTab={this.state.activeFirstTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Colxx xxs="12" sm="12">
                            <CardBody>
                              <h5 className="mb-4 font-weight-bold">Order Details</h5>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Order Date : {moment(this.state.orderData.order_date).format("LLLL")}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  {this.state.orderData.order_status != 0 ? newstatus1[this.state.orderData.order_status] : "Pending"}
                                </Colxx>
                              </Row>

                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Payment Mode: {this.state.orderData.payment_mode}</p>
                                </Colxx>
                              </Row>
                              <hr></hr>
                              <h5 className="mb-4 font-weight-bold">Warehouse Details</h5>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Warehouse Id: {this.state.warehouseData.length > 0 && this.state.warehouseData[0]._id}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>Warehouse Name: {this.state.warehouseData.length > 0 && this.state.warehouseData[0].name}</p>
                                </Colxx>
                              </Row>
                              <hr />

                              <h5 className="mb-4 font-weight-bold">Customer Details</h5>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Customer Id: {this.state.userData.register_id}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>
                                    Customer Name:{" "}
                                    {this.state.orderData && this.state.orderData.customer_name && this.state.orderData.customer_name != ""
                                      ? this.state.orderData.customer_name
                                      : this.state.userData.username}
                                  </p>
                                </Colxx>
                              </Row>

                              <p>
                                Customer Phone number:{" "}
                                {this.state.orderData && this.state.orderData.customer_phone && this.state.orderData.customer_phone != ""
                                  ? this.state.orderData.customer_phone
                                  : this.state.userData.phone}
                              </p>
                              <hr />
                              <h5 className="mb-4 font-weight-bold">Driver Details</h5>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Driver Id: {this.state.driverData.length > 0 && this.state.driverData[0].register_id}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>Driver Name: {this.state.driverData.length > 0 && this.state.driverData[0].username}</p>
                                </Colxx>
                              </Row>

                              <p>Driver Phone number: {this.state.driverData.length > 0 && this.state.driverData[0].phone}</p>
                              <hr />
                              <h5 className="font-weight-bold">Order Status</h5>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Order Picked up: {this.state.packedData && this.state.packedData.status == 0 ? "No" : "Yes"}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>Picked Up Date: {this.state.packedData && this.state.packedData.time && moment(this.state.packedData.time).format("LLLL")}</p>
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Order In Transit: {this.state.transitData && this.state.transitData.status == 0 ? "No" : "Yes"}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>In Transit Date: {this.state.transitData && this.state.transitData.time && moment(this.state.transitData.time).format("LLLL")}</p>
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx xxs="6" sm="6">
                                  <p>Delivered: {this.state.deliveredData && this.state.deliveredData.status == 0 ? "No" : "Yes"}</p>
                                </Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>Delivered Date:{this.state.deliveredData && this.state.deliveredData.time && moment(this.state.deliveredData.time).format("LLLL")}</p>
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx xxs="6" sm="6"></Colxx>
                                <Colxx xxs="6" sm="6">
                                  <p>Estimated Delivery Date:{this.state.orderData.expected_end_date && moment(this.state.orderData.expected_end_date).format("LLLL")}</p>
                                </Colxx>
                              </Row>
                              <hr />
                              <h4 className="font-weight-bold">Item Details</h4>

                              {this.state.categoryData.map((item, index) => {
                                return (
                                  <>
                                    <Row>
                                      <Colxx xxs="8" sm="8">
                                        <p>Category Name: {item.name}</p>
                                      </Colxx>

                                      <Colxx xxs="4" sm="4">
                                        {
                                          item && item.all_return == 1 && item.products[0].order_status == 1 ? (
                                            <>
                                              <Button outline color="success" size="sm" className="mb-2" title="Accept" onClick={(e) => this.onChangeItemStatus(item._id, "accept", item.all_return)}>
                                                Accept Return Request
                                              </Button>{" "}
                                              <Button outline color="danger" size="sm" className="mb-2" title="Reject" onClick={(e) => this.onChangeItemStatus(item._id, "reject", item.all_return)}>
                                                Reject Return Request
                                              </Button>
                                            </>
                                          ) : (
                                            item && item.all_return == 1 && newstatus[item.products[0].order_status]
                                          )
                                          // (<Badge
                                          //   color={
                                          //     (item.all_return == 1)
                                          //       ? "outline-success"
                                          //       : "outline-danger"
                                          //   }
                                          //   pill
                                          // >
                                          //   {(item.all_return == 1) ? (
                                          //     <IntlMessages id="label.accept" />
                                          //   ) : (
                                          //       <IntlMessages id="label.reject" />
                                          //     )}
                                          // </Badge>)
                                        }{" "}
                                        {/* <Button
                                          outline
                                          color="secondary"
                                          size="sm"
                                          className="mb-2"
                                          title="Return Item"
                                        >
                                          <div>RETURN</div>
                                        </Button> */}
                                      </Colxx>
                                    </Row>
                                    {item && item.all_return == 1 && item.products && item.products.length > 0 && <p>Reason: {item.products[0].reason}</p>}
                                    <Row>
                                      <Colxx xxs="12">
                                        <Card className="mb-4">
                                          <CardBody>
                                            <Table hover>
                                              <thead>
                                                <tr>
                                                  <th>Item Image</th>
                                                  <th>Name</th>
                                                  <th>Base Price</th>
                                                  <th>Discounted Price</th>
                                                  <th>Quantity</th>
                                                  <th>Total Cost</th>

                                                  {item && item.all_return == 0 ? (
                                                    <>
                                                      <th>Reason</th>
                                                      <th>Return Request</th>
                                                    </>
                                                  ) : (
                                                    ""
                                                  )}
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {item.products.map((product, index) => {
                                                  return (
                                                    <tr key={index}>
                                                      <td>
                                                        <img
                                                          alt={product.name}
                                                          src={product.images ? product.images[0].product_image_thumb_url : ""}
                                                          className="img-thumbnail border-0 list-thumbnail align-self-center xsmall"
                                                        />{" "}
                                                      </td>
                                                      <td>{product.name}</td>

                                                      <td>{product.price}</td>
                                                      <td>{product.is_discount == 1 ? product.offer_price : ""}</td>
                                                      <td>{product.quantity}</td>
                                                      {product.is_discount == 1 ? (
                                                        <td>{product.offer_price ? product.offer_price * product.quantity : product.price * product.quantity} </td>
                                                      ) : (
                                                        <td>{product.price * product.quantity}</td>
                                                      )}
                                                      {product && item.all_return == 0 && <td>{product.reason}</td>}
                                                      <td>
                                                        {product && item.all_return == 0 && product.order_status == 1 ? (
                                                          <>
                                                            <Button
                                                              outline
                                                              color="success"
                                                              size="sm"
                                                              className="mb-2"
                                                              title="Accept"
                                                              onClick={(e) => this.onChangeItemStatus(item._id, "accept", item.all_return, product._id)}
                                                            >
                                                              Accept
                                                            </Button>{" "}
                                                            <Button
                                                              outline
                                                              color="danger"
                                                              size="sm"
                                                              className="mb-2"
                                                              title="Reject"
                                                              onClick={(e) => this.onChangeItemStatus(item._id, "reject", item.all_return, product._id)}
                                                            >
                                                              Reject
                                                            </Button>
                                                          </>
                                                        ) : (
                                                          item && item.all_return == 0 && newstatus[product.order_status]
                                                        )}
                                                        {/* {product && (product.order_status == 4) ?
                                                          (<Badge
                                                            color="outline-danger"
                                                            pill
                                                          >
                                                            <IntlMessages id="label.cancle" />
                                                          </Badge>) : ""} */}
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                              </tbody>
                                            </Table>
                                          </CardBody>
                                        </Card>
                                      </Colxx>
                                    </Row>
                                  </>
                                );
                              })}

                              <Table borderless className="d-flex justify-content-end">
                                <tbody>
                                  <tr>
                                    <td className="font-weight-bold">Delivery Fees :</td>
                                    <td className="text-right">Rs {this.state.orderData && this.state.orderData.delivery_fee}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">Vat amount :</td>
                                    <td className="text-right">Rs {this.state.orderData && this.state.orderData.vat_amount}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">Promo code & Discount :</td>
                                    <td className="text-right">Rs {this.state.orderData && this.state.orderData.discount}</td>
                                  </tr>
                                  <tr>
                                    <td className="font-weight-bold">Subtotal :</td>
                                    <td className="text-right">Rs {this.state.orderData && this.state.orderData.net_amount}</td>
                                  </tr>
                                  {/* <tr>
                                    <td className="font-weight-bold">
                                      Availed Promo Code :
                                      </td>
                                    <td className="text-right"></td>
                                  </tr> */}

                                  <tr>
                                    <td className="font-weight-bold">Total Pay :</td>
                                    <td className="text-right">Rs {this.state.orderData && this.state.orderData.net_amount}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Colxx sm="12">
                            <CardBody>
                              <InputGroup className="comment-contaiener">
                                <InputGroupAddon addonType="append">
                                  <Button color="primary">
                                    <span className="d-inline-block"></span> <i className="simple-icon-arrow-right ml-2"></i>
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                      <TabPane tabId="3">
                        <Row>
                          <Colxx sm="12">
                            <CardBody></CardBody>
                          </Colxx>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Card>
                </Colxx>
              </Row>
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}
export default OrderDetails;
