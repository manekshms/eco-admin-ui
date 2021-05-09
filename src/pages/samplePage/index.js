import React from 'react';

const SamplePage = () => {

    return (
      <div>
        <div className="row page-title-header">
          <div className="col-12">
            <div className="page-header">
              <h4 className="page-title">Page Title</h4>
              <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                <ul className="quick-links">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Bredcrumps</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Sample Page</a></li>
                </ul>
                <ul className="quick-links ml-auto">
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Right Breadcrumps</a></li>
                  <li><a href="!#" onClick={evt =>evt.preventDefault()}>Some options</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Sample page</h3>
                <div className="row">
                  <div className="col-md-12">
                   <p>Sample page</p> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
}
export default SamplePage;