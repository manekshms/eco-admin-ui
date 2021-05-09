import { useEffect } from "react";
import { connect } from "react-redux"
import { toast } from "react-toastify";
import moment from 'moment';

import { fetchAllCustomersAction } from "../../store/actions/customerActions";
import ContentLoader from "../../shared/ContentLoader";

const AllCustomers = (props) => {
    const { fetchAllCustomers, fetchAllCustomersState } = props;

    useEffect(() => {
        fetchAllCustomers()
            .catch(e => {
                toast.error(e?.response?.data?.message || 'Something went wrong');
            });
    }, [fetchAllCustomers])

    return (
        <div>
            <div className="row page-title-header">
            <div className="col-12">
                <div className="page-header">
                <h4 className="page-title">Customers</h4>
                <div className="quick-link-wrapper w-100 d-md-flex flex-md-wrap">
                    <ul className="quick-links">
                    <li><a href="!#" onClick={evt =>evt.preventDefault()}>All Customers</a></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            <div className="row">
            <div className="col-md-12 grid-margin">
                <div className="card">
                <div className="card-body">
                    <h3 className="card-title">All Customers</h3>
                    <div className="row">
                    <div className="col-md-12">
                        {fetchAllCustomersState.pending && <ContentLoader />}
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Si No</td>
                                    <td>Customer Id</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Status</td>
                                    <td>Created At</td>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchAllCustomersState.customers.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.customerId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.isActive}</td>
                                        <td>{moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
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
    );
}

const mapStateToProps = (state) => {
    return {
        fetchAllCustomersState: state.fetchAllCustomers
    }
}

const mapDispatchToProps = {
    fetchAllCustomers: fetchAllCustomersAction
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCustomers);