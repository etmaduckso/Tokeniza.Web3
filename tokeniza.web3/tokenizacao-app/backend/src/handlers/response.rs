use axum::{response::Json, http::StatusCode};
use serde_json::{json, Value};

pub struct ApiResponse;

impl ApiResponse {
    pub fn success(data: Value) -> Json<Value> {
        Json(json!({
            "success": true,
            "data": data,
            "timestamp": chrono::Utc::now().to_rfc3339()
        }))
    }

    pub fn success_with_message(data: Value, message: &str) -> Json<Value> {
        Json(json!({
            "success": true,
            "message": message,
            "data": data,
            "timestamp": chrono::Utc::now().to_rfc3339()
        }))
    }

    pub fn error(message: &str) -> (StatusCode, Json<Value>) {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({
                "success": false,
                "error": message,
                "timestamp": chrono::Utc::now().to_rfc3339()
            }))
        )
    }

    pub fn bad_request(message: &str) -> (StatusCode, Json<Value>) {
        (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "success": false,
                "error": "Requisição inválida",
                "message": message,
                "timestamp": chrono::Utc::now().to_rfc3339()
            }))
        )
    }

    pub fn not_found(message: &str) -> (StatusCode, Json<Value>) {
        (
            StatusCode::NOT_FOUND,
            Json(json!({
                "success": false,
                "error": "Não encontrado",
                "message": message,
                "timestamp": chrono::Utc::now().to_rfc3339()
            }))
        )
    }
}
