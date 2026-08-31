export class MockDataStore {
    customFields = [
        {
            id: "cf_lead_score",
            name: "Lead Score",
            fieldKey: "contact.lead_score",
            dataType: "NUMERICAL",
            placeholder: "e.g. 85"
        },
        {
            id: "cf_budget_range",
            name: "Budget Range",
            fieldKey: "contact.budget_range",
            dataType: "RADIO_SELECT",
            picklistOptions: ["<$5,000", "$5,000-$20,000", "$20,000-$50,000", "$50,000+"]
        },
        {
            id: "cf_service_interest",
            name: "Service of Interest",
            fieldKey: "contact.service_interest",
            dataType: "MULTI_SELECT",
            picklistOptions: ["Marketing Automation", "CRM Implementation", "AI Sales Agents", "Custom Funnels"]
        },
        {
            id: "cf_decision_maker",
            name: "Decision Maker Status",
            fieldKey: "contact.decision_maker_status",
            dataType: "CHECKBOX"
        },
        {
            id: "cf_target_start_date",
            name: "Target Start Date",
            fieldKey: "contact.target_start_date",
            dataType: "DATE"
        },
        {
            id: "cf_deal_notes",
            name: "AI Deal Notes",
            fieldKey: "contact.deal_notes",
            dataType: "LARGE_TEXT"
        }
    ];
    tags = [
        "VIP Client",
        "Hot Lead",
        "Enterprise",
        "Inbound Demo",
        "AI Qualified",
        "Follow Up Required",
        "Contract Sent",
        "Customer - Tier 1",
        "Newsletter Subscribed"
    ];
    contacts = [
        {
            id: "cnt_01J8ABCDEF1234567890",
            locationId: "loc_subaccount_ghp_01",
            firstName: "Sarah",
            lastName: "Jenkins 11",
            name: "Sarah Jenkins 11",
            email: "sarah.jenkins@acmecorp.io",
            phone: "+15552345678",
            companyName: "Acme Cloud Solutions",
            address1: "100 Market St, Suite 400",
            city: "San Francisco",
            state: "CA",
            postalCode: "94105",
            country: "US",
            website: "https://acmecorp.io",
            tags: ["VIP Client", "AI Qualified", "Inbound Demo"],
            source: "Website Form / Inbound",
            dateAdded: "2026-01-15T10:30:00Z",
            dateUpdated: "2026-08-20T14:22:10Z",
            customFields: [
                { id: "cf_lead_score", key: "lead_score", field_value: 94 },
                { id: "cf_budget_range", key: "budget_range", field_value: "$20,000-$50,000" },
                { id: "cf_service_interest", key: "service_interest", field_value: ["AI Sales Agents", "CRM Implementation"] },
                { id: "cf_decision_maker", key: "decision_maker_status", field_value: true },
                { id: "cf_target_start_date", key: "target_start_date", field_value: "2026-09-01" },
                { id: "cf_deal_notes", key: "deal_notes", field_value: "Excited about automated lead routing and MCP integration." }
            ]
        },
        {
            id: "cnt_02K9BCDEFG2345678901",
            locationId: "loc_subaccount_ghp_01",
            firstName: "Michael",
            lastName: "Chang",
            name: "Michael Chang",
            email: "mchang@apexlogistics.com",
            phone: "+15553456789",
            companyName: "Apex Global Logistics",
            address1: "450 Industrial Parkway",
            city: "Austin",
            state: "TX",
            postalCode: "78701",
            country: "US",
            website: "https://apexlogistics.com",
            tags: ["Hot Lead", "Enterprise", "Follow Up Required"],
            source: "LinkedIn Outreach",
            dateAdded: "2026-02-10T08:15:00Z",
            dateUpdated: "2026-08-25T11:05:40Z",
            customFields: [
                { id: "cf_lead_score", key: "lead_score", field_value: 78 },
                { id: "cf_budget_range", key: "budget_range", field_value: "$50,000+" },
                { id: "cf_service_interest", key: "service_interest", field_value: ["Custom Funnels", "AI Sales Agents"] },
                { id: "cf_decision_maker", key: "decision_maker_status", field_value: true },
                { id: "cf_deal_notes", key: "deal_notes", field_value: "Evaluating agency automations for Q3 enterprise rollout." }
            ]
        },
        {
            id: "cnt_03L0CDEFGH3456789012",
            locationId: "loc_subaccount_ghp_01",
            firstName: "Elena",
            lastName: "Rostova",
            name: "Elena Rostova",
            email: "elena@novatech.co",
            phone: "+15554567890",
            companyName: "Nova Technologies",
            address1: "742 Evergreen Terrace",
            city: "Seattle",
            state: "WA",
            postalCode: "98101",
            country: "US",
            website: "https://novatech.co",
            tags: ["Customer - Tier 1", "VIP Client"],
            source: "Referral",
            dateAdded: "2025-11-20T16:00:00Z",
            dateUpdated: "2026-08-10T09:40:15Z",
            customFields: [
                { id: "cf_lead_score", key: "lead_score", field_value: 99 },
                { id: "cf_budget_range", key: "budget_range", field_value: "$50,000+" },
                { id: "cf_service_interest", key: "service_interest", field_value: ["Marketing Automation"] },
                { id: "cf_deal_notes", key: "deal_notes", field_value: "Existing key account looking to expand into sub-accounts." }
            ]
        }
    ];
    workflows = [
        {
            id: "wf_lead_onboarding_01",
            locationId: "loc_subaccount_ghp_01",
            name: "AI Lead Nurture & Instant Booking",
            status: "active",
            version: 3,
            createdAt: "2026-01-10T12:00:00Z",
            updatedAt: "2026-08-15T18:30:00Z",
            triggers: [
                {
                    id: "trg_form_submitted",
                    name: "Inbound Contact Created / Tag Added",
                    type: "ContactTagAdded",
                    filters: [{ tag: "AI Qualified" }]
                }
            ],
            actions: [
                {
                    id: "act_send_sms_01",
                    name: "Send Instant SMS Intro",
                    type: "SendSMS",
                    description: "Hi {{contact.first_name}}, thanks for reaching out to our team! What time works best for a quick chat?",
                    config: { delayMinutes: 0 }
                },
                {
                    id: "act_wait_booking",
                    name: "Wait For Booking Link Click",
                    type: "WaitCondition",
                    config: { timeoutHours: 24 }
                },
                {
                    id: "act_assign_rep",
                    name: "Assign Account Executive",
                    type: "AssignUser",
                    config: { role: "Account Executive", distribution: "round_robin" }
                }
            ],
            stats: {
                enrolledCount: 142,
                completedCount: 98,
                activeCount: 44
            }
        },
        {
            id: "wf_vip_escalation_02",
            locationId: "loc_subaccount_ghp_01",
            name: "VIP Deal Acceleration & Slack Alert",
            status: "active",
            version: 2,
            createdAt: "2026-03-01T09:00:00Z",
            updatedAt: "2026-08-22T10:15:00Z",
            triggers: [
                {
                    id: "trg_vip_score",
                    name: "High Value Lead Detected",
                    type: "CustomFieldValueChanged",
                    filters: [{ field: "cf_lead_score", operator: ">=", value: 90 }]
                }
            ],
            actions: [
                {
                    id: "act_notify_slack",
                    name: "Alert Executive Sales Channel",
                    type: "Webhook/Notification",
                    description: "Post deal alert with lead score & budget to #sales-enterprise channel."
                },
                {
                    id: "act_tag_vip",
                    name: "Apply VIP Client Tag",
                    type: "AddTag",
                    config: { tag: "VIP Client" }
                }
            ],
            stats: {
                enrolledCount: 38,
                completedCount: 38,
                activeCount: 0
            }
        }
    ];
    calendars = [
        {
            id: "cal_30min_strategy_01",
            locationId: "loc_subaccount_ghp_01",
            name: "30-Minute AI Strategy Consultation",
            description: "Discovery session to evaluate workflow automation, MCP agents, and CRM sync.",
            slug: "ai-strategy-30",
            calendarType: "round_robin",
            slotDuration: 30,
            slotInterval: 30,
            slotBuffer: 10,
            appoinmentPerSlot: 1,
            appoinmentPerDay: 8,
            isActive: true,
            createdAt: "2026-01-05T08:00:00Z",
            updatedAt: "2026-08-18T16:45:00Z",
            availability: [
                { dayOfWeek: "Monday", openHour: "09:00", closeHour: "17:00" },
                { dayOfWeek: "Tuesday", openHour: "09:00", closeHour: "17:00" },
                { dayOfWeek: "Wednesday", openHour: "09:00", closeHour: "17:00" },
                { dayOfWeek: "Thursday", openHour: "09:00", closeHour: "17:00" },
                { dayOfWeek: "Friday", openHour: "09:00", closeHour: "16:00" }
            ],
            teamMembers: [
                { userId: "usr_01", name: "Alex Mercer", email: "alex@agency.com", priority: 1 },
                { userId: "usr_02", name: "Jordan Taylor", email: "jordan@agency.com", priority: 2 }
            ],
            widgetType: "classic"
        },
        {
            id: "cal_60min_tech_onboarding_02",
            locationId: "loc_subaccount_ghp_01",
            name: "60-Minute Technical Implementation Kickoff",
            description: "Deep dive for custom integrations, API keys, and workflow mapping.",
            slug: "tech-kickoff-60",
            calendarType: "standard",
            slotDuration: 60,
            slotInterval: 60,
            slotBuffer: 15,
            appoinmentPerSlot: 1,
            appoinmentPerDay: 4,
            isActive: true,
            createdAt: "2026-02-12T11:00:00Z",
            updatedAt: "2026-08-01T14:20:00Z",
            availability: [
                { dayOfWeek: "Tuesday", openHour: "10:00", closeHour: "16:00" },
                { dayOfWeek: "Thursday", openHour: "10:00", closeHour: "16:00" }
            ],
            teamMembers: [
                { userId: "usr_01", name: "Alex Mercer", email: "alex@agency.com", priority: 1 }
            ],
            widgetType: "modern"
        }
    ];
    getCustomFields() {
        return [...this.customFields];
    }
    getTags() {
        return [...this.tags];
    }
    addTag(tag) {
        const trimmed = tag.trim();
        if (trimmed && !this.tags.includes(trimmed)) {
            this.tags.push(trimmed);
        }
    }
    getContacts() {
        return this.contacts.map((c) => this.enrichContact(c));
    }
    searchContacts(params) {
        let result = [...this.contacts];
        if (params.query) {
            const q = params.query.toLowerCase();
            result = result.filter((c) => c.name?.toLowerCase().includes(q) ||
                c.firstName?.toLowerCase().includes(q) ||
                c.lastName?.toLowerCase().includes(q) ||
                c.email?.toLowerCase().includes(q) ||
                c.phone?.includes(q) ||
                c.companyName?.toLowerCase().includes(q));
        }
        if (params.email) {
            const email = params.email.toLowerCase();
            result = result.filter((c) => c.email?.toLowerCase() === email);
        }
        if (params.phone) {
            const phone = params.phone.replace(/\D/g, "");
            result = result.filter((c) => c.phone?.replace(/\D/g, "").includes(phone));
        }
        if (params.tags && params.tags.length > 0) {
            result = result.filter((c) => params.tags.some((t) => c.tags.map((x) => x.toLowerCase()).includes(t.toLowerCase())));
        }
        const total = result.length;
        const skip = params.skip || 0;
        const limit = params.limit || 20;
        const paginated = result.slice(skip, skip + limit).map((c) => this.enrichContact(c));
        return { contacts: paginated, total };
    }
    getContactById(id) {
        const contact = this.contacts.find((c) => c.id === id);
        return contact ? this.enrichContact(contact) : undefined;
    }
    getContactByEmailOrPhone(email, phone) {
        if (email) {
            const found = this.contacts.find((c) => c.email?.toLowerCase() === email.toLowerCase());
            if (found)
                return this.enrichContact(found);
        }
        if (phone) {
            const p = phone.replace(/\D/g, "");
            const found = this.contacts.find((c) => c.phone?.replace(/\D/g, "").includes(p));
            if (found)
                return this.enrichContact(found);
        }
        return undefined;
    }
    createContact(data) {
        const id = `cnt_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;
        const now = new Date().toISOString();
        const fullName = data.name || `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.email;
        const newContact = {
            id,
            locationId: data.locationId || "loc_subaccount_ghp_01",
            firstName: data.firstName || fullName.split(" ")[0],
            lastName: data.lastName || fullName.split(" ").slice(1).join(" "),
            name: fullName,
            email: data.email,
            phone: data.phone,
            companyName: data.companyName,
            address1: data.address1,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country || "US",
            website: data.website,
            tags: data.tags || [],
            source: data.source || "MCP API Integration",
            dateAdded: now,
            dateUpdated: now,
            customFields: data.customFields || []
        };
        if (data.tags) {
            data.tags.forEach((t) => this.addTag(t));
        }
        this.contacts.unshift(newContact);
        return this.enrichContact(newContact);
    }
    updateContact(id, updates) {
        const idx = this.contacts.findIndex((c) => c.id === id);
        if (idx === -1)
            return undefined;
        const existing = this.contacts[idx];
        const now = new Date().toISOString();
        const firstName = updates.firstName !== undefined ? updates.firstName : existing.firstName;
        const lastName = updates.lastName !== undefined ? updates.lastName : existing.lastName;
        const name = updates.name || `${firstName || ""} ${lastName || ""}`.trim() || existing.name;
        // Merge custom fields
        let updatedCustomFields = [...(existing.customFields || [])];
        if (updates.customFields && updates.customFields.length > 0) {
            for (const newCf of updates.customFields) {
                const cfIndex = updatedCustomFields.findIndex((cf) => (newCf.id && cf.id === newCf.id) || (newCf.key && cf.key === newCf.key));
                if (cfIndex >= 0) {
                    updatedCustomFields[cfIndex] = {
                        ...updatedCustomFields[cfIndex],
                        ...newCf,
                        field_value: newCf.field_value !== undefined ? newCf.field_value : newCf.value
                    };
                }
                else {
                    updatedCustomFields.push({
                        id: newCf.id || `cf_${Date.now().toString(36)}`,
                        key: newCf.key,
                        field_value: newCf.field_value !== undefined ? newCf.field_value : newCf.value
                    });
                }
            }
        }
        if (updates.tags) {
            updates.tags.forEach((t) => this.addTag(t));
        }
        const updated = {
            ...existing,
            ...updates,
            name,
            firstName,
            lastName,
            customFields: updatedCustomFields,
            dateUpdated: now
        };
        this.contacts[idx] = updated;
        return this.enrichContact(updated);
    }
    applyTagsToContact(id, tagsToAdd, tagsToRemove) {
        const contact = this.contacts.find((c) => c.id === id);
        if (!contact)
            return undefined;
        tagsToAdd.forEach((t) => this.addTag(t));
        let currentTags = contact.tags || [];
        // Add new unique tags
        tagsToAdd.forEach((tag) => {
            if (!currentTags.includes(tag)) {
                currentTags.push(tag);
            }
        });
        // Remove tags if specified
        if (tagsToRemove && tagsToRemove.length > 0) {
            const toRemoveLower = tagsToRemove.map((t) => t.toLowerCase());
            currentTags = currentTags.filter((t) => !toRemoveLower.includes(t.toLowerCase()));
        }
        contact.tags = currentTags;
        contact.dateUpdated = new Date().toISOString();
        return this.enrichContact(contact);
    }
    getWorkflows() {
        return [...this.workflows];
    }
    getWorkflowById(id) {
        return this.workflows.find((w) => w.id === id);
    }
    getCalendars() {
        return [...this.calendars];
    }
    getCalendarById(id) {
        return this.calendars.find((c) => c.id === id);
    }
    enrichContact(contact) {
        const cfMap = {};
        if (contact.customFields) {
            for (const cf of contact.customFields) {
                const def = this.customFields.find((d) => d.id === cf.id || d.fieldKey === cf.key || d.name === cf.key);
                const name = def?.name || cf.key || cf.id;
                if (name) {
                    cfMap[name] = cf.field_value !== undefined ? cf.field_value : cf.value;
                }
            }
        }
        return {
            ...contact,
            customFieldMap: cfMap
        };
    }
}
export const mockStore = new MockDataStore();
