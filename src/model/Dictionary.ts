
  
  export interface dictionarytype {
    id?: number;
    categoryId: number;
    name: string;
    label?: string;
    code?: string;
    isActive: boolean;
    DictionaryEntryId?: number | null;
    dictionaryEntryName?: string;
    systemDefined?: boolean;
    description?: string;
  };
  export interface dictionarycategoryType{
    "id": number,
        "name": string
  }