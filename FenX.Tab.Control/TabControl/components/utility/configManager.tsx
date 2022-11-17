import { Dictionary } from "@reduxjs/toolkit";
import * as mapping from "../../dummyData/config_mapping.json"

export class ConfigManager {
    static getDynamicsProperty = (entity:string, fenergoProperty:string) => {
        const entityMappings = mapping.propertyMapping as Dictionary<object>;
        const mappings = entityMappings[entity] as Dictionary<string>;
        for(var property in mappings){
            if(mappings[property] === fenergoProperty) return property;
        }
        return null;
    }

    static getFenergoProperty = (entity:string, dynamicsProperty:string) => {
        const entityMappings = mapping.propertyMapping as Dictionary<object>;
        const mappings = entityMappings[entity] as Dictionary<string>;
        return mappings[dynamicsProperty];
    }

    static getReferenceData = (name:string, dynamicsField:string) => {
        const refData = mapping.referenceDataMapping as Dictionary<object>;
        const mappings = refData[name] as Dictionary<string>;
        return mappings[dynamicsField];
    }
}