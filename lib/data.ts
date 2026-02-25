export interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Veil",
    year: "2024",
    medium: "Oil on linen",
    dimensions: "48 × 60 in",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200",
  },
  {
    id: "2",
    title: "Threshold",
    year: "2024",
    medium: "Oil and cold wax on panel",
    dimensions: "24 × 24 in",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200",
  },
  {
    id: "3",
    title: "Drift",
    year: "2023",
    medium: "Acrylic and charcoal on canvas",
    dimensions: "36 × 48 in",
    imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=1200",
  },
  {
    id: "4",
    title: "Quiet Hour",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "30 × 40 in",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200",
  },
  {
    id: "5",
    title: "Echo",
    year: "2023",
    medium: "Mixed media on paper",
    dimensions: "22 × 30 in",
    imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200",
  },
  {
    id: "6",
    title: "Held",
    year: "2022",
    medium: "Oil on linen",
    dimensions: "20 × 20 in",
    imageUrl: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200",
  },
];
