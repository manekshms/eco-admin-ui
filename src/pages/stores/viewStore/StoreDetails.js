import GoogleMapReact from 'google-map-react';

import { MapPin } from 'react-feather';

const Point = (props) => {
    return (<div
        style={{
            width: '25px',
            height: '25px',
        }}
    >
        <MapPin size={24} color={'red'} />
    </div>)
}

const StoreDetails = (props) => {
    const { store } = props;
    console.log(store, process.env.REACT_APP_GOOGLE_MAP_API_KEY);
    return (
        <div className="card">
            <div className="card-body">
            <h3 className="card-title">Store Details</h3>
            <div className="row">
                <div className="col-md-3">
                    <h4>{store.name}</h4>
                    <h4>Address</h4>
                    <p>{store.address}</p>
                    <h4>Phone Number</h4>
                    <p>{store.phoneNumber}</p>
                    <h4>Website</h4>
                    <p>{store.website}</p>
                </div>
                <div className="col-md-9" style={{height: '200px'}}>
                    <h4>Location</h4>
                    <GoogleMapReact
                        defaultCenter={{ lat: store.location.coordinates[0], lng: store.location.coordinates[1]}}
                        defaultZoom={13}
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                    >
                        <Point 
                            lat={store.location.coordinates[0]}
                            lng={store.location.coordinates[1]}
                        />
                    </GoogleMapReact>
                </div>
            </div>
            </div>
        </div>
    );
};

export default StoreDetails;