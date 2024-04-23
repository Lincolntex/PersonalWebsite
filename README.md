# Personal Website

Personal Website to introduce myself to prospective employers and to have a sandbox to test and improve my developemnt skills.  


## Application Architecture

### Client Application

The front end application is a [react-app](https://react.dev/learn). It uses modern react practices to render a simple UI for my personal site. 
There are 2 pages on the live site with a 3rd that works when running locally with the server and database setup. 

### Server Application 

The server framework I used is [fastify](https://fastify.dev/). Its a modern web server framework that was fast and easy to standup. 
To integrate with the database I used the [Postgres.js](https://github.com/porsager/postgres) which allowed me to embed sql queries safely in the server code.

### Database

For the database I chose to use [postgres](https://www.postgresql.org/) which is a free open source database solution. To run the database across enviornments I set it up in a [Docker](https://www.docker.com/) container.
This allows me to run the database easily in any machine without having to install it and set it up each time.

## Local Development Setup

### Prerequisites
- Node.js version >= 18 installed
- Docker installed

To get started running this full stack application locally you need to follow the following steps:

1. Clone the respository
2. Initialize the client app: `cd` into the `client/` directory and run `npm install`
3. Initialize the server app: `cd` into the `server/` directory and run `npm install`
4. Make sure the Docker daemon is running on your machine, if not start it with `docker`
5. Pull the latest image of the postgres container `docker pull postgres:latest`
6. Start the postgres container with this command (replace password with your if needed): `docker run -p 5454:5432 --name db-container -e POSTGRES_PASSWORD=password -d postgres`
   - windows has a postgres instance running on 5432 by default we map data traffic from 5454 on host to 5432 in docker container to avoid this. 
8. Next we need to create a database, so open a terminal session into the postgres container started in the previous step.
9. Start the postgres cli via `psql -U postgres`
10. Create the database by running `CREATE DATABASE IF NOT EXISTS personalwebsite;`
11. Now we need to apply the [schema](https://github.com/Lincolntex/PersonalWebsite/blob/main/server/infra/database/schema.sql) to create the tables.
    You can either copy the file to the container and run it or paste the contents and run it
13. Start your server `cd server/` and `npm run dev`
14. Start your client `cd client/` and `npm run dev`
15. Your app should be running on http://localhost:5173 (or whatever port is mentioned in the client logs)

## Site

The actual site itself is currently hosted using [Github Pages](https://pages.github.com/): [here](https://lincolntex.github.io/PersonalWebsite). 
This is handled by the CI/CD pipeline of github actions that handle building and deploying the site when changes are merged to main. 
There is a limitation in Github pages hosting when it comes to single pages apps, this causes the app to not load when refreshed on a nested route. 
To solve this I would need to migrate the site to another hosting solution. Something I will explore later when Im ready to pay for hosting. 
It is also worth noting that I did not host the database and server meaning the blogs page is not functional at this time as it relies on a database connection to populate the blogs. 
