# KidsMath

Small, kid-friendly math practice app built with Vite + React + TypeScript.

## Quick start

Prerequisites: Node.js (LTS), npm, and Git.

Install dependencies:

```powershell
npm install
```

Start dev server:

```powershell
npm run dev
```

Run unit tests:

```powershell
npm run test
```

Run a production build:

```powershell
npm run build
npm run preview
```

## Lint & format

```powershell
npm run lint
npm run format
```

## Deploying to Azure Static Web Apps

This repository includes a GitHub Actions workflow configured to deploy the app to Azure Static Web Apps. The workflow expects the repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.

Defaults used in workflow:
- app_location: `/` (project root)
- api_location: `` (no serverless functions)
- output_location: `dist`

Follow Azure documentation to create a Static Web App and generate the deployment token, then add it to the repo secrets.

## Simple mode and operator choices

The app includes a "Simple" difficulty preset which uses only plus (+) and minus (−) operations by default — good for younger students.
You can also toggle operators in the controls ( +, −, × ) to tailor the kinds of problems shown.
