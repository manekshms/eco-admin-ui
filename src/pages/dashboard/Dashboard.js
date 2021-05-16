import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { fetchAllStoresAction } from '../../store/actions/storeActions';

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

export const Dashboard = (props) => {
  const { fetchAllStores, fetchAllStoresState } = props;
  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  const { stores } = fetchAllStoresState;
  console.log(stores);
    return (
      <div>
        <div className="row proBanner">
          <div className="col-12">
            <span className="d-flex align-items-center purchase-popup">
              <p>Hi Admin Welcome to Eco Shopping dashboard</p>
            </span>
          </div>
        </div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Dashboard</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">Stores</h4>
                {stores.length > 0 &&
                <GoogleMapReact
                  //defaultCenter={{ lat: store.location.coordinates[0], lng: store.location.coordinates[1]}}
                  defaultCenter={{
                    lat: stores[4].location.coordinates[0],
                    lng: stores[4].location.coordinates[1]
                  }}
                  defaultZoom={11}
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                >
                  {stores.map(item => (
                    <Point
                      key={item.storeId}
                      lat={item.location.coordinates[0]}
                      lng={item.location.coordinates[1]}
                    />
                  ))}
                </GoogleMapReact>
                }
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-0">All Stores</h4>
                {stores.map(item => (
                <div className="d-flex py-2 border-bottom">
                  <div className="wrapper">
                    <small className="text-muted">{item.name}</small>
                    <p className="font-weight-semibold text-gray mb-0">{item.address}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
}

const mapStateToProps = (state) => {
  return {
    fetchAllStoresState: state.fetchAllStores
  };
}

const mapDispatchToProps = {
  fetchAllStores: fetchAllStoresAction
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);