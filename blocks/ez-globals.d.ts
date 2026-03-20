// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
/**
 * Editor-time globals for .ez.astro block authoring.
 * These symbols are provided by the Edge Zero compiler at generation time.
 */

declare const Astro: {
  props: Record<string, any>;
  url: URL;
};

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

type EzOption<Value extends string = string> = {
  label: string;
  value: Value;
};

type EzSiblingData = Record<string, any> | undefined;
type EzConditionContext = Record<string, any> | undefined;
type EzConditionFn = (
  data: Record<string, any> | undefined,
  siblingData: EzSiblingData,
  context?: EzConditionContext,
) => boolean;
type EzValidateFn = (
  value: any,
  options: {
    siblingData?: EzSiblingData;
    [key: string]: any;
  },
) => string | true | Promise<string | true>;

type EzAdminConfig = {
  condition?: EzConditionFn;
  [key: string]: any;
};

type EzFieldCommon = {
  admin?: EzAdminConfig;
  validate?: EzValidateFn;
  required?: boolean;
  defaultValue?: any;
  relationTo?: string;
  labels?: {
    singular: string;
    plural: string;
  };
  fields?: readonly EzField[];
  options?: ReadonlyArray<EzOption>;
  [key: string]: any;
};

type EzFieldBase<Name extends string = string, Type extends string = string> = {
  name: Name;
  type: Type;
} & EzFieldCommon;

type EzRowField = {
  type: string;
  fields: readonly EzField[];
} & EzFieldCommon;

type EzField =
  | EzFieldBase<string, string>
  | EzRowField;

type EzNamedField<Schema extends readonly EzField[]> = Extract<Schema[number], { name: string; type: string }>;
type EzFieldByName<Schema extends readonly EzField[], Name extends string> = Extract<EzNamedField<Schema>, { name: Name }>;
type EzFieldNames<Schema extends readonly EzField[]> = EzNamedField<Schema>['name'];
type EzRequiredFieldNames<Schema extends readonly EzField[]> = Extract<EzNamedField<Schema>, { required: true }>['name'];
type EzOptionalFieldNames<Schema extends readonly EzField[]> = Exclude<EzFieldNames<Schema>, EzRequiredFieldNames<Schema>>;

type EzFieldValue<Field> = Field extends { type: 'checkbox' }
  ? boolean
  : Field extends { type: 'number' }
    ? number
    : Field extends { type: 'select'; options: ReadonlyArray<infer Option> }
      ? Option extends { value: infer Value extends string }
        ? Value
        : string
      : Field extends { type: 'array'; fields: infer SubFields extends readonly EzField[] }
        ? Array<EzBlockFromSchema<SubFields>>
        : Field extends { type: 'group'; fields: infer SubFields extends readonly EzField[] }
          ? EzBlockFromSchema<SubFields>
          : Field extends { type: 'upload' }
            ? any
            : string;

type EzBlockFromSchema<Schema extends readonly EzField[]> = {
  [Name in EzRequiredFieldNames<Schema>]-?: EzFieldValue<EzFieldByName<Schema, Name>>;
} & {
  [Name in EzOptionalFieldNames<Schema>]?: EzFieldValue<EzFieldByName<Schema, Name>>;
} & Record<string, any>;

type EzBlockMeta = {
  name: string;
  slug: string;
  tier?: 'starter' | 'pro';
  group?: string;
  description?: string;
  family?: string;
  aliases?: string[];
  order?: number;
  [key: string]: any;
};

declare function defineEzBlock<
  Meta extends EzBlockMeta,
  Schema extends readonly EzField[],
  ExtraProps extends Record<string, any> = {},
>(definition: {
  meta: Meta;
  schema: Schema;
  defaults?: Partial<EzBlockFromSchema<Schema> & ExtraProps>;
}): {
  meta: Meta;
  schema: Schema;
  block: EzBlockFromSchema<Schema> & ExtraProps;
};

declare const anchorIdField: EzField;
declare const badgeField: EzField;
declare const linkField: EzField;
declare const iconField: EzField;

declare function createThemeField(...args: any[]): EzField;

declare function textField(
  name: string,
  config?: Record<string, any>,
): EzFieldBase<string, 'text'>;

declare function textareaField(
  name: string,
  config?: Record<string, any>,
): EzFieldBase<string, 'textarea'>;

declare function checkboxField(
  name: string,
  config?: Record<string, any>,
): EzFieldBase<string, 'checkbox'>;

declare function selectField<Value extends string = string>(
  name: string,
  options: ReadonlyArray<EzOption<Value>>,
  config?: Record<string, any>,
): EzFieldBase<string, 'select'>;

declare function uploadField(
  name: string,
  relationTo: string,
  config?: Record<string, any>,
): EzFieldBase<string, 'upload'>;

declare function rowField(
  fields: readonly EzField[],
  config?: Record<string, any>,
): EzRowField;

declare function groupField(
  name: string,
  fields: readonly EzField[],
  config?: Record<string, any>,
): EzFieldBase<string, 'group'>;

declare function arrayField(
  name: string,
  fields: readonly EzField[],
  config?: Record<string, any>,
): EzFieldBase<string, 'array'>;

declare function sectionHeadingFields(config?: Record<string, any>): EzField[];
declare function ctaActionRowField(config?: Record<string, any>): EzField;
declare function mediaFieldWithOptionalAlt(config?: Record<string, any>): EzField[];
declare function sectionScaffoldFields(config?: Record<string, any>): EzField[];

declare function resolveMediaUrl(...args: any[]): any;
declare function resolveMediaSrcSet(...args: any[]): any;
declare function resolveMediaDimensions(...args: any[]): any;

declare const Icon: any;
declare const defaultHTMLConverters: any;
declare function convertLexicalToHTML(...args: any[]): any;
