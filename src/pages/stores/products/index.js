import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
const StoreProducts = () => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    }
    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label>Select Product</label>
                            <select className="form-control">
                                <option>Select Product</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <label>Distance From Origin</label>
                            <input className="form-control" type="text" placeholder="Distance From Origin" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
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
                                    <select className="form-control">
                                        <option>Select Store</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-12">
                                    <button 
                                        className="btn btn-success"
                                        onClick={() => { setShowModal(true)}}
                                    >Add New</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </> 
    );
};

export default StoreProducts;