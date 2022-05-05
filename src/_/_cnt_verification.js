import { stepsContent } from '../_/_cnt_steps.js';

export const verificationContent = (__) => {

    return `

         ${ stepsContent(__) }
          <div class="container kp" style="max-width:740px;margin:auto;">
              <div class="row g-2 mb-4">
                  <h2 class="mt-4 mb-0">${ __('Verification in Progress') }</h2>
                  <h5 class="mt-0 text-muted">${ __('Your application ID') } <span id="app-id" style="color:#ee194f"></span></h5>
                  <div class="mb-3"> <img alt="welcome image" style="max-width:350px;margin:auto;display:block;" src="/assets/images/verification.svg"> </div>
                  <p>${ __('Thank you for your application. It is currently being processed by SICC agents. Please check this page within next 24 hours or wait for a confirmation email.') }</p>
              </div>
              <div class="row g-2 applications">

              </div>
              <div class="row g-2 carnet">
                <div class="page1 m-0 p-0">
                    <div class="holder">
                        <div>Pavels Lukasenko</div>
                        <div>Skarda Nams SIA</div>
                        <div>122234321423</div>
                        <div>Melluzu iela 12/6</div>
                        <div>LV</div>
                    </div>
                    <div class="represented">
                        <div>Pavels Lukasenko</div>
                    </div>
                    <img alt="image" style="max-width:100%;margin:auto;display:block;" src="/assets/images/carnet1.jpg">
                </div>
                <div class="page m-0 p-0">
                    <div class="holder">
                        <div>Pavels Lukasenko</div>
                        <div>Skarda Nams SIA</div>
                        <div>122234321423</div>
                        <div>Melluzu iela 12/6</div>
                        <div>LV</div>
                    </div>
                    <div class="represented">
                        <div>Pavels Lukasenko</div>
                    </div>
                    <img alt="image" style="max-width:100%;margin:auto;display:block;" src="/assets/images/carnet1.jpg">
                </div>
              </div>

              <hr class="mt-5 d-none">

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-outline-dark need-help btn-lg" type="button">${ __('I need help') }</button>
              </div>
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