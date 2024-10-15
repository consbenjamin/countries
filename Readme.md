Country Info Application This project is a web application that displays information about different countries, including population data and neighboring countries.

Features View a list of available countries. Access detailed information about a specific country, such as: Name Borders Population data over the years National flag

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install dependencies:

npm i


Run the application:

/server folder : npm run dev
/client folder : npm run dev

CLIENT : (http://localhost:3000)
SERVER : (http://localhost:5000)


Country Info Application
This project is a web application that displays information about different countries, including population data and neighboring countries.

Features
View a list of available countries.
Access detailed information about a specific country, such as:
Name
Borders
Population data over the years
National flag
Installation
Clone the repository:



Run the application:


The application should be accessible at http://localhost:3000.

API Endpoints
Available Countries
URL: /api/countries/available
Method: GET
Description: Returns a list of available countries.
Country Info
URL: /api/countries/info/:countryCode
Method: GET
Description: Retrieves detailed information about a specific country using its ISO2 code.


Built With
Next.js - The React framework for server-side rendering.
Express.js - Web framework for Node.js.
Chart.js - Used for population data visualizations.
Axios - HTTP client for API requests.
