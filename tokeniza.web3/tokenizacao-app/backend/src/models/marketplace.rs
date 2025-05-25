use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Listing {
    pub id: Uuid,
    pub asset_id: Uuid,
    pub seller: String,
    pub price: u64, // in wei
    pub quantity: u64,
    pub status: ListingStatus,
    pub created_at: DateTime<Utc>,
    pub expires_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ListingStatus {
    Active,
    Sold,
    Cancelled,
    Expired,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateListingRequest {
    pub asset_id: Uuid,
    pub price: u64,
    pub quantity: u64,
    pub expires_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PurchaseRequest {
    pub listing_id: Uuid,
    pub quantity: u64,
    pub buyer: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub id: Uuid,
    pub listing_id: Uuid,
    pub buyer: String,
    pub seller: String,
    pub price: u64,
    pub quantity: u64,
    pub tx_hash: Option<String>,
    pub status: TransactionStatus,
    pub created_at: DateTime<Utc>,
    pub completed_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TransactionStatus {
    Pending,
    Confirmed,
    Failed,
    Cancelled,
}
