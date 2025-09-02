import { Module } from "../../../shared/types/types";

export type ID = string | number;

export interface Curriculum {
  modules: Module[];
}
