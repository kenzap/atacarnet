import { stepsContent } from '../_/_cnt_steps.js';

export const carnetContent = (__) => {

    return `

        ${stepsContent(__)}
          <div class="container kp " style="max-width:740px;margin:auto;">
              <div class="row g-2 mb-4">
                    <h2 class="mt-4 mb-0">${__('ATA Carnet is Issued')}</h2>
                    <h5 class="mt-0 text-muted">${__('Carnet number: ')} <span id="app-id" style="color:#ee194f"></span></h5>
                    <div class="mb-3"> <img alt="welcome image" style="max-width:400px;margin:auto;display:block;" src="/assets/images/welcome.svg"> </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4 mb-4">
                        <a target="_blank" href="" class="btn btn-primary print-carnet-btn btn-lg" type="button">${__('Print ATA Carnet')}</a>
                    </div>

                    <p>${__('For previous ATA Carnet applications please refer to the table below. ATA Carnets are only issued after %1$payment%2$ is received in full amount.', '<b>', '</b>')}</p> 
              </div>
              <div class="row g-2 applications table-responsive">

              </div>
              <hr class="mt-5 d-none">

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary start-application " type="button">${__('Start New Application')}</button>
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