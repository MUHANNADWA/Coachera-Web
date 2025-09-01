export type ID = string | number;

export interface Lesson {
  id: ID;
  name: string;
}

export interface Section {
  id: ID;
  name: string;
  lessons: Lesson[];
}

export interface Module {
  id: ID;
  name: string;
  sections: Section[];
}

export interface Curriculum {
  modules: Module[];
}
