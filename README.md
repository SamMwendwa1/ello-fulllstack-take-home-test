# By Samuel Mwendwa
## Ello Engineering Challenge
This project is a React application created using create-react-app and written in TypeScript. It was built as a response to the Ello Engineering Challenge take-home test by Samuel Mwendwa.

## Getting Started
### Prerequisites
Make sure you have Node.js and npm installed on your machine. You can download them from Node.js.

### Installation
Clone the repository:
`git clone <repository-url>`
Navigate to the project directory:
`cd frontend`
Install the dependencies:
`npm install`
Running the Application
To start the development server, run:
## `npm start`
This will start the application on http://localhost:3000.

The application runs alongside a GraphQL server which should be running on http://localhost:4000. Ensure the server is up and running before starting the frontend application.

## Building the Application
To create a production build, run:
`npm run build`
## Project Structure
The project follows the standard create-react-app structure, enhanced with TypeScript, TailwindCSS, and PostCSS.
frontend/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── config/
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── react-app-env.d.ts
├── .gitignore
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
backend/
## Dependencies
The project uses the following dependencies:

`@apollo/client: For interacting with GraphQL APIs.`
`@emotion/react and @emotion/styled: For CSS-in-JS styling.`
`@mui/icons-material and @mui/material: For Material-UI components and icons.`
`@testing-library/jest-dom, @testing-library/react, @testing-library/user-event: For testing utilities.`
`@types/jest, @types/node, @types/react, @types/react-dom: TypeScript type definitions.`
`graphql: For working with GraphQL.`
`react and react-dom: Core React libraries.`
`react-hot-toast: For displaying toast notifications.`
`react-scripts: Scripts and configuration for create-react-app.`
`typescript: TypeScript language support.`
`use-local-storage: A custom hook for using local storage in React.`
`web-vitals: For measuring performance metrics.`
`DevDependencies`
`The project uses the following development dependencies:`

#### autoprefixer: For adding vendor prefixes to CSS.
#### postcss: A tool for transforming CSS with JavaScript plugins.
#### tailwindcss: A utility-first CSS framework.

## Scripts
start: Starts the development server.
build: Builds the app for production.
test: Runs the test suite.
eject: Ejects the app from create-react-app setup, allowing for customization.


## ESLint Configuration
The project uses the default create-react-app ESLint configuration, extending react-app and react-app/jest.

## Browserslist
The project is configured to support the following browsers:

Production: Browsers with more than 0.2% market share, not dead, and not op_mini all.
Development: The last version of Chrome, Firefox, and Safari.
# Author
This project was built by Samuel Mwendwa.