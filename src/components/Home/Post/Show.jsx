import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { show } from "../../../Controllers/PostController";
import Loading from "../../../components/Home/Ui/Loading";
import Post from "../../../components/Home/Post/Post";

const Show = () => {

    const { slug } = useParams();
    const jwt = JSON.parse(localStorage.getItem("user")).jwt;
    
    // fetching data
    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", slug],
        queryFn: () => show(slug,jwt),
    });
    const post = data?.post;

    if (isLoading) return <Loading/>;
    if (isError) return <p>Error: {isError.message}</p>;
    
    return(
        <>
            {/* show post detail */}
            <Post value={post} />
        </>
    )

};

export default Show;