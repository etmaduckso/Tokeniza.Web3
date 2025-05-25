use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Asset {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub asset_type: AssetType,
    pub value: u64, // in wei
    pub total_supply: u64,
    pub available_supply: u64,
    pub token_address: Option<String>,
    pub owner: String,
    pub metadata: AssetMetadata,
    pub status: AssetStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum AssetType {
    RealEstate,
    Art,
    Commodity,
    Stock,
    Bond,
    Other(String),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AssetMetadata {
    pub location: Option<String>,
    pub valuation_date: DateTime<Utc>,
    pub appraiser: Option<String>,
    pub documents: Vec<String>,
    pub images: Vec<String>,
    pub additional_info: std::collections::HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum AssetStatus {
    Draft,
    PendingApproval,
    Approved,
    Tokenized,
    Trading,
    Sold,
    Retired,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateAssetRequest {
    pub name: String,
    pub description: String,
    pub asset_type: AssetType,
    pub value: u64,
    pub total_supply: u64,
    pub metadata: AssetMetadata,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenizeAssetRequest {
    pub asset_id: Uuid,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: u64,
}
