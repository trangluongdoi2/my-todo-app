export interface InputCardItem {
  title: string;
  description: string;
  // image: string;
}

export interface CardItem extends InputCardItem {
  id: string,
  url: string,
  createdAt: string,
  updatedAt: string,
}