export const stepsContent = (__) => {

    return `
        <section class="plan-step">
            <div class="steps-wrapper" >

                <div class="container">
                    <ul class="text-center steps m-0 my-md-5 my-md-0 ms-0 ps-0 pt-0 pt-md-3">
                        <li class="step1 ps-0 py-2 d-md-inline-block d-block current"><a href="#"><span class="me-2 m-auto me-md-3">1</span>${ __('Application') }</a></li>
                        <li class="step2 ps-0 py-2 d-md-inline-block d-block "><a href="#"><span class="me-2 m-auto me-md-3">2</span>${ __('Verification') }</a></li>
                        <li class="step3 ps-0 py-2 d-md-inline-block d-block "><a href="#"><span class="me-2 m-auto me-md-3">3</span>${ __('ATA Carnet') }</a></li>
                    </ul>
                </div>

            </div>
        </section>
    `;
}