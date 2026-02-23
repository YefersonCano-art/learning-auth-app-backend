import { Table, Column, Model, DataType, } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  
  @Column({
    type: DataType.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [2, 50],
        msg: "El nombre de usuario debe tener entre 2 y 50 caracteres",
      },
    },
  })
   declare nameUser: string;

  @Column({
    type: DataType.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [2, 100],
        msg: "El nombre debe tener entre 2 y 100 caracteres",
      },
    },
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [2, 100],
        msg: "El apellido debe tener entre 2 y 100 caracteres",
      },
    },
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull:false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Debe ser un correo electrónico válido",
      },
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [6, 255],
        msg: "La contraseña debe tener al menos 6 caracteres",
      },
    },
  })
  declare password: string;
}


