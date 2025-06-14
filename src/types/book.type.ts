export type Book = {
  id: string
  title: string
  subtitle: string
  authors: string[]
  publishedDate: number
  description: string
  pageCount: number
  categories: string[]
  thumbnail: string
  language: string
  listPrice: {
    amount: number
    currencyCode: string
    isOnSale: boolean
  }
}

export type BookListProps = {
  booksLocal: Book[];
}