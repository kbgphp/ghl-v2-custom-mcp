import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CONFIG } from "../config.js";

export class GHLClient {
  private http: AxiosInstance;
  private token: string;
  private baseUrl: string;
  private apiVersion: string;

  constructor(token?: string, baseUrl?: string, apiVersion?: string) {
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

  public setToken(token: string) {
    this.token = token;
    this.http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      console.log(`[GHL Live API] ${config.method?.toUpperCase()} ${this.baseUrl}${config.url}`);
      const response = await this.http.request<T>(config);
      return response.data;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;
      console.error(`[GHL Live API Error] ${config.method?.toUpperCase()} ${config.url} - Status ${status}:`, data || err.message);
      
      const errorMsg = data?.message || data?.msg || err.message || "Unknown GHL API Error";
      throw new Error(`GoHighLevel API v2 Error (${status || 'Network'}): ${errorMsg}. Details: ${JSON.stringify(data || {})}`);
    }
  }

  // Contacts
  public async searchContacts(params: {
    query?: string;
    locationId?: string;
    limit?: number;
    skip?: number;
  }) {
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

  public async getContact(contactId: string) {
    return this.request({
      method: "GET",
      url: `/contacts/${contactId}`
    });
  }

  public async createContact(data: any) {
    return this.request({
      method: "POST",
      url: "/contacts/",
      data: {
        locationId: data.locationId || CONFIG.ghlLocationId,
        ...data
      }
    });
  }

  public async updateContact(contactId: string, data: any) {
    return this.request({
      method: "PUT",
      url: `/contacts/${contactId}`,
      data
    });
  }

  // Tags
  public async getTags(locationId?: string) {
    const locId = locationId || CONFIG.ghlLocationId;
    return this.request({
      method: "GET",
      url: `/locations/${locId}/tags`,
      headers: { Version: "2021-07-28" }
    });
  }

  public async addTagsToContact(contactId: string, tags: string[]) {
    return this.request({
      method: "POST",
      url: `/contacts/${contactId}/tags`,
      data: { tags }
    });
  }

  public async removeTagsFromContact(contactId: string, tags: string[]) {
    return this.request({
      method: "DELETE",
      url: `/contacts/${contactId}/tags`,
      data: { tags }
    });
  }

  // Custom Fields
  public async getCustomFields(locationId?: string) {
    const locId = locationId || CONFIG.ghlLocationId;
    return this.request({
      method: "GET",
      url: `/locations/${locId}/customFields`,
      headers: { Version: "v3" }
    });
  }

  // Workflows
  public async getWorkflows(locationId?: string) {
    const locId = locationId || CONFIG.ghlLocationId;
    return this.request({
      method: "GET",
      url: "/workflows/",
      params: { locationId: locId }
    });
  }

  // Calendars
  public async getCalendars(locationId?: string) {
    const locId = locationId || CONFIG.ghlLocationId;
    return this.request({
      method: "GET",
      url: "/calendars/",
      params: { locationId: locId }
    });
  }

  public async getCalendarById(calendarId: string) {
    return this.request({
      method: "GET",
      url: `/calendars/${calendarId}`
    });
  }
}

export const ghlClient = new GHLClient();
