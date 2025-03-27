import { ReactNode } from "react";

export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  
  export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
  }
  
  export interface Match {
    match: string;
  }
  
  export interface PaginationInfo {
    next?: string;
    prev?: string;
  }
  
  export interface DogListResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
  }

  export interface DogCardProps {
    dogId: string;
    onFavorite?: (dogId: string) => void;
    isFavourite?: boolean;
  }

  export interface LoginFormProps {}

  export interface MatchResponse {
    match: string; 
  }
  
  export interface MatchCardProps {
    favorites: string[]; 
  }

  // Define the shape of the context value
  export interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (dogId: string) => void; 
  }

   // Create a provider component
  export interface FavoritesProviderProps {
    children: ReactNode;
  }

  export interface PaginationProps {
    onNext: () => void;
    onPrev: () => void;
    allowNext?: boolean;
    allowPrev?: boolean;
  }
