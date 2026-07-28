export interface Student {
  id: string;
  name: string;
  readingLevel: string;
  notes?: string;
}

export interface ApiStudent {
  name: string;
  readingLevel: string;
  notes?: string;
  _id: string;
}
