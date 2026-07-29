import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

let dbInstance

export async function getDb() {
  if (!dbInstance) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const dbPath = path.join(__dirname, 'feedbacks.sqlite')
    dbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database
    })
    await dbInstance.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      CREATE TABLE IF NOT EXISTS feedbacks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT,
        company TEXT,
        text TEXT,
        created_at TEXT
      );
      CREATE TABLE IF NOT EXISTS feedback_skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        feedback_id INTEGER,
        skill_id INTEGER,
        skill_name TEXT,
        FOREIGN KEY(feedback_id) REFERENCES feedbacks(id)
      );
      CREATE TABLE IF NOT EXISTS telemetry_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT NULL,
        category TEXT,
        label TEXT,
        metadata TEXT,
        hashed_ip TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS app_config (
        config_key TEXT PRIMARY KEY,
        config_value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)
  }
  return dbInstance
}
