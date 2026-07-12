package database

import (
	"database/sql"
	"log"

	_ "modernc.org/sqlite"
)

var DB *sql.DB

func ConnectDatabase() {

	var err error

	DB, err = sql.Open("sqlite", "./workflow.db")

	if err != nil {
		log.Fatal(err)
	}

	createTables()

	log.Println("✅ SQLite Connected")
}

func createTables() {

	workflowTable := `
	CREATE TABLE IF NOT EXISTS workflows(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT,
		status TEXT,
		color TEXT,
		aiModel TEXT,
		prompt TEXT
	);`

	_, err := DB.Exec(workflowTable)

	if err != nil {
		log.Fatal(err)
	}

	userTable := `
	CREATE TABLE IF NOT EXISTS users(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`

	_, err = DB.Exec(userTable)

	if err != nil {
		log.Fatal(err)
	}
}