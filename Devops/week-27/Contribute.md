## Manual Installation Rules
- Install nodeJS locally.
- Clone the repo.
- Run `npm install`.
- Start the DB locally via docker.
- Configure the DB by running: 
    - `npx prisma migrate`
    - `npx prisma generate`
- Build the project with `npm run build`.
- Run the project via `npm run dev`.

## Docker Installation Rules
- Run the docker engine.
- Get the image from Docker registry via `docker pull basicprisma`.
- Start the DB locally.
- Connect both the containers with docker-network.
- Run the container with `docker run`. 

## Docker Compose Installation Rules
