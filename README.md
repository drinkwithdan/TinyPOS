# TinyPOS
### A Point-Of-Sale system for micro catering businesses

TinyPOS is a full-stack webapp designed to democratise Point-Of-Sale software for small businesses that can't afford the pricing and features of large industry POS providers.

Customers can access the shop-front site through the base route, and admin can log in through a discreet link in the footer - or with a direct link to the login page.

The CRUD (Create, Read, Update, Delete) functionality for the shop items is behind a protected route, meaning a validated user account is needed in order to make any changes to the backend. On top of this; users are required to know a "Secret Phrase" when setting up an account - only allowing validated staff that access.

This app was built with:
- HTML / CSS / JavaScript
- React JS
- Python & Flask
- PostgreSQL

##### Viewing the app

A live version of the app can be found [here](https://tinypos-app.herokuapp.com/)

To access the admin route please user the demo account (username: demo, password: password)

The customer-facing app is designed as **mobile first** so is best viewed on a device viewer set to vertical mobile view.

The admin route, including the orders screen, is designed to be rendered on a small - medium tablet (iPad or similar) so is best viewed on a device viewer set to a tablet view.

## Design

### User Stories

As a starting point for designing the app, some user stories were written to encapsulate the project brief:
```
“Jane has a food truck, she has found that post-pandemic it has been hard to find enough casual workers to consistently staff her food truck. One person in the kitchen, one front of house and one running food is too risky when one of them could call in sick at any point. She wants to do everything herself.”
```
```
“Anthony is a foodie, he loves supporting local businesses and wants to spend his money on small, sustainable businesses rather than large food chains but finds the contact-free ordering systems at those chains quick and easy to use.”
```
```
“Juanita owns an ice-cream stall and wants a system to manage her front-of-house orders as well as her current orders. She doesn’t want to pay out for one of the POS systems that are feature heavy and expensive”
```
```
“Paulo is a casual worker who wants to pick up extra work hours at the weekend but doesn’t have in-depth knowledge of cooking processes or customer service.”
```
```
“Petra has a chain of taco stalls and vans and wants her product to be more standardised across her casual worker teams without having to pay the staff hours required for training.”
```

### MVC

The initial design process was to figure out the `Models, Views, Controllers` setup and build out from that.

#### Models
- Products
- Users
- Orders

#### Views
- Customer (Mobile)
- Admin / Orders (Tablet)

#### Controllers
- Products
- Users
- Orders

### ERD

An Entity Relationship Diagram was sketched out in order to understand the database tables required and the relationships between them:

![ERD diagram](./images/tinyPOS-ERD.jpeg)

A separate table, orders_items would be needed to manage the many-to-many relationship between the orders and items; as both items and orders could be linked to multiple of each other.

The decision was made later to include the `total` amount column for each order, for future data analysis, as well as a `item_name` column for the order_items - to cut down on front-end processing for each order_items request.

### Wireframes


