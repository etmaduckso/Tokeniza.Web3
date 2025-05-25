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
    models::{Asset, CreateAssetRequest, TokenizeAssetRequest, AssetStatus},
    AppState,
};

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/", get(list_assets))
        .route("/", post(create_asset))
        .route("/:id", get(get_asset))
        .route("/:id/tokenize", post(tokenize_asset))
}

async fn list_assets(State(_state): State<AppState>) -> Json<Value> {
    // Em produção, isso viria do banco de dados
    let assets = vec![
        json!({
            "id": Uuid::new_v4(),
            "name": "Imóvel Comercial - São Paulo",
            "description": "Prédio comercial de 5 andares na região central",
            "asset_type": "RealEstate",
            "value": "5000000000000000000000000", // 5M ETH em wei
            "status": "Tokenized"
        }),
        json!({
            "id": Uuid::new_v4(),
            "name": "Arte Digital NFT",
            "description": "Coleção exclusiva de arte digital",
            "asset_type": "Art",
            "value": "1000000000000000000000", // 1K ETH em wei
            "status": "Trading"
        })
    ];

    Json(json!({
        "success": true,
        "data": assets,
        "count": assets.len()
    }))
}

async fn create_asset(
    State(_state): State<AppState>,
    Json(request): Json<CreateAssetRequest>,
) -> Result<Json<Value>, StatusCode> {
    let asset_id = Uuid::new_v4();
    
    // Em produção, salvar no banco de dados
    let asset = json!({
        "id": asset_id,
        "name": request.name,
        "description": request.description,
        "asset_type": request.asset_type,
        "value": request.value,
        "total_supply": request.total_supply,
        "available_supply": request.total_supply,
        "status": "Draft",
        "created_at": chrono::Utc::now().to_rfc3339()
    });

    Ok(Json(json!({
        "success": true,
        "message": "Ativo criado com sucesso",
        "data": asset
    })))
}

async fn get_asset(
    State(_state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<Json<Value>, StatusCode> {
    // Em produção, buscar no banco de dados
    let asset = json!({
        "id": id,
        "name": "Imóvel Exemplo",
        "description": "Descrição do ativo",
        "asset_type": "RealEstate",
        "value": "1000000000000000000000000",
        "status": "Tokenized",
        "token_address": "0x1234567890123456789012345678901234567890"
    });

    Ok(Json(json!({
        "success": true,
        "data": asset
    })))
}

async fn tokenize_asset(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(request): Json<TokenizeAssetRequest>,
) -> Result<Json<Value>, StatusCode> {
    // Simular busca do ativo no banco
    let asset = Asset {
        id,
        name: "Ativo Exemplo".to_string(),
        description: "Descrição".to_string(),
        asset_type: crate::models::AssetType::RealEstate,
        value: 1000000,
        total_supply: request.total_supply,
        available_supply: request.total_supply,
        token_address: None,
        owner: "0x123".to_string(),
        metadata: crate::models::AssetMetadata {
            location: Some("São Paulo".to_string()),
            valuation_date: chrono::Utc::now(),
            appraiser: None,
            documents: vec![],
            images: vec![],
            additional_info: std::collections::HashMap::new(),
        },
        status: AssetStatus::Approved,
        created_at: chrono::Utc::now(),
        updated_at: chrono::Utc::now(),
    };

    match state.blockchain_service.deploy_asset_token(&request, &asset).await {
        Ok(contract_address) => {
            Ok(Json(json!({
                "success": true,
                "message": "Ativo tokenizado com sucesso",
                "data": {
                    "asset_id": id,
                    "contract_address": contract_address,
                    "symbol": request.symbol,
                    "decimals": request.decimals,
                    "total_supply": request.total_supply
                }
            })))
        },
        Err(e) => {
            tracing::error!("Erro ao tokenizar ativo: {}", e);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}
