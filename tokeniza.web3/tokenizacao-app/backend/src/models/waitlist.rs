use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WaitlistEntry {
    pub id: Uuid,
    pub email: String,
    pub name: Option<String>,
    pub interest_areas: Vec<String>,
    pub investment_range: Option<InvestmentRange>,
    pub status: WaitlistStatus,
    pub created_at: DateTime<Utc>,
    pub contacted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum InvestmentRange {
    Under10K,
    Range10K50K,
    Range50K100K,
    Range100K500K,
    Over500K,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum WaitlistStatus {
    Pending,
    Contacted,
    Converted,
    Unsubscribed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AddToWaitlistRequest {
    pub email: String,
    pub name: Option<String>,
    pub interest_areas: Vec<String>,
    pub investment_range: Option<InvestmentRange>,
}
