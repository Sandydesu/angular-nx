import { BookEntity } from "./book.models";

export interface CollectionEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: BookEntity[];
}
