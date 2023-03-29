/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers {
    onCreateUsers {
      id
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers {
    onUpdateUsers {
      id
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers {
    onDeleteUsers {
      id
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      productDescription
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      productDescription
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      productDescription
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateOrderLine = /* GraphQL */ `
  subscription OnCreateOrderLine {
    onCreateOrderLine {
      id
      orderID
      product {
        id
        name
        productDescription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      qtyOrdered
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderLineProductId
    }
  }
`;
export const onUpdateOrderLine = /* GraphQL */ `
  subscription OnUpdateOrderLine {
    onUpdateOrderLine {
      id
      orderID
      product {
        id
        name
        productDescription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      qtyOrdered
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderLineProductId
    }
  }
`;
export const onDeleteOrderLine = /* GraphQL */ `
  subscription OnDeleteOrderLine {
    onDeleteOrderLine {
      id
      orderID
      product {
        id
        name
        productDescription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      qtyOrdered
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderLineProductId
    }
  }
`;
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice {
    onCreateInvoice {
      id
      invoiceNumber
      revenue
      expense
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice {
    onUpdateInvoice {
      id
      invoiceNumber
      revenue
      expense
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice {
    onDeleteInvoice {
      id
      invoiceNumber
      revenue
      expense
      isPaid
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateShippingAddress = /* GraphQL */ `
  subscription OnCreateShippingAddress {
    onCreateShippingAddress {
      id
      streetAddress
      city
      state
      zipCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateShippingAddress = /* GraphQL */ `
  subscription OnUpdateShippingAddress {
    onUpdateShippingAddress {
      id
      streetAddress
      city
      state
      zipCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteShippingAddress = /* GraphQL */ `
  subscription OnDeleteShippingAddress {
    onDeleteShippingAddress {
      id
      streetAddress
      city
      state
      zipCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      firstName
      lastName
      phoneNumber
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      firstName
      lastName
      phoneNumber
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      firstName
      lastName
      phoneNumber
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      datePlaced
      isGift
      giftFor
      giftMessage
      shipmentTrackingNumber
      status
      shippingAddress {
        id
        streetAddress
        city
        state
        zipCode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      customer {
        id
        firstName
        lastName
        phoneNumber
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderShippingAddressId
      orderCustomerId
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      datePlaced
      isGift
      giftFor
      giftMessage
      shipmentTrackingNumber
      status
      shippingAddress {
        id
        streetAddress
        city
        state
        zipCode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      customer {
        id
        firstName
        lastName
        phoneNumber
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderShippingAddressId
      orderCustomerId
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      datePlaced
      isGift
      giftFor
      giftMessage
      shipmentTrackingNumber
      status
      shippingAddress {
        id
        streetAddress
        city
        state
        zipCode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      customer {
        id
        firstName
        lastName
        phoneNumber
        email
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderShippingAddressId
      orderCustomerId
    }
  }
`;
