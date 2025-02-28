import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a URL-friendly slug from a product name and ID
 */
export function generateSlug(name: string, id: string) {
  // Convert to lowercase and replace spaces with hyphens
  const baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Remove leading/trailing spaces

  // Append the ID to the slug
  return `${baseSlug}-${id}`
}

/**
 * Extracts the product ID from a slug
 */
export function extractIdFromSlug(slug: string) {
  // Match the ID at the end of the slug (after the last hyphen)
  const idMatch = slug.match(/-([^-]+)$/)
  return idMatch ? idMatch[1] : null
}


