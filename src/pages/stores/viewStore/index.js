import { useEffect } from "react";
import { useParams } from "react-router";
import { connect } from 'react-redux';
import { fetchStoreByIdAction } from "../../../store/actions/storeActions";
import StoreDetails from "./StoreDetails"

const ViewStore = (props) => {
    const { fetchStoreByIdState, fetchStoreById } = props;
    const params = useParams();
    useEffect(() => {
        fetchStoreById(params.id);
    }, [fetchStoreById]);
    return (
        <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Store</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Store Details</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
              {fetchStoreByIdState.store &&
                <StoreDetails store={fetchStoreByIdState.store}/> 
              }
          </div>
        </div>
      </div> 
    );
};

const mapStateToProps = (state) => {
    return {
        fetchStoreByIdState: state.fetchStoreById
    }
}

const mapDispatchToProps = {
    fetchStoreById: fetchStoreByIdAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewStore);