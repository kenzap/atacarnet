// js dependencies
import { headers, showLoader, hideLoader, initHeader, initFooter, initBreadcrumbs, parseApiError, getCookie, getSiteId, link } from '@kenzap/k-cloud';
import { HTMLContent } from "../_/_cnt_home.js"

// where everything happens
const _this = {

    state: {
        firstLoad: true,
        ajaxQueue: 0 
    },
    init: () => {
        
        _this.getData(); 
    },
    getData: () => {

        // show loader during first load
        if (_this.state.firstLoad) showLoader();

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                query: {
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    }
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

                // initiate locale
                // i18n.init(response.locale);

                // get core html content 
                _this.loadHomeStructure();  

                // render table
                _this.renderPage(response);

                // init header
                // _this.initHeader(response);

                // bind content listeners
                // _this.initListeners();
            
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
    renderPage: (product) => {

        let d = document;

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __('Dashboard') },
                { text: __('ATA Carnet System') },
            ]
        );
    },
    // initHeader: (response) => {

    //     onClick('.nav-back', (e) => {

    //         e.preventDefault();
    //         console.log('.nav-back');
    //         let link = document.querySelector('.bc ol li:nth-last-child(2)').querySelector('a');
    //         simulateClick(link);
    //     });
    // },
    initListeners: (type = 'partial') => {



    },
    listeners: {


        modalSuccessBtn: (e) => {
            
            _this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    },
    loadHomeStructure: () => {

        if(!_this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: () => {
        
        initFooter(__('Created by %1$Kenzap%2$. ❤️ Licensed %3$GPL3%4$.', '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>', '<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">', '</a>'), '');
        // initFooter(__('Copyright © %1$ %2$ Kenzap%3$. All rights reserved.', new Date().getFullYear(), '<a class="text-muted" href="https://kenzap.com/" target="_blank">', '</a>'), __('Kenzap Cloud Services - Dashboard'));
    }
}

_this.init();
