import { connect } from 'react-redux';

import {  createStoreAction } from '../../store/actions/storeActions';
import ContentLoader from '../../shared/ContentLoader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CreateStore = (props) => {
    const { createStoreState, createStore } = props;
    const { register, formState, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
      createStore(data)
        .then(() => {
          reset();
          toast.success('Store created successfully', {
            position: toast.POSITION.TOP_CENTER
          });
        })
        .catch(e => {
          toast.error(e?.response?.data?.message || 'Something went wrong', {
            position: toast.POSITION.TOP_CENTER
          });
        })
    }

    return (
        <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Store</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Create Store</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Create store</h3>
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label htmlFor="store-name">Store Name</label>
                          <input
                            className={`form-control ${formState.errors.name ? 'is-invalid' : ''}`}
                            id="store-name"
                            type="text"
                            name="name"
                            placeholder="Store Name"
                            {...register("name", { required: 'Store Name is required'})}
                          />
                          {formState.errors?.name && <div className="invalid-feedback">{formState.errors.name.message}</div>}
                        </div >
                        <div className="col-md-4 form-group">
                          <label
                            htmlFor="store-phone-number"
                          >Store Phone Number</label>
                            <input
                            className={`form-control ${formState.errors.phoneNumber ? 'is-invalid' : ''}`}
                            id="store-phone-number"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            {...register("phoneNumber", { required: 'Phone Number is required'})}
                          />
                          {formState.errors?.phoneNumber && <div className="invalid-feedback">{formState.errors.phoneNumber.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label htmlFor="store-website">Website</label>
                          <input
                            id="store-website"
                            className={`form-control ${formState.errors.website ? 'is-invalid' : ''}`}
                            name="website"
                            {...register("website", { required: 'Website is required'})}
                            placeholder="Website"
                          />
                          {formState.errors?.website && <div className="invalid-feedback">{formState.errors.website.message}</div>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label
                            htmlFor="store-location"
                          >Location</label>
                          <input
                            id="store-location"
                            className={`form-control ${formState.errors.location ? 'is-invalid' : ''}`}
                            name="location"
                            {...register("location", { required: 'Location is required'})}
                            placeholder="Location"
                          />
                          {formState.errors?.location && <div className="invalid-feedback">{formState.errors.location.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label htmlFor="store-address">Address</label>
                          <textarea
                            className={`form-control ${formState.errors.address ? 'is-invalid' : ''}`}
                            id="store-address"
                            rows="4"
                            name="address"
                            placeholder="Store Address"
                            {...register("address", { required: 'Address is required'})}
                          ></textarea>
                          {formState.errors?.address && <div className="invalid-feedback">{formState.errors.address.message}</div>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-primary">Create Store</button>
                        </div>
                      </div>
                    </form>
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
      createStoreState: state.createStore
  }
}

const mapDispatchToProps = {
  createStore: createStoreAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);