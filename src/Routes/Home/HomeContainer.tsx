import { useEffect, useRef, useState } from "react";
import { graphql, Mutation, Query } from "react-apollo";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import { USER_PROFILE } from "../../sharedQueries";
import {
  acceptRide,
  acceptRideVariables,
  getDrivers,
  getRides,
  reportMovement,
  reportMovementVariables,
  requestRide,
  requestRideVariables,
  userProfile,
} from "../../types/api";
import HomePresenter from "./HomePresenter";
import {
  ACCEPT_RIDE,
  GET_NEARBY_DRIVERS,
  GET_NEARBY_RIDE,
  REPORT_LOCATION,
  REQUEST_RIDE,
} from "./HomeQueries";

let map: google.maps.Map;
let toMarker: google.maps.Marker;
let userMarker: google.maps.Marker;
let directions: google.maps.DirectionsRenderer;
let driversMarker: google.maps.Marker[] = [];

const HomeContainer: React.FC = (props: any) => {
  let mapRef: any = useRef();
  const [homeState, setHomeState] = useState({
    isMenuOpen: false,
    fromAddress: "",
    toAddress: "Incheon Airport",
    toLat: 0,
    toLng: 0,
    distance: "",
    duration: "",
    price: 0,
  });
  const [fromState, setFromState] = useState({
    lat: 0,
    lng: 0,
  });
  const [driveState, setDriveState] = useState({
    isDriving: false,
  });
  const {
    price,
    distance,
    duration,
    fromAddress,
    toAddress,
    toLat,
    toLng,
    isMenuOpen,
  } = homeState;
  const { lat, lng } = fromState;
  const { isDriving } = driveState;

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
    setFromState({ lat: latitude, lng: longitude });
    getFromAddress(latitude, longitude);
    loadMap(latitude, longitude);
  };

  const getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    if (address) {
      setHomeState({
        ...homeState,
        fromAddress: address,
      });
    }
  };

  const handleGeoError: PositionErrorCallback = () => {
    console.log("No location");
  };

  const handleGeoWatchSuccess = (position: GeolocationPosition) => {
    const { reportLocation } = props;
    const {
      coords: { latitude, longitude },
    } = position;
    userMarker.setPosition({ lat: latitude, lng: longitude });
    map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lastLat: latitude,
        lastLng: longitude,
      },
    });
  };

  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };

  const loadMap = (lat: number, lng: number) => {
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    if (!mapNode) {
      loadMap(lat, lng);
      return;
    }
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
      bounds.extend({ lat: fromState.lat, lng: fromState.lng });
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
  }, [toLat, toLng]);

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

  const handleNearbyDrivers = (data: getDrivers) => {
    const {
      GetNearbyDrivers: { ok, drivers },
    } = data;
    if (ok && drivers) {
      for (const driver of drivers) {
        if (driver && driver.lastLat && driver.lastLng) {
          const existingDriver:
            | google.maps.Marker
            | undefined = driversMarker.find(
            (driverMarker: google.maps.Marker) => {
              const markerID = driverMarker.get("ID");
              return markerID === driver.id;
            }
          );
          if (existingDriver) {
            existingDriver.setPosition({
              lat: driver.lastLat,
              lng: driver.lastLng,
            });
            existingDriver.setMap(map);
          } else {
            const markerOptions: google.maps.MarkerOptions = {
              position: {
                lat: driver.lastLat,
                lng: driver.lastLng,
              },
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
              },
            };
            const newMarker: google.maps.Marker = new google.maps.Marker(
              markerOptions
            );
            newMarker.set("ID", driver.id);
            newMarker.setMap(map);
            driversMarker.push(newMarker);
          }
        }
      }
    }
  };

  const handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving },
      } = GetMyProfile;
      setDriveState({ isDriving });
    }
  };

  const handleRideRequest = (data: requestRide) => {
    const { RequestRide } = data;
    if (RequestRide.ok) {
      toast.success("Drive requested, finding a driver");
    } else {
      toast.error(RequestRide.error);
    }
  };

  return (
    <Query<userProfile> query={USER_PROFILE} onCompleted={handleProfileQuery}>
      {({ data, loading }) => (
        <Query<getDrivers>
          query={GET_NEARBY_DRIVERS}
          fetchPolicy={"cache-and-network"}
          pollInterval={5000}
          skip={isDriving}
          onCompleted={(data) => {
            if (isDriving) return;
            handleNearbyDrivers(data);
          }}
        >
          {() => (
            <Mutation<requestRide, requestRideVariables>
              mutation={REQUEST_RIDE}
              onCompleted={handleRideRequest}
              variables={{
                pickUpAddress: fromAddress,
                pickUpLat: lat,
                pickUpLng: lng,
                dropOffAddress: toAddress,
                dropOffLat: toLat,
                dropOffLng: toLng,
                price,
                distance,
                duration,
              }}
            >
              {(requestRideFn) => (
                <Query<getRides> query={GET_NEARBY_RIDE} skip={!isDriving}>
                  {({ data: nearbyRide }) => (
                    <Mutation<acceptRide, acceptRideVariables>
                      mutation={ACCEPT_RIDE}
                    >
                      {(acceptRideFn) => (
                        <HomePresenter
                          loading={loading}
                          isMenuOpen={isMenuOpen}
                          toggleMenu={toggleMenu}
                          mapRef={mapRef}
                          toAddress={toAddress}
                          onInputChange={onInputChange}
                          onAddressSubmit={onAddressSubmit}
                          requestRideFn={requestRideFn}
                          acceptRideFn={acceptRideFn}
                          data={data}
                          price={price}
                          nearbyRide={nearbyRide}
                        />
                      )}
                    </Mutation>
                  )}
                </Query>
              )}
            </Mutation>
          )}
        </Query>
      )}
    </Query>
  );
};

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  { name: "reportLocation" }
)(HomeContainer);
