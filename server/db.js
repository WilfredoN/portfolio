import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

let dbInstance

export async function getDb() {
    if (!dbInstance) {
        dbInstance = await open({
            filename: './server/feedbacks.sqlite',
            driver: sqlite3.Database
        })
        await dbInstance.exec(`
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
    `)
    }
    return dbInstance
}
