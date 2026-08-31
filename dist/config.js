import dotenv from "dotenv";
dotenv.config();
export const CONFIG = {
    ghlToken: process.env.GHL_PRIVATE_INTEGRATION_TOKEN || "RxKyNyWpGZJkx5eYn7mc",
    ghlLocationId: process.env.GHL_LOCATION_ID || "loc_subaccount_ghp_01",
    ghlBaseUrl: process.env.GHL_API_BASE_URL || "https://services.leadconnectorhq.com",
    ghlApiVersion: process.env.GHL_API_VERSION || "2021-07-28",
    port: parseInt(process.env.PORT || "3000", 10),
    host: process.env.HOST || "0.0.0.0",
    mockMode: (process.env.MOCK_MODE || "auto").toLowerCase(),
};
