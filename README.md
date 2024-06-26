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

## Check List
- [x] Typescript
- [x] Expressjs
- [x] [Helmet](https://github.com/helmetjs/helmet) nodejs package for security HTTP response headers
- [x] Swagger Spec
- [x] Parallel random-order testing using Chaijs, mocha, sinonjs
- [x] Code coverage
- [x] Eslint, Prettier
- [x] Commit and push hooks
- [x] Sequelize database setup with SSL in production
- [x] Dockerfile
- [x] Azure CI pipeline
- [x] Health check route
- [x] Return git commit id in HTTP response header
- [x] logs with transaction id
- [x] kubernetes deployment config files
- [x] Validation of request body using [Zod](https://zod.dev/)
- [x] Updated README file for the project
- [x] Logs with transaction id
- [x] CORS support for local development
- [x] VsCode debugger configuration
- [x] Integrate [Azure application insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/nodejs)
- [x] [Gitops ready for AKS with ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [x] Terraform for Infrastructure as Code (Azure, GCP, AWS)
- [x] k6 for Load Testing

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