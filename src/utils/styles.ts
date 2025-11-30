"use client";

export interface StyleOption {
  id: string;
  name: string;
  description: string;
}

export const styles: StyleOption[] = [
  { id: 'studio', name: 'Studio Shot', description: 'Clean, professional studio background.' },
  { id: 'lifestyle', name: 'Lifestyle Scene', description: 'Product in a realistic, engaging environment.' },
  { id: 'seasonal', name: 'Seasonal Theme', description: 'Holiday or seasonal specific backgrounds.' },
  { id: 'flatlay', name: 'Flatlay', description: 'Overhead shot with complementary props.' },
  { id: 'tiktok', name: 'TikTok Style', description: 'Dynamic, trendy visuals for social media.' },
  { id: 'in-use', name: 'Product in Use', description: 'Showcasing the product being used by a model.' },
  { id: 'social-ad', name: 'Social Media Ad', description: 'Optimized for various social media platforms.' },
  { id: 'white-bg', name: 'White Background', description: 'Classic e-commerce white background.' },
];

export const getStyleNameById = (id: string): string => {
  const style = styles.find(s => s.id === id);
  return style ? style.name : id.replace('-', ' '); // Fallback to formatted ID if not found
};