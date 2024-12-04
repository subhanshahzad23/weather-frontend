import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, Marker, PointLike, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { fetchData } from "../services/fetchWeather";

const mapboxToken =
  "pk.eyJ1IjoiYXJuYXZndXB0YTMwMzUiLCJhIjoiY2x4dzRuNDZmMTBqdDJqc2RmandpYzU3biJ9.fYFyj55KEZ1fgGwm6qqQ5Q"; // Replace with your Mapbox access token

interface LabelData {
  name: string;
  latitude: number;
  longitude: number;
}

interface MapComponentProps {
  selectedLocation: string;
  view: string;
  selectedValue: string;
  selectedTime: string;
  latitude: number;
  longitude: number;
}

export default function MapComponent(props: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [selectedCountryState, setSelectedCountryState] = useState<string>();
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12,
  });

 
  const [visibleLabels, setVisibleLabels] = useState<LabelData[]>();
  const markersRef = useRef<Marker[]>([]);
  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    "country-label",
    "state-label",
    "settlement-major-label",
  ]);

  function extractBoundingBox(polygon: any) {
    // Initialize variables to track minimum and maximum values
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLon = Infinity;
    let maxLon = -Infinity;

    // Iterate through each point in the polygon
    for (const ring of polygon) {
      for (const subRing of ring) {
        for (const [lon, lat] of subRing) {
          minLat = Math.min(minLat, lat); // Update minLat with the smaller value
          maxLat = Math.max(maxLat, lat); // Update maxLat with the larger value
          minLon = Math.min(minLon, lon); // Update minLon with the smaller value
          maxLon = Math.max(maxLon, lon); // Update maxLon with the larger value
        }
      }
    }

    console.log("Bounding box:", {
      minLat,
      maxLat,
      minLon,
      maxLon,
    });
    // Return the bounding box as an object
    return {
      minLat,
      maxLat,
      minLon,
      maxLon,
    };
  }

  const initializeMap = async (latitude: any, longitude: any) => {
    mapboxgl.accessToken = mapboxToken;
    // const polygons = countryBoundingBoxes[props.selectedLocation.toLowerCase()];
    // const bbox = extractBoundingBox(polygons);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/arnavgupta3035/clxw42zuj00b801pf1mqrhqs0",
      center: [longitude, latitude],
      zoom: viewport.zoom,

      // maxBounds: [
      //   [bbox.minLon, bbox.minLat],
      //   [bbox.maxLon, bbox.maxLat],
      // ],
    });
    map.on("load", () => {
      setMap(map);
      map.resize();
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      setViewport({
        longitude: lng,
        latitude: lat,
        zoom: map.getZoom(),
      });
    });
    map.on("moveend", async () => {
      const { lng, lat } = map.getCenter();
      console.log("Move end:", lng, lat);

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Query rendered features for country, state, and city labels
      const features = map.queryRenderedFeatures({
        layers: visibleLayers.filter((layer) => map.getLayer(layer)),
      } as any);

      const labels: LabelData[] = features
        .map((feature) => ({
          name: feature.properties?.name as string,
          latitude: (feature.geometry as GeoJSON.Point).coordinates[1],
          longitude: (feature.geometry as GeoJSON.Point).coordinates[0],
        }))
        .filter(Boolean);

      setVisibleLabels(labels);

      for (const label of labels) {
        const weather = await fetchData(
          label.latitude,
          label.longitude,
          props.selectedValue,
          props.selectedTime
        );

        // console.log("Weather data for", label.name, ":", weather);

        const el = document.createElement("div");
        el.className = "weather-marker";
        el.innerHTML = `<div style="display: flex; align-items: center; gap: 10px; background-color: #f8f8f8; padding: 10px; border-radius: 8px;">
  <img src="${weather.weather}" style="width: 50px; height: 50px;" alt="${
          weather.weather
        }" />
  <div>
    <div style="font-size: 1.2em; color: #213547; font-weight: bold;">${
      weather.temp
    }°C</div>
    <a href="${
      "/city-search/" + label.latitude + "/" + label.longitude
    }" style="color: #213547; text-decoration: underline; font-size: 0.9em;">Details</a>
  </div>
</div>`;

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setLngLat([label.longitude, label.latitude])
          .setDOMContent(el)
          .addTo(map);

        const marker = new mapboxgl.Marker({
          element: createMarkerElement(weather.weather as string, weather.temp),
        })
          .setLngLat([label.longitude, label.latitude])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);

        el.addEventListener("click", () => {
          popup.addTo(map);
        });
      }
    });

    const createMarkerElement = (imageUrl: string, temperature: any) => {
      const el = document.createElement("div");
      el.className = "marker";

      // Create an inner container for the image and temperature
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";

      // Create the image element
      const img = document.createElement("div");
      img.style.backgroundImage = `url(${imageUrl})`;
      img.style.width = "25px";
      img.style.height = "25px";
      img.style.backgroundSize = "100%";

      // Create the temperature element
      const temp = document.createElement("div");
      temp.style.color = "black";
      temp.style.fontSize = "12px";
      temp.textContent = `${temperature}°C`;

      // Append the image and temperature to the container
      container.appendChild(img);
      container.appendChild(temp);

      // Append the container to the marker element
      el.appendChild(container);

      return el;
    };

    const addMarker = async (lng: number, lat: number) => {
      try {
        const weather = await fetchData(
          lat,
          lng,
          props.selectedValue,
          props.selectedTime
        );

        const el = document.createElement("div");
        el.className = "weather-marker";
        el.innerHTML = `<div style="display: flex; align-items: center; gap: 10px; background-color: #f8f8f8; padding: 10px; border-radius: 8px;">
  <img src="${weather.weather}" style="width: 50px; height: 50px;" alt="${
          weather.weather
        }" />
  <div>
    <div style="font-size: 1.2em; color: #213547; font-weight: bold;">${
      weather.temp
    }°C</div>
    <a href="${
      "/city-search/" + lat + "/" + lng
    }" style="color: #213547; text-decoration: underline; font-size: 0.9em;">Details</a>
  </div>
</div>`;

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setLngLat([lng, lat])
          .setDOMContent(el)
          .addTo(map);

        const marker = new mapboxgl.Marker({
          element: createMarkerElement(weather.weather as string, weather.temp),
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
        popup.addTo(map);

        popup.on("close", handleClose);

        function handleClose() {
          const index = markersRef.current.indexOf(marker);
          if (index !== -1) {
            markersRef.current.splice(index, 1);
          }
          marker.remove();
          popup.remove();

          // Remove the event listener after handling the close event
          popup.off("close", handleClose);
        }

        popup.on("open", () => {
          const index = markersRef.current.indexOf(marker);
          if (index === -1) {
            markersRef.current.push(marker);
          }
        });
      } catch (error) {
        console.log("Maximum call stack exceeded");
      }
    };

    map.on(
      "click",
      [
        "settlement-major-label",
        "settlement-medium-label",
        "settlement-minor-label",
      ],
      async (e) => {
        console.log("Click event:", e);

        const { lng, lat } = e.lngLat;
        console.log("Click coordinates:", lng, lat);

        await fetchData(lat, lng, props.selectedValue, props.selectedTime).then(
          async (data) => {
            // console.log(data);
            await addMarker(lng, lat);
          }
        );
      }
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geolocation success:", latitude, longitude);

        try {
          if (props.latitude !== 0 && props.longitude !== 0) {
            await fetchData(
              props.latitude,
              props.longitude,
              props.selectedValue,
              props.selectedTime
            ).then((data) => {
              // console.log(data);
              setViewport({
                latitude,
                longitude,
                zoom: 12,
              });
            });

            await initializeMap(props.latitude, props.longitude);
          } else {
            await fetchData(
              latitude,
              longitude,
              props.selectedValue,
              props.selectedTime
            ).then((data) => {
              // console.log(data);
              setViewport({
                latitude,
                longitude,
                zoom: 12,
              });
            });

            await initializeMap(latitude, longitude);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      }
    );
  }, [props, props.selectedValue]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
      {/* <ul>
        {visibleLabels.map((label, index) => (
          <li key={index}>{label.name} ({label.latitude}, {label.longitude})</li>
        ))}
      </ul> */}
    </div>
  );
}
