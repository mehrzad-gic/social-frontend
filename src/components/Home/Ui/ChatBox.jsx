import { Link } from "react-router-dom";

// ChatBox Component
const ChatBox = () => {

  return (

    <>

      <div className="d-none d-lg-block">
        <Link
          className="icon-md btn btn-primary position-fixed end-0 bottom-0 me-5 mb-5"
          data-bs-toggle="offcanvas"
          to="#offcanvasChat"
          role="button"
          aria-controls="offcanvasChat"
        >
          <i className="bi bi-chat-left-text-fill"></i>
        </Link>

        <div
          className="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          id="offcanvasChat"
        >
          <div className="offcanvas-header d-flex justify-content-between">
            <h5 className="offcanvas-title">Messaging</h5>
            <div className="d-flex">
              <Link to="#" className="btn btn-secondary-soft-hover py-1 px-2">
                <i className="bi bi-pencil-square"></i>
              </Link>

              <div className="dropdown">
                <Link
                  to="#"
                  className="btn btn-secondary-soft-hover py-1 px-2"
                  id="chatAction"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </Link>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="chatAction"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-check-square fa-fw pe-2"></i>Mark all
                      as read
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-gear fa-fw pe-2"></i>Chat setting
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-bell fa-fw pe-2"></i>Disable
                      notifications
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-volume-up-fill fa-fw pe-2"></i>Message
                      sounds
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-slash-circle fa-fw pe-2"></i>Block
                      setting
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      <i className="bi bi-people fa-fw pe-2"></i>Create a group
                      chat
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                to="#"
                className="btn btn-secondary-soft-hover py-1 px-2"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </div>
          </div>

          <div className="offcanvas-body pt-0 custom-scrollbar">
            <form className="rounded position-relative">
              <input
                className="form-control ps-5 bg-light"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              ></input>
              <button
                className="btn bg-transparent px-3 py-0 position-absolute top-50 start-0 translate-middle-y"
                type="submit"
              >
                <i className="bi bi-search fs-5"> </i>
              </button>
            </form>

            <ul className="list-unstyled">
              <li
                className="mt-3 hstack gap-3 align-items-center position-relative toast-btn"
                data-target="chatToast"
              >
                <div className="avatar status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/01.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Frances Guerrero
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Frances sent a photo.
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> Just now </div>
              </li>

              <li
                className="mt-3 hstack gap-3 align-items-center position-relative toast-btn"
                data-target="chatToast2"
              >
                <div className="avatar status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/02.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Lori Ferguson
                  </Link>
                  <div className="small text-secondary text-truncate">
                    You missed a call form Carolyn🤙
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 1min </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar status-offline">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/placeholder.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Samuel Bishop
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Day sweetness why cordially 😊
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 2min </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/04.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Dennis Barrett
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Happy birthday🎂
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 10min </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar avatar-story status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/05.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Judy Nguyen
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Thank you!
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 2hrs </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/06.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Carolyn Ortiz
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Greetings from Webestica.
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 1 day </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="flex-shrink-0 avatar">
                  <ul className="avatar-group avatar-group-four">
                    <li className="avatar avatar-xxs">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/06.jpg"
                        alt="avatar"
                      ></img>
                    </li>
                    <li className="avatar avatar-xxs">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/07.jpg"
                        alt="avatar"
                      ></img>
                    </li>
                    <li className="avatar avatar-xxs">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/08.jpg"
                        alt="avatar"
                      ></img>
                    </li>
                    <li className="avatar avatar-xxs">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/09.jpg"
                        alt="avatar"
                      ></img>
                    </li>
                  </ul>
                </div>

                <div className="overflow-hidden">
                  <Link
                    className="h6 mb-0 stretched-link text-truncate d-inline-block"
                    to="#!"
                  >
                    Frances, Lori, Amanda, Lawson
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Btw are you looking for job change?
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 4 day </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar status-offline">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/08.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Bryan Knight
                  </Link>
                  <div className="small text-secondary text-truncate">
                    if you are available to discuss🙄
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 6 day </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/09.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Louis Crawford
                  </Link>
                  <div className="small text-secondary text-truncate">
                    🙌Congrats on your work anniversary!
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 1 day </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/10.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Jacqueline Miller
                  </Link>
                  <div className="small text-secondary text-truncate">
                    No sorry, Thanks.
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 15, dec </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/11.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Amanda Reed
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Interested can share CV at.
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 18, dec </div>
              </li>

              <li className="mt-3 hstack gap-3 align-items-center position-relative">
                <div className="avatar status-online">
                  <img
                    className="avatar-img rounded-circle"
                    src="assets/images/avatar/12.jpg"
                    alt=""
                  ></img>
                </div>

                <div className="overflow-hidden">
                  <Link className="h6 mb-0 stretched-link" to="#!">
                    Larry Lawson
                  </Link>
                  <div className="small text-secondary text-truncate">
                    Hope you're doing well and Safe.
                  </div>
                </div>

                <div className="small ms-auto text-nowrap"> 20, dec </div>
              </li>

              <li className="mt-3 d-grid">
                <Link className="btn btn-primary-soft" to="messaging.html">
                  See all in messaging
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
        >
          <div className="toast-container toast-chat d-flex gap-3 align-items-end">
            <div
              id="chatToast"
              className="toast mb-0 bg-mode"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-bs-autohide="false"
            >
              <div className="toast-header bg-mode">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex">
                    <div className="flex-shrink-0 avatar me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 mt-1">Frances Guerrero</h6>
                      <div className="small text-secondary">
                        <i className="fa-solid fa-circle text-success me-1"></i>
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="dropdown">
                      <Link
                        className="btn btn-secondary-soft-hover py-1 px-2"
                        to="#"
                        id="chatcoversationDropdown"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </Link>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="chatcoversationDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-camera-video me-2 fw-icon"></i>
                            Video call
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-telephone me-2 fw-icon"></i>
                            Audio call
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-trash me-2 fw-icon"></i>Delete
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-chat-square-text me-2 fw-icon"></i>
                            Mark as unread
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-volume-up me-2 fw-icon"></i>
                            Muted
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-archive me-2 fw-icon"></i>
                            Archive
                          </Link>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-flag me-2 fw-icon"></i>Report
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Link
                      className="btn btn-secondary-soft-hover py-1 px-2"
                      data-bs-toggle="collapse"
                      to="#collapseChat"
                      aria-expanded="false"
                      aria-controls="collapseChat"
                    >
                      <i className="bi bi-dash-lg"></i>
                    </Link>
                    <button
                      className="btn btn-secondary-soft-hover py-1 px-2"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="toast-body collapse show" id="collapseChat">
                <div className="chat-conversation-content custom-scrollbar h-200px">
                  <div className="text-center small my-2">
                    Jul 16, 2022, 06:15 am
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            Applauded no discovery😊
                          </div>
                          <div className="small my-2">6:15 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end text-end mb-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white p-2 px-3 rounded-2">
                          With pleasure
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            Please find the attached
                          </div>

                          <div className="small my-2">12:16 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            How promotion excellent curiosity😮
                          </div>
                          <div className="small my-2">3:22 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end text-end mb-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white p-2 px-3 rounded-2">
                          And sir dare view.
                        </div>

                        <div className="d-flex my-2">
                          <div className="small text-secondary">5:35 PM</div>
                          <div className="small ms-2">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center small my-2">2 New Messages</div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/01.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-3 rounded-2">
                            <div className="typing d-flex align-items-center">
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <textarea
                    className="form-control mb-sm-0 mb-3"
                    placeholder="Type a message"
                    rows="1"
                  ></textarea>

                  <div className="d-sm-flex align-items-end mt-2">
                    <button className="btn btn-sm btn-danger-soft me-2">
                      <i className="fa-solid fa-face-smile fs-6"></i>
                    </button>
                    <button className="btn btn-sm btn-secondary-soft me-2">
                      <i className="fa-solid fa-paperclip fs-6"></i>
                    </button>
                    <button className="btn btn-sm btn-success-soft me-2">
                      Gif
                    </button>
                    <button className="btn btn-sm btn-primary ms-auto">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="chatToast2"
              className="toast mb-0 bg-mode"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              data-bs-autohide="false"
            >
              <div className="toast-header bg-mode">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex">
                    <div className="flex-shrink-0 avatar me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-0 mt-1">Lori Ferguson</h6>
                      <div className="small text-secondary">
                        <i className="fa-solid fa-circle text-success me-1"></i>
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="dropdown">
                      <Link
                        className="btn btn-secondary-soft-hover py-1 px-2"
                        to="#"
                        id="chatcoversationDropdown2"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </Link>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="chatcoversationDropdown2"
                      >
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-camera-video me-2 fw-icon"></i>
                            Video call
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-telephone me-2 fw-icon"></i>
                            Audio call
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-trash me-2 fw-icon"></i>Delete
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-chat-square-text me-2 fw-icon"></i>
                            Mark as unread
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-volume-up me-2 fw-icon"></i>
                            Muted
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-archive me-2 fw-icon"></i>
                            Archive
                          </Link>
                        </li>
                        <li className="dropdown-divider"></li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            <i className="bi bi-flag me-2 fw-icon"></i>Report
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Link
                      className="btn btn-secondary-soft-hover py-1 px-2"
                      data-bs-toggle="collapse"
                      to="#collapseChat2"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseChat2"
                    >
                      <i className="bi bi-dash-lg"></i>
                    </Link>
                    <button
                      className="btn btn-secondary-soft-hover py-1 px-2"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="toast-body collapse show" id="collapseChat2">
                <div className="chat-conversation-content custom-scrollbar h-200px">
                  <div className="text-center small my-2">
                    Jul 16, 2022, 06:15 am
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            Applauded no discovery😊
                          </div>
                          <div className="small my-2">6:15 AM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end text-end mb-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white p-2 px-3 rounded-2">
                          With pleasure
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            Please find the attached
                          </div>

                          <div className="small my-2">12:16 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-2 px-3 rounded-2">
                            How promotion excellent curiosity😮
                          </div>
                          <div className="small my-2">3:22 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end text-end mb-1">
                    <div className="w-100">
                      <div className="d-flex flex-column align-items-end">
                        <div className="bg-primary text-white p-2 px-3 rounded-2">
                          And sir dare view.
                        </div>

                        <div className="d-flex my-2">
                          <div className="small text-secondary">5:35 PM</div>
                          <div className="small ms-2">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center small my-2">2 New Messages</div>

                  <div className="d-flex mb-1">
                    <div className="flex-shrink-0 avatar avatar-xs me-2">
                      <img
                        className="avatar-img rounded-circle"
                        src="assets/images/avatar/02.jpg"
                        alt=""
                      ></img>
                    </div>
                    <div className="flex-grow-1">
                      <div className="w-100">
                        <div className="d-flex flex-column align-items-start">
                          <div className="bg-light text-secondary p-3 rounded-2">
                            <div className="typing d-flex align-items-center">
                              <div className="dot"></div>
                              <div className="dot"></div>
                              <div className="dot"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <textarea
                    className="form-control mb-sm-0 mb-3"
                    placeholder="Type a message"
                    rows="1"
                  ></textarea>

                  <div className="d-sm-flex align-items-end mt-2">
                    <button className="btn btn-sm btn-danger-soft me-2">
                      <i className="fa-solid fa-face-smile fs-6"></i>
                    </button>
                    <button className="btn btn-sm btn-secondary-soft me-2">
                      <i className="fa-solid fa-paperclip fs-6"></i>
                    </button>
                    <button className="btn btn-sm btn-success-soft me-2">
                      Gif
                    </button>
                    <button className="btn btn-sm btn-primary ms-auto">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );

};

export default ChatBox;
