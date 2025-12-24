import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sso-practice", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;