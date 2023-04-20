import React, { useState } from 'react';
import "../../../assets/style/dropdown.css"

import { createStringArray } from '../../../assets/util/functions'


function FlavorSelector({flavor, quantity, onChange, onRemove,onAddQty, onSubQty, products}) {
  

  // const [quantity, setQuantity] = useState(1);


  // const handleFlavorChange = (event) => {
  //   setFlavor(event.target.value);
  // };

  // const handleQuantityChange = (event) => {
  //   setQuantity(event.target.value);
  // };

  // const handleIncreaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleDecreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const handleRemoveClick = () => {
  //   onRemove();
  // };


  return (
           
    <div className="CenterAlignFlexRow">
    <div className='quantity-selector'>
        <button onClick={() => onSubQty()}>-</button>
        <span style={{padding:"4px"}}>{quantity}</span>
        <button onClick={()=> onAddQty()}>+</button>
    </div>
    <div className=' quantity-selector'>
        <label htmlFor="flavor-dropdown"><h4 style={{fontWeight: 'bold'}}>Flavor:</h4></label>
        <select className="dropdown" value={flavor} onChange={(e) => onChange(quantity, e.target.value, e.target.options[e.target.selectedIndex].getAttribute('name'))}>
            {products.map((product) => (
            <option key={product.sku} value={product.sku} name={product.name}>
                {product.name}
            </option>
            ))}
        </select>
    </div>
    <button onClick={onRemove}>Remove</button>
  </div>
      
  );
}

export default FlavorSelector;
