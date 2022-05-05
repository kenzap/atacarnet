export const HTMLContent = (__) => {

    return `
    <div class="container p-edit">
        <div class="d-md-flex justify-content-between bd-highlight mb-3">
            <nav class="bc" aria-label="breadcrumb"></nav>
            <button class="btn btn-primary btn-save mt-3 mb-1 mt-md-0 mb-md-0" type="button">${ __('Save changes') }</button>
        </div>
        <div class="row">
            <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
              <div class="card border-white shadow-sm p-sm-3 ">
                <nav class="nav tab-content mb-4" role="tablist">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-link active" id="nav-notifications-link" data-bs-toggle="tab" data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications" aria-selected="true" href="#">${ __('General') }</a>
                        <a class="nav-link" id="nav-currency-link" data-bs-toggle="tab" data-bs-target="#nav-currency" type="button" role="tab" aria-controls="nav-currency" aria-selected="true" href="#">${ __('Payments') }</a>
                    </div>
                </nav>
                <div class="card-body tab-content" id="nav-tabContent">
                  <div class="tab-pane fade show active" id="nav-notifications" role="tabpanel" aria-labelledby="nav-notifications-link">
                    
                    <h4 id="gen" class="card-title mb-4">${ __('Orders') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Order ID') }</label>
                          <div class="col-sm-9">
                            <input id="last_order_id" type="text" class="form-control inp" name="last_order_id" data-type="emails">
                            <p class="form-text">${ __('Define next new order ID number.') }</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 id="gen" class="card-title mb-4 mt-4">${ __('Notifications') }</h4>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('New order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_new_order" class="form-control inp" name="notify_new_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_new_order_emails" type="text" class="form-control inp" name="notify_new_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Cancelled order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_cancel_order" class="form-control inp" name="notify_cancel_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_cancel_order_emails" type="text" class="form-control inp" name="notify_cancel_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Processing order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_proc_order" class="form-control inp" name="notify_proc_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_proc_order_emails" type="text" class="form-control inp" name="notify_proc_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_refunded_order" class="form-control inp" name="notify_refunded_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_refunded_order_emails" type="text" class="form-control inp" name="notify_refunded_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Refunded order') }</label>
                          <div class="col-sm-9">
                            <select id="notify_completed_order" class="form-control inp" name="notify_completed_order" data-type="select">
                                <option value="">${ __('None') }</option>
                                <option value="client">${ __('Client') }</option>
                                <option value="admin">${ __('Administrator') }</option>
                                <option value="both">${ __('Client and administrator') }</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Admin emails') }</label>
                          <div class="col-sm-9">
                            <input id="notify_completed_order_emails" type="text" class="form-control inp" name="notify_completed_order_emails" data-type="emails">
                          </div>
                        </div>
                      </div>
                    </div>

                    <br>
                    <hr>
                    <br>
                    <br>
                  </div>
                    <div class="tab-pane fade" id="nav-currency" role="tabpanel" aria-labelledby="nav-currency-link">
                      <h4 id="gen" class="card-title mb-4">${ __('Currency settings') }</h4>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Currency') }</label>
                            <div class="col-sm-9">
                              <select id="currency" class="form-control inp" name="currency" data-type="select">
                                
                              
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Currency symbol') }</label>
                            <div class="col-sm-9">
                              <input id="currency_symb" type="text" class="form-control inp" name="currency_symb" data-type="text">
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Currency position') }</label>
                            <div class="col-sm-9">
                              <select id="currency_symb_loc" class="form-control inp" name="currency_symb_loc" data-type="select">
                                <option value="left">${ __('Left') }</option>
                                <option value="right">${ __('Right') }</option>
                                <option value="left_space">${ __('Left with space') }</option>
                                <option value="right_space">${ __('Right with space') }</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">

                        </div>
                      </div>

                      <h4 id="gen" class="card-title mb-4 mt-4">${ __('Tax') }</h4>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Tax') }</label>
                            <div class="col-sm-9">
                              <div class="form-check">
                                <input id="tax_calc" class="form-check-input inp" name="tax_calc" type="checkbox" value="1" data-type="checkbox">
                                <label class="form-check-label" for="tax_calc">
                                  ${ __('Calculate') }
                                </label>
                              </div>
                              <p class="form-text">${ __('Enable tax calculations when processing orders.') }</p>
                            </div> 
                          </div>
                        </div>
            
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Geolocation') }</label>
                            <div class="col-sm-9">
                              <div class="form-check">
                                <input id="tax_auto_rate" class="form-check-input inp" name="tax_auto_rate" type="checkbox" value="1" data-type="checkbox">
                                <label class="form-check-label" for="tax_auto_rate">
                                  ${ __('Auto tax rate') }
                                </label>
                              </div>
                              <p class="form-text">${ __('Automatically detect tax rate whenever applicable.') }</p>
                            </div> 
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Rate') }</label>
                            <div class="col-sm-9">
                              <input id="tax_rate" type="text" class="form-control inp" placeholder="21" name="tax_rate" data-type="text">
                              <p class="form-text">${ __('Default tax rate. Example, 9 or 21. Use numeric value.') }</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Display') }</label>
                            <div class="col-sm-9">
                              <input id="tax_display" type="text" class="form-control inp" placeholder="VAT" name="tax_display" data-type="text">
                              <p class="form-text">${ __('Tax title. Example, VAT or GST.') }</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 id="gen" class="card-title mb-4 mt-4">${ __('Invoice and receipts') }</h4>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1">
                            <label class="col-sm-3 col-form-label">${ __('Receipts') }</label>
                            <div class="col-sm-9">
                              <textarea id="receipt_template" class="form-control inp" name="receipt_template" rows="20" data-type="text" style="font-size:13px;font-family: monospace;"></textarea>
                              <p class="form-text">${ __('Invoice receipt design for printers.') }</p>
                            </div> 
                          </div>
                        </div>
            
                        <div class="col-lg-6">
                          <div class="form-group row mb-3 mt-1 d-none">
                            <label class="col-sm-3 col-form-label">${ __('Geolocation') }</label>
                            <div class="col-sm-9">
                              <div class="form-check">
                                <input id="tax_auto_rate" class="form-check-input inp" name="tax_auto_rate" type="checkbox" value="1" data-type="checkbox">
                                <label class="form-check-label" for="tax_auto_rate">
                                  ${ __('Auto tax rate') }
                                </label>
                              </div>
                              <p class="form-text">${ __('Automatically detect tax rate whenever applicable.') }</p>
                            </div> 
                          </div>
                        </div>
                      </div>

                      <br>
                      <hr>
                      <br>
                      <br>
                    </div>
                    
                    <div class="tab-pane fade" id="nav-tax" role="tabpanel" aria-labelledby="nav-tax-link">
                    <h4 id="tax" class="card-title mb-4">${ __('Your tax information') }</h4>
                    <p class="card-description"> ${ __('Invoice info (this information will be not revealed public)') } </p>

                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Tax ID') }</label>
                          <div class="col-sm-9">
                            <input id="vat" type="text" class="form-control inp" name="vat" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Email') }</label>
                          <div class="col-sm-9">
                            <input id="email" type="email" class="form-control inp" name="email" data-type="email">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Company') }</label>
                          <div class="col-sm-9">
                            <input id="company" type="text" class="form-control inp inp" name="company" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Type') }</label>
                          <div class="col-sm-4">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" value="individual" data-type="radio" checked="true">
                                ${ __('Individual') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="entity_type" value="business" data-type="radio">
                                ${ __('Business') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description">
                        ${ __('Address') }
                    </p>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label"> ${ __('Address 1') }</label>
                          <div class="col-sm-9">
                            <input id="addr1" type="text" class="form-control inp" name="addr1" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('State') }</label>
                          <div class="col-sm-9">
                            <input id="state" type="text" class="form-control inp" name="state" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Address 2') }</label>
                          <div class="col-sm-9">
                            <input id="addr2" type="text" class="form-control inp" name="addr2" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Postcode') }</label>
                          <div class="col-sm-9">
                            <input id="post" type="text" class="form-control inp" name="post" data-type="text">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('City') }</label>
                          <div class="col-sm-9">
                            <input id="city" type="text" class="form-control inp" name="city" data-type="text">
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group row mb-3 mt-1">
                          <label class="col-sm-3 col-form-label">${ __('Country') }</label>
                          <div class="col-sm-9">
                            <select id="country" class="form-control inp" name="country" data-type="select">
                              <?php include('inc/select-countries.php'); ?>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                </div>
              </div>
            </div>
        </div>
    </div>
    
    <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center" >   
      <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">  
          <div class="toast-body"></div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    `;
}