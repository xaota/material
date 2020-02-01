/** */
  export default class LatLng {
  /** */
    constructor(latitude, longitude) {
      this.latitude  = latitude;
      this.longitude = longitude;
    }

  /** */
    get array() {
      return [this.latitude, this.longitude];
    }

  /** */
    get object() {
      return {
        lat: this.latitude,
        lng: this.longitude
      }
    }

  /** */
    static from(object) {
      return new LatLng(object.lat, object.lng);
    }
  }
