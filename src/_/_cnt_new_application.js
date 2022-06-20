import { getCountries } from '../_/_helpers.js';
import { stepsContent } from '../_/_cnt_steps.js';

export const applicationContent = (__) => {

    let countryList = '';
    
    getCountries().forEach(el => { countryList += '<option value="' + el.code + '" '+(el.code=='SG' ? 'selected' : '')+'>' + __(el.name) + '</option>'; });

    return `
          ${ stepsContent(__) }

          <div class="container kp">

              <h4>${ __('Holder Information') }</h4>
              <div class="row g-2 mb-4">
                  <div class="col-md-2">
                      <div class="form-floating">
                          <select class="form-select inp" id="Title" name="Title" aria-label="Floating label select example">
                            <option value="" selected>${ __('no title') }</option>
                            <option value="Mr">${ __('Mr') }</option>
                            <option value="Mrs">${ __('Mrs') }</option>
                            <option value="Miss">${ __('Miss') }</option>
                            <option value="Ms">${ __('Ms') }</option>
                            <option value="Mx">${ __('Mx') }</option>
                            <option value="Sir">${ __('Sir') }</option>
                            <option value="Dr">${ __('Dr') }</option>
                          </select>
                          <label for="Title">${ __('Title') }</label>
                      </div>
                  </div>
                  <div class="col-md">
                      <div class="form-floating">
                          <input type="text" class="form-control inp" id="FirstName" name="FirstName" placeholder="Alex" autocomplete="off">
                          <label for="FirstName">${ __('First Name') }</label>
                      </div>
                  </div>
                  <div class="col-md">
                      <div class="form-floating">
                          <input type="text" class="form-control inp" id="LastName" name="LastName" placeholder="Smith" autocomplete="off">
                          <label for="LastName">${ __('Last Name') }</label>
                      </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                  <div class="col-md-6">
                      <div class="form-floating-">
                          <div class="col-sm-7">
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="ContantType" value="Individual" data-type="radio" >
                                ${ __('I am an individual') }
                                <i class="input-helper"></i></label>
                            </div>
     
                            <div class="form-check">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input inp" name="ContantType" value="Company" data-type="radio" checked="true">
                                ${ __('I represent a company') }
                                <i class="input-helper"></i></label>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="row company-inp g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="CompanyName" name="CompanyName" placeholder=" " autocomplete="off">
                        <label for="CompanyName">${ __('Company Name') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="CompanyReg" name="CompanyReg" placeholder=" " autocomplete="off">
                        <label for="CompanyReg">${ __('Registration Nr.') }</label>
                    </div>
                  </div>
              </div>

              <h4>${ __('Goods') }</h4>
              <div class="row company-inp g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">
                        <textarea type="text" class="form-control inp" style="min-height:80px;" id="IntendedUseOfGoods" name="IntendedUseOfGoods" placeholder=" " autocomplete="off" rows="5"></textarea>
                        <label for="IntendedUseOfGoods">${ __('Intended Use of Goods') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <textarea type="text" class="form-control inp" style="min-height:80px;"  id="Travels" name="Travels" placeholder=" " autocomplete="off" rows="5"></textarea>
                        <label for="Travels">${ __('List of Travels') }</label>
                    </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                <div class="col-md-6">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="Exhibition" >
                      <label class="form-check-label" for="Exhibition">
                        ${ __('Goods are for Exhibition') }
                      </label>
                      <p class="text-muted">${ __('If the goods are for exhibition you are advised to enter the name and address of the exhibition and of its organizers.') }</p>
                    </div>
                </div>
              </div>

              <h4>${ __('Contacts') }</h4>
              <div class="row g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">

                        <select class="form-select inp" id="Country" name="Country" aria-label="Floating label select example">
                          ${ countryList }
                        </select>
                      
                        <label for="Country">${ __('Country') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="City" name="City" placeholder=" " value="Singapore" autocomplete="off">
                        <label for="City">${ __('City') }</label>
                    </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="State" name="State" placeholder=" " value="" autocomplete="off">
                        <label for="State">${ __('State') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="ZIP" name="ZIP" placeholder=" " value="" autocomplete="off">
                        <label for="ZIP">${ __('ZIP') }</label>
                    </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Street1" name="Street1" placeholder=" " value="" autocomplete="off">
                        <label for="Street1">${ __('Street 1') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Street2" name="Street2" placeholder=" " value="" autocomplete="off">
                        <label for="Street2">${ __('Street 2') }</label>
                    </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="email" class="form-control" id="Email" name="Email" placeholder="name@example.com" value="">
                        <label for="Email">${ __('Email address') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Phone" name="Phone" placeholder=" " value="" autocomplete="off">
                        <label for="Phone">${ __('Phone') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Website" name="Website" placeholder=" " value="" autocomplete="off">
                        <label for="Website">${ __('Website') }</label>
                    </div>
                  </div>
              </div>

              <div class="row g-2 mb-4">
                  <div class="col-md-6">

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="SameContantBilling" checked="true">
                        <label class="form-check-label" for="SameContantBilling">
                          ${ __('Use same contacts for billing') }
                        </label>
                      </div>

                  </div>
              </div>

              <hr class="mt-5 d-none">

              <div class="mt-5 d-flex justify-content-between align-items-center">
                <h4 class="my-4">${ __('General List') }</h4>
                <div><button class="btn btn-outline-primary btn-new" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>${ __('Add Goods') }</button></div>
              </div>

              <div class="row g-2 mb-4">
                <div class="col-sm-12">
                    <div class="table-responsive">
                        <table class="table table-hover table-borderless align-middle table-striped table-general-list mb-0" style="min-width: 800px;">
                            <thead>
                              <tr>
                                  <th><span>${ __('#') }</span></th>
                                  <th><span>${ __('HS Code') }</span></th>
                                  <th><span>${ __('Name') }</span></th>
                                  <th><span>${ __('Quantity') }</span></th>
                                  <th><span>${ __('Weight') }</span></th>
                                  <th><span>${ __('Value') }</span></th>
                                  <th><span>${ __('Origin') }</span></th>
                                  <th></th>
                              </tr>

                            </thead>
                            <tbody>
                              <tr class="empty-row">
                                <td colspan="8">${ __('No records added yet') }</td>
                              </tr>
                              <tr class="d-none">
                                  <td>1</td>
                                  <td>CHVD20201234</td>
                                  <td><span>Watch with serial #1234</span></td>
                                  <td><span>10</span></td>
                                  <td><span>10.50kg</span></td>
                                  <td><span>10,234.50</span></td>
                                  <td><span>Switzerlang</span></td>
                                  <td></th>
                              </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
              </div> 

              <div class="row g-2 mb-4 d-none">
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="email" class="form-control inp" id="Email" placeholder="name@example.com" value="">
                        <label for="Email">${ __('Email address') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Phone" placeholder=" " value="" autocomplete="off">
                        <label for="Phone">${ __('Phone') }</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                        <input type="text" class="form-control inp" id="Website" placeholder=" " value="" autocomplete="off">
                        <label for="Website">${ __('Website') }</label>
                    </div>
                  </div>
              </div>

              <hr class="mt-5 text-secondary">

              <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                <button class="btn btn-primary submit-application btn-lg" type="button"><span class="me-1" role="status" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg></span> ${ __('Submit Application') }</button>
              </div>
    
              <div class="row g-2 applications table-responsive">

              </div>
              
              <div class="mb-5">
                  <br>
              </div>
      
              <!-- ============== footer block starts ============== -->
              <footer class="limited-footer mb-3 mt-5">
                  <div class="container">
                      &copy; 2022 SICC. ALL RIGHTS RESERVED.
                  </div>
              </footer>
              <!-- ============== footer block ends ============== -->
    
              
          </div>

    
          <div class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-modal"></button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
                    </div>
                </div>
            </div>
          </div>
    `;
}