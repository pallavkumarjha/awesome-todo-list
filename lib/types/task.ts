import { CustomFieldValue } from './customField';

export type RootTask = {
    id: string;
    title: string;
    status: string;
    priority: string;
};

export type TaskType = RootTask & {
    customFields?: CustomFieldValue[];
}