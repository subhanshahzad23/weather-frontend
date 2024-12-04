// src/SearchBox.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Location {
  place_name: string;
  latitude: number;
  longitude: number;
}

interface Suggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

interface SearchBoxProps {
  setSelectedCountry: (country: string) => void;
  setCoordinates: (coordinates: {
    latitude: number;
    longitude: number;
  }) => void;
}

const SearchBox: React.FC<SearchBoxProps> = (props: SearchBoxProps) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [suggestionBool, setSuggestionBool] = useState<boolean>(true);

  useEffect(() => {
    if (query.length > 2 && suggestionBool) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (query: string) => {
    const accessToken =
      "pk.eyJ1IjoiYXJuYXZndXB0YTMwMzUiLCJhIjoiY2x4dzRuNDZmMTBqdDJqc2RmandpYzU3biJ9.fYFyj55KEZ1fgGwm6qqQ5Q"; // Replace with your Mapbox access token
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${accessToken}&autocomplete=true`;

    try {
      const response = await axios.get(url);
      const { features } = response.data;
      setSuggestions(features);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSearch = (place: Suggestion) => {
    setSuggestionBool(false);

    setQuery(place.place_name);

    const { center, place_name } = place;
    setLocation({ place_name, latitude: center[1], longitude: center[0] });
    console.log("Location:", {
      place_name,
      latitude: center[1],
      longitude: center[0],
    });
    props.setSelectedCountry(place_name);
    props.setCoordinates({ latitude: center[1], longitude: center[0] });
    setSuggestions([]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setSuggestionBool(true);
    }
    console.log(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div className=" w-full">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter a place name"
        className=" bg-gray-200 border-2 rounded-lg p-2 mr-2 font-semibold w-full schemed"
      />
      {suggestions.length > 0 && (
        <ul
          className="absolute flex flex-col w-fit p-2 shadow-sm h-40 schemed h-fit rounded-xl mt-1"
          style={{
            zIndex: 1000,
            top: "100px",
          }}
        >
          {suggestions.map((place) => (
            <button
              key={place.id}
              className="schemed m-2 outline-none	hover:border-current    w-fit	"
              onClick={() => handleSearch(place)}
            >
              {place.place_name}
            </button>
          ))}
        </ul>
      )}
      {/* {location && (
        <div>
          <h3>Location Details</h3>
          <p>Place Name: {location.place_name}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )} */}
    </div>
  );
};

export default SearchBox;
