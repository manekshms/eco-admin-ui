import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { addProductToStoreAction, fetchAllAvailableStoreProductsByStoreIdAction, fetchAllStoreProductsByStoreIdAction, fetchAllStoresAction } from '../../../store/actions/storeActions';
import ProductList from './ProductList';

const StoreProducts = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [currentStore, setCurrentStore] = useState(null);
    const [productId, setProductId] = useState(null);
    const [distanceFromOrigin, setDistanceFromOrigin] = useState("");
    const { 
        fetchAllStores,
        fetchAllStoresState,
        fetchAllAvailableStoreProductsByStoreId,
        fetchAllAvailableStoreProductsByStoreIdState,
        fetchAllStoreProductsByStoreId,
        fetchAllStoreProductsByStoreIdState,
        addProductToStore
    } = props;

    useEffect(() => {
        fetchAllStores()
            .catch(e => {
                toast.error(e?.response?.data?.message || 'Something went wrong', {
                    position: toast.POSITION.TOP_CENTER
                  })
            })
    }, [fetchAllStores]);

    const loadAllAvailableStoreProductByStoreId = useCallback(() => {
        fetchAllAvailableStoreProductsByStoreId(currentStore)
                .catch(e => {
                    debugger;
                    toast.error(e?.response?.data?.message || 'Something went wrong', {
                        position: toast.POSITION.TOP_CENTER
                      })
                });
    }, [currentStore, fetchAllAvailableStoreProductsByStoreId])

    const loadAllStoreProductsByStoreId = useCallback(() => {
        fetchAllStoreProductsByStoreId(currentStore)
                .catch(e => {
                    toast.error(e?.response?.data?.message || 'Something went wrong', {
                        position: toast.POSITION.TOP_CENTER
                      });
                });
    }, [currentStore, fetchAllStoreProductsByStoreId])

    useEffect(() => {
        if(currentStore) {
            // fetch all available store products
            loadAllAvailableStoreProductByStoreId(); 
            loadAllStoreProductsByStoreId();
        }
    }, [loadAllAvailableStoreProductByStoreId, loadAllStoreProductsByStoreId, currentStore]);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOnStoreChange = (e) => {
        const value = e.target.value;
        if(value) {
            setCurrentStore(value);
        }else {
            setCurrentStore(null);
        } 
    }

    const handleCreateStoreProductSubmit = (e) => {
        e.preventDefault();
        if(!productId) {
            toast.error('Product is required', {
                position: toast.POSITION.TOP_CENTER
              });
            return;
        }
        if(!distanceFromOrigin) {
            toast.error('Distance From origin is required', {
                position: toast.POSITION.TOP_CENTER
              });
            return;
        }
        const data = {
            productId,
            storeId: currentStore,
            distanceFromOrigin
        }
        addProductToStore(data)
            .then(() => {
                toast.success('Product Added to shop', {
                    position: toast.POSITION.TOP_CENTER
                  });
            })
            .catch(e => {
                toast.error(e?.response?.data?.message || 'Something went wrong', {
                    position: toast.POSITION.TOP_CENTER
                  });
            })
    }
    console.log(currentStore);
    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <form onSubmit={handleCreateStoreProductSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label>Select Product</label>
                                <select 
                                    className="form-control"
                                    onChange={(e) => {
                                        setProductId(e.target.value);
                                    }}
                                    value={productId}
                                >
                                    <option value="">Select Product</option>
                                    {fetchAllAvailableStoreProductsByStoreIdState.products.map(item => {
                                        return <option key={item.productId} value ={item.productId}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label>Distance From Origin</label>
                                <input 
                                    className="form-control"
                                    type="text"
                                    placeholder="Distance From Origin"
                                    onChange={(e) => {
                                        setDistanceFromOrigin(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button type="submit" variant="primary" >
                    Add Product
                </Button>
                </Modal.Footer>
                </form>
            </Modal>
            <div>
                <div className="row page-title-header">
                <div className="col-12">
                    <div className="page-header">
                        <h4 className="page-title">Store</h4>
                        <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                            <ul className="quick-links">
                                <li><a href="!#" onClick={evt =>evt.preventDefault()}>Store Product</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Store Product</h3>
                            <div className="row">
                                <div className="col-md-4">
                                    <select onChange={handleOnStoreChange} className="form-control">
                                        <option value="">Select Store</option>
                                        {fetchAllStoresState.stores.map(item => {
                                            return <option key={item.storeId} value={item.storeId}>{item.name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            {currentStore &&
                            <>
                                <hr />
                                <div className="row mb-3 ">
                                    <div className="col-md-12">
                                        <button 
                                            className="btn btn-success"
                                            onClick={() => { setShowModal(true)}}
                                        >Add New</button> 
                                    </div>
                                </div>
                                <h4>Products</h4>
                                <div className="row">
                                    <div className="col-md-12"><ProductList products={fetchAllStoreProductsByStoreIdState.products} /></div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </> 
    );
};

const mapStateToProps = (state) => {
    return {
        fetchAllStoresState: state.fetchAllStores,
        fetchAllAvailableStoreProductsByStoreIdState: state.fetchAllAvailableStoreProductsByStoreId,
        fetchAllStoreProductsByStoreIdState: state.fetchAllStoreProductsByStoreId
    }
};

const mapDispatchToProps = {
    fetchAllStores: fetchAllStoresAction,
    fetchAllAvailableStoreProductsByStoreId: fetchAllAvailableStoreProductsByStoreIdAction,
    fetchAllStoreProductsByStoreId: fetchAllStoreProductsByStoreIdAction,
    addProductToStore: addProductToStoreAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreProducts);