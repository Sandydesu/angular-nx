import { BookEntity } from "@myorg/shared";

export interface CollectionEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  items: BookEntity[];
}
