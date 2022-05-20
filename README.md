# tarjama-code-challenge
## Typescript Backend Developer Assessment

### Overview
The purpose of this assessment is to give the employer a deep idea about the technical skills of the candidate since they are required to do the task explained below.
### Task Details
The Main Idea
A candidate is required to build a backend application which manages the expenses of individuals, the only need is the backend API’s and nothing else.
### Modules
The application consists of 3 modules:
1.	**Users**: represents the users of the application, the individuals who want to store their experiences.
2.	 **Categories**: represents the type to which the expenses belong, ex: invoices, grocery, car fuel, schools, medical, insurance.
3.	**Expenses**: represents the expenses themselves, ex. The user X spent JOD 10 on Feb 15, 2022, as a grocery purchase
### Technologies to be used
1.	Programming language: **Typescript**
2.	Web framework: **Express.js**
3.	Database: **PostgreSQL**
4.	Database ORM: **Sequelize.js**
5.	Caching Service: **Redis**
### Database Tables and Attributes
1.	User:
    - id
    - name
    - email
    - password
    - last_login
2.	Category
    - id
    - user_id
    - name
3.	Expenses
    - id
    - user_id
    - category_id
    - spending_date
    - amount
### Resources and APIs
1. User:
	- Register: Creating an account by the user name, email, and password.
    - Login
2. Category (For the logged in user)
	- Create
    - Edit
    - Get
    - List
3. Expenses (For the logged in user)
	- Create
    - Edit
    - Delete
    - List By (day, month, year)
### Task Delivery
Candidate is supposed to:
1.	Uploaded their code to a github repository.
2.	git commit as much as possible.
3.	Share the link of the repository with the assessment requester.
