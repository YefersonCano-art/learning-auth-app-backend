import { Sequelize } from "sequelize-typescript";
import { User } from "../../modules/users/users.model";

const url = process.env.DATABASE_URL || ""

const db = new Sequelize(url,{
  dialect: "postgres",
  models: [User], // Registrar todos los modelos aquí
  dialectOptions: {
    ssl: {  //ssl para conexión segura a la base de datos en Supabase
      require: true,
      rejectUnauthorized: false
    } 
  }
});

export default db;