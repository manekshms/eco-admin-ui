import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

import Spinner from './shared/Spinner';
import Login from './pages/auth/Login';

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Categories = lazy(() => import('./pages/categories'));
const AllCustomers = lazy(() => import('./pages/customers/AllCustomers'));
const AllProducts = lazy(() => import('./pages/products/AllProducts'));
const CreateProduct = lazy(() => import('./pages/products/CreateProduct'));
const AllStores = lazy(() => import('./pages/stores/AllStores'));
const CreateStore = lazy(() => import('./pages/stores/CreateStore'));
const SamplePage = lazy(() => import('./pages/samplePage/'));
const ViewStore = lazy(() => import('./pages/stores/viewStore/'));
const StoreProducts = lazy(() => import('./pages/stores/products/'));

// const Buttons = lazy(() => import('./basic-ui/Buttons'));
// const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));

// const BasicElements = lazy(() => import('./form-elements/BasicElements'));

// const BasicTable = lazy(() => import('./tables/BasicTable'));

// const Mdi = lazy(() => import('./icons/Mdi'));

// const ChartJs = lazy(() => import('./charts/ChartJs'));

// const Error404 = lazy(() => import('./error-pages/Error404'));
// const Error500 = lazy(() => import('./error-pages/Error500'));

// const Login = lazy(() => import('./user-pages/Login'));
// const Register1 = lazy(() => import('./user-pages/Register'));


const AppRoutes = (props) => {
    const { loginState } = props;
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return loginState.isLoggedIn ? <Redirect to={Dashboard} /> : <Redirect to="/auth/login" />
            }}
          />
          <Route exact path="/auth/login" component={ Login } />
          {loginState.isLoggedIn &&
            <>
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/categories" component={ Categories } />
            <Route exact path="/customers/all-customers" component={ AllCustomers } />
            <Route exact path="/products/all-products" component={ AllProducts } />
            <Route exact path="/products/create-product" component={ CreateProduct } />
            <Route exact path="/store/all-Stores" component={ AllStores } />
            <Route exact path="/store/create-store" component={ CreateStore } />
            <Route exact path="/store/view/:id" component={ ViewStore } />
            <Route exact path="/store/products" component={ StoreProducts } />
            <Route exact path="/sample-page" component={ SamplePage } />
            </>
          }
          {/* <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/error-pages/error-404" component={ Error404 } />
          <Route path="/error-pages/error-500" component={ Error500 } /> */}
          <Redirect to="/auth/login" />
        </Switch>
      </Suspense>
    );
};

const mapStateToProps = (state) => {
  return {
    loginState: state.auth
  }
}

export default connect(mapStateToProps)(AppRoutes);