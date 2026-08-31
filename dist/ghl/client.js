import axios from "axios";
import { CONFIG } from "../config.js";
export class GHLClient {
    http;
    token;
    baseUrl;
    apiVersion;
    constructor(token, baseUrl, apiVersion) {
        this.token = token || CONFIG.ghlToken;
        this.baseUrl = baseUrl || CONFIG.ghlBaseUrl;
        this.apiVersion = apiVersion || CONFIG.ghlApiVersion;
        this.http = axios.create({
            baseURL: this.baseUrl,
            timeout: 15000,
            headers: {
                Authorization: `Bearer ${this.token}`,
                Version: this.apiVersion,
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    }
    setToken(token) {
        this.token = token;
        this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    async request(config) {
        try {
            console.log(`[GHL Live API] ${config.method?.toUpperCase()} ${this.baseUrl}${config.url}`);
            const response = await this.http.request(config);
            return response.data;
        }
        catch (err) {
            const status = err.response?.status;
            const data = err.response?.data;
            console.error(`[GHL Live API Error] ${config.method?.toUpperCase()} ${config.url} - Status ${status}:`, data || err.message);
            const errorMsg = data?.message || data?.msg || err.message || "Unknown GHL API Error";
            throw new Error(`GoHighLevel API v2 Error (${status || 'Network'}): ${errorMsg}. Details: ${JSON.stringify(data || {})}`);
        }
    }
    // Contacts
    async searchContacts(params) {
        const locId = params.locationId || CONFIG.ghlLocationId;
        return this.request({
            method: "GET",
            url: "/contacts/",
            params: {
                locationId: locId,
                query: params.query,
                limit: params.limit || 20,
                skip: params.skip || 0
            }
        });
    }
    async getContact(contactId) {
        return this.request({
            method: "GET",
            url: `/contacts/${contactId}`
        });
    }
    async createContact(data) {
        return this.request({
            method: "POST",
            url: "/contacts/",
            data: {
                locationId: data.locationId || CONFIG.ghlLocationId,
                ...data
            }
        });
    }
    async updateContact(contactId, data) {
        return this.request({
            method: "PUT",
            url: `/contacts/${contactId}`,
            data
        });
    }
    // Tags
    async getTags(locationId) {
        const locId = locationId || CONFIG.ghlLocationId;
        return this.request({
            method: "GET",
            url: `/locations/${locId}/tags`,
            headers: { Version: "2021-07-28" }
        });
    }
    async addTagsToContact(contactId, tags) {
        return this.request({
            method: "POST",
            url: `/contacts/${contactId}/tags`,
            data: { tags }
        });
    }
    async removeTagsFromContact(contactId, tags) {
        return this.request({
            method: "DELETE",
            url: `/contacts/${contactId}/tags`,
            data: { tags }
        });
    }
    // Custom Fields
    async getCustomFields(locationId) {
        const locId = locationId || CONFIG.ghlLocationId;
        return this.request({
            method: "GET",
            url: `/locations/${locId}/customFields`,
            headers: { Version: "v3" }
        });
    }
    // Workflows
    async getWorkflows(locationId) {
        const locId = locationId || CONFIG.ghlLocationId;
        return this.request({
            method: "GET",
            url: "/workflows/",
            params: { locationId: locId }
        });
    }
    // Calendars
    async getCalendars(locationId) {
        const locId = locationId || CONFIG.ghlLocationId;
        return this.request({
            method: "GET",
            url: "/calendars/",
            params: { locationId: locId }
        });
    }
    async getCalendarById(calendarId) {
        return this.request({
            method: "GET",
            url: `/calendars/${calendarId}`
        });
    }
}
export const ghlClient = new GHLClient();
