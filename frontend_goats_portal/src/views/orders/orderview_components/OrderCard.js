import React from "react";
import { format } from "date-fns";

// Cards are part of the list
export const OrderCard = ({ order, customer, color, orderCardOnClick }) => {
	var numberOfLogs = 0;
	// order.productsOrdered.forEach(product => numberOfLogs+= product.quantity)
	var firstName = '', lastName = '';
	if (customer !== undefined) {
		console.log(customer);
		console.log(customer.firstName + ', ' + customer.lastName);
		firstName += customer.firstName;
		lastName += customer.lastName;
		console.log(firstName);
	}
	var datePlaced = new Date(order.datePlaced);

	// var firstName = customer.firstName;
	// var lastName = customer.lastName;
	// console.log(order)
	return (
		<div className='OrderCard' onClick={orderCardOnClick(order, customer)}>
			<div className='OrderCardHeader' style={{ backgroundColor: color }}>
				<h4 style={{ fontWeight: 'bold' }}>{lastName}, {firstName}</h4>
				<h4 style={{float: 'right'}}>Placed: {format(datePlaced, "MM-dd-yy")}</h4>
			</div>
			<div className='OrderCardContent'>
				<h4>Reference: {order.referenceNumber}</h4>
				<h4>Invoice: {(order.invoiceNumber === undefined) ? 'NA' : order.invoiceNumber}</h4>
				<h4>Logs Ordered: {numberOfLogs}</h4>
			</div>
		</div>
	);
};
