use axum::{
    routing::get,
    Router,
};

mod assets;
mod marketplace;
mod waitlist;
mod blockchain;

use crate::AppState;

pub fn routes() -> Router<AppState> {
    Router::new()
        .route("/docs", get(api_docs))
        .nest("/assets", assets::routes())
        .nest("/marketplace", marketplace::routes())
        .nest("/waitlist", waitlist::routes())
        .nest("/blockchain", blockchain::routes())
}

async fn api_docs() -> &'static str {
    r#"
# Tokenização API v1

## Endpoints disponíveis:

### Assets
- GET /api/v1/assets - Listar ativos
- POST /api/v1/assets - Criar ativo
- GET /api/v1/assets/{id} - Obter ativo
- POST /api/v1/assets/{id}/tokenize - Tokenizar ativo

### Marketplace
- GET /api/v1/marketplace/listings - Listar ofertas
- POST /api/v1/marketplace/listings - Criar oferta
- POST /api/v1/marketplace/purchase - Comprar tokens

### Waitlist
- POST /api/v1/waitlist - Adicionar à lista de espera
- GET /api/v1/waitlist - Listar entradas (admin)

### Blockchain
- GET /api/v1/blockchain/status - Status da blockchain
- GET /api/v1/blockchain/balance/{address} - Saldo de um endereço
"#
}
