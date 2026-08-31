export interface CustomFieldDefinition {
  id: string;
  name: string;
  fieldKey: string;
  placeholder?: string;
  dataType: "TEXT" | "LARGE_TEXT" | "NUMERICAL" | "PHONE" | "EMAIL" | "MONETARY" | "CHECKBOX" | "DATE" | "RADIO_SELECT" | "MULTI_SELECT";
  position?: number;
  picklistOptions?: string[];
  isStandard?: boolean;
}

export interface CustomFieldValue {
  id?: string;
  key?: string;
  field_value?: any;
  value?: any;
}

export interface Contact {
  id: string;
  locationId: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  website?: string;
  tags: string[];
  source?: string;
  dateAdded?: string;
  dateUpdated?: string;
  customFields?: CustomFieldValue[];
  // Resolved custom fields with human-readable keys for AI convenience
  customFieldMap?: Record<string, any>;
}

export interface WorkflowAction {
  id: string;
  name: string;
  type: string;
  description?: string;
  config?: Record<string, any>;
}

export interface WorkflowTrigger {
  id: string;
  name: string;
  type: string;
  filters?: Record<string, any>[];
}

export interface Workflow {
  id: string;
  locationId: string;
  name: string;
  status: "draft" | "published" | "active" | "inactive";
  version?: number;
  createdAt: string;
  updatedAt: string;
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  stats?: {
    enrolledCount: number;
    completedCount: number;
    activeCount: number;
  };
}

export interface CalendarSlot {
  dayOfWeek: string;
  openHour: string;
  closeHour: string;
}

export interface Calendar {
  id: string;
  locationId: string;
  name: string;
  description?: string;
  slug?: string;
  calendarType?: "round_robin" | "collective" | "service" | "standard";
  slotDuration?: number; // in minutes
  slotInterval?: number;
  slotBuffer?: number;
  appoinmentPerSlot?: number;
  appoinmentPerDay?: number;
  availability?: CalendarSlot[];
  teamMembers?: Array<{
    userId: string;
    name: string;
    email: string;
    priority?: number;
  }>;
  widgetType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchContactsParams {
  query?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  limit?: number;
  skip?: number;
  locationId?: string;
}

export interface UpdateContactParams {
  contactId: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  website?: string;
  tags?: string[];
  customFields?: CustomFieldValue[];
  customFieldMap?: Record<string, any>;
  locationId?: string;
}

export interface CreateContactParams {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  tags?: string[];
  customFields?: CustomFieldValue[];
  customFieldMap?: Record<string, any>;
  locationId?: string;
}
