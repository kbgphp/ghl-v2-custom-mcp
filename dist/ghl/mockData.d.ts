import { Contact, CustomFieldDefinition, Workflow, Calendar } from "./types.js";
export declare class MockDataStore {
    private customFields;
    private tags;
    private contacts;
    private workflows;
    private calendars;
    getCustomFields(): CustomFieldDefinition[];
    getTags(): string[];
    addTag(tag: string): void;
    getContacts(): Contact[];
    searchContacts(params: {
        query?: string;
        email?: string;
        phone?: string;
        tags?: string[];
        limit?: number;
        skip?: number;
    }): {
        contacts: Contact[];
        total: number;
    };
    getContactById(id: string): Contact | undefined;
    getContactByEmailOrPhone(email?: string, phone?: string): Contact | undefined;
    createContact(data: Partial<Contact> & {
        email: string;
    }): Contact;
    updateContact(id: string, updates: Partial<Contact>): Contact | undefined;
    applyTagsToContact(id: string, tagsToAdd: string[], tagsToRemove?: string[]): Contact | undefined;
    getWorkflows(): Workflow[];
    getWorkflowById(id: string): Workflow | undefined;
    getCalendars(): Calendar[];
    getCalendarById(id: string): Calendar | undefined;
    private enrichContact;
}
export declare const mockStore: MockDataStore;
