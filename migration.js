/**
 * migrate-to-turso.mjs
 *
 * Migration / seed des données de la base SQLite locale vers Turso.
 *
 * PRÉREQUIS :
 *   - Le schéma doit déjà exister sur Turso (lance initDb() depuis ton db.js
 *     contre la base Turso avant de lancer ce script).
 *   - La base locale (better-sqlite3) contient les données à migrer.
 *
 * INSTALLATION :
 *   npm install better-sqlite3 @tursodatabase/serverless dotenv
 *
 * CONFIGURATION (.env) :
 *   TURSO_DATABASE_URL=libsql://ton-db.turso.io
 *   TURSO_AUTH_TOKEN=ton_token
 *   LOCAL_DB_PATH=./database.sqlite   (optionnel)
 *
 * UTILISATION :
 *   node migrate-to-turso.mjs
 */

import "dotenv/config";
import Database from "better-sqlite3";
import { createClient } from "@tursodatabase/serverless/compat";

const LOCAL_DB_PATH = process.env.LOCAL_DB_PATH || "./db/base.js";

// Ordre important : respecte les FOREIGN KEY (parent avant enfant)
const TABLES_IN_ORDER = [
  "users",
  "students",
  "teachers",
  "subjects",
  "grades",
  "absences",
];

async function main() {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
    console.error(
      "❌ TURSO_DATABASE_URL et TURSO_AUTH_TOKEN doivent être définis (.env)."
    );
    process.exit(1);
  }

  console.log(`📂 Ouverture de la base locale : ${LOCAL_DB_PATH}`);
  const localDb = new Database(LOCAL_DB_PATH, { readonly: true });

  const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  await turso.execute(`PRAGMA foreign_keys = ON`);

  let totalRows = 0;

  for (const table of TABLES_IN_ORDER) {
    let rows;
    try {
      rows = localDb.prepare(`SELECT * FROM ${table}`).all();
    } catch (err) {
      console.log(`⏭️  ${table} : table absente en local, ignorée`);
      continue;
    }

    if (rows.length === 0) {
      console.log(`⏭️  ${table} : aucune ligne à migrer`);
      continue;
    }

    const columns = Object.keys(rows[0]);
    const placeholders = columns.map(() => "?").join(", ");
    const columnList = columns.map((c) => `"${c}"`).join(", ");
    const insertSql = `INSERT OR REPLACE INTO "${table}" (${columnList}) VALUES (${placeholders})`;

    try {
      for (const row of rows) {
        const args = columns.map((c) => row[c]);
        await turso.execute({ sql: insertSql, args });
      }
      console.log(`✅ ${table} : ${rows.length} ligne(s) migrée(s)`);
      totalRows += rows.length;
    } catch (err) {
      console.error(`❌ Erreur sur la table ${table} :`, err.message);
    }
  }

  localDb.close();
  console.log(`\n🎉 Migration terminée : ${totalRows} ligne(s) au total.`);
}

main().catch((err) => {
  console.error("❌ Erreur fatale :", err);
  process.exit(1);
});