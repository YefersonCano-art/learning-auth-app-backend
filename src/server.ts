import  express  from "express";
import db from "./shared/config/db";
import cors from 'cors';

import usersRoutes from "./modules/users/users.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

// CORS primero, antes de las rutas
const corsOptions = {
  origin: 'http://localhost:5173', // Vite dev (sin barra final)
  // credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Registrar rutas
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// conectar a la base de datos
async function conectarDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('✅Conexión a la base de datos establecida correctamente.');
    
  } catch (error) {
    console.log('error', error);
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
conectarDB();

export default app;