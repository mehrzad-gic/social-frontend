// Messaging Component
const Messaging = () => {

    return (
        <>
            {/* <!-- Messaging--> */}
            <div>

                <div class="card mb-4">

                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Messaging privacy settings</h5>
                        <p class="mb-0">As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of Norland arrived. </p>
                    </div>

                    <div class="card-body">

                        <ul class="list-group list-group-flush">

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Enable message request notifications</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked" checked="" data-has-listeners="true" />
                                </div>
                            </li>

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Invitations from your network</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked2" checked="" data-has-listeners="true" />
                                </div>
                            </li>

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Allow connections to add you on group</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked3" data-has-listeners="true" />
                                </div>
                            </li>

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Reply to comments</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked4" data-has-listeners="true" />
                                </div>
                            </li>

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Messages from activity on my page or channel</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked5" checked="" data-has-listeners="true" />
                                </div>
                            </li>

                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Personalise tips for my page</h6>
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="msgSwitchCheckChecked6" checked="" data-has-listeners="true" />
                                </div>
                            </li>
                        </ul>

                    </div>

                    <div class="card-footer pt-0 text-end border-0">
                        <button type="submit" class="btn btn-sm btn-primary mb-0">Save changes</button>
                    </div>
                </div>

                <div class="card">

                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Messaging experience</h5>
                        <p class="mb-0">Arrived off she elderly beloved him affixed noisier yet. </p>
                    </div>

                    <div class="card-body">

                        <ul class="list-group list-group-flush">

                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Read receipts and typing indicators</h6>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>

                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Message suggestions</h6>
                                </div>
                                <button class="btn btn-primary-soft btn-sm mt-1 mt-md-0"> <i class="bi bi-pencil-square"></i> Change</button>
                            </li>

                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0">
                                <div class="me-2">
                                    <h6 class="mb-0">Message nudges</h6>
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
            {/* <!-- Messaging--> */}
        </>
    )

};

export default Messaging;
