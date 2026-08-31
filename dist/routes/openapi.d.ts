import { Request, Response } from "express";
export declare function getOpenAPISpec(baseUrl: string): {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
    };
    servers: {
        url: string;
        description: string;
    }[];
    paths: {
        "/api/contacts/search": {
            get: {
                summary: string;
                operationId: string;
                parameters: ({
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default?: undefined;
                    };
                    description: string;
                } | {
                    name: string;
                    in: string;
                    schema: {
                        type: string;
                        default: number;
                    };
                    description?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {};
                        };
                    };
                };
            };
        };
        "/api/contacts/{contactId}": {
            get: {
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
            put: {
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                properties: {
                                    firstName: {
                                        type: string;
                                    };
                                    lastName: {
                                        type: string;
                                    };
                                    email: {
                                        type: string;
                                    };
                                    phone: {
                                        type: string;
                                    };
                                    companyName: {
                                        type: string;
                                    };
                                    tags: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                    customFieldMap: {
                                        type: string;
                                        additionalProperties: boolean;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/api/tags": {
            get: {
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/api/contacts/{contactId}/tags": {
            post: {
                summary: string;
                operationId: string;
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        type: string;
                    };
                }[];
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: string;
                                required: string[];
                                properties: {
                                    tags: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                    removeTags: {
                                        type: string;
                                        items: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/api/workflows": {
            get: {
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/api/calendars": {
            get: {
                summary: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
        "/sse": {
            get: {
                summary: string;
                description: string;
                responses: {
                    "200": {
                        description: string;
                    };
                };
            };
        };
    };
};
export declare function openApiHandler(req: Request, res: Response): void;
