/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createOrderLine = /* GraphQL */ `
  mutation CreateOrderLine(
    $input: CreateOrderLineInput!
    $condition: ModelOrderLineConditionInput
  ) {
    createOrderLine(input: $input, condition: $condition) {
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
export const updateOrderLine = /* GraphQL */ `
  mutation UpdateOrderLine(
    $input: UpdateOrderLineInput!
    $condition: ModelOrderLineConditionInput
  ) {
    updateOrderLine(input: $input, condition: $condition) {
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
export const deleteOrderLine = /* GraphQL */ `
  mutation DeleteOrderLine(
    $input: DeleteOrderLineInput!
    $condition: ModelOrderLineConditionInput
  ) {
    deleteOrderLine(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
export const createShippingAddress = /* GraphQL */ `
  mutation CreateShippingAddress(
    $input: CreateShippingAddressInput!
    $condition: ModelShippingAddressConditionInput
  ) {
    createShippingAddress(input: $input, condition: $condition) {
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
export const updateShippingAddress = /* GraphQL */ `
  mutation UpdateShippingAddress(
    $input: UpdateShippingAddressInput!
    $condition: ModelShippingAddressConditionInput
  ) {
    updateShippingAddress(input: $input, condition: $condition) {
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
export const deleteShippingAddress = /* GraphQL */ `
  mutation DeleteShippingAddress(
    $input: DeleteShippingAddressInput!
    $condition: ModelShippingAddressConditionInput
  ) {
    deleteShippingAddress(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
