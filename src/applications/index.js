/*
    ATA Carnet core schema https://nics-ch.atacarnet.iccwbo.org/WebService/NicsProxy.svc?singleWsdl

*/

// js dependencies
import { headers, showLoader, hideLoader, initHeader, initFooter, initBreadcrumbs, parseApiError, getCookie, onClick, onKeyUp, getSiteId, toast, link, spaceID } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, priceFormat, formatTime } from "../_/_helpers.js"
import { applicationListContent } from "../_/_cnt_application_list.js"
import { preview } from "../_/_application_preview.js"

// where everything happens
const _this = {
  
    state:{
        firstLoad: true,
        modalCont: null,
        settings: {},
        statuses: [],
        limit: 10, // number of records to load per table
    },
    init: () => {
         
        _this.getData();
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        // locale:      localStorage.hasOwnProperty('locale') ? localStorage.getItem('locale') : "en",
                        source:      ['extension'],
                        key:         'atacarnet',
                    },
                    settings: {
                        type:       'get',
                        key:        'atacarnet-settings',
                        fields:     ['_id', 'id', 'img', 'status', 'price', 'title', 'updated'],
                    },
                    applications: {
                        type:       'find',
                        key:        'atacarnet-application',
                        fields:     '*',
                        limit:      _this.state.limit,
                        offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.limit - _this.state.limit,    // automatically calculate the offset of table pagination
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

            // hide UI loader
            hideLoader();

            if(response.success){

                // init header
                initHeader(response);

                // get core html content 
                _this.loadPageStructure();  

                // render table
                _this.renderPage(response);

                // bind content listeners
                _this.initListeners();
            
                // init pagination
                _this.initPagination(response);

                // initiate footer
                _this.initFooter();

                // first load
                _this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }
        })
        .catch(error => { parseApiError(error); });
    },
    authUser: (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    },
    loadPageStructure: () => {
  
        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = applicationListContent(__);
    },
    renderPage: (response) => {

        if(_this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                    { link: link('/'), text: __('ATA Carnet System') },
                    { text: __('Applications') }
                ]
            );

            // initialize statuses
            _this.state.statuses = {
                'New': { 
                    text: __('New'),
                    class: 'btn-warning text-dark fw-light'
                },
                'Verified': { 
                    text: __('Verified'),
                    class: 'bg-dark text-light'
                },
                'Paid': { 
                    text: __('Paid'),
                    class: 'btn-primary fw-light'
                },
                'Canceled': { 
                    text: __('Canceled'),
                    class: 'btn-secondary fw-light'
                },
                // 'Failed': { 
                //     text: __('Failed'),
                //     class: 'btn-danger fw-light'
                // },
                // 'Refunded': { 
                //     text: __('Refunded'),
                //     class: 'btn-danger fw-light'
                // }
            };
            
            // init table header
            document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1 me-2" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="${ __('Search applications') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __('Search products') }" aria-describedby="inputGroup-sizing-sm" style="min-width:160px;max-width: 200px;">
                        </div>
                        <span>${ __("From") }</span>
                    </th>
                    <th>${ __("ID") }</th>
                    <th>${ __("Lifecycle") }</th>
                    <th>${ __("Value") }</th>
                    <th>${ __("Last change") }</th>
                    <th></th>
                </tr>`;

        }

        // no applications in the list
        if (response.applications.length == 0) {

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6">${ __("No applications to display.") }</td></tr>`;
            return;
        }

        let sid = getSiteId();

        _this.state.applications = response.applications;
        _this.state.settings = response.settings;

        // generate website table
        let list = '';
        for (let i in response.applications) {

            let img = 'https://cdn.kenzap.com/loading.png';

            // if(typeof(response.products[i].img) === 'undefined') response.products[i].img = [];
            // if(response.products[i].img[0]) img = CDN + '/S'+sid+'/product-'+response.products[i]._id+'-1-100x100.jpeg?'+response.products[i].updated;
              
            list += `
                <tr>
                    <td class="destt" style="max-width:250px;min-width:250px;">
                        <div class="my-1"> 
                            <a href="#" data-id="${ response.applications[i]._id }" data-index="${ i }" class="text-body view-application" style="text-decoration:none;" ><b>${ response.applications[i].FirstName } ${ response.applications[i].LastName }</b> ${ (response.applications[i].CompanyName) ? '<div class="mt-0" style="font-size:12px;">' + response.applications[i].CompanyName + ' ('+response.applications[i].CompanyReg+')</div>' : '' } </a>
                        </div>
                    </td>
                    <td>
                        ${ '<b>SG</b>'+response.applications[i]._id.substr(0,8).toUpperCase() }
                    </td>
                    <td>
                        <span>${ formatStatus(__, response.applications[i].status) }</span>
                    </td>
                    <td>
                        <span>${ /* priceFormat(_this, response.applications[i].price) */ '2500.00 SGD' }</span>
                    </td>
                    <td>
                        <span>${ formatTime(__, response.applications[i].updated) }</span>
                    </td>
                    <td class="text-end">
                        <div class="dropdown">
         
                            <svg id="dropdownMenuButton1" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
              
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item po view-application" href="#" data-id="${ response.applications[i]._id }" data-index="${ i }">${ __('Application') }</a></li>
                                <li><a class="dropdown-item" target="_blank" href="https://api-v1.kenzap.cloud/atacarnet/invoice/?sid=${ spaceID() }&id=${ response.applications[i]._id }">${ __('Print Invoice') }</a></li>
                                <li><a class="dropdown-item po email-invoice" href="#" data-id="${ response.applications[i]._id }" data-index="${ i }">${ __('Email Invoice') }</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" target="_blank" href="https://api-v1.kenzap.cloud/atacarnet/?sid=${ spaceID() }&id=${ response.applications[i]._id }">${ __('Print Carnet') }</a></li>
                                <li><a class="dropdown-item" target="_blank" href="https://api-v1.kenzap.cloud/atacarnet/?sid=${ spaceID() }&id=${ response.applications[i]._id }">${ __('Email Carnet') }</a></li>
                                <li><a class="dropdown-item po issue-carnet" href="#" data-id="${ response.applications[i]._id }" data-index="${ i }">${ __('Issue Carnet') }</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item remove-application" href="#">${ __('Move to trash') }</a></li>
                            </ul>
                        </div>


                        <a href="#" data-id="${ response.applications[i]._id }" class="remove-application text-danger me-2 d-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </a>
                    </td>
                </tr>`; 
        }

        // provide result to the page
        document.querySelector(".table tbody").innerHTML = list;
    },
    initListeners: () => {

        // view application
        preview.viewApplication(_this);
        
        // view application
        // onClick('.view-application', _this.listeners.viewApplication);

        // remove product
        onClick('.remove-product', _this.listeners.removeProduct);
        
        // search products activation
        onClick('.table-p-list .bi-search', _this.listeners.searchProductsActivate);

        // break here if initListeners is called more than once
        if(!_this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', _this.addProduct);

        // add product confirm
        onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {

        viewApplication: (e) => {



        },

        removeProduct: (e) => {

            e.preventDefault();

            let c = confirm( __('Completely remove this product?') );

            if(!c) return;
  
            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: headers,
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'delete',
                            key:        'ecommerce-product',   
                            id:         e.currentTarget.dataset.id,
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // modalCont.hide();

                    _this.getData();

                }else{

                    parseApiError(response);
                }
                
            })
            .catch(error => { parseApiError(error); });
        },
 
        searchProductsActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(1) span').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(1) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(1) .search-cont input').focus();

            // search products
            onKeyUp('.table-p-list thead tr th:nth-child(1) .search-cont input', _this.listeners.searchProducts);
        },
 
        searchProducts: (e) => {

            e.preventDefault();

            _this.getData();
        },

        modalSuccessBtn: (e) => {
            
            console.log('calling modalSuccessBtnFunc');
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    addProduct: (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        modal.querySelector(".modal-title").innerHTML = __('Add Application');
        modal.querySelector(".btn-primary").innerHTML = __('Add');
        modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        let d = ""; 
        let title = '', sdesc = '', price = '';
        let modalHTml = `\
        <div class="form-cont">\
            <div class="form-group mb-3">\
                <label for="p-title" class="form-label">${ __('Title') }</label>\
                <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="${ title }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-sdesc" class="form-label">${ __('Short description') }</label>\
                <input type="text" class="form-control" id="p-sdesc" autocomplete="off" placeholder="" value="${ sdesc }">\
            </div>\
            <div class="form-group mb-3">\
                <label for="p-price" class="form-label">${ __('Price') }</label>\
                <input type="text" class="form-control" id="p-price" autocomplete="off" placeholder="" value="${ price }">\
            </div>\
        </div>`;

        modal.querySelector(".modal-body").innerHTML = modalHTml;

        _this.listeners.modalSuccessBtnFunc = (e) => {

            e.preventDefault();

            let data = {};
            data.title = modal.querySelector("#p-title").value;
            data.sdesc = modal.querySelector("#p-sdesc").value;
            data.price = modal.querySelector("#p-price").value;
            data.status = "0";
            data.img = [];
            data.cats = [];

            if(data.title.length<2){ alert(__('Please provide longer title')); return; }

            // send data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: headers,
                body: JSON.stringify({
                    query: {
                        product: {
                            type:       'create',
                            key:        'ecommerce-product',   
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // open product editing page
                    window.location.href = link(`/product-edit/?id=${ response.product.id}`)

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        }

        modalCont.show();

        setTimeout( () => modal.querySelector("#p-title").focus(),100 );

    },
    initPagination: (response) => {

        getPagination(__, response.meta, _this.getData);
    },
    initFooter: () => {
        
        initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
    }
}

_this.init();