# Node.js Boilerplate

This Node.js boilerplate provides a starting point for building backend applications with Express, TypeScript, and other popular tools and libraries.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js v20 or later
- npm (included with Node.js)
- Docker (optional)
- ArgoCD (optional)
- Terraform (optional)
- k6 (optional)

## Folder Structure

node-boilerplate/  
├── src/  
│   ├── controllers/  
│   ├── database/  
│   │   ├── config/  
│   │   ├── migrations/  
│   │   ├── models/  
│   │   └── seeders/  
│   ├── middlewares/  
│   ├── routes/  
│   ├── services/  
│   ├── utils/  
│   └── index.ts  
├── tests/  
│   ├── controllers/  
│   ├── middlewares/  
│   ├── models/  
│   ├── routes/  
│   ├── services/  
│   └── utils/  
├── argocd/
│   └── application.yaml  
├── terraform/  
│   ├── azure/
│   │   └── main.tf  
│   ├── gcp/
│   │   └── main.tf  
│   ├── aws/
│   │   └── main.tf  
├── k6/  
│   └── test.js  
├── k8s/
│   ├── dev/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── qa/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── uat/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   └── prod/
│       ├── deployment.yaml
│       └── service.yaml
├── .env.example  
├── .eslintignore  
├── .eslintrc.json  
├── .gitignore  
├── .nvmrc  
├── .prettierignore  
├── .prettierrc.json  
├── Dockerfile  
├── azure-pipelines.yml  
├── package-lock.json  
├── package.json  
└── tsconfig.json  

## Set up Branch Policies (Need to be done before starting the project)
1. Create branches: `qa`, `uat`, `production`
2. On Azure Devops, go to `Repos` -> `Branches` -> Click on the three dots next to the favorite star icon of branch `qa` -> `Branch policies`
3. Turn on the `Limit merge types` -> Turn off every merge type except `Rebase and fast-forward`
4. Repeat steps 2 and 3 for branches `uat` and `production`

## To Do Before Using NodeJS Boilerplate
- Replace all `app-name` in all deployment files in the `k8s` folder with your application name

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file using the `.env.example` file as a reference
4. Run `npm start` to start the application

## Example URL

You can access the example route at `http://localhost:3000/example` and the health-check route at `http://localhost:3000/health`.

## Commands

- `npm start`: Start the application in development mode with hot-reloading
- `npm run build`: Build the application for production
- `npm run serve`: Start the application in production mode
- `npm run lint`: Lint the code using ESLint
- `npm run lint:fix`: Fix lint issues using ESLint
- `npm run test`: Run tests
- `npm run test:coverage`: Run tests and generate a code coverage report
- `npm run coverage`: Run nyc for manual testing coverage
- `npm run report`: Open report

## Contributing

Before pushing your code or making a pull request, make sure to run `npm run lint:fix` and `npm run test` to ensure the code adheres to the project's standards and passes all tests.

## SSL Connection for Production Database

Make sure to configure your Sequelize connection settings in `src/database/config` to use SSL for connecting to the production database.

## Husky

This project uses Husky to run `lint:fix` before every commit and `npm run test` before every code-push. Make sure to set it up as per the Husky documentation.

## Using Docker

1. Build the Docker image:
   ```bash
   docker build -t node-boilerplate .

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 node-boilerplate