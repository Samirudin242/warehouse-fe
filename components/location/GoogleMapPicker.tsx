import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { FormInstance } from "antd";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -6.2,
  lng: 106.816666,
};

type DefaultLocation = {
  lat: number;
  lng: number;
};

type MapPickerProps = {
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
  form?: FormInstance<any>;
  defaultLocation?: DefaultLocation;
  disabledClickMap?: boolean;
};

function GoogleMapPicker({
  onLocationSelect,
  form,
  defaultLocation,
  disabledClickMap,
}: MapPickerProps) {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAP || "";

  const [markerPosition, setMarkerPosition] = useState(
    defaultLocation?.lat ? defaultLocation : center
  );
  const [address, setAddress] = useState<string>("");

  const geocodeLatLng = (lat: number, lng: number) => {
    if (!google) {
      console.error("Google Maps library is not loaded");
      return;
    }
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;
        if (form) {
          form.setFieldValue("address", formattedAddress);
        }
        setAddress(formattedAddress);
        if (onLocationSelect) {
          onLocationSelect(lat, lng, formattedAddress);
        }
      } else {
        console.error("Geocoding failed: " + status);
      }
    });
  };

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng && !disabledClickMap) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setMarkerPosition({ lat, lng });
        geocodeLatLng(lat, lng);
      }
    },
    [onLocationSelect]
  );

  return (
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      onError={() => console.error("Failed to load Google Maps API")}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapPicker;
