import mysql2 from "mysql2/promise";

const conn = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tec_store_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default conn;