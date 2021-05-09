import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { fetchAllCategoriesAction } from '../../store/actions/categoryActions';
import {  createProductAction } from '../../store/actions/productActions';
import ContentLoader from '../../shared/ContentLoader';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const CreateProduct = (props) => {
    const { fetchAllCategories, fetchAllCategoriesState, createProduct } = props;
    const [ispagedLoaded, setIsPageLoaded] = useState(false);
    const { register, formState, handleSubmit, reset } = useForm();
    useEffect(() => {
      fetchAllCategories()
        .then(data => {
          setIsPageLoaded(true);
        })
        .catch(e => {
          toast.error(e?.response?.data?.message || 'Something went wrong', {
            position: toast.POSITION.TOP_CENTER
          });
        })
    }, [fetchAllCategories])

    const onSubmit = (dt) => {
      dt.imageName = dt.imageName[0];
      const data = new FormData();
      for (const key in dt) {
        data.append(key, dt[key])
      }
      createProduct(data)
        .then(() => {
          reset();
          toast.success('Product created successfully', {
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
              <h4 className="page-title">Product</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Create Product</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Create product</h3>
                <div className="row">
                  <div className="col-md-12">
                    {!ispagedLoaded && <ContentLoader />}
                    {ispagedLoaded &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label htmlFor="product-name">Product Name</label>
                          <input
                            className={`form-control ${formState.errors.name ? 'is-invalid' : ''}`}
                            id="product-name"
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            {...register("name", { required: 'Product Name is required'})}
                          />
                          {formState.errors?.name && <div className="invalid-feedback">{formState.errors.name.message}</div>}
                          <div></div>
                        </div >
                        <div className="col-md-4 form-group">
                          <label
                            htmlFor="product-category"
                          >Product Category</label>
                          <select
                            id="product-category"
                            className={`form-control ${formState.errors.categoryId ? 'is-invalid' : ''}`}
                            name="categoryId"
                            {...register("categoryId", { required: 'Category is required'})}
                          >
                            <option value="">Select Category</option>
                            {fetchAllCategoriesState.categories.map(item => (
                              <option value={item.categoryId}>{item.name}</option>
                            ))}
                          </select>
                          {formState.errors?.categoryId && <div className="invalid-feedback">{formState.errors.categoryId.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label htmlFor="brand-name">Brand Name</label>
                          <input
                            id="brand-name"
                            className={`form-control ${formState.errors.brandName ? 'is-invalid' : ''}`}
                            name="brand"
                            {...register("brand", { required: 'Category is required'})}
                            placeholder="Brand Name"
                          />
                          {formState.errors?.brandName && <div className="invalid-feedback">{formState.errors.brandName.message}</div>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label
                            htmlFor="category-packaging"
                          >Packaging</label>
                          <select
                            id="category-packaging"
                            className={`form-control ${formState.errors.packaging ? 'is-invalid' : ''}`}
                            name="packaging"
                            {...register("packaging", { required: 'Packaging is required'})}
                            placeholder="Packging"
                          >
                            <option value="">Select Packaging</option>
                            <option value="PLASTIC">Plastic</option>
                            <option value="CARDBOARD">Cardboard</option>
                            <option value="STYROFOAM">Styrofoam</option>
                          </select>
                          {formState.errors?.packaging && <div className="invalid-feedback">{formState.errors.packaging.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label>Carbon Footprint</label>
                          <input
                            className={`form-control ${formState.errors.carbonFootprint ? 'is-invalid' : ''}`}
                            id="product-carbon-footprint"
                            name="carbonFootprint"
                            placeholder="Carbon Footprint"
                            {...register("carbonFootprint", { required: 'Carbon Footprint is required'})}
                          />
                          {formState.errors?.carbonFootprint && <div className="invalid-feedback">{formState.errors.carbonFootprint.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label>Eco Rating</label>
                          <input
                            type="text"
                            className={`form-control ${formState.errors.carbonFootprint ? 'is-invalid' : ''}`}
                            placeholder="Eco Rating"
                            name="ecoRating"
                            {...register("ecoRating", { required: 'Eco Rating is required'})}
                          />
                          {formState.errors?.ecoRating && <div className="invalid-feedback">{formState.errors.ecoRating.message}</div>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label>Description</label>
                          <textarea 
                            placeholder="Description"
                            className={`form-control ${formState.errors.description ? 'is-invalid' : ''}`}
                            rows="5"
                            {...register("description", { required: 'Description is required'})}
                          ></textarea>
                          {formState.errors?.description && <div className="invalid-feedback">{formState.errors.description.message}</div>}
                        </div>
                        <div className="col-md-4 form-group">
                          <label htmlFor="product-image" >Product Image</label>
                          <input
                            id="product-image"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            className={`form-control ${formState.errors.imageName ? 'is-invalid' : ''}`}
                            name="imageName"
                            {...register("imageName", { required: 'Product Image is required'})}
                          />
                          {formState.errors?.imageName && <div className="invalid-feedback">{formState.errors.imageName.message}</div>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-primary">Create Product</button>
                        </div>
                      </div>
                    </form>
                    }
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
    fetchAllCategoriesState: state.fetchAllCategories,
  }
}

const mapDispatchToProps = {
  fetchAllCategories: fetchAllCategoriesAction,
  createProduct: createProductAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);