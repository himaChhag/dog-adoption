import React, { useEffect, useState } from "react";
import { searchDogs, getBreeds } from "../api.ts";
import DogCard from "./DogCard.tsx";
import Pagination from "../Util/Pagination.tsx";
import { PaginationInfo } from "../types.ts";
import { useFavorites } from "../contexts/FavoritesContext.tsx";
import MatchCard from "./MatchCard.tsx";

const DogList: React.FC = () => {
  const defaultFilters = {
    size: 25,
    sort: "breed:asc", // Default sort is ascending by breed
  };

  const breedDefault = "Select a Breed";

  const [dogs, setDogs] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState<PaginationInfo>({});
  const { favorites, toggleFavorite } = useFavorites();
  const [showMatch, setShowMatch] = useState(false);
  const [sortBy, setSortBy] = useState("age"); // Default sort by age

  // Fetch breeds on initial load
  useEffect(() => {
    const fetchBreeds = async () => {
      const data = await getBreeds();
      setBreeds([breedDefault, ...data]);
    };
    fetchBreeds();
  }, []);

  // Fetch dogs whenever filters are updated
  useEffect(() => {
    const fetchDogs = async () => {
      console.log("New API call with filters:", filters);
      const data = await searchDogs(filters);
      setDogs(data.resultIds);
      setPagination({ next: data.next, prev: data.prev });
    };
    fetchDogs();
  }, [filters]);

  // Toggle sort order (asc <-> desc)
  const handleSortToggle = () => {
    const newSortOrder =
      filters.sort === `${sortBy}:asc`
        ? `${sortBy}:desc`
        : `${sortBy}:asc`;
    const { from, ...rest } = filters;
    setFilters({ ...rest, sort: newSortOrder });
  };

  const handleFavorite = (dogId: string) => {
    toggleFavorite(dogId);
    // Set focus to next dog card
    document.getElementById(`dog-card-${dogId}`)!.focus();
  };

  // Toggle visibility of MatchCard
  const handleToggleMatch = () => {
    setShowMatch(!showMatch);
  };

  const handlePagination = (direction: "next" | "prev") => {
    setFilters((prev) => ({
      ...prev,
      from: direction === "next" ? pagination.next : pagination.prev,
    }));
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setFilters({ ...filters, sort: `${value}:asc` }); 
  };

  return (
    <div className="dog-list-container">
      {/* Show Match Button */}
      {favorites.length > 0 && (
        <>
          <div className="toggle-container">
            <button
              className="toggle-button"
              onClick={handleToggleMatch}
              disabled={favorites.length === 0}
            >
              {showMatch ? "Hide Match" : "Show Match"}
            </button>
          </div>

          {/* Render MatchCard only if there are favorites and showMatch is true */}
          {favorites.length > 0 && showMatch && (
            <MatchCard favorites={favorites} />
          )}
        </>
      )}

      {/* Dog Search Section */}
      {!showMatch && (
        <>
          <h1>Dog Search</h1>

          {/* Breed Selection */}
          <div className="filters-container">
            <select
              onChange={(e) => {
                e.target.value === breedDefault
                  ? setFilters({ ...defaultFilters })
                  : setFilters({ ...filters, breeds: [e.target.value] });
              }}
              aria-label="Select breed to filter"
              className="breed-select"
            >
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>

            {/* Sort Selection */}
            <div className="sort-toggle">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort by"
              >
                <option value="age">Age</option>
                <option value="name">Name</option>
                <option value="breed" disabled={!!filters.breeds}>Breed</option>

              </select>
              <button onClick={handleSortToggle}>
                Sort:{" "}
                {filters.sort === `${sortBy}:asc`
                  ? "Ascending"
                  : "Descending"}
              </button>
            </div>
        
          </div>

          <h2 id="dog-list">Available Dogs</h2>

          <div
            className="dog-list"
            role="region"
            aria-labelledby="dog-list"
            aria-live="polite"
          >
            <div className="dog-cards">
              {dogs.map((dogId) => (
                <DogCard
                  key={dogId}
                  dogId={dogId}
                  onFavorite={handleFavorite}
                  isFavourite={favorites.includes(dogId)}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            onNext={() => handlePagination("next")}
            onPrev={() => handlePagination("prev")}
            allowNext={!!pagination.next}
            allowPrev={!!pagination.prev}
          />
        </>
      )}
    </div>
  );
};

export default DogList;