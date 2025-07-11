import Stripe from "stripe";

export interface Song{
  id:string,
  user_id:string,
  title:string,
  author:string,
  image_path:string,
  song_path:string,
}
export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  active?: boolean | null;
  description?: string | null;
  id: string;
  image?: string | null;
  metadata?: Stripe.Metadata;   
  name?: string | null;
}
export interface Price {
  active?: boolean | null;
  currency?: string | null;
  description?: string | null;
  id: string;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number | null;
  metadata?: Stripe.Metadata;
  product_id?: string | null;
  trial_period_days?: number | null;
  type?: Stripe.Price.Type;
  unit_amount?: number | null;
  products?: Product;
}

export interface Subscription {
  id: string;
  cancel_at?: string | null;
  cancel_at_period_end?: boolean | null;
  canceled_at?: string | null;
  created?: string;
  current_period_end?: string;
  current_period_start?: string;
  ended_at?: string | null;
  metadata: Stripe.Metadata;
  status?: Stripe.Subscription.Status;
  price_id?: string | null;
  quantity?: number | null;
  trial_end?: string | null;
  trial_start?: string | null;
  user_id: string;
  prices?: Price;
}
