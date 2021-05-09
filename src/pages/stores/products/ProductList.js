import moment from 'moment';

const ProductList = (props) => {
    const { products } = props;
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Si No</th>
                    <th>Store Product Id</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Distance From Origin</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.storeProductId}</td>
                        <td>{item.product.name}</td>
                        <td><img src={`${process.env.REACT_APP_ECO_ADMIN_API_URL}/product/image/${item.product.imageName}`} alt={item.product.name} /></td>
                        <td>{item.product.description}</td>
                        <td>{item.distanceFromOrigin}</td>
                        <td>{moment(item.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductList;