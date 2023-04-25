# Script to transform sample GGC order data from one csv into several csv files
# representing tables in a database
# Author: Ben Sakac

# Field names of sample data:
# Date Received,Reference Number,"Name (last, first)",Email,Phone,
# Town/City,State,Zip,Quantity (logs),Gift?,Gift For,Sold For,
# Bought For,Flavor 1,Flavor 2,Flavor 3,Flavor 4,Flavor 5,Flavor 6,Flavor 7,
# Flavor 8,Flavor 9,Flavor 10,Flavor 11,Flavor 12,Flavor 13,Flavor 14,
# Flavor 15,Flavor 16,Flavor 17,Flavor 18,Flavor 19,Flavor 20,Flavor 21,
# Flavor 22,Flavor 23,Flavor 24,Flavor 25,Flavor 26,Flavor 27,Flavor 28,
# Flavor 29,Flavor 30,Flavor 31,Flavor 32

# Self Orders/Orders made by campus orgs or other external organizations were removed from
# input csv and added into output CSVs manually with exception of order reference # 5838657
# which needed first and last name to be manually corrected post script running
# Gift? column also needs manual cleaning to ensure script will run
# Changing Gift? column to ensure Ys and Ns are all capitalized

# Module imports
import random
import pandas as pd

# final db tables column names
SHIPPING_FIELDS = ["shippingID", "streetAddressOne",
                   "streetAddressTwo", "city", "state", "zip"]
CUSTOMER_FIELDS = ["customerID", "firstName", "lastName",
                   "phoneNumber", "email", "customerShippingID"]
ORDER_FIELDS = ["orderID", "datePlaced", "isGift", "giftFor", "giftMessage", "trackingNumber",
                "orderStatus", "shippingID", "customerID", "referenceNumber"]
INVOICE_FIELDS = ["orderID", "invoiceNumber", "customerPaid", "expense", "revenue", "invoiceStatus"]
ORDERLINE_FIELDS = ["lineOrderID", "lineProductID", "qtyOrdered"]

# products dictionary {Name: ID}
PRODUCTS = {
    "Plain": "1",
    "Herb Garlic": "2",
    "Hickory Smoked": "3",
    "Blueberry Lemon": "4",
    "Cranberry Orange": "5",
    "Pink Peppercorn": "6",
    "Fiery Fig": "7",
    "Chive": "8",
    "Calabrini": "9",
    "Chocolate": "10",
    "3LB Calabrini": "11",
    "3LB Herb Garlic": "12",
    "3LB Plain": "13",
    "Chive Capri": "14",
    "Herb Capri": "15",
    "Pepper Capri": "16",
    "Wasabi": "17",
    "Herb Garlic (8oz)": "18"
}

# Input filename
raw_data = "ggc_sample.csv"
# Number of rows in csv
SRC_ROWS = 559

# Filenames for output files
SHIPPING = "output/shipping.csv"
CUSTOMER = "output/customer.csv"
ORDER = "output/order.csv"
INVOICE = "output/invoice.csv"
ORDERLINE = "output/orderline.csv"

# Create data frame from sample data
df_sample_data = pd.read_csv(raw_data)
# rename columns to match what they will be in DB tables
df_sample_data = df_sample_data.rename(columns={'Town/City': 'city',
                                                'State': 'state',
                                                'Zip': 'zip',
                                                'Email': 'email',
                                                'Phone': 'phoneNumber',
                                                'Gift?': 'isGift',
                                                "Gift For": "giftFor",
                                                "Date Received": "datePlaced",
                                                "Reference Number": "referenceNumber",
                                                "Bought For": "expense",
                                                "Sold For": "revenue"})

# Create shipping table with default of address as WPI,
# All historical customers will have this as their address,
# A new order by that customer entered into the system will update
# their address
shipping_cols = ["city", "state", "zip",
                 "streetAddressOne", "streetAddressTwo", "shippingID"]
df_shipping_table = pd.DataFrame(columns=shipping_cols)
default_address = {"city": "Worcester",
                   "state": "MA",
                   "zip": "01609",
                   "streetAddressOne": "100 Institute Rd.",
                   "streetAddressTwo": "",
                   "shippingID": "1"}
df_shipping_table.loc[len(df_shipping_table)] = default_address

# Split Last and First name into separate columns
customer_cols = ["Name (last, first)", "phone", "email"]
name_field = "Name (last, first)"
df_name_split = pd.DataFrame(df_sample_data[name_field].str.split(
    ", ").to_list(), columns=["Last", "First"])
df_sample_data['firstName'] = df_name_split['First']
df_sample_data['lastName'] = df_name_split['Last']
df_sample_data = df_sample_data.drop(name_field, axis=1)

CUST_FIELDS_NO_IDs = ["firstName", "lastName", "phoneNumber", "email"]
# Create DF of only rows where gift is no
df_not_gift_orders = df_sample_data[df_sample_data['isGift'] == "N"]
# Drop duplicate based on email, keep last
df_not_gift_orders_customers = df_not_gift_orders.drop_duplicates(
    ['email'], ignore_index=True, keep="last")
# Left join to get shippingID for each customer
df_NGOC_shipID = df_not_gift_orders_customers.loc[:, CUST_FIELDS_NO_IDs].copy()
df_NGOC_shipID['customerShippingID'] = 1

# Create DF of only rows where gift is yes
df_gift_orders = df_sample_data[df_sample_data['isGift'] == "Y"]
# Drop duplicate based on email, keep last
df_gift_orders_customers = df_gift_orders.drop_duplicates(
    ['email'], ignore_index=True, keep="last")
# Left join to get shippingID for each customer
df_GO_shipID = df_gift_orders.loc[:, CUST_FIELDS_NO_IDs].copy()
df_GO_shipID["customerShippingID"] = ""

# Isolate customers who have only placed gift orders
df_gift_only_customers = df_gift_orders_customers[~df_gift_orders_customers['email'].isin(
    df_NGOC_shipID['email'])]

# Combine non gift with gift orders removing duplicates and keeping shipping info from non gift
df_combine_NGOCSID_GOC = df_NGOC_shipID.combine_first(df_gift_orders_customers)
# Concat that with gift only customers to get final unique customer list
df_uniq_cust = pd.concat(
    [df_combine_NGOCSID_GOC, df_gift_only_customers], ignore_index=True)
# Strip phone numbers of spaces and dashes
df_uniq_cust['phoneNumber'] = df_uniq_cust["phoneNumber"].str.replace(
    r'\D', '')
# Create customerID
df_uniq_cust['customerID'] = pd.RangeIndex(1, len(df_uniq_cust) + 1)
# Swap isGift Y to 1 and N to 0
df_uniq_cust["isGift"] = df_uniq_cust["isGift"].replace({"Y": 1, "N": 0})
# Final unique customers data frame
df_unique_customers = df_uniq_cust.loc[:, CUSTOMER_FIELDS].copy()

# Order
order_cols = ["orderID", "datePlaced", "isGift", "giftFor", "giftMessage",
              "trackingNumber", "orderStatus", "shippingID", "customerID", "referenceNumber"]
# Merge sample data with unique customers on email
merged_df_orders_shipping_customers = df_sample_data.merge(
    df_unique_customers, on=["email"], how='left')
# Create orderID
merged_df_orders_shipping_customers["orderID"] = pd.RangeIndex(
    1, len(merged_df_orders_shipping_customers) + 1)
merged_df_orders_shipping_customers["trackingNumber"] = ""
merged_df_orders_shipping_customers["orderStatus"] = ""
merged_df_orders_shipping_customers["shippingID"] = 1
df_orders = merged_df_orders_shipping_customers
# Add gift message if order was gift
df_orders.loc[df_orders["isGift"] == "Y",
              "giftMessage"] = "This is a fake gift message!"
# Convert dates to datetime
df_orders["datePlaced"] = pd.to_datetime(df_orders['datePlaced'])
# Invoice
df_invoice = df_orders.copy()
df_invoice['invoiceNumber'] = ""
df_invoice['isPaid'] = 0
df_invoice['customerPaid'] = "PaymentRecieved"
df_invoice["invoiceStatus"] = "PaymentSent"

# Orderline
LIST_FLAVOR_FIELDS = ["Flavor 1", "Flavor 2", "Flavor 3", "Flavor 4", "Flavor 5", "Flavor 6", "Flavor 7",
                      "Flavor 8", "Flavor 9", "Flavor 10", "Flavor 11", "Flavor 12", "Flavor 13", "Flavor 14",
                      "Flavor 15", "Flavor 16", "Flavor 17", "Flavor 18", "Flavor 19", "Flavor 20", "Flavor 21",
                      "Flavor 22", "Flavor 23", "Flavor 24", "Flavor 25", "Flavor 26", "Flavor 27", "Flavor 28",
                      "Flavor 29", "Flavor 30", "Flavor 31", "Flavor 32"]

# Create dictionary where key is orderID and value is list of products ordered
dict_orders: dict[int, list[str]] = {k: [] for k in df_orders["orderID"]}
for field in LIST_FLAVOR_FIELDS:
    for index, row in df_sample_data.iterrows():
        if type(row[field]) != float:
            dict_orders[index +
                        1].append(PRODUCTS[row[field].strip().title().replace("Lb", "LB")])
            # Also mess around with sample data and make sure there are no typos

dict_product_qtys = {}
dict_order_line = {}

# Looping through orders
for (orderID, products_ordered) in dict_orders.items():
    # Looping through each item in list of products ordered
    for item in products_ordered:
        # Create dictionary where key is item and val is quantity ordered
        dict_product_qtys[item] = products_ordered.count(item)
    # Set orderline key orderID to value dict product keys
    dict_order_line[orderID] = dict_product_qtys

df_orderline = pd.DataFrame(columns=ORDERLINE_FIELDS)
# Create final dataframe from orderline dictionary
for (orderID, prod_qtys) in dict_order_line.items():
    for prodID, prodQty in prod_qtys.items():
        df_orderline.loc[len(df_orderline)] = [orderID, prodID, prodQty]

# Output files
df_shipping_table[SHIPPING_FIELDS].to_csv(SHIPPING, index=False)
df_unique_customers[CUSTOMER_FIELDS].to_csv(CUSTOMER, index=False)
df_orders[ORDER_FIELDS].to_csv(ORDER, index=False)
df_invoice[INVOICE_FIELDS].to_csv(INVOICE, index=False)
df_orderline[ORDERLINE_FIELDS].to_csv(ORDERLINE, index=False)
print("DONE")
