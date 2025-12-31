export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface User {
  _id?: string;
  name: string;
  phone: string;
  role?: string;
  __v?: number;
}

export interface Category {
  _id: string;
  name: string;
  __v?: number;
}
export interface SubCategory {
  _id: string;
  name: string;
  category_id: string;
  __v?: number;
}

export interface Prompt {
  _id: string;
  user_id: string; 
  category_id: {
    _id: string;
    name: string;
  };
  sub_category_id: {
    _id: string;
    name: string;
  };
  prompt: string;
  response: string;
  created_at: string;
}
export interface CreatePromptDTO {
  userId: string;
  categoryId: string;
  subCategoryId: string;
  userQuestion: string;
}