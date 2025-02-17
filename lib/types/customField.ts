export type CustomFieldType = {
    id: string;
    name: string;
    type: 'text' | 'number' | 'checkbox';
};

export type CustomFieldValue = {
    fieldId: string;
    value: string | number | boolean;
};

export type CustomFieldsState = {
    fields: CustomFieldType[];
    values: Record<string, CustomFieldValue[]>;
};