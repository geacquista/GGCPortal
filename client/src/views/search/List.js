import React from 'react'
import OrderCard from '../orders/orderview_components/OrderCard';
    
/*
    This component is the list that appears upon input from the search.js bar
*/
    function List(props) {
        console.log(props)
        //create a new array by filtering the original array
        const filteredData = props.orders.filter((el) => {
            //if no input the return the original
            if (props.input === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.referenceNumber.includes(props.input) 
            }
        })

        return (
            <div>
                {filteredData.map((order) => (
                    <li><OrderCard key={order.orderID} order={order} color='#90E0C9'   /></li>                    
                ))}
            </div>
        );
    }
    
    export default List