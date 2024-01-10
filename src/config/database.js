import mysql from "mysql2/promise";

// création d'une instance de "pool" de connexion à la base de données
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    waitForConnections: true, // on attend que la connexion soit disponible
    connectionLimit: 10, // nombre de connexions maximum
    queueLimit: 0  // nombre de connexions maximum dans la file d'attente
});

// vérification de la connexion à la base de données
pool.getConnection().then((connection) => {
    console.log(`Connected to ${connection.config.database} DB`);
    // on libère la connexion
    connection.release();
});

export default pool;