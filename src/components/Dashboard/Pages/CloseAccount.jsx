// CloseAccount Component
const CloseAccount = () => {

    return (
        <>
            {/* <!-- Close account--> */}
            <div>

                <div class="card">

                    <div class="card-header border-0 pb-0">
                        <h5 class="card-title">Delete account</h5>
                        <p class="mb-0">He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to.</p>
                    </div>

                    <div class="card-body">

                        <h6>Before you go...</h6>
                        <ul>
                            <li>Take a backup of your data <a href="#">Here</a> </li>
                            <li>If you delete your account, you will lose your all data.</li>
                        </ul>
                        <div class="form-check form-check-md my-4">
                            <input class="form-check-input" type="checkbox" value="" id="deleteaccountCheck" data-has-listeners="true" />
                            <label class="form-check-label" for="deleteaccountCheck">Yes, I'd like to delete my account</label>
                        </div>
                        <a href="#" class="btn btn-success-soft btn-sm mb-2 mb-sm-0">Keep my account</a>
                        <a href="#" class="btn btn-danger btn-sm mb-0">Delete my account</a>

                    </div>

                </div>

            </div>
            {/* <!-- Close account--> */}
        </>
    )

};

export default CloseAccount;
