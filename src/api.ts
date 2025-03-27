import { DogListResponse } from "./types";

const API_URL = "https://frontend-take-home-service.fetch.com";

// Login function
export const login = async (name, email) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include', // Sends auth cookies with the request
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  return response;
};

// Get available breeds
export const getBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/dogs/breeds`, {
    method: 'GET',
    credentials: 'include', // Sends auth cookies with the request
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Redirect to the main webapp page for login
    window.location.href = '/';
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch breeds: ${response.statusText}`);
  }

  return response.json();
};

// Search dogs based on filters
export const searchDogs = async (filters: Record<string, any>): Promise<DogListResponse> => {
  const queryString = new URLSearchParams(filters.from ? filters.from : filters).toString();

  const response = await fetch(`${API_URL}/dogs/search?${queryString}`, {
    method: 'GET',
    credentials: 'include', // Sends auth cookies with the request
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Redirect to the main webapp page for login
    window.location.href = '/';
  }

  if (!response.ok) {
    throw new Error(`Failed to search dogs: ${response.statusText}`);
  }

  return response.json();
};

// Get a match
export const getMatch = async (dogIds) => {
  const response = await fetch(`${API_URL}/dogs/match`, {
    method: 'POST',
    credentials: 'include', // Sends auth cookies with the request
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dogIds),
  });

  if (response.status === 401) {
    // Redirect to the main webapp page for login
    window.location.href = '/';
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch match: ${response.statusText}`);
  }

  return response.json();
};

// Get a dog by ID
export const fetchDog = async (dogId) => {
  const response = await fetch(`${API_URL}/dogs`, {
    method: "POST",
    credentials: 'include', // Sends auth cookies with the request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([dogId]),
  });

  if (response.status === 401) {
    // Redirect to the main webapp page for login
    window.location.href = '/';
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch dog: ${response.statusText}`);
  }

  const data = await response.json();
  return data[0];
}
