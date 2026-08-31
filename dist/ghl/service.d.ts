import { GHLClient } from "./client.js";
import { MockDataStore } from "./mockData.js";
import { Contact, CustomFieldDefinition, SearchContactsParams, UpdateContactParams, CreateContactParams, Workflow, Calendar } from "./types.js";
export declare class GHLService {
    private client;
    private store;
    constructor(client?: GHLClient, store?: MockDataStore);
    getMockStore(): MockDataStore;
    checkLiveStatus(): Promise<{
        live: boolean;
        reason?: string;
    }>;
    searchContacts(params: SearchContactsParams): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        total: number;
        contacts: Contact[];
    }>;
    getContactWithCustomFields(params: {
        contactId?: string;
        email?: string;
        phone?: string;
        locationId?: string;
    }): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        contact: Contact;
        customFieldDefinitions?: CustomFieldDefinition[];
    }>;
    updateContact(params: UpdateContactParams): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        success: boolean;
        contact: Contact;
    }>;
    createContact(params: CreateContactParams): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        success: boolean;
        contact: Contact;
    }>;
    getTags(params?: {
        locationId?: string;
        contactId?: string;
    }): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        tags: string[];
        contactTags?: string[];
    }>;
    applyTags(params: {
        contactId: string;
        tags: string[];
        removeTags?: string[];
        locationId?: string;
    }): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        success: boolean;
        contactId: string;
        activeTags: string[];
        tagsAdded: string[];
        tagsRemoved?: string[];
    }>;
    getCustomFields(locationId?: string): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        customFields: CustomFieldDefinition[];
    }>;
    getWorkflows(params?: {
        locationId?: string;
        workflowId?: string;
    }): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        workflows: Workflow[];
    }>;
    getCalendars(params?: {
        locationId?: string;
        calendarId?: string;
    }): Promise<{
        source: "live_ghl_v2" | "sandbox_store";
        calendars: Calendar[];
    }>;
}
export declare const ghlService: GHLService;
