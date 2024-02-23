export type Language = {
  id: number;
  name: string;
  code: string;
};
export type LanguageListResult = {
  data: Language[];
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
  per_page: number;
};
