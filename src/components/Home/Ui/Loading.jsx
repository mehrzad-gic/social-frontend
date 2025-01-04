const Loading = () => {

    return (  
        <div className="loading-container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>  
            <div className="spinner-border text-primary" role="status">  
                <span className="sr-only">Loading...</span>  
            </div>  
            <div className="loading-message mt-3" style={{ fontSize: '1.5rem', color: '#007bff' }}>  
                Loading, please wait...  
            </div>  
        </div>  
    ); 
};

export default Loading;