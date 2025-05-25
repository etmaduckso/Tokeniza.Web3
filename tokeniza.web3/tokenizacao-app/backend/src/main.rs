use axum::{
    http::{header::CONTENT_TYPE, Method},
    response::Json,
    routing::get,
    Router,
};
use serde_json::{json, Value};
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};
use tracing::{info, Level};
use tracing_subscriber;

mod api;
mod config;
mod handlers;
mod models;
mod services;

use config::AppConfig;
use services::blockchain::BlockchainService;

#[derive(Clone)]
pub struct AppState {
    pub blockchain_service: Arc<BlockchainService>,
    pub config: Arc<AppConfig>,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_max_level(Level::INFO)
        .init();

    info!("🚀 Iniciando Tokenização Backend Server");

    // Load configuration
    let config = Arc::new(AppConfig::new()?);
    
    // Initialize blockchain service
    let blockchain_service = Arc::new(BlockchainService::new(&config).await?);

    let app_state = AppState {
        blockchain_service,
        config: config.clone(),
    };

    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers([CONTENT_TYPE]);

    // Build router
    let app = Router::new()
        .route("/", get(health_check))
        .route("/health", get(health_check))
        .nest("/api/v1", api::routes())
        .layer(cors)
        .with_state(app_state);

    let port = config.server.port;
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port)).await?;
    
    info!("🌐 Servidor rodando em http://localhost:{}", port);
    info!("📚 API Documentation: http://localhost:{}/api/v1/docs", port);

    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "ok",
        "service": "Tokenização Backend",
        "version": "0.1.0",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
