-- Supabase Schema for Raj Footwear Admin System

-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_name TEXT NOT NULL,
  subcategory_name TEXT NOT NULL,
  UNIQUE(category_name, subcategory_name)
);

-- 2. Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  price NUMERIC,
  show_price BOOLEAN DEFAULT true,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Set up Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products and categories
CREATE POLICY "Public profiles are viewable by everyone" ON products
  FOR SELECT USING (true);
  
CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert/update/delete products
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
  
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');
  
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Setup
-- Create a bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Allow public read access to images
CREATE POLICY "Public image access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload/update/delete images
CREATE POLICY "Admin image upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  
CREATE POLICY "Admin image update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  
CREATE POLICY "Admin image delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Initial Data for Categories
INSERT INTO categories (category_name, subcategory_name) VALUES 
('Men''s Footwear', 'Men''s Shoes'),
('Men''s Footwear', 'Men''s Slippers'),
('Men''s Footwear', 'Men''s Sandals'),
('Men''s Footwear', 'Sports Shoes'),
('Women''s Footwear', 'Women''s Shoes'),
('Women''s Footwear', 'Women''s Slippers'),
('Women''s Footwear', 'Women''s Sandals'),
('Women''s Footwear', 'Heels'),
('Kids Footwear', 'Boys Shoes'),
('Kids Footwear', 'Girls Shoes'),
('Kids Footwear', 'School Shoes');
