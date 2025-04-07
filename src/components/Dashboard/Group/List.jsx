import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { all } from "../../../Controllers/GroupController";
import Loading from "../../Home/Ui/Loading";

const GroupListDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: () => all(JSON.parse(localStorage.getItem("user")).jwt),
  });

  if (isLoading) return <Loading/>

  return (
    <>
      {/* Card header START */}
      <div className="card-header border-0 pb-0">
        <div className="row g-2">
          <div className="col-lg-2">
            {/* Card title */}
            <h1 className="h4 card-title mb-lg-0">Groups</h1>
          </div>
          <div className="col-sm-6 col-lg-3 ms-lg-auto">
            {/* Button modal */}
            <a className="btn btn-primary-soft ms-auto w-100" href="#" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
              <i className="fa-solid fa-plus pe-1"></i> Create group
            </a>
          </div>
        </div>
      </div>
      {/* Card header END */}

      {/* Card body START */}
      <div className="card-body mt-4">
        {/* Tab nav line */}
        <ul className="nav nav-tabs nav-bottom-line justify-content-center justify-content-md-start" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" data-bs-toggle="tab" href="#tab-1" aria-selected="true" role="tab">Friends' groups</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" href="#tab-2" aria-selected="false" tabIndex="-1" role="tab">Suggested for you</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" href="#tab-3" aria-selected="false" tabIndex="-1" role="tab">Popular near you</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-bs-toggle="tab" href="#tab-4" aria-selected="false" tabIndex="-1" role="tab">More suggestions</a>
          </li>
        </ul>

        <div className="tab-content mb-0 pb-0">
          {/* Friends groups tab START */}
          <div className="tab-pane fade show active" id="tab-1" role="tabpanel">
            <div className="row g-4">
              {data?.groups?.map((group) => (
                <div key={group.id} className="col-sm-6 col-lg-4">
                  {/* Card START */}
                  <div className="card">
                    <div 
                      className="h-80px rounded-top" 
                      style={{
                        backgroundImage: `url(${JSON.parse(group.img)[0].url})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                      }}
                    ></div>
                    {/* Card body START */}
                    <div className="card-body text-center pt-0">
                      {/* Avatar */}
                      <div className="avatar avatar-lg mt-n5 mb-3">
                        <Link to={`/group/${group.id}`}>
                          <img 
                            className="avatar-img rounded-circle border border-white border-3 bg-white" 
                            src={JSON.parse(group.img)[0].url} 
                            alt={group.name} 
                          />
                        </Link>
                      </div>
                      {/* Info */}
                      <h5 className="mb-0">
                        <Link to={`/group/${group.id}`}>{group.name}</Link>
                      </h5>
                      <small className="mt-2 d-inline-block">
                        <i className={`bi bi-${group.type === 0 ? 'lock' : 'globe'} pe-1`}></i>
                        {group.type === 0 ? 'Private' : 'Public'} Group
                      </small>
                      {/* Group stat START */}
                      <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                        {/* Group stat item */}
                        <div>
                          <h6 className="mb-0">{group.members_count}</h6>
                          <small>Members</small>
                        </div>
                        {/* Divider */}
                        <div className="vr"></div>
                        {/* Group stat item */}
                        <div>
                          <h6 className="mb-0">{group.posts_count}</h6>
                          <small>Posts</small>
                        </div>
                      </div>
                      {/* Group stat END */}

                      {/* Avatar group START */}
                      <ul className="avatar-group list-unstyled align-items-center justify-content-center mb-0 mt-3">
                        {group.recent_members?.slice(0, 4).map((member, index) => (
                          <li key={index} className="avatar avatar-xs">
                            <img 
                              className="avatar-img rounded-circle" 
                              src={member.avatar} 
                              alt={member.name} 
                            />
                          </li>
                        ))}
                        {group.recent_members?.length > 4 && (
                          <li className="avatar avatar-xs">
                            <div className="avatar-img rounded-circle bg-primary">
                              <span className="smaller text-white position-absolute top-50 start-50 translate-middle">
                                +{group.recent_members.length - 4}
                              </span>
                            </div>
                          </li>
                        )}
                      </ul>
                      {/* Avatar group END */}
                    </div>
                    {/* Card body END */}

                    {/* Card Footer START */}
                    <div className="card-footer text-center">
                      <Link 
                        className={`btn ${group.is_member ? 'btn-danger-soft' : 'btn-success-soft'} btn-sm`} 
                        to={`/group/${group.id}`}
                      >
                        {group.is_member ? 'Leave group' : 'Join group'}
                      </Link>
                    </div>
                    {/* Card Footer END */}
                  </div>
                  {/* Card END */}
                </div>
              ))}
            </div>
          </div>
          {/* Friends groups tab END */}

          {/* Suggested for you START */}
          <div className="tab-pane fade" id="tab-2" role="tabpanel">
            <div className="my-sm-5 py-sm-5 text-center">
              <i className="display-1 text-body-secondary bi bi-people"></i>
              <h4 className="mt-2 mb-3 text-body">No group founds</h4>
              <button className="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
                Click here to add
              </button>
            </div>
          </div>
          {/* Suggested for you END */}

          {/* Popular near you START */}
          <div className="tab-pane fade" id="tab-3" role="tabpanel">
            <div className="my-sm-5 py-sm-5 text-center">
              <i className="display-1 text-body-secondary bi bi-people"></i>
              <h4 className="mt-2 mb-3 text-body">No group founds</h4>
              <button className="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
                Click here to add
              </button>
            </div>
          </div>
          {/* Popular near you END */}

          {/* More suggestions START */}
          <div className="tab-pane fade" id="tab-4" role="tabpanel">
            <div className="my-sm-5 py-sm-5 text-center">
              <i className="display-1 text-body-secondary bi bi-people"></i>
              <h4 className="mt-2 mb-3 text-body">No group founds</h4>
              <button className="btn btn-primary-soft btn-sm" data-bs-toggle="modal" data-bs-target="#modalCreateGroup">
                Click here to add
              </button>
            </div>
          </div>
          {/* More suggestions END */}
        </div>
      </div>
      {/* Card body END */}
    </>
  );
};

export default GroupListDashboard;
