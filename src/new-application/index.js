// js dependencies
import { headers, showLoader, hideLoader, initHeader, initFooter, initBreadcrumbs, parseApiError } from '@kenzap/k-cloud';
import { getCookie, setCookie, priceFormat, formatStatus, formatTime, randomString, makeNumber, API_KEY, CDN, spaceID, appID, toast, onClick, onKeyUp, onChange, getCountries, mt, __ } from "../_/_helpers.js"
import { applicationContent } from "../_/_cnt_new_application.js"
import { welcomeContent } from "../_/_cnt_welcome.js"
import { verificationContent } from "../_/_cnt_verification.js"
import { paymentContent } from "../_/_cnt_payment.js"
import { carnetContent } from "../_/_cnt_carnet.js"
 
const _this = {
  
    state:{
        page: 'welcome',
        application: { GeneralList: [] },
        response: {},
        firstLoad: true,
        settings: {},
        limit: 10, // number of records to load per table
    },
    init: () => {
         
        _this.getSession();
    },
    navigate: () => {

        let navigate = getCookie('navigate');

        // console.log(navigate);

        switch(navigate){

            case 'application':

                // init application form content
                document.querySelector("main").innerHTML = applicationContent(__);

                // restore applicate state
                _this.restoreApplication();

                // scrollEvents
                document.addEventListener("scroll", _this.listeners.scrollEvents);

                // init page listeners
                _this.initListeners();

                // set nav step
                _this.setStep(1);

                break;
            case 'verification':

                // make sure requested status has not changed on the backend
                _this.alignBackendUpdates(_this, 'verification');

                // init application form content
                document.querySelector("main").innerHTML = verificationContent(__);

                // render application table
                _this.applicationsTable();

                // scrollEvents
                document.addEventListener("scroll", _this.listeners.scrollEvents);

                // init page listeners
                _this.initListeners();

                // set nav step
                _this.setStep(2);

                break;
            case 'payment':

                _this.alignBackendUpdates(_this, 'payment');

                // init application form content
                document.querySelector("main").innerHTML = paymentContent(__);

                // scrollEvents
                document.addEventListener("scroll", _this.listeners.scrollEvents);

                // init page listeners
                _this.initListeners();
    
                // set nav step
                _this.setStep(2);

                // addScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js');



                break;
            case 'carnet':

                // _this.alignBackendUpdates(_this, 'carnet');

                // init application form content
                document.querySelector("main").innerHTML = carnetContent(__);

                // render application table
                _this.applicationsTable();

                // scrollEvents
                document.addEventListener("scroll", _this.listeners.scrollEvents);

                // init page listeners
                _this.initListeners();
    
                // set nav step
                _this.setStep(3);

                break;
            case 'account':


                break;
            case 'welcome':
            default:

                // init application form content
                document.querySelector("main").innerHTML = welcomeContent(__);

                // scrollEvents
                document.addEventListener("scroll", _this.listeners.scrollEvents);

                // init page listeners
                _this.initListeners();

                // set nav step
                _this.setStep(1);
                
                break;
        }

        // _this.getSession();
    },
    setStep: (step) => {

        // clear steps
        if(document.querySelector(".steps")) for(let li of document.querySelectorAll(".steps li")){ li.classList.remove('current'); }

        document.querySelector(".step"+step).classList.add('current');
    },
    getSession: () => {

        let s = "";
        
        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + API_KEY,
                'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
                'Kenzap-Token': getCookie('kenzap_token'),
            },
            body: JSON.stringify({
                query: {
                    locale: {
                        type:       'locale',
                        // locale:      localStorage.hasOwnProperty('locale') ? localStorage.getItem('locale') : "en",
                        source:      ['extension'],
                        key:         'atacarnet',
                    },
                    applications: {
                        type:       'find',
                        key:        'atacarnet-application',
                        fields:     '*',
                        limit:      25,
                        // offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
                        search:     {                                                           // if s is empty search query is ignored
                                        field: 'title',
                                        s: s
                                    },
                        sortby:     {
                                        field: 'created',
                                        order: 'DESC'
                                    }
                    },
                }
            }) 
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){
                
                // when HTML is loaded run all required scripts to render the menu
                // document.addEventListener("DOMContentLoaded", () => {

                    _this.state.response = response;

                    // init locales
                    window.i18n = { state: { locale: response.locale } };

                    _this.navigate();
                // });

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });

    },
    initListeners: () => {

        // WELCOME start application process
        onClick('.start-application', _this.listeners.startApplication);

        // APPLICATION opens new declaration item form
        onClick('.btn-new', _this.listeners.declareItem);

        // APPLICATION individual business click listener
        onClick('.submit-application', _this.listeners.submitApplication);

        // APPLICATION individual business click listener
        onKeyUp('.inp', _this.listeners.syncField);
        
        // APPLICATION individual business click listener
        onClick('.form-check-input', _this.listeners.switchEntityType);
    
        if(!_this.state.firstLoad) return;

        // language switchee
        onClick('.sw-ln', _this.listeners.switchLanguage);

        // modal success button
        onClick('.modal .btn-primary', _this.listeners.modalSuccessBtn);
    },
    listeners: {

        declareItem:  (e) => {

            e.preventDefault();

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __('Add Goods');
            modal.querySelector(".btn-primary").innerHTML = __('Add');
            modal.querySelector(".btn-secondary").innerHTML = __('Cancel');

            let countryList = '';
    
            getCountries().forEach(el => { if(el.ata){ countryList += '<option value="' + el.code + '" '+(el.code=='SG' ? 'selected' : '')+'>' + __(el.name + ' ('+el.code +')') + '</option>'; } });

            let modalHTml = `
            <div class="form-cont">
                <div class="form-group mb-3">
                    <label for="Name" class="form-label">${ __('Goods') }</label>
                    <textarea id="Name" maxlength="1000" class="form-control" name="note" ></textarea>
                    <p class="form-text">${ __('Trade description of goods and marks and numbers, if any. Ex.: watch with serial #1234.') }</p>
                </div>
                <div class="form-group mb-3">
                    <label for="Quantity" class="form-label">${ __('Quantity') }</label>
                    <input type="text" class="form-control" id="Quantity" autocomplete="off" placeholder="" value="">
                    <p class="form-text">${ __('Number of pieces.') }</p>
                </div>
                <div class="form-group mb-3">
                    <label for="Group" class="form-label">${ __('HS Code') }</label>
                    <input type="text" class="form-control" id="Group" autocomplete="off" placeholder="" value="">
                    <p class="form-text">${ __('Suggested codes:') } <a href="#">852351</a> | <a href="#">852691</a> ${ __('More %1$codes%2$.', '<a target="_blank" href="https://www.tariffnumber.com/2022">', '</a>') }</p> 
                </div>
                <div class="form-group mb-3">
                    <div class="row">
                        <div class="col-lg-8">
                            <label for="Weight" class="form-label">${ __('Weight or Volume') }</label>
                            <input id="Weight" type="text" class="form-control" id="Weight" autocomplete="off" placeholder="" value="">
                            <p class="form-text">${ __('Weight or volume of declared goods.') }</p>
                        </div>
                        <div class="col-lg-4">
                            <label for="WeightUnit" class="form-label">${ __('Unit') }</label>
                            <select id="WeightUnit" class="form-select text-start inp" name="WeightUnit" data-type="select">
                                <option value="g">${ __('g') }</option>
                                <option value="gr">${ __('gr') }</option>
                                <option value="kg">${ __('kg') }</option>
                                <option value="t">${ __('t') }</option>
                                <option value="l">${ __('l') }</option>
                                <option value="lt">${ __('lt') }</option>
                            </select>
                            <p class="form-text">${ __('Measurement unit.') }</p>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <label for="Value" class="form-label">${ __('Value') }</label>
                    <input type="text" class="form-control" id="Value" autocomplete="off" placeholder="" value="">
                    <p class="form-text">${ __('Commercial value in Country/Customs territory of issue of the Carnet, using ISO country codes.') }</p>
                </div>
                <div class="form-group mb-3">
                    <label for="Origin" class="form-label">${ __('Country of Origin') }</label>
                    <select id="Origin" class="form-select text-end inp" name="Origin" data-type="select" aria-label="Floating label select example">
                        ${ countryList }
                    </select>
                    <p class="form-text">${ __('Country of Origin in ISO2 format.') }</p>
                </div>
            </div>`;
    
            modal.querySelector(".modal-body").innerHTML = modalHTml;

            // Quantity allow number only
            document.querySelector("#Quantity").addEventListener("keydown", (e) => {

                let key = e.keyCode || e.charCode;  console.log(key);
                if (key != 46 && key != 190 && key > 31 && (key < 43 || key > 57)){ e.preventDefault(); return false; }else{ return true; }          
            });

            // Value allow decimals only
            document.querySelector("#Quantity").addEventListener("keydown", (e) => {

                let key = e.keyCode || e.charCode;  console.log(key);
                if (key != 46 && key != 190 && key != 190 && key > 31 && (key < 43 || key > 57)){ e.preventDefault(); return false; }else{ return true; }          
            });

            // Weight allow number only
            document.querySelector("#Weight").addEventListener("keydown", (e) => {

                let key = e.keyCode || e.charCode;  console.log(key);
                if (key != 46 && key > 31 && (key < 43 || key > 57)){ e.preventDefault(); return false; }else{ return true; } // && key != 190       
            });

            // add records to the table
            _this.listeners.modalSuccessBtnFunc = (e) => {
    
                e.preventDefault();
    
                let obj = {};
                obj.Name = modal.querySelector("#Name").value;
                obj.Group = modal.querySelector("#Group").value;
                obj.Quantity = modal.querySelector("#Quantity").value;
                obj.Weight = modal.querySelector("#Weight").value;
                obj.WeightUnit = modal.querySelector("#WeightUnit").value;
                obj.Value = modal.querySelector("#Value").value;
                obj.Origin = modal.querySelector("#Origin").value;

                // validate
                if(obj.Name.length<2){ alert(__('Please provide longer goods description')); return; }
                if(obj.Quantity.length==0 || parseFloat(obj.Quantity) == 0){ alert(__('Please provide valid Quantity information')); return; }
                if(obj.Weight.length==0 || parseFloat(obj.Quantity) == 0){ alert(__('Weight can not be empty')); return; }
    
                // struct row
                _this.state.application.GeneralList.push(obj);
                
                // cache latest changes in browser
                localStorage.setItem('application', JSON.stringify(_this.state.application));
                
                // refresh edit views
                _this.refreshEditViews();

                modalCont.hide();

                // // send data
                // fetch('https://api-v1.kenzap.cloud/', {
                //     method: 'post',
                //     headers: headers,
                //     body: JSON.stringify({
                //         query: {
                //             product: {
                //                 type:       'create',
                //                 key:        'ecommerce-product',   
                //                 data:       data
                //             }
                //         }
                //     }) 
                // })
                // .then(response => response.json())
                // .then(response => {
    
                //     if (response.success){
    
                //         // open product editing page
                //         window.location.href = link(`/product-edit/?id=${ response.product.id}`)
    
                //     }else{
    
                //         parseApiError(response);
                //     }
                // })
                // .catch(error => { parseApiError(error); });
            }
    
            modalCont.show();
    
            setTimeout( () => modal.querySelector("#Name").focus(), 100 );

        },

        switchEntityType: (e) => {

            // e.preventDefault();
            if(e.currentTarget.value == 'Company'){
                document.querySelector('.company-inp').classList.remove('d-none');
            }else{
                document.querySelector('.company-inp').classList.add('d-none');
            }
            
            // company-inp
            console.log(e.currentTarget.value);
        },

        startApplication: (e) => {

            e.preventDefault();

            setCookie('navigate', 'application', 7);

            _this.navigate();
        },

        submitApplication: (e) => {

            e.preventDefault();

            // TODO
            let allow = _this.validateApplication();

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            
            modal.querySelector(".modal-title").innerHTML = __('Submit Application');
            modal.querySelector(".btn-primary").innerHTML = __('I confirm');
            modal.querySelector(".btn-secondary").innerHTML = __('Cancel');

            let modalHTml = `
            <div class="form-cont">
                <div class="mb-3"> <img alt="welcome image" style="max-width:400px;margin:auto;display:block;" src="/assets/images/verification.svg"> </div>
                <p class="form-text">${ __('Please verify that all information is corret. You may face additional charges later if some of the provided information is not valid.') }</p>
            </div>`;
    
            modal.querySelector(".modal-body").innerHTML = modalHTml;
            
            // add records to the table
            _this.listeners.modalSuccessBtnFunc = (e) => {

                _this.state.application['status'] = 'New';

                // submit application
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + API_KEY,
                        'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
                        'Kenzap-Token': getCookie('kenzap_token'),
                    },
                    body: JSON.stringify({
                        query: {
                            order: {
                                type:       'create',
                                key:        'atacarnet-application',        
                                // sid:        localStorage.sid,
                                data:       _this.state.application
                            }
                        }
                    })
                })
                .then(response => response.json())
                .then(response => {

                    if(response.success){   

                        modalCont.hide();

                        // block confirm button place loading placeholder
                        modal.querySelector(".btn-primary").innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __('Loading..');

                        setCookie('navigate', 'verification', 7);

                        _this.navigate();

                    }else{

                        alert('Oops, something went wrong. Please try checking out again.');
                    }
                })
                .catch(error => { console.error('Error:', error); });

            }
    
            modalCont.show();
        },
        /**
        * Scroll listener. Add/Remove scrolled class to body
        * @public
        */
        scrollEvents: (e) => {

            // console.log(document.documentElement.scrollTop);

            if(document.documentElement.scrollTop>0){

                document.querySelector(".logo-only-header").classList.add('scrolled');
            }else{

                document.querySelector(".logo-only-header").classList.remove('scrolled');
            }
        },

        syncField: (e) => {

            // cache locally
            _this.state.application[e.currentTarget.id] = e.currentTarget.value;
            
            // cache in browser
            localStorage.setItem('application', JSON.stringify(_this.state.application));

            // attr('name')
            let name = e.currentTarget.getAttribute('name');

            console.log(name);
        },

        printCarnet: (e) => {

            e.preventDefault();

            // let id = e.currentTarget.dataset.id;



            // let cb = () => {

            //     _this.state.html2pdf = true;

            //     let element = document.querySelector('.carnet');
            //     let opt = {
            //         margin:       0,
            //         filename:     'SG'+id.substr(0,8).toUpperCase()+'.pdf',
            //         image:        { type: 'jpeg', quality: 0.98 },
            //         html2canvas:  { scale: 2, scrollY: 0 },
            //         pagebreak:    { before: '.page' },
            //         jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
            //     };

            //     // New Promise-based usage:
            //     html2pdf().set(opt).from(element).save();

            //     // alert('laoded');
            // }

            // if(_this.state.html2pdf){ cb.call() }else{ loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', cb); }
        },
        switchLanguage: (e) => {

            e.preventDefault();

            setCookie('locale', e.currentTarget.dataset.ln, 700);

            location.reload();
        },
        modalSuccessBtn: (e) => {
            
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    alignBackendUpdates: (_this, navigate) => {

        if(!_this.state.response.applications[0].status) _this.state.response.applications[0].status = 'New';
        // console.log('status:' + _this.state.response.applications[0].status);

        switch(_this.state.response.applications[0].status){

            case 'New': 
                if(navigate!='verification'){

                    setCookie('navigate', 'verification', 7);
                    
                    _this.navigate();
                }
                break;
                
            case 'Verified': 
                if(navigate!='payment'){

                    setCookie('navigate', 'payment', 7);
                    
                    _this.navigate();
                }
                break;
            // case 'carnet': 
            //     if(navigate!='payment'){

            //         setCookie('navigate', 'payment', 7);
                    
            //         _this.navigate();
            //     }
            //     break;

            default: 
                // if(navigate!='payment'){

                    setCookie('navigate', 'carnet', 7);
                    
                    _this.navigate();
                // }
                break;

                // setCookie('navigate', 'application', 7);
        }
    },
    validateApplication: (e) => {

        
    },
    refreshEditViews: (e) => {

        let GeneralListHtml = '';

        // populate General List table
        _this.state.application.GeneralList.forEach((el, index) => {

            GeneralListHtml += _this.structGeneralListRow(el, index);
        });

        document.querySelector('.table-general-list tbody').innerHTML = GeneralListHtml;
    },
    structGeneralListRow: (el, index) => {

        return `
        <tr>
            <td>${ index + 1 }</td>
            <td>${ el.Group }</td>
            <td>${ el.Name }</td>
            <td>${ el.Quantity }</td>
            <td>${ el.Weight + '' + el.WeightUnit }</td>
            <td>${ el.Value }</td>
            <td>${ el.Origin }</td>
            <td><svg id="dropdownMenuButton1" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg></td>
        </tr>`;
    },
    restoreApplication: () => {

        try{
            _this.state.application = JSON.parse(localStorage.getItem('application'));
        }catch{
            _this.state.application = { GeneralList: [] };
        }

        for(let f in _this.state.application){

            if(f) if(document.querySelector('#'+f)) document.querySelector('#'+f).value = _this.state.application[f];
        }

        // restore General List
        let GeneralListHtml = '';
        if(_this.state.application.GeneralList) _this.state.application.GeneralList.forEach( (el, index) => { GeneralListHtml += _this.structGeneralListRow(el, index); });
        document.querySelector('.table-general-list tbody').innerHTML = GeneralListHtml;

        // localStorage.setItem('application', JSON.stringify(_this.state.application));
    },
    applicationsTable: () => {

        let GeneralListHtml = `
        <h4 class="my-4">${ __('All Applications') }</h4>
        <table class="table table-hover table-borderless align-middle table-striped table-general-list mb-5" style="min-width: 700px;">
            <thead>
                <tr>
                    <th><span>${ __('ID') }</span></th>
                    <th><span>${ __('Contacts') }</span></th>
                    <th><span>${ __('Status') }</span></th>
                    <th><span>${ __('Last update') }</span></th>
                    <th><span>${ __('Print') }</span></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;
            
            _this.state.response.applications.forEach((el, index) => {

                GeneralListHtml += _this.structApplicationRow(el, index);
            });

            GeneralListHtml += `
            </tbody>
        </table>`;

        // add table to frontend
        document.querySelector('.applications').innerHTML = GeneralListHtml;

        // assign table listeners
        // onClick('.print-carnet', _this.listeners.printCarnet);
    },
    structApplicationRow: (el, index) => {

        // if(["New", ""].contains(el.status))

        // if(!_this.state.firstLoop) _this.state.firstLoop = true;

        let appID = '<b>SG</b>' + el._id.substr(0,8).toUpperCase();

        if(document.querySelector('#app-id') && el.status != 'New') if(document.querySelector('#app-id').innerHTML == ''){ document.querySelector('#app-id').innerHTML = appID; if(document.querySelector('.print-carnet-btn')) document.querySelector('.print-carnet-btn').setAttribute('href', `https://api-v1.kenzap.cloud/atacarnet/?sid=${ spaceID }&id=${ el._id }`); }
        
        return `
        <tr>
            <td><span>${ appID }</span></td>
            <td><span>${ el.FirstName } ${ el.LastName }</span></td>
            <td><span>${ formatStatus(__, el.status) }</span></td>
            <td><span>${ formatTime(__, el.updated) }</span></td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-printer me-1 print-carnet ${ el.status == 'New' ? 'd-none':'' }" data-id="${ el._id }" viewBox="0 0 16 16">
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"></path>
                </svg>
                <a href="https://api-v1.kenzap.cloud/atacarnet/?sid=${ spaceID }&id=${ el._id }" data-index="0" class="print-carnet text-dark ${ el.status == 'New' ? 'd-none':'' }" data-id="${ el._id }">${ __('ATA Carnet') }</a>
                <span class=" ${ el.status == 'New' ? '' : 'd-none' }" >${ __('n/a') }</span>
            </td>
            <td></td>
        </tr>`;

    },
    addScript: (url) => {
        
        let script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = url;
        document.head.appendChild(script);
    }
}

_this.init();