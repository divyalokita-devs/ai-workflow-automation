package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"server/database"
	"server/models"
	"server/utils"
)

type AuthResponse struct {
	Token string      `json:"token"`
	User  models.User `json:"user"`
}

func Register(w http.ResponseWriter, r *http.Request) {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var exists int

	err = database.DB.QueryRow(
		"SELECT id FROM users WHERE email = ?",
		user.Email,
	).Scan(&exists)

	if err != nil && err != sql.ErrNoRows {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	if err == nil {
		http.Error(w, "Email already exists", http.StatusBadRequest)
		return
	}

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Password hashing failed", http.StatusInternalServerError)
		return
	}

	result, err := database.DB.Exec(
		"INSERT INTO users(name,email,password) VALUES(?,?,?)",
		user.Name,
		user.Email,
		hashedPassword,
	)

	if err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	id, _ := result.LastInsertId()

	token, err := utils.GenerateToken(int(id))
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	user.ID = int(id)
	user.Password = ""

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(AuthResponse{
		Token: token,
		User:  user,
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req models.User

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user models.User

	err = database.DB.QueryRow(
		"SELECT id,name,email,password FROM users WHERE email=?",
		req.Email,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
	)

	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if !utils.CheckPassword(req.Password, user.Password) {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		http.Error(w, "Token generation failed", http.StatusInternalServerError)
		return
	}

	user.Password = ""

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(AuthResponse{
		Token: token,
		User:  user,
	})
}