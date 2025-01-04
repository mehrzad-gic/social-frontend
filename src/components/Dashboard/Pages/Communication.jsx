// Communication Component
const Communication = () => {

    return (
        <>
            {/* <!-- Communications--> */}
            <div>

                <div class="card">

                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Who can connect with you?</h5>
                        <p class="mb-0">He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to.</p>
                    </div>

                    <div class="card-body">

                        <div class="accordion" id="communications">

                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="communicationOne">
                                    <button class="accordion-button mb-0 h6" type="button" data-bs-toggle="collapse" data-bs-target="#communicationcollapseOne" aria-expanded="true" aria-controls="communicationcollapseOne">
                                        Connection request
                                    </button>
                                </h2>

                                <div id="communicationcollapseOne" class="accordion-collapse collapse show" aria-labelledby="communicationOne" data-bs-parent="#communications">
                                    <div class="accordion-body">

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="ComRadio" id="ComRadio5" data-has-listeners="true" />
                                            <label class="form-check-label" for="ComRadio5">
                                                Everyone on social (recommended)
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="ComRadio" id="ComRadio2" checked="" data-has-listeners="true" />
                                            <label class="form-check-label" for="ComRadio2">
                                                Only people who know your email address
                                            </label>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="ComRadio" id="ComRadio3" data-has-listeners="true" />
                                            <label class="form-check-label" for="ComRadio3">
                                                Only people who appear in your mutual connection list
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="communicationTwo">
                                    <button class="accordion-button mb-0 h6 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#communicationcollapseTwo" aria-expanded="false" aria-controls="communicationcollapseTwo">
                                        Who can message you
                                    </button>
                                </h2>

                                <div id="communicationcollapseTwo" class="accordion-collapse collapse" aria-labelledby="communicationTwo" data-bs-parent="#communications">
                                    <div class="accordion-body">
                                        <ul class="list-group list-group-flush">

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Enable message request notifications</p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked" data-has-listeners="true" />
                                                </div>
                                            </li>

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Allow connections to add you on group </p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked2" checked="" data-has-listeners="true" />
                                                </div>
                                            </li>

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Allow Sponsored Messages </p>
                                                    <p class="small">Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages </p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked3" checked="" data-has-listeners="true" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item bg-transparent">
                                <h2 class="accordion-header" id="communicationThree">
                                    <button class="accordion-button mb-0 h6 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#communicationcollapseThree" aria-expanded="false" aria-controls="communicationcollapseThree">
                                        How people can find you
                                    </button>
                                </h2>

                                <div id="communicationcollapseThree" class="accordion-collapse collapse" aria-labelledby="communicationThree" data-bs-parent="#communications">
                                    <div class="accordion-body">
                                        <ul class="list-group list-group-flush">

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Allow search engines to show your profile?</p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked4" checked="" data-has-listeners="true" />
                                                </div>
                                            </li>

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Allow people to search by your email address? </p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked5" data-has-listeners="true" />
                                                </div>
                                            </li>

                                            <li class="list-group-item d-sm-flex justify-content-between align-items-center px-0 py-1 border-0">
                                                <div class="me-2">
                                                    <p class="mb-0">Allow Sponsored Messages </p>
                                                    <p class="small">Your personal information is safe with our marketing partners unless you respond to their Sponsored Messages </p>
                                                </div>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" role="switch" id="comSwitchCheckChecked6" checked="" data-has-listeners="true" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="card-footer pt-0 text-end border-0">
                        <button type="submit" class="btn btn-sm btn-primary mb-0">Save changes</button>
                    </div>
                </div>
            </div>
            {/* <!-- Communications--> */}
        </>
    )

};

export default Communication;
