import { Client } from "pg";

const pgClient = new Client(
  "postgresql://users_owner:XzRwDMs48Vlk@ep-old-meadow-a8atswab.eastus2.azure.neon.tech/users?sslmode=require"
);

async function connectToDB() {
  await pgClient.connect();
  const response = await pgClient.query("SELECT * FROM users;");
  console.log(response)
}

connectToDB();
