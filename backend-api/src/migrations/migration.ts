import { DatabaseConfig } from "./database.migration";

//Migrations
const database = new DatabaseConfig();
database.init();