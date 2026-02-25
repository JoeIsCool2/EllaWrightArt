/**
 * Secret credentials to unlock the edit page.
 *
 * How to open the editor: go to the Contact page and submit the form with
 * Name = "edit", Email = "edit@edit.com", Message = "edit" (case-insensitive).
 * You’ll be taken to /edit where you can change all site content. Changes
 * are saved in this browser only (localStorage). Change the values below
 * to something only you know. (Email must look like a real address so the browser accepts it.)
 */

export const ADMIN_SECRET = {
  name: "edit",
  email: "edit@edit.com",
  message: "edit",
} as const;

export function checkAdminSecret(
  name: string,
  email: string,
  message: string
): boolean {
  return (
    name.trim().toLowerCase() === ADMIN_SECRET.name.toLowerCase() &&
    email.trim().toLowerCase() === ADMIN_SECRET.email.toLowerCase() &&
    message.trim().toLowerCase() === ADMIN_SECRET.message.toLowerCase()
  );
}

export const ADMIN_UNLOCK_KEY = "ewa_admin_unlocked";
export const STORAGE_KEYS = {
  site: "ewa_site",
  artworks: "ewa_artworks",
  about: "ewa_about",
} as const;
