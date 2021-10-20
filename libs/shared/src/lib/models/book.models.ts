/**
 * Interface for the 'Book' data
 */
 export interface BookEntity {
  id: string;
  title: string;
  authors: string[];
  description: string;
  publisher?: string;
  publishedDate?: string;
  coverUrl?: string;
}
