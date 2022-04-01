# KAT Software Solutions: Inventory Management Systems

## Deployed Link
https://zingy-salamander-37c1c6.netlify.app/

## About
Inventory management software for pharmacies, utilizing the FDA open drug API. Pharmacies can monitor the current inventory to help make decisions on placing additional orders to minimize over / under stocking and ultimately
lower costs.

## Installation Instructions
#### Client-side
- Fork and clone this repository.
- Run `npm i` to install the dependencies.
- Go to [FDA Open Drug API](https://open.fda.gov/apis/) and sign up to get an API key.
- Create a .env.local and store the `JWT_SECRET`,  `API_KEY` and the server url, `REACT_APP_SERVER_URL`.

#### Server-side
- Fork and clone this repo [Server Side Repo](https://github.com/foosasugaome/kat-inventory-management-server)
- Run `npm i` to install the dependencies.
- Create a .env and store the `JWT_SECRET`, and a `PORT` number

## User Stories
- As a user I want to be able to create an account (admin vs. basic) to have access to my pharmacy’s inventory.
- As a user, I want to be able to log in and see the details about our inventory
- As an admin user / manager, I  want to be able to search up medication and see details about that specific medication.
- As an admin user / manager, I want to be able to add a searched medication to our inventory and include the amount added and the date this transaction occurred.
- As an admin user / manager, I want to be able to update my transactions in case of errors.
- As an admin user / manager, I want to be able to remove medications from our inventory
- As an admin user / manager, I want to be able to give selected basic users the ability to add, edit, and remove medications from the inventory.

## URL Chart
| Path | Purpose |
| ------ | ---- |
|/register | Register page 
| /login | Login Page
| /logout| Logs out user and redirect to login page.
| /dashboard | manage users page (adding admin privileges to normal users), update user info (change password, etc), Overview of total inventory. 
| /inventory | Query FDA API and add to the inventory database or manually add medicine that is not in FDA API.
| /inventory | Query into the inventory database and be able to view, edit, or delete each results.
| /sales | View and add sales. Add sales subtracts the quantity of sold product to reflect the actual count left in the database.
| /order | logs supplies orders. Add Order adds to the quantity of the current product count in the databse.


## Routing Chart (Server)
| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | /users | Gets all user information from database
| POST | /users/register | Adds a new user to the database
| POST | /users/login | Validates user’s credentials and logs the user in 
| PUT | /users/:id | Makes changes to values of certain key properties that a user can have (i.e., their name, password, manager status)
| DEL | /users/:id | Deletes a user from the database
| GET | /inventory | Gets all inventory information from database
| POST | /inventory | Adds a new inventory item to track in the database
| POST | /inventory/search | Posting the search term to get a specific result from the inventory list
| GET | /inventory/:id | Gets a specific inventory item’s information from database
| PUT | /inventory/:id | Makes changes to information regarding an specific inventory item
| DEL | /inventory/:id | Deletes a specific inventory item 
| GET | /inventory/:id/transaction | Gets information about transactions made on a specific inventory item
| PUT | /inventory/:id/transaction | Makes changes to the inventory schema to add transactions (transactions are subdocuments of inventory)

## Final Product Images
![Final Product Image](/wireframe/final_prod_dashboard_ss.jpg)

## ERDs
![ERD image](/KAT%20Rx.drawio.png)


## Wireframes
#### Login
![wireframe image](/wireframe/dashboard_login.jpg)
#### Register
![wireframe image](/wireframe/dashboard_register.jpg)
#### Manage Users
![wireframe image](/wireframe/dashboard_manageusers.jpg)
#### Overview
![wireframe image](/wireframe/dashboard_overview.jpg)
#### Add Product
![wireframe image](/wireframe/dashboard_add_drug.jpg)
#### Edit Product
![wireframe image](/wireframe/dashboard_edit_drug.jpg)
#### Transactions
![wireframe image](/wireframe/dashboard_transactions.jpg)
#### Transaction Reports
![wireframe image](/wireframe/dashboard_transactions_reports.jpg)



## Tech Utilized
- HTML
- CSS
- JavaScript
- MongoDB
- Express
- React
- Node


## MVP Checklist
- [x] Register & Login for users. 
- [x] Change user permissions.
- [x] Query and display medicines from the API.
- [x] Show page for each medicine.
- [x] Query by brand name and generic name.
- [x] Track the transaction history for the inventory and display total inventory
- [x] Transaction history only visible to admins/managers.
- [x] CRUD for medicine inventory.
- [x] CRUD for transaction history.


## Stetch Goals
- [ ] Scan items to input in the database.
- [x] Displays inventory if it is below a certain quantity.
- [ ] Download + print inventory reports.
- [ ] Order form send to email.


## Code Highlights

We created our own middleware.

``` javascript
const myMiddleWare = async (req, res, next) => {
    try {
        const adminEmail = 'admin@katims.com'
        const adminUsername = 'admin'
        const adminPassword = 'admin'

        // check if admin account exists
        const userCheck = await db.Users.findOne({ $or: [
            {email: adminEmail,},{username : adminUsername }]
        })

        if(!userCheck) {
            const salt = 12
        const hashedPassword = await bcrypt.hash(adminPassword, salt)
        
        // create the admin account in the db
        const newUser = await db.Users.create({
            username: adminUsername,
            firstname: 'admin',
            lastname: 'admin',
            email: adminEmail,
            password: hashedPassword,
            manager: true
        })        
        }        
    } catch(err) {
        console.log(err)        
    }    
    next()
}

app.use(myMiddleWare)

app.get('/', myMiddleWare, (req,res)=>{
    res.json({msg : `KAT Software Solutions`})
})

```


## Resources
- [openFDA API](https://open.fda.gov/)
