import type { dictionarytype } from "../model/Dictionary";

export const sampleDictionaries: dictionarytype[] = [
  {
    id: 1,
    categoryId: 101, 
    name: "Finance",
    description: "Handles all financial transactions and reporting.",
    isActive: true,
  },
  {
    id: 2,
    categoryId: 102, 
    name: "Team Lead",
    description: "Responsible for managing a small team of developers.",
    isActive: true,
  },
  {
    id: 3,
    categoryId: 103, 
    name: "Singapore",
    description: "Country where the head office is located.",
    isActive: false,
  },
];
