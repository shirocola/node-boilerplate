import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'users'
      }
    );
  }

  public static associate(models: any) {
    // Define associations here
  }
}

export default User;
