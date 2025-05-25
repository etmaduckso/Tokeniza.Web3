use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AppConfig {
    pub server: ServerConfig,
    pub blockchain: BlockchainConfig,
    pub database: DatabaseConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServerConfig {
    pub host: String,
    pub port: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlockchainConfig {
    pub rpc_url: String,
    pub chain_id: u64,
    pub private_key: Option<String>,
    pub contract_addresses: ContractAddresses,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContractAddresses {
    pub asset_token: Option<String>,
    pub marketplace: Option<String>,
    pub waitlist: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DatabaseConfig {
    pub url: String,
}

impl AppConfig {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        dotenv::dotenv().ok();

        let config = Self {
            server: ServerConfig {
                host: env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
                port: env::var("PORT")
                    .unwrap_or_else(|_| "8080".to_string())
                    .parse()?,
            },
            blockchain: BlockchainConfig {
                rpc_url: env::var("RPC_URL")
                    .unwrap_or_else(|_| "http://localhost:8545".to_string()),
                chain_id: env::var("CHAIN_ID")
                    .unwrap_or_else(|_| "1337".to_string())
                    .parse()?,
                private_key: env::var("PRIVATE_KEY").ok(),
                contract_addresses: ContractAddresses {
                    asset_token: env::var("ASSET_TOKEN_ADDRESS").ok(),
                    marketplace: env::var("MARKETPLACE_ADDRESS").ok(),
                    waitlist: env::var("WAITLIST_ADDRESS").ok(),
                },
            },
            database: DatabaseConfig {
                url: env::var("DATABASE_URL")
                    .unwrap_or_else(|_| "sqlite:./tokenizacao.db".to_string()),
            },
        };

        Ok(config)
    }
}
