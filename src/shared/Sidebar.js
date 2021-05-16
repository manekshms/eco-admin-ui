import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';


import './Sidebar.scss';
import { logoutAction } from '../store/actions/authActions';
import LogoLight from '../assets/images/logo-white.png';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/auth/login');
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html"><img style={{widht: '200px', height: 'auto'}} src={LogoLight} alt="Logo Light" /></a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">ECO-Admin</a>
        </div>
        <ul className="nav">
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/categories') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/categories">
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title">Categories</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/products') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
              <span className="menu-title">Products</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.formElementsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/products/all-products') ? 'nav-link active' : 'nav-link' } to="/products/all-products">All Products</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/products/create-product') ? 'nav-link active' : 'nav-link' } to="/products/create-product">Create Product</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/store') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-table-large menu-icon"></i>
              <span className="menu-title">Stores</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.tablesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/store/all-stores') ? 'nav-link active' : 'nav-link' } to="/store/all-stores">All Stores</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/store/create-store') ? 'nav-link active' : 'nav-link' } to="/store/create-store">Create Stores</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/store/create-store') ? 'nav-link active' : 'nav-link' } to="/store/products">Store Products</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/customers') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <i className="mdi mdi-account-box-outline menu-icon"></i>
              <span className="menu-title">Customers</span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/customers/all-customers') ? 'nav-link active' : 'nav-link' } to="/customers/all-customers">All Customers</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a onClick={this.handleLogout} className="nav-link" href="_blank" rel="noopener noreferrer" target="_blank">
              <i className="mdi mdi-file-outline menu-icon"></i>
              <span className="menu-title">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  logout: logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));