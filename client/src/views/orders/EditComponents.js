import React, { useState } from 'react'
import add_icon from '../../assets/img/plus_black.svg'

import FlavorSelector from './orderview_components/FlavorSelector';
import { createStringArray } from '../../assets/util/functions'
import {flavorOptions, stateOptions} from '../../assets/util/dropdown.constants'

// ------------------------------ EDIT --------------------------------- //

export const GeneralInfoEdit = ({referenceNumber, datePlaced, trackingNumber, orderStatus, handleChange}) => {

	return(
            <div id='NewOrderGeneral' className='GenericBackgroundAdd'>
				<label className='BoxDescriptionTitle' style={{alignItems:"center"}}>Order Information</label>
                <div className="OrderViewHeaderNew_Inner">
					
                  <label htmlFor="referenceNumber"><h4 style={{fontWeight: 'bold'}}>Reference #<span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="referenceNumber"
                    required
                    value={referenceNumber}
                    onChange={handleChange}
                    name="referenceNumber"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="datePlaced"><h4 style={{fontWeight: 'bold'}}>Date Placed<span className="required">	*</span></h4></label>
                  <input
                    type="date"
                    className="inputField"
                    id="datePlaced"
                    value={datePlaced || ''}
                    onChange={handleChange}
                    name="datePlaced"
                  />
                </div>

                <div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="trackingNumber"><h4 style={{fontWeight: 'bold'}}>Tracking #</h4></label>
				    <input
                    type="text"
                    className="inputField"
                    id="trackingNumber"
                    value={trackingNumber || ''}
                    name="trackingNumber"
					style={{ boxShadow:"none"}}
					disabled
                  />
                </div>

            </div>
        
	)
}

export const GiftInfoEdit = ({handleChange, giftFor, giftMessage}) => {

	return (
		<div id='NewOrderCustomer' className='GenericBackgroundAdd'>
			<label className='BoxDescriptionTitle'>Gift Information</label>		
			<div className="OrderViewHeaderNew_Inner">
					<label htmlFor="giftFor"><h4 style={{fontWeight: 'bold', paddingRight:'1vw'}}>First <span className="required">	*</span>	</h4></label>
					<input
						type="text"
						className="inputField"
						id="giftFor"
						required
						value={giftFor || ''}
						onChange={handleChange}
						name="giftFor"
						style={{marginRight:'2vw'}}
					/>
				</div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="giftMessage"><h4 style={{fontWeight: 'bold'}}>Last <span className="required">	*</span></h4></label>
                  <input
                    type="textarea" rows="4" cols="50"
                    className="inputField"
                    id="giftMessage"
                    required
                    value={giftMessage || ''}
                    onChange={handleChange}
                    name="giftMessage"
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
                    value={streetAddress || ''}
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
                    value={streetAddress || ''}
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
						value={city || ''}
						onChange={handleChange}
						name="city"
						style={{width:"75%"}}
					/>
					</div>
					<div className="OrderViewHeaderNew_Inner">
						<label htmlFor="state"><h4 style={{fontWeight: 'bold'}}>State <span className="required">	*</span></h4></label>
							<select className="dropdown" value={state} onChange={handleChange} name="state">
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
								value={zip || ''}
								onChange={handleChange}
								name="zip"
								style={{width:"100%"}}
							/>
						</div>
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
					<label htmlFor="firstName"><h4 style={{fontWeight: 'bold', paddingRight:'1vw'}}>First <span className="required">	*</span>	</h4></label>
					<input
						type="text"
						className="inputField"
						id="firstName"
						required
						value={firstName || ''}
						onChange={handleChange}
						name="firstName"
						style={{marginRight:'2vw'}}
					/>
				</div>
				<div className="OrderViewHeaderNew_Inner">
                  <label htmlFor="lastName"><h4 style={{fontWeight: 'bold'}}>Last <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="lastName"
                    required
                    value={lastName || ''}
                    onChange={handleChange}
                    name="lastName"
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
                    value={email || ''}
                    onChange={ handleChange}
                    name="email"
					style={{width:"85%"}}
                  />
			</div>
			<div className='OrderViewHeaderNew_Inner'>
                  <label htmlFor="phoneNumber"><h4 style={{fontWeight: 'bold'}}>Phone <span className="required">	*</span></h4></label>
                  <input
                    type="text"
                    className="inputField"
                    id="phoneNumber"
                    required
                    value={phoneNumber || ''}
                    onChange={handleChange}
                    name="phoneNumber"
					style={{width:"85%"}}
                  />
			</div>
		</div>
	);	
}



export const ProductInfoEdit = ({ handleAddNewFlavor, handleRemoveFlavor, handleFlavorChange, products, productsOrdered}) => {
	console.log(products)
	// const [flavors, setFlavors] = useState([{ quantity: 0, flavor: 'Plain' }]);

	// const handleFlavorChange = (index, quantity, flavor) => {
	//   const newFlavors = [...flavors];
	//   newFlavors[index] = { quantity, flavor };
	//   setFlavors(newFlavors);
	// };
  
	// const handleAddFlavor = () => {
	//   const newFlavors = [...flavors, { quantity: 0, flavor: 'Plain' }];
	//   setFlavors(newFlavors);
	// };
  
	// const handleRemoveFlavor = (index) => {
	//   const newFlavors = flavors.filter((flavor, i) => i !== index);
	//   setFlavors(newFlavors);
	// };

	return (
	  <div id="NewOrderProducts" className="GenericBackgroundAdd">
		<label className="BoxDescriptionTitle">Order Details</label>
		{productsOrdered.map((flavor, index) => (
		  <FlavorSelector
			key={index}
			quantity={flavor.quantity}
			flavor={flavor.flavor}
			onChange={(quantity, flavor) => handleFlavorChange(index, quantity, flavor)}
			onRemove={() => handleRemoveFlavor(index)}
			// products={createStringArray(products, "name")}
			products={flavorOptions}

		  />
		))}
		<button className='CenterEvenAlignFlexRow addFlavorButton' onClick={handleAddNewFlavor}>
			<img src={add_icon} alt='add order' style={{paddingRight: '10px'}}/>
			Add Flavor
		</button>
	  </div>
	);

}
