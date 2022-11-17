
import { DataRequirement } from "../../../../services/Clients/PolicyQueryClient";
import { IField } from "../field";


export interface IFieldValidation {
    field: string,
    isValid: boolean
}

export interface ISimpleFieldType extends IField {
    metadata: DataRequirement
}