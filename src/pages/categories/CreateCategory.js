import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateCategory = (props) => {
    const { onCreateCategory } = props;
    const { register, handleSubmit, formState, reset } = useForm();

    const onSubmit = (data) => {
        onCreateCategory(data)
            .then(() => {
                toast.success('Category created successfully', {
                    position: toast.POSITION.TOP_CENTER
                });
                reset();
            })
            .catch((e) => {
                toast.error(e?.response?.data?.message || 'Something went wrong', {
                    position: toast.POSITION.TOP_CENTER
                });
            });
        
    } 
    return (
        <>
        <div className="card">
            <div className="card-body">
            <h3 className="card-title">Create Category</h3>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="category-name">Category Name</label>
                            <input 
                                {...register("name", {required: 'Category name is required'})}
                                name="name"
                                type="text"
                                id="category-name"
                                className={`form-control ${formState.errors.name ? 'is-invalid' : ''}`}
                            />
                            {formState.errors?.name && <div className="invalid-feedback">{formState.errors.name.message}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="category-description" >Category Description</label>
                            <input 
                                {...register("description", {required: 'Category description is required'})}
                                name="description"
                                type="text"
                                id="category-description"
                                className={`form-control ${formState.errors.description ? 'is-invalid' : ''}`}
                            />
                            {formState.errors?.description && <div className="invalid-feedback">{formState.errors.description.message}</div>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default CreateCategory;