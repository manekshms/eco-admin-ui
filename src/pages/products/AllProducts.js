import { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify'
import moment from 'moment';

import { fetchAllProductsAction } from '../../store/actions/productActions';
const AllProducts = (props) => {
    const { fetchAllProductsState, fetchAllProducts } = props;
    useEffect(() => {
        fetchAllProducts()
            .catch(e => {
                toast('Something went wrong while fetching products', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    },[fetchAllProducts]);

    return (
        <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Products</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>All Products</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">All Products</h3>
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                            <tr>
                                <td>Si No</td>
                                <td>Product Id</td>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Category</td>
                                <td>Description</td>
                                <td>Brand</td>
                                <td>Eco Rating</td>
                                <td>Packaging Score</td>
                                <td>Carbon Foot Print</td>
                                <td>Created At</td>
                            </tr>
                        </thead>
                        <tbody>
                            {fetchAllProductsState.products.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.productId}</td>
                                    <td><img alt="Product" src={process.env.REACT_APP_ECO_ADMIN_API_URL+"/product/image/"+item.imageName} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.ecoRating}</td>
                                    <td>{item.packaging}</td>
                                    <td>{item.carbonFootprint}</td>
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
        fetchAllProductsState: state.fetchAllProducts
    }
}

const mapDispatchToProps = {
    fetchAllProducts: fetchAllProductsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);