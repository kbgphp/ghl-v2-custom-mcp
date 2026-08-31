import { AxiosRequestConfig } from "axios";
export declare class GHLClient {
    private http;
    private token;
    private baseUrl;
    private apiVersion;
    constructor(token?: string, baseUrl?: string, apiVersion?: string);
    setToken(token: string): void;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    searchContacts(params: {
        query?: string;
        locationId?: string;
        limit?: number;
        skip?: number;
    }): Promise<any>;
    getContact(contactId: string): Promise<any>;
    createContact(data: any): Promise<any>;
    updateContact(contactId: string, data: any): Promise<any>;
    getTags(locationId?: string): Promise<any>;
    addTagsToContact(contactId: string, tags: string[]): Promise<any>;
    removeTagsFromContact(contactId: string, tags: string[]): Promise<any>;
    getCustomFields(locationId?: string): Promise<any>;
    getWorkflows(locationId?: string): Promise<any>;
    getCalendars(locationId?: string): Promise<any>;
    getCalendarById(calendarId: string): Promise<any>;
}
export declare const ghlClient: GHLClient;
