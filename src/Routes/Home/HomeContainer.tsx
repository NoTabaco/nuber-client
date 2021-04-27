import { useEffect, useRef, useState } from "react";
import { Query } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { geoCode } from "../../mapHelpers";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";

let map: google.maps.Map;
let toMarker: google.maps.Marker;
let userMarker: google.maps.Marker;
let directions: google.maps.DirectionsRenderer;

const HomeContainer: React.FC = (props: any) => {
  let mapRef: any = useRef();
  const [homeState, setHomeState] = useState({
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: "",
    toLat: 0,
    toLng: 0,
    distance: "",
    duration: "",
    price: 0,
  });
  const {
    price,
    distance,
    lat,
    lng,
    toLat,
    toLng,
    isMenuOpen,
    toAddress,
  } = homeState;

  const toggleMenu = () => {
    setHomeState({
      ...homeState,
      isMenuOpen: !isMenuOpen,
    });
  };

  const handleGeoSuccess: PositionCallback = (
    position: GeolocationPosition
  ) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setHomeState({
      ...homeState,
      lat: latitude,
      lng: longitude,
    });
    loadMap(latitude, longitude);
  };

  const handleGeoError: PositionErrorCallback = () => {
    console.log("No location");
  };

  const handleGeoWatchSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    userMarker.setPosition({ lat: latitude, lng: longitude });
    map.panTo({ lat: latitude, lng: longitude });
  };

  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };

  const loadMap = (lat: number, lng: number) => {
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      zoom: 13,
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
    };
    map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      position: {
        lat,
        lng,
      },
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7,
      },
    };
    userMarker = new maps.Marker(userMarkerOptions);
    userMarker.setMap(map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "toAddress") {
      setHomeState({ ...homeState, toAddress: value });
    }
  };

  const onAddressSubmit = async () => {
    const { google } = props;
    const maps = google.maps;
    if (toAddress === "") {
      return;
    }
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { formatted_address, lat, lng } = result;
      if (toMarker) {
        toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng,
        },
      };
      toMarker = new maps.Marker(toMarkerOptions);
      toMarker.setMap(map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat: homeState.lat, lng: homeState.lng });
      bounds.extend({ lat, lng });
      map.fitBounds(bounds);
      setHomeState({
        ...homeState,
        toAddress: formatted_address,
        toLat: lat,
        toLng: lng,
      });
    }
  };

  useEffect(() => {
    if (toLat === 0 && toLng === 0) {
      return;
    } else {
      createPath();
    }
  }, [toLat || toLng]);

  const createPath = () => {
    if (directions) {
      directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000",
      },
    };
    directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const from = new google.maps.LatLng(lat, lng);
    const to = new google.maps.LatLng(toLat, toLng);
    const directionsOptions: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      // TravelMode DRIVING is not yet supported in Korea.
      travelMode: google.maps.TravelMode.TRANSIT,
    };
    directionsService.route(directionsOptions, handleRouteRequest);
  };

  const handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK") {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration },
      } = routes[0].legs[0];
      setHomeState({ ...homeState, distance, duration });
      directions.setDirections(result);
      directions.setMap(map);
    } else {
      toast.error("There is no route there, you have to swim");
    }
  };

  useEffect(() => {
    if (distance === "") {
      return;
    } else {
      setPrice();
    }
  }, [distance]);

  const setPrice = () => {
    setHomeState({
      ...homeState,
      price: Math.floor(parseFloat(distance.replace("km", "")) * 3),
    });
  };

  // Incheon Airport
  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ loading }) => (
        <HomePresenter
          loading={loading}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          mapRef={mapRef}
          toAddress={toAddress}
          onInputChange={onInputChange}
          onAddressSubmit={onAddressSubmit}
          price={price}
        />
      )}
    </Query>
  );
};

export default HomeContainer;
