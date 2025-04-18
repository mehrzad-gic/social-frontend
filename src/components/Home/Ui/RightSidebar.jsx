import React from 'react'
import { Link } from 'react-router-dom'
import userImgBg from '../../../assets/images/avatar/04.jpg'
import { useInfiniteQuery } from '@tanstack/react-query'
import { all } from '../../../Controllers/GroupController'

export default function RightSidebar() {

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['groups'],
    queryFn: async ({ pageParam = 1 }) => {
      const token = JSON.parse(localStorage.getItem('user'))?.jwt
      const res = await all(token, pageParam)
      return res 
    },
    getNextPageParam: (lastPage) => {

      console.log(lastPage);
      
      // Check if we have more groups and ensure page is a number
      if (lastPage?.success && lastPage?.groups.length > 0) {
        const nextPage = Number(lastPage?.page) + 1
        console.log(nextPage);
        
        return nextPage
      }
      return undefined
    },
    initialPageParam: 1,
  })

  return (

    <div className="col-lg-3">
      <div className="row g-4">
        <div className="col-sm-6 col-lg-12">
          <div className="card">
            <div className="card-header pb-0 border-0">
              <h5 className="card-title mb-0">Groups</h5>
            </div>
            <div className="card-body">
              {status === 'pending' ? (
                <div className="text-center">Loading...</div>
              ) : status === 'error' ? (
                <div className="text-center text-danger">Error loading groups</div>
              ) : (
                data?.pages.map((page) =>
                  page.groups.map((group) => (
                    <div className='d-flex flex-column mb-4' key={group.id}>
                      <div className="hstack gap-2">
                        <div className="avatar">
                          <Link to={`/groups/${group.slug}`}>
                            <img
                              className="avatar-img rounded-circle"
                              src={group.img ? JSON.parse(group.img)[0].url : 'https://via.placeholder.com/150'}
                              alt=""
                            ></img>
                          </Link>
                        </div>
                        <div className="overflow-hidden">
                          <Link className="h6 mb-0" to={`/groups/${group.slug}`}>
                            {group.name}
                          </Link>
                          <p className='mb-0'>{group.des.length > 15 ? group.des.substring(0, 15) + "..." : group.des}</p>
                        </div>
                        <Link
                          className="btn btn-success-soft rounded-circle icon-md ms-auto"
                          to="#"
                        >
                          <i className="fa-solid fa-plus"> </i>
                        </Link>
                      </div>
                      <div className='d-inline-flex gap-3 mt-2'>
                        {group.type == 1 ? <p className='mb-0 text-success'><i className="fa-solid fa-users"></i> Public</p> : <p className='mb-0 text-danger'><i className="fa-solid fa-users"></i> Private</p>}
                        <p className="text-secondary mb-2"><i className="fa-solid fa-calendar-days"></i> {new Date(group.createdAt).toLocaleDateString()}</p>
                        <p className='mb-0 text-info'><i className="fa-solid fa-users"></i> {group.members}</p>
                      </div>
                    </div>
                  ))
                )
              )}

              {hasNextPage && (
                <div className="d-grid mt-3">
                  <button 
                    className="btn btn-sm btn-primary-soft"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? 'Loading more...'
                      : 'View more'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-12">
          <div className="card">
            <div className="card-header pb-0 border-0">
              <h5 className="card-title mb-0">Today's news</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link to="blog-details.html">
                    Ten questions you should answer truthfully
                  </Link>
                </h6>
                <small>2hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link to="blog-details.html">
                    Five unbelievable facts about money
                  </Link>
                </h6>
                <small>3hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link to="blog-details.html">
                    Best Pinterest Boards for learning about business
                  </Link>
                </h6>
                <small>4hr</small>
              </div>
              <div className="mb-3">
                <h6 className="mb-0">
                  <Link to="blog-details.html">
                    Skills that you can learn from business
                  </Link>
                </h6>
                <small>6hr</small>
              </div>
              <Link
                to="#!"
                role="button"
                className="btn btn-link btn-link-loader btn-sm text-secondary d-flex align-items-center"
                data-bs-toggle="button"
                aria-pressed="true"
              >
                <div className="spinner-dots me-2">
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                  <span className="spinner-dot"></span>
                </div>
                View all latest news
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
