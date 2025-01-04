import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main class="py-5">
        <div class="container">
          <div class="h-100px d-none d-lg-block"></div>
          <div class="row align-items-center text-center py-sm-5">
            <div class="col-lg-8 mx-auto">
              <figure class="m-0 pt-5 pt-md-0">

              </figure>
              <h1 class="display-1 mt-4 text-danger">404</h1>
              <h2 class="mb-2 h1">Page Not Found!</h2>
              <p>
                Either something went wrong or this page doesn't exist anymore.
              </p>
              <Link class="btn btn-primary-soft btn-sm" to="">
                Got to home page
              </Link>
            </div>
          </div>
          <div class="h-100px d-none d-lg-block"></div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
