// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import type {
  ArrayField,
  CheckboxField,
  Field,
  GroupField,
  RowField,
  SelectField,
  TextField,
  TextareaField,
  UploadField,
} from 'payload';

type ConditionFn = (data: any, siblingData: any, context?: any) => boolean;
type ValidateFn = (value: any, options?: any) => Promise<string | true> | string | true;

type LooseFieldConfig = {
  admin?: {
    condition?: ConditionFn;
    [key: string]: any;
  };
  validate?: ValidateFn;
  [key: string]: any;
};

type TextFieldConfig = Omit<TextField, 'admin' | 'name' | 'type' | 'validate'> & LooseFieldConfig;
type TextareaFieldConfig = Omit<TextareaField, 'admin' | 'name' | 'type' | 'validate'> & LooseFieldConfig;
type CheckboxFieldConfig = Omit<CheckboxField, 'admin' | 'name' | 'type' | 'validate'> & LooseFieldConfig;
type SelectFieldConfig = Omit<SelectField, 'admin' | 'name' | 'options' | 'type' | 'validate'> & LooseFieldConfig;
type UploadFieldConfig = Omit<UploadField, 'admin' | 'name' | 'relationTo' | 'type' | 'validate'> & LooseFieldConfig;
type RowFieldConfig = Omit<RowField, 'admin' | 'fields' | 'type'> & LooseFieldConfig;
type GroupFieldConfig = Omit<GroupField, 'admin' | 'fields' | 'name' | 'type' | 'validate'> & LooseFieldConfig;
type ArrayFieldConfig = Omit<ArrayField, 'admin' | 'fields' | 'name' | 'type' | 'validate'> & LooseFieldConfig;

export function textField(name: string, config: TextFieldConfig = {}): TextField {
  return {
    name,
    type: 'text',
    ...config,
  } as TextField;
}

export function textareaField(name: string, config: TextareaFieldConfig = {}): TextareaField {
  return {
    name,
    type: 'textarea',
    ...config,
  } as TextareaField;
}

export function checkboxField(name: string, config: CheckboxFieldConfig = {}): CheckboxField {
  return {
    name,
    type: 'checkbox',
    ...config,
  } as CheckboxField;
}

export function selectField(
  name: string,
  options: SelectField['options'],
  config: SelectFieldConfig = {},
): SelectField {
  return {
    name,
    type: 'select',
    options,
    ...config,
  } as SelectField;
}

export function uploadField(
  name: string,
  relationTo: UploadField['relationTo'],
  config: UploadFieldConfig = {},
): UploadField {
  return {
    name,
    type: 'upload',
    relationTo,
    ...config,
  } as UploadField;
}

export function rowField(fields: Field[], config: RowFieldConfig = {}): RowField {
  return {
    type: 'row',
    fields,
    ...config,
  } as RowField;
}

export function groupField(name: string, fields: Field[], config: GroupFieldConfig = {}): GroupField {
  return {
    name,
    type: 'group',
    fields,
    ...config,
  } as GroupField;
}

export function arrayField(name: string, fields: Field[], config: ArrayFieldConfig = {}): ArrayField {
  return {
    name,
    type: 'array',
    fields,
    ...config,
  } as ArrayField;
}
