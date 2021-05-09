import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContentLoader from '../../shared/ContentLoader';
import { createCategoryAction, fetchAllCategoriesAction } from '../../store/actions/categoryActions';

import AllCategories from './AllCategories';
import CreateCategory from './CreateCategory';

const Categories = (props) => {
  const { fetchAllCategories, createCategory, categoriesState } = props;

  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const onCreateCategory = (data) => {
    return createCategory(data)
    .then(() => {
      fetchAllCategories();
    })
  }

  return (
    <div>
      <div className="row page-title-header">
        <div className="col-12">
          <div className="page-header">
            <h4 className="page-title">Categories</h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin">
          <CreateCategory
            onCreateCategory={onCreateCategory}
          /> 
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">All Categories</h3>
              <div className="row">
                  <div className="col-md-12">
                    {categoriesState.pending && <ContentLoader />}
                    <AllCategories
                      categories={categoriesState.categories}
                    />         
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesState: state.fetchAllCategories
  }
};

const mapDispatchToProps = {
  createCategory: createCategoryAction,
  fetchAllCategories: fetchAllCategoriesAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);