Country Info Application This project is a web application that displays information about different countries, including population data and neighboring countries.

Features View a list of available countries. Access detailed information about a specific country, such as: Name Borders Population data over the years National flag

Installation
Clone the repository:
git clone https://github.com/consbenjamin/countries.git

open client folder '/client' integrated terminal. 
Install dependencies:
npm i
Run the application:
npm run dev
open server folder '/server' integrated terminal. 
Install dependencies:
npm i
Run the application:
npm run dev

PORTS:
CLIENT : (http://localhost:3000)
SERVER : (http://localhost:5000)


Features
View a list of available countries.
Access detailed information about a specific country, such as:
Name
Borders
Chart with population data over the years
National flag


The client side application should be accessible at http://localhost:3000.

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
TailwindCss - Styling
Next.js - The React framework for server-side rendering.
Express.js - Web framework for Node.js.
Chart.js - Used for population data visualizations.
Axios - HTTP client for API requests.
