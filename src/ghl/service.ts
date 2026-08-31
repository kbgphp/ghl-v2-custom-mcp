import { CONFIG } from "../config.js";
import { ghlClient, GHLClient } from "./client.js";
import { mockStore, MockDataStore } from "./mockData.js";
import {
  Contact,
  CustomFieldDefinition,
  SearchContactsParams,
  UpdateContactParams,
  CreateContactParams,
  Workflow,
  Calendar
} from "./types.js";

export class GHLService {
  private client: GHLClient;
  private store: MockDataStore;

  constructor(client: GHLClient = ghlClient, store: MockDataStore = mockStore) {
    this.client = client;
    this.store = store;
  }

  public getMockStore() {
    return this.store;
  }

  public async checkLiveStatus(): Promise<{ live: boolean; reason?: string }> {
    if (CONFIG.mockMode === "true") {
      return { live: false, reason: "Forced mock mode (MOCK_MODE=true)" };
    }

    // Attempt live GHL API call
    try {
      await this.client.searchContacts({ limit: 1 });
      return { live: true, reason: "GoHighLevel API v2 connected successfully" };
    } catch (err: any) {
      const isForcedLive = CONFIG.mockMode === "false";
      return {
        live: false,
        reason: isForcedLive
          ? `Strict Live Mode Active. GHL API error: ${err.message}`
          : `GHL API error: ${err.message}. Operating in sandbox fallback.`
      };
    }
  }

  // --- Contacts ---

