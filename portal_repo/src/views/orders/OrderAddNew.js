import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/order_slice";

const useOrderForm = (order) => {

  const dispatch = useDispatch();
	const [inputs, setInputs] = useState(order)
	/* const [newOrder, setOrder] = useState(order) */

  const ordersAmount = useSelector((state) => state.orders.length);


	const handleSubmit = (event) => {
		if(event) {
			event.preventDefault()
			dispatch(
        addOrder({
          id: ordersAmount + 1,
          referenceNumber: order.referenceNumber,
          invoiceNumber: order.invoiceNumber,
          status: order.status,
          datePlaced: '',
          revenue: 0,
          isSelfOrder: true,
          isGift: false,
          giftFor: '',
          giftMessage: '',
          shipmentTrackingNumber: '',
          customer: {
            id: {},
            email: 'gr-ggcexec@wpi.edu',
            firstName: 'Gompei\'s',
            lastName: 'Goat-Cheese',
            phoneNumber: '',
        
          },
          productsOrdered: [{
            id: '1',
            quantity: 3,
            product: {
              id: 'jPL6',
              name: 'plain',
              productDescription: 'A six oz log of plain goat cheese',
            }	
          }],
          shippingAddress: {
            id: '1',
            firstName: 'Gompei\'s',
            lastName: 'Goat-Cheese',
            streetAddress: '100 Institute Road\nMailbox #',
            city: 'Worcester',
            state: 'MA',
            zipCode: '01609',
          },
          invoice: {
            id: '1',
            invoiceNumber: '',
            expense: 0,
            isPaid: false,
          },
        })
      );
		}
	}
	const handleInputChange = (event) => {
		event.persist()
		setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}))
	}
	return {
		handleSubmit,
		handleInputChange,
		inputs
	};
}

