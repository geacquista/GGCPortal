import React, {Component} from "react";
import { connect } from "react-redux";

import { findOrderLineByOrderID } from "../../../store/orderline_slice";
import { findBySKU, retrieveProducts } from "../../../store/product_slice";

class ProductInfo extends Component {
	constructor(props) {
	  super(props);

      this.findOrderLinesByID = this.findOrderLinesByID.bind(this);
      this.setProductsOrdered = this.setProductsOrdered.bind(this);

	  this.state = {
        productsOrdered: [
            {
                lineOrderID: "",
                lineProductID: "",
                qtyOrdered: 0,
                // name: "",
                // description: ""
            }, 
        ],
            numberOfLogs: 0,
            numberOfFlavors: 0,
        }
	 };
	
	// This gets the users when the component loads
	componentDidMount() {
        this.props.retrieveProducts();
		this.findOrderLinesByID(this.props.order.orderID);
	}

	findOrderLinesByID(id) {
		this.props
			.findOrderLineByOrderID({ id })
			.then((data) => {
				console.log(data);

				let i = 0;
				let logs = 0;
                let flavors = data.payload.length;
				while (i < flavors) {
                    const newProduct = {
                        lineOrderID: data.payload[i].lineOrderID,
                        lineProductID: data.payload[i].lineProductID,
                        qtyOrdered: data.payload[i].qtyOrdered,
                    }

                    const list = this.state.productsOrdered.slice()
                    this.setProductsOrdered([...list, newProduct])		

                    logs+= data.payload[i].qtyOrdered;
					console.log(data.payload[i]);
					i++;

				}

				this.setState({
					numberOfLogs: logs,
                    numberOfFlavors: flavors
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

    setProductsOrdered(products) {
		this.setState({
			productsOrdered: products
		});
	}
	
	render() {
		const {orderline, products} = this.props;

		const {numberOfFlavors, numberOfLogs, productsOrdered} = this.state;

        return (
            <div id='OrderView_Products_Details'>
            <h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
            <div className='Row'>
                <table>
                    <tr>
                        <th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
                        <th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
                        <th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
                    </tr>
                    {productsOrdered.map((product) => (
                        <tr>
                            <td><h4>{product.lineProductID}</h4></td>
                            <td><h4>{product.qtyOrdered}</h4></td>
                        </tr>					
                    ))}
                </table>
                <table>
                    <tr>
                        <th><h4 style={{fontWeight: 'bold'}}>At a Glance:</h4></th>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Total Number of Logs:</h4></td>
                        <td><h4>{numberOfLogs}</h4></td>
                    </tr>
                    <tr>
                        <td><h4 style={{fontWeight: 'bold'}}>Total Number of Flavors:</h4></td>
                        <td><h4>{numberOfFlavors}</h4></td>
                    </tr>
                </table>
            </div>
            </div> 
        );	
	}
  }
  

  // Mapping only the parts of the redux store that we want to work with on this component
  const mapStateToProps = (state) => {	
	return {
        products: state.products,
        orderline: state.orderline,
    };
  };
  
export default connect(mapStateToProps, { findBySKU, retrieveProducts, findOrderLineByOrderID })(ProductInfo);