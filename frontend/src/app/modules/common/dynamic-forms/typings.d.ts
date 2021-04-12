import { FormlyFieldConfig } from "@ngx-formly/core";
import { HalSource } from "core-app/modules/hal/resources/hal-resource";
import { FormGroup } from "@angular/forms";
import { HalLinkSource } from "core-app/modules/hal/hal-link/hal-link";

export interface IOPDynamicForm {
  fields: IOPFormlyFieldConfig[];
  model: IOPFormModel;
  form: FormGroup;
}

export interface IOPForm {
  _type: "Form";
  _embedded: {
    payload: IOPFormModel;
    schema: IOPFormSchema;
    validationErrors: {
      [key: string]: unknown;
    };
  };
  _links: {
    self: IApiCall;
    validate: IApiCall;
    commit: IApiCall;
    previewMarkup?: IApiCall;
  };
}

export interface IOPFormlyFieldConfig extends FormlyFieldConfig {
  key?: string;
}

export interface IOPFormModel {
  [key: string]: string | number | Object | HalLinkSource | null | undefined;
  _links?: {
    [key: string]: IOPFieldModel | IOPFieldModel[] | null;
  };
}

export interface IOPFieldModel extends Partial<HalSource>{
  name?: string;
}

export interface IOPFormSchema {
  _type: "Schema";
  _dependencies: unknown[];
  _attributeGroups?: IAttributeGroup[];
  lockVersion?: IFieldSchema;
  [key: string]: IFieldSchema | any;
  _links: {
    baseSchema?: {
      href: string;
    };
  };
}

export interface IFieldSchema {
  type: string;
  writable: boolean;
  allowedValues?: any;
  required?: boolean;
  hasDefault: boolean;
  name?: string;
  attributeGroup?: string;
  options: {
    [key: string]: any;
  };
  _embedded?: {
    allowedValues?: IApiCall | IAllowedValue[];
  };
  _links?: {
    allowedValues?: IApiCall;
  };
}

export interface IFieldSchemaWithKey extends IFieldSchema {
  key: string;
}

export interface IAttributeGroup {
  _type:
    | "WorkPackageFormAttributeGroup"
    | "WorkPackageFormChildrenQueryGroup"
    | "WorkPackageFormRelationQueryGroup"
    | unknown;
  name: string;
  attributes: string[];
}

export interface IAllowedValue {
  id: string;
  name: string;
  [key: string]: unknown;
  _links: {
    self: HalSource;
    [key: string]: HalSource;
  };
}

export interface IApiCall {
  href: string;
  method?: string;
}

export interface IFormError {
  errorIdentifier:string;
  message:string;
  _type:string;
  _embedded: IFormErrorDetails | IFormErrors;
}

export interface IFormErrorDetails {
  details: {
    attribute: string;
  }
}

export interface IFormErrors {
  errors: IFormError[];
}

export interface IDynamicInputConfig {
  config: FormlyFieldConfig,
  useForFields: string[];
}


