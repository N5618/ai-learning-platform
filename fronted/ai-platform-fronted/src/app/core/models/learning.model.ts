export interface User {
  id?: number;
  name: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  category_id: number;
}

export interface AISession {
  id?: number;
  user_id: number;
  category_id: number;
  sub_category_id: number;
  prompt: string;
  response: string;
  created_at?: Date;
}