use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::Json,
    routing::get,
    Router,
};
use serde_json::{json, Value};

use crate::AppState;

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/status", get(blockchain_status))
        .route("/balance/:address", get(get_balance))
        .route("/block", get(get_latest_block))
        .route("/gas-price", get(get_gas_price))
}

async fn blockchain_status(State(state): State<AppState>) -> Json<Value> {
    let is_connected = state.blockchain_service.is_connected();
    
    let status = if is_connected {
        match state.blockchain_service.get_block_number().await {
            Ok(block_number) => json!({
                "connected": true,
                "chain_id": state.config.blockchain.chain_id,
                "rpc_url": state.config.blockchain.rpc_url,
                "latest_block": block_number.to_string(),
                "contracts": {
                    "asset_token": state.config.blockchain.contract_addresses.asset_token,
                    "marketplace": state.config.blockchain.contract_addresses.marketplace,
                    "waitlist": state.config.blockchain.contract_addresses.waitlist
                }
            }),
            Err(e) => json!({
                "connected": false,
                "error": format!("Erro ao obter bloco: {}", e)
            })
        }
    } else {
        json!({
            "connected": false,
            "error": "Não conectado à blockchain"
        })
    };

    Json(json!({
        "success": true,
        "data": status
    }))
}

async fn get_balance(
    State(state): State<AppState>,
    Path(address): Path<String>,
) -> Result<Json<Value>, StatusCode> {
    if !crate::services::blockchain::is_valid_address(&address) {
        return Err(StatusCode::BAD_REQUEST);
    }

    match state.blockchain_service.get_balance(&address).await {
        Ok(balance) => {
            Ok(Json(json!({
                "success": true,
                "data": {
                    "address": address,
                    "balance_wei": balance.to_string(),
                    "balance_eth": format!("{:.6}", balance.as_u128() as f64 / 1e18)
                }
            })))
        },
        Err(e) => {
            tracing::error!("Erro ao obter saldo: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn get_latest_block(State(state): State<AppState>) -> Result<Json<Value>, StatusCode> {
    match state.blockchain_service.get_block_number().await {
        Ok(block_number) => {
            Ok(Json(json!({
                "success": true,
                "data": {
                    "block_number": block_number.to_string(),
                    "timestamp": chrono::Utc::now().to_rfc3339()
                }
            })))
        },
        Err(e) => {
            tracing::error!("Erro ao obter bloco: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}

async fn get_gas_price(State(_state): State<AppState>) -> Json<Value> {
    // Em produção, obter o preço real do gas
    let gas_price = "20000000000"; // 20 gwei simulado

    Json(json!({
        "success": true,
        "data": {
            "gas_price_wei": gas_price,
            "gas_price_gwei": "20",
            "timestamp": chrono::Utc::now().to_rfc3339()
        }
    }))
}
