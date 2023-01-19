import React from 'react'
import { retrieveOrders } from '../../store/order_slice'

    
/*
    This component is the list that appears upon input from the search.js bar
*/
    function List(props) {

        var orders = retrieveOrders;
        //create a new array by filtering the original array
        const filteredData = orders.filter((el) => {
            //if no input the return the original
            if (props.input === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.referenceNumber.includes(props.input) 
                || el.customer.firstName.toLowerCase().includes(props.input)
            }
        })

        return (
            <div>
                {filteredData.map((order) => (
                    <li key={order.id}>{order.customer.firstName + " " + order.customer.lastName + ": "+ order.referenceNumber}</li>
                ))}
            </div>
        );
    }
    
    export default List