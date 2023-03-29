/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
        role
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        role
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $id: ID
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProducts(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        productDescription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        productDescription
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrderLine = /* GraphQL */ `
  query GetOrderLine($id: ID!) {
    getOrderLine(id: $id) {
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
export const listOrderLines = /* GraphQL */ `
  query ListOrderLines(
    $id: ID
    $filter: ModelOrderLineFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrderLines(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOrderLines = /* GraphQL */ `
  query SyncOrderLines(
    $filter: ModelOrderLineFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrderLines(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const orderLineByOrderReferenceNumber = /* GraphQL */ `
  query OrderLineByOrderReferenceNumber(
    $orderID: String!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderLineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderLineByOrderReferenceNumber(
      orderID: $orderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $id: ID
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInvoices(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncInvoices = /* GraphQL */ `
  query SyncInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInvoices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getShippingAddress = /* GraphQL */ `
  query GetShippingAddress($id: ID!) {
    getShippingAddress(id: $id) {
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
export const listShippingAddresses = /* GraphQL */ `
  query ListShippingAddresses(
    $id: ID
    $filter: ModelShippingAddressFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listShippingAddresses(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncShippingAddresses = /* GraphQL */ `
  query SyncShippingAddresses(
    $filter: ModelShippingAddressFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShippingAddresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $id: ID
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncCustomers = /* GraphQL */ `
  query SyncCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCustomers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const customerByEmail = /* GraphQL */ `
  query CustomerByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customerByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $id: ID
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const orderByOrderStatus = /* GraphQL */ `
  query OrderByOrderStatus(
    $status: OrderStatus!
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    orderByOrderStatus(
      status: $status
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
