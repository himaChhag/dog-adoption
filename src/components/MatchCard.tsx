import React, { useEffect, useState } from "react";

import { getMatch } from "../api.ts";
import DogCard from "./DogCard.tsx";
import { MatchCardProps, MatchResponse } from "../types.ts";

const MatchCard: React.FC<MatchCardProps> = ({favorites}) => {
  const [match, setMatch] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const matchData: MatchResponse = await getMatch(favorites);
        setMatch(matchData.match);
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };
    fetchMatch();
  }, [favorites]);

  if (!match) return <div>Loading...</div>;

  return (
    <div className="match-card">
      <h1>Your Match!</h1>
      {/* Display matched dog details here */}
      <p>Matched Dog ID: {match}</p>
      <DogCard dogId={match} />
    </div>
  );
};

export default MatchCard;