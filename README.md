Hello! You are likely feeling incredibly overwhelmed looking at so much code. Take a deep breath!


There are quite a few bugs in the code that just weren't resolved when the time was up, so this README will try and point you where to start.


To login, use any of the email/password combinations in the user.csv file (or however you've configured the database).


1. Overview of the mess, (and what I learned throughout MQP):
   - There are a mix of React classes and React functional components in the codebase, but going forward I would consider making everything components (Chat GPT is your friend).
       - The reason I didn't do this was because of using mapStateToProps with Redux Toolkit, to investigate the alternative with functional components.


   - The tab system in MainOrderCards_Tabs is buggy. It's essentially the remnants of the Phase One Prototype, so consider revamping the code or scratching it altogether with a new tab/windowing solution.


   - Check the rendering of the OrderCards, it doesn't seem to be working quite right for the Search component
       - You can probably see this in the screenshots in the final paper, but the Search Page shows 0 logs for every order card, which is obviously wrong.
       - Also... the onclick function for those cards was never fixed, but don't focus on that until the tab system works


   - Check on OrderLines, in ExistingOrder_Tab I disabled editing an orderline because it was deemed to be a bit more complicated than anticipated.
       - An orderline has a dual primary key (the order id, and the product id), but we only create an order line for the products ordered.
       - When a user then goes to edit the products ordered on an existing order, the front-end arraylist of ProductsOrdered doesn't care that a primary key changed.
       - So, going to update the orderliness with the new list of products doesn't work.
       - The solution was to delete each orderline of that order, and add the new ones, but it's getting a duplicate primary key error.
       - All in all, consider just creating an integer PK to avoid any more issues with the dual key.


   - The AdminPanel was the first thing that worked. I swear. It was the first thing that connected the front and backend. But at some point... one day... the users stopped appearing. I didn't look into it... Presentation day passed and I have quite literally run out of time.
       - I think it'll be a good place to start and debug to understand:
           1. how the components get information from the store -->
           2. how the store gets information from the API -->
           3. how the API calls the backend.


   - App.js contains the Navbar actually being used: Navbar.js has the correct styling -- it's from Phase One, but App.js provides the structure for user permissions and login authorization.
       - It does not currently handle access tokens or password security but that should be fixed before put into production.
       - The Routes are the possible pages of the application with their respective components.
       - Above the list of routes is the navbar rendering. Depending on the type of user logged in will control which buttons are shown. The farm side routes are set up but the components are not made (literally copy and paste once you've made your edits to the order state)
       - An Admin user has access to the Admin panel but they should also have their own order page to be able to update EVERY field.
       - Finalizing the admin flow will allow the software to be integrated for company use.
  
   - Rework the Redux Toolkit slices, they were inherently based on the tables in the backend but that's not necessarily the best approach. The order slice should hold ALL of the information on an order, rather than holding the shippingId, customerId, etc (like the backend table would). The local state in the OrderCard and ExistingOrder_Tab should be populated much more simply than it is now -- fixing this will probably save you the trouble I went through and solve the frontend issues explained earlier (I started with populating the order cards, then add order, then existing, and... I could have avoided a lot of problems, hopefully this is something that can be fixed quickly if you are at all familiar with React)
       - Keep the other slices available (customers, shipping addresses, etc. even keep a copy of the order_slice around while you work a new solution, it's gonna be tricky manipulating the data as its passed directly from the backend, but that's where most of the work needs to be done), but it's not necessary to be joining arrays and objects in the frontend business logic -- just create the frontend state EXACTLY how it'll be useful for you populating the UI... then go back and rework your queries or data services.
       - Also, research best practices for having business logic in the slices, I think you can do more with them than I am currently doing. That might help with a lot of the frontend calculations.


   - Speaking of queries and data services, the API's need quite a bit of work.
       - If you find it to be too much work, you can consider Amazon AWS REST API Gateway, but developing the Express server and APIs yourself is a great way to strengthen backend software engineering skills, and will help you feel a greater amount of control over how data is passed across the server.
  
   - You may need to wrap the order form in a form element, because right now it functions as a form but the required conditions aren't enforced by anything.


   - One flow that does work and should be used to conduct a user test is as follows: (it doesn't really matter that not all the information shows up/can be edited yet)
       1. Login to the system as a regular GGC User
           - email: gr-ggc@wpi.edu
           - password: company
       2. Navigate to the Orders tab
       3. Click add order
       4. Fill in the order information
           - The user has the option to clear the fields if they mess up
       5. Save the new order.
       6. Navigate to the Active Orders tab and click the newly created order.
       7. In the existing order tab, click edit and change the reference number to something easy to remember.
       8. Navigate to the Search page.
       9. Type the reference number in the search bar and watch as your order appears.
       10. Go back to the Orders screen (it would be convenient if the onclick worked for the card)
       11. In the Active Orders tab, click your order and delete it.
       12. Confirm delete and verify it was removed from the active orders page (this might not work, it might look like a different order was deleted... but if you refresh the screen the correct order was deleted... sorry but that's probably another bug to go fix :)


2. How do I navigate the codebase? (GGCPortal is the root directory) It's gonna take some time to get comfortable. Here's a cheat sheet:
   - Configurations:
       1. (.ebextensions/) & (.elasticbeanstalk/) are directories for elastic beanstalk environment configurations. They probably won't need to change unless you're modifying how the app is being deployed to eb.
       2. (babel.config.js) has the babel configuration for the server. Look at Babel documentation for more clarification on what it does.
       3. (Procfile) is similar to a makefile, it allows the web app know which file to run the server on   (which is server.compiled.js because it is the compiled version of our app)
       4. (package.json) manages root project dependencies, configuration, and scripts - includes express and mysql configurations
       4. (client/package.json) manages client project dependencies, configuration, and scripts - includes all of the React stuff irrelevant to server itself
  
   - Notable "Entry" Files:
       1. (server.js) The main entry point of the Express.js server that defines and configures the server, middleware, routes, and any other setup.
           - (server.compiled.js) is generated by running 'npm run build', this is what the Procfile points to
       2. (client/src/index.js) this is the main entry point for the React app
           - imports necessary dependencies: react, react-dom, the main app component, and provides the *store* to the component!
           - renders the app component into the DOM using the ReactDOM.render() method.
       3. (client/src/App.js) START HERE!!!
           - the main app component! This is where I have login authorization happening and create the routes for the navigation bar.
       4. (app/models/db.js) gets path to db configuration and exports the database connection
       5. (client/src/http-common.js) this defines the Axios connection to fetch from API
       6. (client/src/store_cfg.js) this is where the slices (from app/src/store) and any middleware are combined into one reducer.


   - (app/): home of the Express API stuff
       1. (config/) each file in here is configured its own db endpoint
           - for best practice with EB, use environment variables (secured.cnfg.js)
       2. (controllers/)
           -  handle incoming requests, process the data, and return the response to the client
           -  one controller for each db model in addition to an auth controller (verifying user) and a board controller (this is unused right now but you should play with the routing based on user permission)
       3. (middleware/)
           - I don't use any of the middleware but this is where it should be defined.
       4. (models/)
           - These define the schema of the database table
           - They are the ORM representation in JS
           - This is where the queries are -- look into creating join queries (you'd probably put it in the order model, but look into how to handle that)
       5. (routes/) Map the API requests to the correct place


   - (client/src/): home of the React App
       1. (services/) Think of them as your routes from the frontend.
           - These are the Axios calls to your APIs depending on which service
       2. (assets/) fonts, images, style, util
       3. (store/) is where all of our slices are configured.
           - Go here to learn about the state of the application and how the framework works.
       4. (views/) All of the JS components and classes for the frontend


   - (tables/):
       1. (sql scripts) all of the table creation scripts in MySQL including one master script and an order trigger after add.
       2. (csv files) backup from CSV files to use if necessary and to reference the data model in a real order.


3. You might have a few thoughts. One will be to completely start over, another will be to try and fix each thing at a time. Hopefully you don't start over, I tried to make this as modular as possible. My advice:
   - Please before anything else update the dependencies and versions. It might be beneficial to do more research into what is compatible with what but the big ones to look at are MySQL (used 5.7.41 in RDS) Node.js, React, Redux, etc (see the package.json file)


4. What the heck do I do about Elastic Beanstalk? Once you are able to use the AWS account created for you (and hopefully be a permanent account), set up a codepipeline from Github to an Elastic Beanstalk environment.
   - Create the EB Environment
   - Setup the CodePipeline from Github to the EB Environment


   Follow the steps here to guide you with EB and CodePipeline: https://www.honeybadger.io/blog/node-elastic-beanstalk/


   - Setup the database through the environment


    Follow the steps here to guide you with setting up a database kn EB: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.managing.db.html


   Follow the steps here




Author: Nini Acquista
Still confused and neeeeed to bug an alumni with questions? geacquista@wpi.edu