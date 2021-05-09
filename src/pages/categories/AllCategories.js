import moment from 'moment';

const AllCategories = (props) => {
    const { categories } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Si No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((item, index) => <tr key={item.categoryId}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
                </tr>)} 
            </tbody>
        </table>
    );
};

export default AllCategories;