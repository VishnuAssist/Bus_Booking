
  
  export interface dictionarytype  {
    id?: number;
    categoryId: number | undefined;
    category?:string
    name: string;
    label?:string
    isActive: boolean;
    DictionaryEntryId?: number|null;
    dictionaryEntryName?:string
    systemDefined?:boolean
    description?:string
   
  
  };
  export interface dictionarycategoryType{
    "id": number,
        "name": string
  }