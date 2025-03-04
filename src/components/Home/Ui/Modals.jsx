import React from 'react'

export default function Modals() {
    return (
        <>
            <div
                className="modal fade"
                id="modalCreateFeed"
                aria-labelledby="modalLabelCreateFeed"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabelCreateFeed">
                                Create post
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <div className="avatar avatar-xs me-2">
                                    <img
                                        className="avatar-img rounded-circle"
                                        src="assets/images/avatar/03.jpg"
                                        alt=""
                                    ></img>
                                </div>

                                <form className="w-100">
                                    <textarea
                                        className="form-control pe-4 fs-3 lh-1 border-0"
                                        rows="4"
                                        placeholder="Share your thoughts..."
                                        autoFocus
                                    ></textarea>
                                </form>
                            </div>

                            <div className="hstack gap-2">
                                <Link
                                    className="icon-md bg-success bg-opacity-10 text-success rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Photo"
                                >
                                    <i className="bi bi-image-fill"></i>
                                </Link>
                                <Link
                                    className="icon-md bg-info bg-opacity-10 text-info rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Video"
                                >
                                    <i className="bi bi-camera-reels-fill"></i>
                                </Link>
                                <Link
                                    className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Events"
                                >
                                    <i className="bi bi-calendar2-event-fill"></i>
                                </Link>
                                <Link
                                    className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Feeling/Activity"
                                >
                                    <i className="bi bi-emoji-smile-fill"></i>
                                </Link>
                                <Link
                                    className="icon-md bg-light text-secondary rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Check in"
                                >
                                    <i className="bi bi-geo-alt-fill"></i>
                                </Link>
                                <Link
                                    className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle"
                                    to="#"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Tag people on top"
                                >
                                    <i className="bi bi-tag-fill"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="modal-footer row justify-content-between">
                            <div className="col-lg-3">
                                <select
                                    className="form-select js-choice choice-select-text-none"
                                    data-position="top"
                                    data-search-enabled="false"
                                >
                                    <option value="PB">Public</option>
                                    <option value="PV">Friends</option>
                                    <option value="PV">Only me</option>
                                    <option value="PV">Custom</option>
                                </select>
                            </div>
                            <div className="col-lg-8 text-sm-end">
                                <button type="button" className="btn btn-danger-soft me-2">
                                    <i className="bi bi-camera-video-fill pe-1"></i> Live
                                    video
                                </button>
                                <button type="button" className="btn btn-success-soft">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="feedActionPhoto"
                aria-labelledby="feedActionPhotoLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="feedActionPhotoLabel">
                                Add post photo
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <div className="avatar avatar-xs me-2">
                                    <img
                                        className="avatar-img rounded-circle"
                                        src="assets/images/avatar/03.jpg"
                                        alt=""
                                    ></img>
                                </div>

                                <form className="w-100">
                                    <textarea
                                        className="form-control pe-4 fs-3 lh-1 border-0"
                                        rows="2"
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                </form>
                            </div>

                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div
                                    className="dropzone dropzone-default card shadow-none"
                                    data-dropzone='{"maxFiles":2}'
                                >
                                    <div className="dz-message">
                                        <i className="bi bi-images display-3"></i>
                                        <p>Drag here or click to upload photo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer ">
                            <button
                                type="button"
                                className="btn btn-danger-soft me-2"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-success-soft">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="feedActionVideo"
                aria-labelledby="feedActionVideoLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="feedActionVideoLabel">
                                Add post video
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex mb-3">
                                <div className="avatar avatar-xs me-2">
                                    <img
                                        className="avatar-img rounded-circle"
                                        src="assets/images/avatar/03.jpg"
                                        alt=""
                                    ></img>
                                </div>

                                <form className="w-100">
                                    <textarea
                                        className="form-control pe-4 fs-3 lh-1 border-0"
                                        rows="2"
                                        placeholder="Share your thoughts..."
                                    ></textarea>
                                </form>
                            </div>

                            <div>
                                <label className="form-label">Upload attachment</label>
                                <div
                                    className="dropzone dropzone-default card shadow-none"
                                    data-dropzone='{"maxFiles":2}'
                                >
                                    <div className="dz-message">
                                        <i className="bi bi-camera-reels display-3"></i>
                                        <p>Drag here or click to upload video.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger-soft me-2">
                                <i className="bi bi-camera-video-fill pe-1"></i> Live video
                            </button>
                            <button type="button" className="btn btn-success-soft">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="modalCreateEvents"
                aria-labelledby="modalLabelCreateAlbum"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabelCreateAlbum">
                                Create event
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <form className="row g-4">
                                <div className="col-12">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Event name here"
                                    ></input>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Ex: topics, schedule, etc."
                                    ></textarea>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Date</label>
                                    <input
                                        type="text"
                                        className="form-control flatpickr"
                                        placeholder="Select date"
                                    ></input>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Time</label>
                                    <input
                                        type="text"
                                        className="form-control flatpickr"
                                        placeholder="Select time"
                                    ></input>
                                </div>

                                <div className="col-sm-4">
                                    <label className="form-label">Duration</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="1hr 23m"
                                    ></input>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Logansport, IN 46947"
                                    ></input>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Add guests</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Guest email"
                                    ></input>
                                </div>

                                <div className="col-12 mt-3">
                                    <ul className="avatar-group list-unstyled align-items-center mb-0">
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/01.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/02.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/03.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/04.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/05.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/06.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="avatar avatar-xs">
                                            <img
                                                className="avatar-img rounded-circle"
                                                src="assets/images/avatar/07.jpg"
                                                alt="avatar"
                                            ></img>
                                        </li>
                                        <li className="ms-3">
                                            <small> +50 </small>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <label className="form-label">Upload attachment</label>
                                    <div
                                        className="dropzone dropzone-default card shadow-none"
                                        data-dropzone='{"maxFiles":2}'
                                    >
                                        <div className="dz-message">
                                            <i className="bi bi-file-earmark-text display-3"></i>
                                            <p>
                                                Drop presentation and document here or click to
                                                upload.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger-soft me-2"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-success-soft">
                                Create now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
