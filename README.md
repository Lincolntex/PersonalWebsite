# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## development
- `npm run dev` to start app locally
- `npm run build` to bundle app to be served 

## Deployment pipeline
- Github workflow to deploys after every merge to main
    - Checkout code to action runner
    - Set up and install Node.js on server
    - Run NPM INstall
    - Use npm run build
    - uploads distributable(dist folder) 
    - uses gh-pages to deploy to the live server
