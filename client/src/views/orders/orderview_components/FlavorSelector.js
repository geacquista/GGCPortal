import React, { useState } from 'react';
import "../../../assets/style/dropdown.css"

function FlavorSelector({onChange, onRemove}) {
  const [flavor, setFlavor] = useState('chocolate');
  const [quantity, setQuantity] = useState(1);
  //get these from props.products
  const [flavorOptions, setFlavorOptions] = useState([
    'Plain',
    'Fiery Fig',
    'Herb Garlic',
  ]);

  const handleFlavorChange = (event) => {
    setFlavor(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleRemoveClick = () => {
    onRemove();
  };


  return (
           
      <div className="CenterAlignFlexRow">
        <div className='quantity-selector'>
            <button onClick={handleDecreaseQuantity}>-</button>
            <span style={{padding:"4px"}}>{quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
        </div>
        <div className=' quantity-selector'>
            <label htmlFor="flavor-dropdown"><h4 style={{fontWeight: 'bold'}}>Flavor:</h4></label>
            <select className="dropdown" value={flavor} onChange={handleFlavorChange}>
                {flavorOptions.map((flavorOption) => (
                <option key={flavorOption} value={flavorOption}>
                    {flavorOption}
                </option>
                ))}
            </select>
        </div>
        <button onClick={handleRemoveClick}>Remove</button>
      </div>
      
  );
}

export default FlavorSelector;
