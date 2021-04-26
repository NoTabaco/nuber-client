import React from "react";
import ReactDOM from "react-dom";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: any;
  public state = {
    address: "",
    lat: 0,
    lng: 0,
  };

  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public handleGeoSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
    this.reverseGeoCodeAddress(latitude, longitude);
  };

  public handleGeoError = () => {
    console.log("No location");
  };

  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({ lat, lng });
    this.reverseGeoCodeAddress(lat, lng);
  };

  public reverseGeoCodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    if (reversedAddress !== false) {
      this.setState({ address: reversedAddress });
    }
  };

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public onInputBlur = async () => {
    const { address } = this.state;
    if (address === "") {
      return;
    }
    const result = await geoCode(address);
    if (result !== false) {
      const { formatted_address: address, lat, lng } = result;
      this.setState({ address, lat, lng });
      this.map.panTo({ lat, lng });
    }
  };

  public loadMap = (lat: number, lng: number) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      zoom: 11,
      minZoom: 8,
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };

  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
      />
    );
  }
}

export default FindAddressContainer;
