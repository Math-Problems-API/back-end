"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});
pool.on("connect", () => console.log("Postgres connected"));
exports.default = pool;
//# sourceMappingURL=pool.js.map