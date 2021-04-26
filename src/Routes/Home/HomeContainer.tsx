import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Query } from "react-apollo";
import { USER_PROFILE } from "../../sharedQueries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";

const HomeContainer: React.FC = (props: any) => {
  let mapRef: any = useRef();
  let map: google.maps.Map;
  let userMarker: google.maps.Marker;

  const [homeState, setHomeState] = useState({
    isMenuOpen: false,
    lat: 0,
    lng: 0,
  });
  const { isMenuOpen } = homeState;

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
    console.log(position);
  };

  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };

  const loadMap = (lat: number, lng: number) => {
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      zoom: 11,
      minZoom: 8,
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

  return (
    <Query<userProfile> query={USER_PROFILE}>
      {({ loading }) => (
        <HomePresenter
          loading={loading}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          mapRef={mapRef}
        />
      )}
    </Query>
  );
};

export default HomeContainer;
