## Backend

# npm init
# npm i express
# npm i nodemon

# For running backend: we will use the command "npm run dev"

# npm i dotenv

# npm i mongoose

## API Endpoints (User):
# Only admin, security and employee can login/register to the portal.
# Get - /api/user/login ---> User can login to the portal.
# POST - /api/user/signup ---> User can register themselves to the portal.

## API Endpoints (Visitor):
# GET - /api/visitors ---> All the users(admin/security/employee) can get all of the visitors.
# POST - /api/visitors ---> Only users (admin/security) can register the visitors to the portal.
 
## API Endpoints (Appointments):
# GET - /api/appointments ---> Admin and Security has the access to all the appointments. However, employee has only access to the appointments created by them.
# POST - /api/appointments ---> Only Employee can create a new appointment for the visitors.
# PATCH - /api/appointments/:id ---> Admin/Employee can update the status of all the appointments in the queue.

## API Endpoints (Pass Issuance):
# GET - /api/pass ---> Admin / Security can get all the passes.
# POST - /api/pass ---> Security can Generate the pass.(QR Generation and PDF Generation).

## API Endpoints (Chek In / Check Out):
# POST - api/checkpass/:id ---> Security will check the pass and create a entry on portal if visitor logs in and update the checkout time if visitor is already logged in / logs out.
# GET - api/checkpass ---> Get all the logs already present in the system.

## Dashboard
# GET - Dashboard is created for all users(Admin, Security and Employee) and user specific statistics is added for them.

# Admin 
# GET - Admin can export all the reports for all the data mentioned in the server.

# Visitors
# GET - A search feature is added for all the user to search for any visitor.

# Appointment
# GET - Filters are added to filter out the appointments based upon their status.
# Email - Once appointment is approve email will shared to the visitor to provide confirmation.

# Pass
# GET - Once the PASS is generated, email will be shared to the visitor with the PDF file as an attachment.



## Frontend

# npx create-react-app frontend

# npm i react-router-dom

## To run the react app

# Please clone the repository to your folder using below command.
# git clone -b master https://github.com/Manishakesarwani/Visitor-Management-System.git
# Within the terminal, go inside Visitor Management system folder run below commant to run Backend.

# npm i
# cd backend
# npm run dev

# Then open another terminal, and run below commands to run backend.

# npm i
# cd frontend
# npm run dev
