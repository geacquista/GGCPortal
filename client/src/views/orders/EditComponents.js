import React, { useState } from 'react'
import add_icon from '../../assets/img/plus_black.svg'

import FlavorSelector from './orderview_components/FlavorSelector';
import { createStringArray } from '../../assets/util/functions'
import {stateOptions} from '../../assets/util/dropdown.constants'

// ------------------------------ EDIT --------------------------------- //

export const GeneralInfoEdit = ({referenceNumber, datePlaced, trackingNumber, orderStatus, handleChange}) => {

	return(
            <div id='NewOrderGeneral' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
                <div className="OrderViewHeaderNew_Inner">
					
                  <label htmlFor="ref"><h4 style={{fontWeight: 'bold'}}>Reference #<span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="ref"
                    required
                    defaultValue={referenceNumber}
                    onChange={handleChange}
                    name="ref"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="date"><h4 style={{fontWeight: 'bold'}}>Date Placed<span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="date"
                    defaultValue={datePlaced || ''}
                    onChange={handleChange}
                    name="date"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="tracking"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="tracking"
                    defaultValue={trackingNumber || ''}
                    onChange={handleChange}
                    name="trackingNumber"
                  />
                </div>

            </div>
        
	)
}

export const CustomerInfoEdit = ({firstName, lastName, email, phoneNumber, handleChange}) => {

	return (
		<div id='NewOrderCustomer' className='GenericBackgroundAdd'>
		   <label className='BoxDescriptionTitle'>Customer Information</label>
			
			
			<div className='CustomerNameView_Layout'>
				<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="first"><h4 style={{fontWeight: 'bold', paddingRight:'1vw'}}>First <span className="required">	*</span>	</h4></label>
					<input
						type="text"
						className="inputField"
						id="first"
						required
						defaultValue={firstName || ''}
						onChange={handleChange}
						name="first"
						style={{marginRight:'2vw'}}
					/>
				</div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="last"><h4 style={{fontWeight: 'bold'}}>Last <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="last"
                    required
                    defaultValue={lastName || ''}
                    onChange={handleChange}
                    name="last"
                  />
                </div>
			</div>

			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="email"><h4 style={{fontWeight: 'bold'}}>Email <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="email"
                    required
                    defaultValue={email || ''}
                    onChange={ handleChange}
                    name="email"
					style={{width:"85%"}}
                  />
			</div>
			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="phone"><h4 style={{fontWeight: 'bold'}}>Phone <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="phone"
                    required
                    defaultValue={phoneNumber || ''}
                    onChange={handleChange}
                    name="phone"
					style={{width:"85%"}}
                  />
			</div>
		</div>
	);	
}

export const ShippingInfoEdit = ({streetAddress, city, state, zip, handleChange}) => {
	return (
		<div id='NewOrderShipping' className='GenericBackgroundAdd'>
			<label className='BoxDescriptionTitle' >Shipping Information</label>
			<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="streetAddressOne"><h4 style={{fontWeight: 'bold'}}>Street Address One <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="streetAddressOne"
                    required
                    defaultValue={streetAddress || ''}
                    onChange={handleChange}
                    name="streetAddressOne"
					style={{width:"65%"}}
                  />
                </div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="streetAddressTwo"><h4 style={{fontWeight: 'bold'}}>Street Address Two</h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="streetAddressTwo"
                    required
                    defaultValue={streetAddress || ''}
                    onChange={handleChange}
                    name="streetAddressTwo"
					style={{width:"65%"}}
                  />
                </div>
				<div className="OrderViewHeaderNew_Inner">
					<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="city"><h4 style={{fontWeight: 'bold'}}>City <span className="required">	*</span></h4></label>
					<input
						type="text"
						className="inputField"
						id="city"
						required
						defaultValue={city || ''}
						onChange={handleChange}
						name="city"
						style={{width:"75%"}}
					/>
					</div>
					<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State <span className="required">	*</span></h4></label>
							<select className="dropdown" value={state} onChange={handleChange}>
								<option value="">--Select--</option>
								{stateOptions.map((option) => (
									<option key={option.value} value={option.value}>
									{option.label}
									</option>
								))}
								</select>

					</div>

					<div className="OrderViewHeaderNew_Inner">
                  		<label htmlFor="zip"><h4 style={{fontWeight: 'bold'}}>Zip <span className="required">	*</span></h4></label>
							<input
								type="text"
								className="inputField"
								id="zip"
								required
								defaultValue={zip || ''}
								onChange={handleChange}
								name="zip"
								style={{width:"100%"}}
							/>
						</div>
				
				</div>
				
				{/* <tr>
					<td><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></td>
					<td><h4>{order.shipmentTrackingNumber}</h4></td>
				</tr> */}
				{/* <tr>
					{order.isGift && order.giftMessage !== '' && <td><h4 style={{fontWeight: 'bold'}}>Gift Message</h4></td>}
					{order.isGift && order.giftMessage !== '' && <td><h4>{order.giftMessage}</h4></td>}
				</tr> */}
	</div>
	)
}

export const ProductInfoEdit = ({ handleAddNewFlavor, products}) => {
	const [flavors, setFlavors] = useState([{ quantity: 0, flavor: 'Plain' }]);

	const handleFlavorChange = (index, quantity, flavor) => {
	  const newFlavors = [...flavors];
	  newFlavors[index] = { quantity, flavor };
	  setFlavors(newFlavors);
	};
  
	const handleAddFlavor = () => {
	  const newFlavors = [...flavors, { quantity: 0, flavor: 'Plain' }];
	  setFlavors(newFlavors);
	};
  
	const handleRemoveFlavor = (index) => {
	  const newFlavors = flavors.filter((flavor, i) => i !== index);
	  setFlavors(newFlavors);
	};

	return (
	  <div id="NewOrderProducts" className="GenericBackgroundAdd">
		<label className="BoxDescriptionTitle">Order Details</label>
		{flavors.map((flavor, index) => (
		  <FlavorSelector
			key={index}
			quantity={flavor.quantity}
			flavor={flavor.flavor}
			onChange={(quantity, flavor) => handleFlavorChange(index, quantity, flavor)}
			onRemove={() => handleRemoveFlavor(index)}
			products={createStringArray(products, "name")}
		  />
		))}
		<button className='CenterEvenAlignFlexRow addFlavorButton' onClick={handleAddFlavor}>
			<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
			Add Flavor
		</button>
	  </div>
	);

}
