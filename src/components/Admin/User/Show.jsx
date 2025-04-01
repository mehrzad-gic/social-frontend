import { useQuery } from "@tanstack/react-query";
import { show } from "../../../Controllers/UserController";
import Loading from "../../Home/Ui/Loading";
import Error from "../../Home/Ui/Error";
import { useParams, Link } from "react-router-dom";

const Show = () => {
 
    const { slug } = useParams();
    const token = JSON.parse(localStorage.getItem('user'))?.jwt;
    const { data, isLoading, isError } = useQuery({
        queryKey: ['user', slug],
        queryFn: () => show(slug, token),
        enabled: !!slug && !!token
    });
    
    const img = data?.user?.img ? JSON.parse(data.user.img)[0].url : 'https://via.placeholder.com/150';
    console.log(img);
    if(isLoading) return <Loading />;

    return (
        <div className="container">
            <div className="row">
                {isError && <Error message={isError} />}
                <div className="col-md-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="text-primary">@{data?.user?.slug}</h1>
                        <Link to={`/admin/users/edit/${slug}`} className="btn btn-primary">Edit</Link>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={img} alt={data?.user?.name} className="img-fluid" />
                                </div>
                                <div className="col-md-7 offset-md-1">
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Name : </span> 
                                        {data?.user?.name ? data?.user?.name : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Title : </span> 
                                        {data?.user?.title ? data?.user?.title : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Email : </span> 
                                        {data?.user?.email ? data?.user?.email : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Status : </span> 
                                        {data?.user?.status ? data?.user?.status === 1 ? 'Active ✅' : 'Inactive' : 'N/A'}
                                    </p>     
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Bio : </span> 
                                        {data?.user?.bio ? data?.user?.bio : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Github : </span> 
                                        {data?.user?.github ? data?.user?.github : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">X : </span> 
                                        {data?.user?.x ? data?.user?.x : 'N/A'}
                                    </p>
                                    <p className="text-success mb-4">
                                        <span className="text-secondary fs-5 fw-bold">Birthday : </span> 
                                        {data?.user?.birthday ? new Date(data.user.birthday).toLocaleDateString() : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show;
