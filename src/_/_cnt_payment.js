import { stepsContent } from '../_/_cnt_steps.js';

export const paymentContent = (__) => {

    return `

        ${ stepsContent(__) }
          <div class="container kp " style="max-width:740px;margin:auto;">
              <div class="row g-2 mb-4">
                  <h2>${ __('ATA Carnet Application') }</h2>
                  <div class="mb-3"> <img alt="welcome image" style="max-width:500px;margin:auto;display:block;" src="/assets/images/welcome.svg"> </div>
                  <p>${ __('This is an interactive ATA Carnet application system provided by Singapore International Chamber of Commerce (SICC).') }</p>
                  <p>${ __('You can find your previous applications under my account page or start creating a new application by clicking on create application button below.') }</p> 
              </div>

              <hr class="mt-5 d-none">

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary start-application btn-lg" type="button">${ __('Start Application') }</button>
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