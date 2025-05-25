use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::Json,
    routing::{get, post},
    Router,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    models::{CreateListingRequest, PurchaseRequest},
    AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/listings", get(list_listings))
        .route("/listings", post(create_listing))
        .route("/listings/:id", get(get_listing))
        .route("/purchase", post(purchase_tokens))
        .route("/transactions", get(list_transactions))
}

async fn list_listings(State(_state): State<AppState>) -> Json<Value> {
    let listings = vec![
        json!({
            "id": Uuid::new_v4(),
            "asset_id": Uuid::new_v4(),
            "seller": "0x1234567890123456789012345678901234567890",
            "price": "1000000000000000000", // 1 ETH em wei
            "quantity": 100,
            "status": "Active",
            "created_at": chrono::Utc::now().to_rfc3339()
        }),
        json!({
            "id": Uuid::new_v4(),
            "asset_id": Uuid::new_v4(),
            "seller": "0x0987654321098765432109876543210987654321",
            "price": "500000000000000000", // 0.5 ETH em wei
            "quantity": 50,
            "status": "Active",
            "created_at": chrono::Utc::now().to_rfc3339()
        })
    ];

    Json(json!({
        "success": true,
        "data": listings,
        "count": listings.len()
    }))
}

async fn create_listing(
    State(_state): State<AppState>,
    Json(request): Json<CreateListingRequest>,
) -> Result<Json<Value>, StatusCode> {
    let listing_id = Uuid::new_v4();
    
    tracing::info!("📋 Criando nova oferta: {} tokens por {} wei", request.quantity, request.price);

    // Em produção, validar se o vendedor possui os tokens
    // e salvar no banco de dados
    
    let listing = json!({
        "id": listing_id,
        "asset_id": request.asset_id,
        "price": request.price,
        "quantity": request.quantity,
        "status": "Active",
        "created_at": chrono::Utc::now().to_rfc3339(),
        "expires_at": request.expires_at
    });

    Ok(Json(json!({
        "success": true,
        "message": "Oferta criada com sucesso",
        "data": listing
    })))
}

async fn get_listing(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<Json<Value>, StatusCode> {
    let listing = json!({
        "id": id,
        "asset_id": Uuid::new_v4(),
        "seller": "0x1234567890123456789012345678901234567890",
        "price": "1000000000000000000",
        "quantity": 100,
        "status": "Active",
        "created_at": chrono::Utc::now().to_rfc3339()
    });

    Ok(Json(json!({
        "success": true,
        "data": listing
    })))
}

async fn purchase_tokens(
    State(state): State<AppState>,
    Json(request): Json<PurchaseRequest>,
) -> Result<Json<Value>, StatusCode> {
    tracing::info!("💰 Processando compra: {} tokens para {}", request.quantity, request.buyer);

    // Validar se o comprador tem fundos suficientes
    if !crate::services::blockchain::is_valid_address(&request.buyer) {
        return Err(StatusCode::BAD_REQUEST);
    }

    // Simular transação na blockchain
    match state.blockchain_service.transfer_tokens(
        "0x1234567890123456789012345678901234567890", // contract_address
        "0x0987654321098765432109876543210987654321", // seller
        &request.buyer,
        ethers::types::U256::from(request.quantity),
    ).await {
        Ok(tx_hash) => {
            let transaction = json!({
                "id": Uuid::new_v4(),
                "listing_id": request.listing_id,
                "buyer": request.buyer,
                "quantity": request.quantity,
                "tx_hash": tx_hash,
                "status": "Confirmed",
                "created_at": chrono::Utc::now().to_rfc3339()
            });

            Ok(Json(json!({
                "success": true,
                "message": "Compra realizada com sucesso",
                "data": transaction
            })))
        },
        Err(e) => {
            tracing::error!("Erro na compra: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn list_transactions(State(_state): State<AppState>) -> Json<Value> {
    let transactions = vec![
        json!({
            "id": Uuid::new_v4(),
            "listing_id": Uuid::new_v4(),
            "buyer": "0x1111111111111111111111111111111111111111",
            "seller": "0x2222222222222222222222222222222222222222",
            "price": "1000000000000000000",
            "quantity": 10,
            "tx_hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            "status": "Confirmed",
            "created_at": chrono::Utc::now().to_rfc3339()
        })
    ];

    Json(json!({
        "success": true,
        "data": transactions,
        "count": transactions.len()
    }))
}
