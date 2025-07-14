package models

type URL struct {
	ID              uint   `json:"id"`
	URL             string `json:"url"`
	Title           string `json:"title"`
	HTMLVersion     string `json:"htmlVersion"`
	InternalLinks   int    `json:"internalLinks"`
	ExternalLinks   int    `json:"externalLinks"`
	BrokenLinks     int    `json:"brokenLinks"`
	LoginForm       bool   `json:"loginForm"`
	Status          string `json:"status"`
	BrokenLinkDetails []BrokenLink `json:"brokenLinkDetails"`
}

type BrokenLink struct {
	ID         uint   `json:"id"`
	URLID      uint   `json:"urlId"`
	Link       string `json:"link"`
	StatusCode int    `json:"statusCode"`
}
