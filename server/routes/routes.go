package routes

import (
	"ai-workflow-server/ai"
	"ai-workflow-server/database"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Workflow struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Status  string `json:"status"`
	Color   string `json:"color"`
	AIModel string `json:"aiModel"`
	Prompt  string `json:"prompt"`
}

func SetupRoutes(router *gin.Engine) {

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "AI Workflow Backend Running 🚀",
		})
	})

	// ==========================
	// GET ALL WORKFLOWS
	// ==========================
	router.GET("/api/workflows", func(c *gin.Context) {

		rows, err := database.DB.Query(`
			SELECT id,title,status,color,aiModel,prompt
			FROM workflows
			ORDER BY id DESC
		`)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		defer rows.Close()

		workflows := []Workflow{}

		for rows.Next() {
			var workflow Workflow

			err := rows.Scan(
				&workflow.ID,
				&workflow.Title,
				&workflow.Status,
				&workflow.Color,
				&workflow.AIModel,
				&workflow.Prompt,
			)

			if err != nil {
				continue
			}

			workflows = append(workflows, workflow)
		}

		c.JSON(http.StatusOK, workflows)
	})

	// ==========================
	// CREATE WORKFLOW
	// ==========================
	router.POST("/api/workflows", func(c *gin.Context) {

		var workflow Workflow

		if err := c.ShouldBindJSON(&workflow); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		result, err := database.DB.Exec(`
			INSERT INTO workflows
			(title,status,color,aiModel,prompt)
			VALUES(?,?,?,?,?)
		`,
			workflow.Title,
			workflow.Status,
			workflow.Color,
			workflow.AIModel,
			workflow.Prompt,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		id, _ := result.LastInsertId()
		workflow.ID = int(id)

		c.JSON(http.StatusCreated, workflow)
	})

	// ==========================
	// UPDATE WORKFLOW
	// ==========================
	router.PUT("/api/workflows/:id", func(c *gin.Context) {

		id := c.Param("id")

		var workflow Workflow

		if err := c.ShouldBindJSON(&workflow); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		_, err := database.DB.Exec(`
			UPDATE workflows
			SET
				title=?,
				status=?,
				color=?,
				aiModel=?,
				prompt=?
			WHERE id=?
		`,
			workflow.Title,
			workflow.Status,
			workflow.Color,
			workflow.AIModel,
			workflow.Prompt,
			id,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		workflow.ID, _ = strconv.Atoi(id)

		c.JSON(http.StatusOK, workflow)
	})

	// ==========================
	// DELETE WORKFLOW
	// ==========================
	router.DELETE("/api/workflows/:id", func(c *gin.Context) {

		id := c.Param("id")

		_, err := database.DB.Exec(
			"DELETE FROM workflows WHERE id=?",
			id,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Workflow deleted successfully",
		})
	})

	// ==========================
// GEMINI AI
// ==========================

router.POST("/api/ai/generate", func(c *gin.Context) {

	type Request struct {
		Prompt string `json:"prompt"`
	}

	var req Request

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	response, err := ai.GenerateText(req.Prompt)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"response": response,
	})
})
}