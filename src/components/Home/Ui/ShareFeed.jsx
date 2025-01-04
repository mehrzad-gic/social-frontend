import { Link } from "react-router-dom";

const ShareFeed = () => {
  return (
    <>
      <div className="bg-mode p-4">
        {/*Share feed toolbar START */}
        <ul className="nav nav-pills nav-stack small fw-normal">
          <li className="nav-item">
            <Link
              className="nav-link bg-light py-1 px-2 mb-0"
              to="/create-media"
            >
              <i className="bi bi-image-fill text-success pe-2"></i>
              Media
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link bg-light py-1 px-2 mb-0"
              to="/create-post"
            >
              <i className="bi bi-camera-reels-fill text-info pe-2"></i>
              Article
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link bg-light py-1 px-2 mb-0" to="#">
              <i className="bi bi-calendar2-event-fill text-danger pe-2"></i>
              Event
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link bg-light py-1 px-2 mb-0"
              to="#!"
              data-bs-toggle="modal"
              data-bs-target="#modalCreateFeed"
            >
              <i className="bi bi-emoji-smile-fill text-warning pe-2"></i>
              Feeling /Activity
            </Link>
          </li>
          <li className="nav-item dropdown ms-lg-auto">
            <Link
              className="nav-link bg-light py-1 px-2 mb-0"
              to="#"
              id="feedActionShare"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </Link>
            {/*Dropdown menu */}
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="feedActionShare"
            >
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="bi bi-envelope fa-fw pe-2"></i>
                  Create a poll
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="bi bi-bookmark-check fa-fw pe-2"></i>
                  Ask a question
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="bi bi-pencil-square fa-fw pe-2"></i>
                  Help
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        {/*Share feed toolbar END */}
      </div>
    </>
  );
};

export default ShareFeed;
