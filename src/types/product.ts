export interface Product {
  id?: string;

  // common
  title: string;
  price: number;
  created_at?: string;

  // 🔥 CMS fields
  subtitle?: string;
  description?: string;
  old_price?: number;
  top_text?: string;
  cta_text?: string;
  image?: string;
}