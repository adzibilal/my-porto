import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseRole(role: number){
  switch (role) {
    case 0:
      return 'Admin'
      break;
    case 1:
      return 'Pengguna'
      break;
  
    default:
      break;
  }
}