export const OrderAddNew = ({orderFunction}) => {

  //ON SAVE: update the view to readonly (so it should be able to close)
	// orderFunction = addOrder

  // Creating an empty order
  const order = {
    id: {},
    referenceNumber: '',
    invoiceNumber: '',
    status: 'PLACED',
    datePlaced: '',
    revenue: 0,
    isSelfOrder: true,
    isGift: false,
    giftFor: '',
    giftMessage: '',
    shipmentTrackingNumber: '',
    customer: {
      id: {},
      email: 'gr-ggcexec@wpi.edu',
      firstName: 'Gompei\'s',
      lastName: 'Goat-Cheese',
      phoneNumber: '',
  
    },
    productsOrdered: [{
      id: '1',
      quantity: 3,
      product: {
        id: 'jPL6',
        name: 'plain',
        productDescription: 'A six oz log of plain goat cheese',
      }	
    }],
    shippingAddress: {
      id: '1',
      firstName: 'Gompei\'s',
      lastName: 'Goat-Cheese',
      streetAddress: '100 Institute Road\nMailbox #',
      city: 'Worcester',
      state: 'MA',
      zipCode: '01609',
    },
    invoice: {
      id: '1',
      invoiceNumber: '',
      expense: 0,
      isPaid: false,
    },
  };
	const {inputs, handleInputChange, handleSubmit} = useOrderForm(order)
  
	let recipient
	if(order.isGift){
		recipient = order.giftFor

	} else{
		recipient = order.customer.firstName + ' ' + order.customer.lastName 
	}

	var numberOfFlavors = 0
	order.productsOrdered.forEach(product => numberOfFlavors++)

	var numberOfLogs = 0
	order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)

	return (
		<form onSubmit={handleSubmit}>
			<div id='OrderView'>
				<div id='OrderView_Header'>
          {/**on submit i want to dispatch the addOrder action and  */}
					<button onClick={handleSubmit} type="submit">Save</button>
					<button>Cancel</button>
				</div>
				<div className='Row'>
					<div className='Column'>
						<div id='OrderView_General_Details'>
							<table>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Reference #</h4></td>
									<td><input type="text" name="referenceNumber" onChange={handleInputChange} value={inputs.referenceNumber} defaultValue={order.referenceNumber} required/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Invoice #</h4></td>
									<td><input type="text" name="invoiceNumber" onChange={handleInputChange} value={inputs.invoiceNumber} defaultValue={order.invoiceNumber}/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Date Placed</h4></td>
                  <td><input type="date" name="datePlaced" onChange={handleInputChange} value={inputs.datePlaced} defaultValue={order.datePlaced} required/></td>
                  <td><h4>{order.datePlaced}</h4></td>
								</tr>
							</table>
						</div>

						<div id='OrderView_Customer_Details'>
							<table>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>First Name<br></br>Last Name</h4></td>
									<td>
										<input type="text" name="customer.firstName" onChange={handleInputChange} value={inputs.customer.firstName} defaultValue={order.customer.firstName} required/><br></br>
										<input type="text" name="lastName" onChange={handleInputChange} value={inputs.customer.lastName} defaultValue={order.customer.lastName} required/>
									</td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Email</h4></td>
									<td><input type="email" name="email" onChange={handleInputChange} value={inputs.customer.email} defaultValue={order.customer.email} required/></td>
								</tr>
								<tr>
									<td><h4 style={{fontWeight: 'bold'}}>Phone</h4></td>
									<td><input type="tel" name="phoneNumber"onChange={handleInputChange}  value={inputs.customer.phoneNumber} defaultValue={order.customer.phoneNumber}/></td>
								</tr>
							</table>
						</div>
					</div>

					<div id='OrderView_Shipping_Details'>
						<table>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Recipient</h4></td>
								{order.isGift && <td><input type="text" name="giftFor" onChange={handleInputChange} value={inputs.giftFor} defaultValue={recipient} required/></td>}
								{!order.isGift && <td><h4>{recipient}</h4></td>}
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Street Address<br></br>City<br></br>State<br></br>Zipcode</h4></td>
								<td>
									<input type="text" name="streetAddress" onChange={handleInputChange} value={inputs.shippingAddress.streetAddress} defaultValue={order.shippingAddress.streetAddress} required/><br></br>
									<input type="text" name="city" onChange={handleInputChange} value={inputs.shippingAddress.city} defaultValue={order.shippingAddress.city} required/><br></br>
									<input type="text" name="state" onChange={handleInputChange} value={inputs.shippingAddress.state} defaultValue={order.shippingAddress.state} required/><br></br>
									<input type="text" name="zipcode" onChange={handleInputChange} value={inputs.shippingAddress.zipCode} defaultValue={order.shippingAddress.zipCode} required/>
								</td>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
								<input type="text" name="shipmentTrackingNumber" onChange={handleInputChange} value={inputs.shipmentTrackingNumber} defaultValue={order.shipmentTrackingNumber}/>
							</tr>
							<tr>
								<td><h4 style={{fontWeight: 'bold'}}>Is Gift?</h4></td>
								{order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift" checked/></td>}
								{!order.isGift && <td><input type="checkbox" onChange={handleInputChange} value={inputs.isGift} name="isGift"/></td>}
							</tr>
							<tr>
								{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
								{order.isGift && order.giftMessage !== '' && <td><input type="text" name="giftMessage" onChange={handleInputChange} value={inputs.giftMessage} defaultValue={order.giftMessage}/></td>}
							</tr>
						</table>
					</div>
				</div>

				<div id='OrderView_Products_Details'>
					<h4 style={{fontWeight: 'bold'}}>Flavor Information</h4>
					<div className='Row'>
						<table>
							<tr>
								<th><h4 style={{fontWeight: 'bold'}}>Name</h4></th>
								<th><h4 style={{fontWeight: 'bold'}}>SKU</h4></th>
								<th><h4 style={{fontWeight: 'bold'}}>Quantity</h4></th>
							</tr>
							{order.productsOrdered.map((product) => (
								<tr>
									<td><h4>{product.product.name}</h4></td>
									<td><h4>{product.product.id}</h4></td>
									<td><h4>{product.quantity}</h4></td>
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
			</div>
		</form>
	)
}

export default OrderAddNew;
