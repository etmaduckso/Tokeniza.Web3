use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ApiError {
    #[error("Erro interno do servidor")]
    InternalServer,
    
    #[error("Requisição inválida: {0}")]
    BadRequest(String),
    
    #[error("Não encontrado")]
    NotFound,
    
    #[error("Não autorizado")]
    Unauthorized,
    
    #[error("Erro de blockchain: {0}")]
    Blockchain(String),
    
    #[error("Erro de validação: {0}")]
    Validation(String),
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            ApiError::InternalServer => (StatusCode::INTERNAL_SERVER_ERROR, "Erro interno do servidor"),
            ApiError::BadRequest(_) => (StatusCode::BAD_REQUEST, "Requisição inválida"),
            ApiError::NotFound => (StatusCode::NOT_FOUND, "Não encontrado"),
            ApiError::Unauthorized => (StatusCode::UNAUTHORIZED, "Não autorizado"),
            ApiError::Blockchain(_) => (StatusCode::BAD_GATEWAY, "Erro de blockchain"),
            ApiError::Validation(_) => (StatusCode::UNPROCESSABLE_ENTITY, "Erro de validação"),
        };

        let body = Json(json!({
            "success": false,
            "error": error_message,
            "message": self.to_string(),
            "timestamp": chrono::Utc::now().to_rfc3339()
        }));

        (status, body).into_response()
    }
}
