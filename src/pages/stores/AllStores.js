import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
import moment from 'moment';

import { fetchAllStoresAction } from '../../store/actions/storeActions';
import { Link } from 'react-router-dom';

const AllStores = (props) => {
    const { fetchAllStoresState, fetchAllStores } = props;
    useEffect(() => {
        fetchAllStores()
            .catch(e => {
                toast('Something went wrong while fetching stores', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    },[fetchAllStores]);
    console.log(fetchAllStoresState);
    return (
        <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Store</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>All Stores</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">All Stores</h3>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                            <tr>
                                <td>Si No</td>
                                <td>Name</td>
                                <td>Phone Number</td>
                                <td>Website</td>
                                <td>Address</td>
                                <td>Location</td>
                                <td>Created At</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchAllStoresState.stores.map((item, index) => (
                                <tr key={item.storeId}>
                                    <td>{index + 1}</td>
                                    <td><Link to={`/store/view/${item.storeId}`}>{item.name}</Link></td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.website}</td>
                                    <td>{item.address}</td>
                                    <td>{item.location.coordinates.toString()}</td>
                                    <td>{moment(item.createdAt).format('YYYY-DD-MM HH:MM:SS')}</td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                      </div>
                  </div>
                </div>
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
    }
}

const mapDispatchToProps = {
    fetchAllStores: fetchAllStoresAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStores);