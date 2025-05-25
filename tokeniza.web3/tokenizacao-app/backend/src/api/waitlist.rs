use axum::{
    extract::State,
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    models::AddToWaitlistRequest,
    AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/", post(add_to_waitlist))
        .route("/", get(list_waitlist))
        .route("/stats", get(waitlist_stats))
}

async fn add_to_waitlist(
    State(_state): State<AppState>,
    Json(request): Json<AddToWaitlistRequest>,
) -> Result<Json<Value>, StatusCode> {
    // Validar email
    if !is_valid_email(&request.email) {
        return Err(StatusCode::BAD_REQUEST);
    }

    let entry_id = Uuid::new_v4();
    
    tracing::info!("📧 Adicionando {} à waitlist", request.email);

    // Em produção, salvar no banco de dados
    let waitlist_entry = json!({
        "id": entry_id,
        "email": request.email,
        "name": request.name,
        "interest_areas": request.interest_areas,
        "investment_range": request.investment_range,
        "status": "Pending",
        "created_at": chrono::Utc::now().to_rfc3339()
    });

    Ok(Json(json!({
        "success": true,
        "message": "Adicionado à lista de espera com sucesso!",
        "data": waitlist_entry
    })))
}

async fn list_waitlist(State(_state): State<AppState>) -> Json<Value> {
    // Em produção, isso seria protegido por autenticação admin
    let entries = vec![
        json!({
            "id": Uuid::new_v4(),
            "email": "user1@example.com",
            "name": "João Silva",
            "interest_areas": ["RealEstate", "Art"],
            "investment_range": "Range50K100K",
            "status": "Pending",
            "created_at": chrono::Utc::now().to_rfc3339()
        }),
        json!({
            "id": Uuid::new_v4(),
            "email": "user2@example.com",
            "name": "Maria Santos",
            "interest_areas": ["Commodity"],
            "investment_range": "Range100K500K",
            "status": "Contacted",
            "created_at": chrono::Utc::now().to_rfc3339()
        })
    ];

    Json(json!({
        "success": true,
        "data": entries,
        "count": entries.len()
    }))
}

async fn waitlist_stats(State(_state): State<AppState>) -> Json<Value> {
    // Em produção, calcular estatísticas reais do banco de dados
    let stats = json!({
        "total_entries": 1247,
        "pending": 892,
        "contacted": 245,
        "converted": 89,
        "unsubscribed": 21,
        "by_interest": {
            "RealEstate": 456,
            "Art": 234,
            "Commodity": 187,
            "Stock": 156,
            "Bond": 89,
            "Other": 125
        },
        "by_investment_range": {
            "Under10K": 234,
            "Range10K50K": 345,
            "Range50K100K": 267,
            "Range100K500K": 234,
            "Over500K": 167
        }
    });

    Json(json!({
        "success": true,
        "data": stats
    }))
}

fn is_valid_email(email: &str) -> bool {
    // Validação básica de email
    email.contains('@') && email.contains('.') && email.len() > 5
}
