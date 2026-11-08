// All backend API calls in one place.
// Base URL comes from the environment variable NEXT_PUBLIC_API_URL.

const API = process.env.NEXT_PUBLIC_API_URL

// ─── Types ────────────────────────────────────────────────────────

export type Book = {
  _id: string, title: string, author: string, category: string, image: string, description: string, totalCopies: number, availableCopies: number, addedBy: { email: string, name: string }, createdAt: string
}

export type BookUpdate = Pick<Book, "_id"> &
  Partial<
    Pick<Book, "title" | "author" | "category" | "description" | "image" | "totalCopies">
  >

export type Borrow = {
  _id: string, bookId: Book, borrowDate: string, resultDate: string, title: string, image: string
}

// ─── Helpers ──────────────────────────────────────────────────────

// Build headers with optional auth token
function headers(token?: string) {
  const h: Record<string, string> = {
    "Content-Type": "application/json",
  }
  if (token) h["authorization"] = `Bearer ${token}`
  return h
}

// Parse the response and throw an error with the backend's message if it fails
async function parse<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  return data as T
}

// ─── Public: Books ────────────────────────────────────────────────

// Get all books
export async function getAllBooks(): Promise<Book[]> {
  const res = await fetch(`${API}/books`, { cache: "no-store" })
  return parse<Book[]>(res)
}

// Get the latest 6 books
export async function getLatestBooks(): Promise<Book[]> {
  const res = await fetch(`${API}/books/latest`, { cache: "no-store" })
  return res.json()
  // return parse<Book[]>(res)
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${API}/categories`, { cache: "no-store" })
  return res.json()
  // return parse<Book[]>(res)
}

// Get a single book by ID
export async function getBookById(id: string): Promise<Book> {
  const res = await fetch(`${API}/books/${id}`, { cache: "no-store" })
  return parse<Book>(res)
}

// ─── Protected: Books ─────────────────────────────────────────────

// Add a new book (requires auth token)
export async function addBook(
  token: string,
  body: {
    title: string
    author: string
    category: string
    image: string
    description: string
    totalCopies: number
    availableCopies: number
    addedBy: {
      name: string
      email: string
    }
  }
): Promise<Book> {
  const res = await fetch(`${API}/books`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(body),
  })
  return parse<Book>(res)
}

// Get books added by the logged-in user
export async function getMyBooks(token: string): Promise<Book[]> {
  const res = await fetch(`${API}/books/mine`, {
    headers: headers(token),
  })
  return parse<Book[]>(res)
}

export async function deleteBook(token: string, bookId: string): Promise<void> {
  const res = await fetch(`${API}/books/${bookId}`, {
    method: "DELETE",
    headers: headers(token),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || "Something went wrong")
  }
}

// ─── Protected: Borrows ───────────────────────────────────────────

// Borrow a book (body: bookId + days)
export async function borrowBook(
  token: string,
  // The server sets the dates, title, author and image itself
  body: { bookId: string; days: number }
): Promise<{ insertedId: string }> {
  const res = await fetch(`${API}/borrows`, {
    method: "POST",
    headers: headers(token),
    body: JSON.stringify(body),
  })
  return parse<{ insertedId: string }>(res)
}

// Get the current user's borrows
export async function getMyBorrows(token: string): Promise<Borrow[]> {
  const res = await fetch(`${API}/borrows`, {
    headers: headers(token),
  })

  return parse<Borrow[]>(res)
}

export async function updateBook(token: string, updatedBody: BookUpdate) {
  const res = await fetch(`${API}/books/${updatedBody?._id}`, {
    method: "PATCH",
    headers: headers(token),
    body: JSON.stringify(updatedBody)
  })
  return res.json()
}


// Return a borrowed book
export async function returnBook(
  token: string,
  borrowId: string
): Promise<Borrow> {
  const res = await fetch(`${API}/borrows/${borrowId}`, {
    method: "DELETE",
    headers: headers(token),
  })
  return parse<Borrow>(res)
}