  public async searchContacts(params: SearchContactsParams): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    total: number;
    contacts: Contact[];
  }> {
    if (CONFIG.mockMode === "false") {
      const liveRes = await this.client.searchContacts({
        query: params.query || params.email || params.phone,
        locationId: params.locationId,
        limit: params.limit,
        skip: params.skip
      });
      const contacts = liveRes.contacts || liveRes || [];
      return {
        source: "live_ghl_v2",
        total: liveRes.total !== undefined ? liveRes.total : contacts.length,
        contacts
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const liveRes = await this.client.searchContacts({
          query: params.query || params.email || params.phone,
          locationId: params.locationId,
          limit: params.limit,
          skip: params.skip
        });
        const contacts = liveRes.contacts || liveRes || [];
        return {
          source: "live_ghl_v2",
          total: liveRes.total !== undefined ? liveRes.total : contacts.length,
          contacts
        };
      } catch (err) {
        console.warn("[GHL Service] Live search failed, falling back to mock sandbox.");
      }
    }

    // Sandbox fallback
    const result = this.store.searchContacts(params);
    return {
      source: "sandbox_store",
      total: result.total,
      contacts: result.contacts
    };
  }

  public async getContactWithCustomFields(params: {
    contactId?: string;
    email?: string;
    phone?: string;
    locationId?: string;
  }): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    contact: Contact;
    customFieldDefinitions?: CustomFieldDefinition[];
  }> {
    if (CONFIG.mockMode === "false") {
      if (!params.contactId) {
        // Look up by search first
        const searchRes = await this.client.searchContacts({
          query: params.email || params.phone,
          locationId: params.locationId,
          limit: 1
        });
        const contacts = searchRes.contacts || searchRes || [];
        if (!contacts.length) {
          throw new Error(`No contact found in live GHL with email/phone: ${params.email || params.phone}`);
        }
        params.contactId = contacts[0].id;
      }

      const liveContact = await this.client.getContact(params.contactId!);
      const contactData = liveContact.contact || liveContact;

      let customFieldDefinitions: CustomFieldDefinition[] = [];
      try {
        const defsRes = await this.client.getCustomFields(params.locationId);
        customFieldDefinitions = defsRes.customFields || defsRes || [];
      } catch (e) {
        // optional custom fields fetch
      }

      return {
        source: "live_ghl_v2",
        contact: contactData,
        customFieldDefinitions
      };
    }

    if (CONFIG.mockMode === "auto" && params.contactId) {
      try {
        const liveContact = await this.client.getContact(params.contactId);
        const contactData = liveContact.contact || liveContact;
        return {
          source: "live_ghl_v2",
          contact: contactData
        };
      } catch (err) {
        console.warn("[GHL Service] Live contact lookup failed, falling back to mock sandbox.");
      }
    }

    // Sandbox fallback
    let contact: Contact | undefined;
    if (params.contactId) {
      contact = this.store.getContactById(params.contactId);
    }
    if (!contact && (params.email || params.phone)) {
      contact = this.store.getContactByEmailOrPhone(params.email, params.phone);
    }

    if (!contact) {
      throw new Error(
        `Contact not found with identifier: ${params.contactId || params.email || params.phone || "unknown"}`
      );
    }

    return {
      source: "sandbox_store",
      contact,
      customFieldDefinitions: this.store.getCustomFields()
    };
  }

  public async updateContact(params: UpdateContactParams): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    success: boolean;
    contact: Contact;
  }> {
    if (CONFIG.mockMode === "false") {
      const customFields = [...(params.customFields || [])];
      if (params.customFieldMap) {
        for (const [key, value] of Object.entries(params.customFieldMap)) {
          customFields.push({ key, field_value: value, value });
        }
      }

      const updatePayload = {
        firstName: params.firstName,
        lastName: params.lastName,
        name: params.name,
        email: params.email,
        phone: params.phone,
        companyName: params.companyName,
        address1: params.address1,
        city: params.city,
        state: params.state,
        postalCode: params.postalCode,
        website: params.website,
        tags: params.tags,
        customFields
      };

      const liveRes = await this.client.updateContact(params.contactId, updatePayload);
      return {
        source: "live_ghl_v2",
        success: true,
        contact: liveRes.contact || liveRes
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const customFields = [...(params.customFields || [])];
        if (params.customFieldMap) {
          for (const [key, value] of Object.entries(params.customFieldMap)) {
            customFields.push({ key, field_value: value, value });
          }
        }

        const updatePayload = {
          firstName: params.firstName,
          lastName: params.lastName,
          name: params.name,
          email: params.email,
          phone: params.phone,
          companyName: params.companyName,
          address1: params.address1,
          city: params.city,
          state: params.state,
          postalCode: params.postalCode,
          website: params.website,
          tags: params.tags,
          customFields
        };

        const liveRes = await this.client.updateContact(params.contactId, updatePayload);
        return {
          source: "live_ghl_v2",
          success: true,
          contact: liveRes.contact || liveRes
        };
      } catch (err) {
        console.warn("[GHL Service] Live update failed, falling back to mock sandbox.");
      }
    }

    // Sandbox fallback
    const customFields = [...(params.customFields || [])];
    if (params.customFieldMap) {
      const defs = this.store.getCustomFields();
      for (const [key, value] of Object.entries(params.customFieldMap)) {
        const foundDef = defs.find(
          (d) => d.name.toLowerCase() === key.toLowerCase() || d.fieldKey === key || d.id === key
        );
        customFields.push({
          id: foundDef?.id || key,
          key: foundDef?.fieldKey || key,
          field_value: value,
          value
        });
      }
    }

    const updated = this.store.updateContact(params.contactId, {
      ...params,
      customFields
    });

    if (!updated) {
      throw new Error(`Cannot update contact: ID ${params.contactId} not found.`);
    }

    return {
      source: "sandbox_store",
      success: true,
      contact: updated
    };
  }

  public async createContact(params: CreateContactParams): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    success: boolean;
    contact: Contact;
  }> {
    if (CONFIG.mockMode === "false") {
      const liveRes = await this.client.createContact(params);
      return {
        source: "live_ghl_v2",
        success: true,
        contact: liveRes.contact || liveRes
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const liveRes = await this.client.createContact(params);
        return {
          source: "live_ghl_v2",
          success: true,
          contact: liveRes.contact || liveRes
        };
      } catch (err) {
        console.warn("[GHL Service] Live create failed, falling back to mock sandbox.");
      }
    }

    const created = this.store.createContact(params);
    return {
      source: "sandbox_store",
      success: true,
      contact: created
    };
  }

  // --- Tags ---

  public async getTags(params?: { locationId?: string; contactId?: string }): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    tags: string[];
    contactTags?: string[];
  }> {
    if (CONFIG.mockMode === "false") {
      const liveTags = await this.client.getTags(params?.locationId);
      const tagList = Array.isArray(liveTags) ? liveTags : liveTags.tags || [];
      return {
        source: "live_ghl_v2",
        tags: tagList
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const liveTags = await this.client.getTags(params?.locationId);
        const tagList = Array.isArray(liveTags) ? liveTags : liveTags.tags || [];
        return {
          source: "live_ghl_v2",
          tags: tagList
        };
      } catch (err) {
        console.warn("[GHL Service] Live tags fetch failed, falling back to mock sandbox.");
      }
    }

    const allTags = this.store.getTags();
    let contactTags: string[] | undefined;
    if (params?.contactId) {
      const contact = this.store.getContactById(params.contactId);
      contactTags = contact?.tags;
    }

    return {
      source: "sandbox_store",
      tags: allTags,
      contactTags
    };
  }

  public async applyTags(params: {
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
  }> {
    if (CONFIG.mockMode === "false") {
      if (params.tags && params.tags.length > 0) {
        await this.client.addTagsToContact(params.contactId, params.tags);
      }
      if (params.removeTags && params.removeTags.length > 0) {
        await this.client.removeTagsFromContact(params.contactId, params.removeTags);
      }
      const updated = await this.client.getContact(params.contactId);
      const c = updated.contact || updated;
      return {
        source: "live_ghl_v2",
        success: true,
        contactId: params.contactId,
        activeTags: c.tags || [],
        tagsAdded: params.tags,
        tagsRemoved: params.removeTags
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        if (params.tags && params.tags.length > 0) {
          await this.client.addTagsToContact(params.contactId, params.tags);
        }
        if (params.removeTags && params.removeTags.length > 0) {
          await this.client.removeTagsFromContact(params.contactId, params.removeTags);
        }
        const updated = await this.client.getContact(params.contactId);
        const c = updated.contact || updated;
        return {
          source: "live_ghl_v2",
          success: true,
          contactId: params.contactId,
          activeTags: c.tags || [],
          tagsAdded: params.tags,
          tagsRemoved: params.removeTags
        };
      } catch (err) {
        console.warn("[GHL Service] Live apply tags failed, falling back to mock sandbox.");
      }
    }

    const updated = this.store.applyTagsToContact(params.contactId, params.tags, params.removeTags);
    if (!updated) {
      throw new Error(`Contact with ID ${params.contactId} not found to apply tags.`);
    }

    return {
      source: "sandbox_store",
      success: true,
      contactId: params.contactId,
      activeTags: updated.tags,
      tagsAdded: params.tags,
      tagsRemoved: params.removeTags
    };
  }

  // --- Custom Field Definitions ---

  public async getCustomFields(locationId?: string): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    customFields: CustomFieldDefinition[];
  }> {
    if (CONFIG.mockMode === "false") {
      const liveFields = await this.client.getCustomFields(locationId);
      const fields = Array.isArray(liveFields) ? liveFields : liveFields.customFields || [];
      return {
        source: "live_ghl_v2",
        customFields: fields
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const liveFields = await this.client.getCustomFields(locationId);
        const fields = Array.isArray(liveFields) ? liveFields : liveFields.customFields || [];
        return {
          source: "live_ghl_v2",
          customFields: fields
        };
      } catch (err) {
        console.warn("[GHL Service] Live custom fields failed, falling back to mock sandbox.");
      }
    }

    return {
      source: "sandbox_store",
      customFields: this.store.getCustomFields()
    };
  }

  // --- Workflows ---

  public async getWorkflows(params?: {
    locationId?: string;
    workflowId?: string;
  }): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    workflows: Workflow[];
  }> {
    if (CONFIG.mockMode === "false") {
      const liveWorkflows = await this.client.getWorkflows(params?.locationId);
      const wfList = Array.isArray(liveWorkflows) ? liveWorkflows : liveWorkflows.workflows || [];
      return {
        source: "live_ghl_v2",
        workflows: wfList
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        const liveWorkflows = await this.client.getWorkflows(params?.locationId);
        const wfList = Array.isArray(liveWorkflows) ? liveWorkflows : liveWorkflows.workflows || [];
        return {
          source: "live_ghl_v2",
          workflows: wfList
        };
      } catch (err) {
        console.warn("[GHL Service] Live workflows failed, falling back to mock sandbox.");
      }
    }

    if (params?.workflowId) {
      const single = this.store.getWorkflowById(params.workflowId);
      return {
        source: "sandbox_store",
        workflows: single ? [single] : []
      };
    }

    return {
      source: "sandbox_store",
      workflows: this.store.getWorkflows()
    };
  }

  // --- Calendars ---

  public async getCalendars(params?: {
    locationId?: string;
    calendarId?: string;
  }): Promise<{
    source: "live_ghl_v2" | "sandbox_store";
    calendars: Calendar[];
  }> {
    if (CONFIG.mockMode === "false") {
      if (params?.calendarId) {
        const liveCal = await this.client.getCalendarById(params.calendarId);
        return {
          source: "live_ghl_v2",
          calendars: [liveCal.calendar || liveCal]
        };
      }
      const liveCals = await this.client.getCalendars(params?.locationId);
      const calList = Array.isArray(liveCals) ? liveCals : liveCals.calendars || [];
      return {
        source: "live_ghl_v2",
        calendars: calList
      };
    }

    if (CONFIG.mockMode === "auto") {
      try {
        if (params?.calendarId) {
          const liveCal = await this.client.getCalendarById(params.calendarId);
          return {
            source: "live_ghl_v2",
            calendars: [liveCal.calendar || liveCal]
          };
        }
        const liveCals = await this.client.getCalendars(params?.locationId);
        const calList = Array.isArray(liveCals) ? liveCals : liveCals.calendars || [];
        return {
          source: "live_ghl_v2",
          calendars: calList
        };
      } catch (err) {
        console.warn("[GHL Service] Live calendars failed, falling back to mock sandbox.");
      }
    }

    if (params?.calendarId) {
      const single = this.store.getCalendarById(params.calendarId);
      return {
        source: "sandbox_store",
        calendars: single ? [single] : []
      };
    }

    return {
      source: "sandbox_store",
      calendars: this.store.getCalendars()
    };
  }
}

export const ghlService = new GHLService();
