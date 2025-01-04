// Privacy Component
const Privacy = () => {

    return (
        <>
            {/* <!-- Privacy and safety--> */}
            <div>

                <div class="card">

                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Privacy and safety</h5>
                        <p class="mb-0">See information about your account, download an archive of your data, or learn about your account deactivation options</p>
                    </div>

                    <div class="card-body">

                        <ul class="list-group">


                            <li class="list-group-item d-md-flex justify-content-between align-items-start">
                                <div class="me-md-3">
                                    <h6 class="mb-0">	Use two-factor authentication</h6>
                                    <p class="small mb-0">Unaffected occasional thoroughly. Adieus it no wonders spirit houses. </p>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>


                            <li class="list-group-item d-md-flex justify-content-between align-items-start">
                                <div class="me-md-3">
                                    <h6 class="mb-0">Login activity</h6>
                                    <p class="small mb-0">Select the language you use on social</p>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0" data-bs-toggle="modal" data-bs-target="#modalLoginActivity"> <i class="bi bi-eye"></i> View</button>
                            </li>


                            <li class="list-group-item d-md-flex justify-content-between align-items-start">
                                <div class="me-md-3">
                                    <h6 class="mb-0">Manage your data and activity</h6>
                                    <p class="small mb-0">Select a language for translation</p>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>


                            <li class="list-group-item d-md-flex justify-content-between align-items-start">
                                <div class="me-md-3">
                                    <h6 class="mb-0">Search history</h6>
                                    <p class="small mb-0">Choose to autoplay videos on social</p>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>


                            <li class="list-group-item d-md-flex justify-content-between align-items-start">
                                <div class="me-md-3">
                                    <h6 class="mb-0">Permitted services</h6>
                                    <p class="small mb-0">Choose if this feature appears on your profile</p>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>
                        </ul>

                    </div>

                    <div class="card-footer pt-0 text-end border-0">
                        <button type="submit" class="btn btn-sm btn-primary mb-0">Save changes</button>
                    </div>
                </div>

            </div>
            {/* <!-- Privacy and safety--> */}
        </>
    )

};

export default Privacy;