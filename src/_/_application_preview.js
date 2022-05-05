import { headers, showLoader, hideLoader, onClick, onKeyUp, simulateClick, parseApiError, spaceID, toast } from '@kenzap/k-cloud';
import { priceFormat, getPageNumber, makeNumber, parseVariations, escape, unescape, printReceipt } from "../_/_helpers.js"

export const preview = {

    _this: null,
    renderApplication: (_this, e) => {

        let modal = document.querySelector(".modal");
        _this.state.modalCont = new bootstrap.Modal(modal);
        // _this.modalOpen = true;
        let i = e.currentTarget.dataset.index; // _this.state.orderPreviewIndex = i;
        
        // to properly handle back button on mobiles
        // window.history.pushState(null, 'editing');
        history.pushState({pageID: 'Applications'}, 'Applications', window.location.pathname + window.location.search + "#editing");

        modal.addEventListener('hide.bs.modal', function (e) {
           
            if (window.location.href.indexOf("#editing")==-1) return;

            history.pushState({pageID: 'applications'}, 'Applications', window.location.pathname + window.location.search);
        });
        
        // is new order ?
        if(typeof(i) === 'undefined'){

            _this.state.applicationSingle = {
                _id: "new",
                created: 1649831099,
                updated: 1649833845
            }
        }else{

            _this.state.applicationSingle = _this.state.applications[i];
        }

        // console.log(_this.state.applicationSingle);
        let items = '';

        // get order status
        Object.keys(_this.state.statuses).forEach((key, index) => { items += `<li><a class="dppi dropdown-item" data-key="${ key }" href="#">${ _this.state.statuses[key].text }</a></li>` })
        
        let statusHTML = "";
        if(!_this.state.applicationSingle['status']) _this.state.applicationSingle['status'] = 'New';
        if(!_this.state.statuses[_this.state.applicationSingle['status']]) _this.state.applicationSingle['status'] = 'New';
        statusHTML += `
            <div class="st-modal st-opts mb-3 me-1 me-sm-3 dropdown">
                <a class="btn btn-sm ${ _this.state.statuses[_this.state.applicationSingle['status']].class } dropdown-toggle order-form" data-id="status" data-type="key" data-value="${ _this.state.applicationSingle['status'] }" href="#" role="button" id="order-status-modal" data-bs-toggle="dropdown" aria-expanded="false" >
                    ${ _this.state.statuses[_this.state.applicationSingle['status']].text }
                </a>
                <ul class="dropdown-menu" aria-labelledby="order-status-modal">
                    ${ items }
                </ul>
            </div>
            `;
        
        
        let statusSelect = `
        <div class="d-flex justify-content-between">
            ${ statusHTML }
            <a href="#" data-index="0" class="print-order text-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
                    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"></path>
                    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"></path>
                </svg>
            </a>
        </div>
        `;

        // structure modal
        modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
        modal.querySelector(".modal-header .modal-title").innerHTML = '<b>SG</b>'+_this.state.applicationSingle._id.substr(0,8).toUpperCase();
        modal.querySelector(".modal-footer .btn-confirm").innerHTML = _this.state.applicationSingle._id == "new" ? __('Create') : __('Update');
        modal.querySelector(".btn-confirm").dataset.loading = false;
        modal.querySelector(".modal-footer .btn-secondary").innerHTML = __('Close');

        let html = statusSelect;

        // _id: {l: __("System ID")},
        let fields = { id: {l: __("ID"), classList: "order-form"}, FirstName: {l: __("First Name"), e: "text", editable: true, classList: "order-form"}, LastName: {l: __("Last Name"), e: "text", editable: true, classList: "order-form"}, CompanyName: {l: __("Company Name"), e: "text", editable: true, classList: "order-form"}, CompanyReg: {l: __("Company Registration Nr."), e: "text", editable: true, classList: "order-form"}, GeneralList: {l: __('<hr class="text-secondary">'), e: "GeneralList", editable: false, classList: "order-form"}, Phone: {l: __("Phone"), e: "text", editable: true, classList: "order-form"}, Email: {l: __("Email"), e: "text", editable: true, classList: "order-form"}, Website: {l: __("Website"), e: "text", editable: true, classList: "order-form"}, Street1: {l: __("Street 1"), e: "text", editable: true, classList: "order-form"}, Street2: {l: __("Street 2"), e: "text", editable: true, classList: "order-form"}, Country: {l: __("Country"), e: "text", editable: true, classList: "order-form"}, City: {l: __("City"), e: "text", editable: true, classList: "order-form"}, ZIP: {l: __("ZIP"), e: "text", editable: true, classList: "order-form"}, State: {l: __("State"), e: "text", editable: true, classList: "order-form"} };

        // console.log(_this.state.applicationSingle);

        // order table details
        for(let x in fields){

            if(_this.state.applicationSingle[x] === undefined) continue;

            let val = _this.state.applicationSingle[x];
            let field = fields[x].l;

            html += `
            <div class="mb-3 mt-3 order-row keyx-${ x } ${ x == '_id' || x == 'from' ? "elipsized": "" }"  >
                <b>${ field }</b>${ preview.renderField(_this, fields[x], val, x) }
            </div>`;
        }

        html += '';
        modal.querySelector(".modal-body").innerHTML = '<div class="modal-body-cont">' + html + '</div>';
        _this.state.modalCont.show();

        // table order item listners (remove, add note, adjust variations, etc)
        preview.tableApplicationItemListeners();

        // order item product edit listener
        preview.suggestApplicationItem(_this);

        // hide suggestion list if still present
        // modal.querySelector(".edit-item").addEventListener('blur', (e) => { setTimeout(()=>{ document.querySelector('.s-list').dataset.toggle = false; }, 500); });
            
        // add product item to order table
        preview.addApplicationItem(_this);

        onClick('.print-order', (e) => {

            e.preventDefault();
            
            simulateClick(modal.querySelector(".btn-confirm"));

            _this.state.printLink = true;
        });

        // save changes to orders
        _this.listeners.modalSuccessBtnFunc = (e) => {

            e.preventDefault();

            preview.updateApplication(_this, i, _this.state.applicationSingle._id);
        }

        onClick('.st-modal li a', (e) => {

            e.preventDefault();

            let osm = document.querySelector('#order-status-modal');
            osm.innerHTML = _this.state.statuses[e.currentTarget.dataset.key].text;
            osm.dataset.value = e.currentTarget.dataset.key;
            let list = [];

            // clear previous classes
            Object.keys(_this.state.statuses).forEach((key) => {
                list = _this.state.statuses[key].class.split(' ');
                list.forEach((key) => { 
                    osm.classList.remove(key);
                });    
            });

            // add new classes
            list = _this.state.statuses[e.currentTarget.dataset.key].class.split(' ');
            list.forEach((key) => { 

                osm.classList.add(key);
            });
        });
    },
    newApplication: (_this) => {

        preview._this = _this;
        onClick('.add-order', (e) => { preview.renderApplication(_this, e); });
    },
    viewApplication: (_this) => {

        preview._this = _this;
        onClick('.view-application', (e) => { preview.renderApplication(_this, e); });
    },
    renderField: (_this, a, item, x) => {

        // console.log(a.e);

        let html = '';
        switch(a.e){
            
            // case 'text': return '<input type="text" class="form-control pv" id="'+x+'" value="'+b+'">';
            case 'price': 

                html = `<div data-id="${x}" data-type="key-number" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}" data-value="${ item }">${ priceFormat(_this, item) }</div>`;
                return html;
            case 'text': 

                html = `<div data-id="${x}" data-type="text" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}">${ item }</div>`;
                return html;
            case 'textarea': return '<textarea type="text" rows="4" class="form-control order-form pv " data-type="textarea" id="'+x+'" value="'+item+'">'+item+'</textarea>';
            case 'GeneralList': 

                // parse product items
                html = `<table class="items order-form mb-5" data-type="items"><tr><th><div class="me-1 me-sm-3">${ __('Nr.') }</div></th><th><div class="me-1 me-sm-3">${ __('HS Code') }</div></th><th><div class="me-1 me-sm-3">${ __('Goods') }</div></th><th class="qty"><div class="me-1 me-sm-3">${ __('Qty') }</div></th><th class="weight"><div class="me-1 me-sm-3">${ __('Weight') }</div></th><th class="tp"><div class="me-1 me-sm-3">${ __('Value') }</div></th><th class="origin"><div class="me-1 me-sm-3">${ __('Origin') }</div></th><th></th></tr>`;
                for(let x in item){ html += preview.structGeneralListRow(_this, x, item, false); }

                // add row for manual product entry
                html += `<tr class="new-item-row">
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" placeholder="${ __('Search..') }" class="form-control text-right edit-item" data-id="" data-index="" list="item-suggestions">
                                    <span class="select-list-group__toggle"> </span>
                                    <ul class="s-list my-1 shadow-sm d-none" data-toggle="false"></ul>
                                    <datalist id="item-suggestions" class="fs-12 d-none"></datalist>
                                </div>
                            </td>
                            <td class="qty">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control text-right edit-qty">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="tp">
                                <div class="me-1 me-sm-3">
                                    <input type="text" value="" autocomplete="off" class="form-control edit-tp">
                                </div>
                            </td>
                            <td class="align-middle text-center"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="24" height="24" class="bi bi-plus-circle text-success align-middle add-item"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                            </td>
                        </tr>`;

                html += `</table><div class="item-vars-input mt-3"> </div>`;

                return html;
            default: 
            
                if(x == '_id') item = item.substr(0, 6);

                html = `<div data-id="${x}" data-type="text" class="${ a.classList ? a.classList : "" } ms-2 d-inline-block" ${ a.editable ? 'contenteditable="true"':'' } data-id="${x}">${ item }</div>`;
                return html;
        }
  },
  itemOptions: (item) => {

    let options = `

        <div class="dropdown text-center">
            <a  href="#" role="button" id="order-item-options" data-id="status" data-value="" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical order-item-options" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
            </a>
            <ul class="dropdown-menu" aria-labelledby="order-item-options" >
                <li><a class="oio dropdown-item edit-item-note" data-key="edit-item-note" href="#">${ __('Add note') }</a></li>
                <li><a class="oio dropdown-item d-none" data-key="edit-item-variation" href="#">${ __('Add variation') }</a></li>
                <li><a class="oio dropdown-ite d-none" data-key="edit-item-price" href="#">${ __('Adjust price') }</a></li>
                <li><a class="oio dropdown-item text-danger remove-item" data-key="remove-item" href="#">${ __('Remove') }</a></li>
            </ul>
        </div>
    `;

    return options;
  },
  structApplicationItemTable: (_this, x, item, isNew = false, options = true) => {

    // console.log(item[x].variations);

    // parse variations
    let vars = '', output = ''
    for(let v in item[x].variations){

        // parse variation list
        let list = ''; for(let l in item[x].variations[v].list) list += item[x].variations[v].list[l].title + " ";
        vars += '<div><b>' + item[x].variations[v].title + "</b> <span>" + list + "</span></div> ";

        // meal note
        if(item[x].variations[v].note !== undefined && item[x].variations[v].note.length > 0) vars += "<div><b>" + __('Note') + "</b> " + item[x].variations[v].note + "</div> ";
    }

    output += '<tr class="order-item-row-active" data-x="'+x+'" data-id="'+item[x].id+'" data-vars="'+escape(JSON.stringify(item[x].variations))+'">';
    output += '<td ><div class="item-title" contenteditable="false" data-value="'+item[x].title+'" data-sdesc="'+(item[x].sdesc ? item[x].sdesc : "")+'">' + item[x].title + '</div><div class="item-note text-muted mb-1 '+( (item[x].note.length==0 || item[x].note == '<br>') && !isNew ? "d-none" : "" )+'" contenteditable="true" data-value="'+item[x].note+'">' + item[x].note + '</div><div class="vars border-primary item-variations my-1 ps-2 text-secondary" data-value="">' + vars + '</div></td><td class="qty"><div class="me-1 me-sm-3 item-qty" data-value="'+item[x].qty+'">' + item[x].qty + '</div></td><td class="tp"><div class="me-1 me-sm-3 item-total" data-price="'+item[x].price+'" data-value="'+item[x].total+'" >' + priceFormat(_this, item[x].total) + '</div><td class="'+(options?'':'d-none')+'">'+preview.itemOptions(item[x])+'</td></td>';
    output += '</tr>';

    return output;
  },
  updateApplication: (_this, i, id) => {

    let modal = document.querySelector(".modal");
    if(modal.querySelector(".btn-confirm").dataset.loading === 'true') return;

    modal.querySelector(".btn-confirm").dataset.loading = true;
    modal.querySelector(".btn-confirm").innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __('Loading..');

    let data = {};

    // get application status
    data['status'] = document.querySelector('#order-status-modal').dataset.value;


    // iterate through all fields
    for(let s of document.querySelectorAll('.order-form')){

        switch(s.dataset.type){
        
            // case 'html': data[s.dataset.id] = s.innerHTML; break;
            case 'key': 
                // data[s.dataset.id] = s.dataset.value; 
                break;
            case 'key-number': 
                // data[s.dataset.id] = makeNumber(s.dataset.value); 
                break;
            case 'GeneralList':   

                // data['GeneralList'] = [];
                for(let item of document.querySelectorAll('.order-item-row-active')){

                    let vars = JSON.parse(unescape(item.dataset.vars));
                    // data['items'][item.dataset.id] =
                    data['items'].push(
                        {
                            "id": item.dataset.id,
                            "qty": parseInt(item.querySelector('.item-qty').dataset.value),
                            "note": item.querySelector('.item-note').innerHTML,
                            "type": "new",
                            "index": "0",
                            "price": parseFloat(item.querySelector('.item-total').dataset.price),
                            "sdesc": item.querySelector('.item-title').dataset.sdesc,
                            "title": item.querySelector('.item-title').dataset.value,
                            // "priceF": parseFloat(item.querySelector('.item-total').dataset.value),
                            "total": parseFloat(item.querySelector('.item-total').dataset.value),
                            "variations": id == 'new' ? [] : vars ? vars : [],
                        }
                    );
                }
                
            break
            case 'text':   
                // data[s.dataset.id] = s.innerHTML;
                break;
            case 'email':  
            case 'emails':  
            case 'select':
            case 'textarea': 
                // data[s.id] = s.value; 
                break;
            case 'radio': 
                // data[s.id] = s.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('input:checked').value; 
                break;
        }
    }

    // create new order
    if(id == 'new'){

        // TODO finalize later
        return; 

        // additional required fields
        data['name'] = data['from'];
        
        // get last order ID number
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                query: {
                    settings: {
                        type:       'get',
                        key:        'ecommerce-settings',
                        fields:     ['last_order_id'],
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){

                data['id'] = makeNumber(response.settings.last_order_id) + 1;

                // console.log("number: " + data['id']);

                // create new order
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({
                        query: {
                            order: {
                                type:       'create',
                                key:        'atacarnet-application',        
                                sid:        spaceID(),
                                data:       data
                            }
                        }
                    })
                })
                .then(response => response.json())
                .then(response => {

                    if (response.success){

                        _this.state.modalCont.hide();

                        toast( __('Order created') );

                        if(_this.state.printLink) _this.state.printLink = printReceipt(_this, data);

                        _this.getData();

                    }else{ parseApiError(response); }
                })
                .catch(error => { parseApiError(error); });

                // save next assigned number
                fetch('https://api-v1.kenzap.cloud/', {
                    method: 'post',
                    headers: headers,
                    body: JSON.stringify({
                        query: {
                            settings: {
                                type:       'set',
                                key:        'atacarnet-settings',        
                                sid:        spaceID(),
                                data:       {
                                    last_order_id: data['id']
                                }
                            }
                        }
                    })
                })
                .then(response => response.json())
                .then(response => { if (!response.success){ parseApiError(response); } })
                .catch(error => {  parseApiError(error); });   
            
            }else{ parseApiError(response); }
        })
        .catch(error => { parseApiError(error); });

    // update existing order
    }else{

        // send data
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: headers,
            body: JSON.stringify({
                query: {
                    order: {
                        type:       'update',
                        key:        'atacarnet-application',        
                        sid:        spaceID(),
                        id:         id,
                        data:       data
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            if (response.success){

                _this.state.modalCont.hide();

                toast( __('Application updated') );
      
                _this.getData();

            }else{

                parseApiError(response);
            }
        })
        .catch(error => {
            parseApiError(error);
        });
    }
  },
  suggestApplicationItem: (_this) => {
            
    onKeyUp('.edit-item', (e) => {
        
      // disable some key for better UX
      var key = e.keyCode || e.charCode;
      if (key >= 34 && key <= 45) { return; }

      let s  = e.currentTarget.value;

      if(s.length == 1) document.querySelector('.modal-body').scrollTo({
        top: (document.querySelector('.edit-item').getBoundingClientRect().top - document.querySelector('.modal-body-cont').getBoundingClientRect().top) - 20,
        behavior: "smooth"
      });

      // empty search string
      if(s.length==0 || e.currentTarget !==document.activeElement) { document.querySelector('.s-list').dataset.toggle = false; return; }

      // do API query
      fetch('https://api-v1.kenzap.cloud/', {
          method: 'post',
          headers: headers,
          body: JSON.stringify({
              query: {
                  products: {
                      type:       'find',
                      key:        'ecommerce-product',
                      fields:     ['_id', 'id', 'img', 'status', 'variations', 'price', 'title'],
                      limit:      _this.state.slist,
                      // only suggesting products with status public
                      term:       [
                                    {
                                        type: "string",
                                        field: "status",
                                        relation: "=",
                                        value: "1",
                                    }
                                  ],
                      offset:     s.length > 0 ? 0 : getPageNumber() * _this.state.slist - _this.state.slist,    // automatically calculate the offset of table pagination
                      search:     {                                                           // if s is empty search query is ignored
                                      field: 'title',
                                      s: s
                                  },
                      sortby:     {
                                      field: 'title',
                                      order: 'DESC'
                                  },
                  }
              }
          })
      })
      .then(response => response.json())
      .then(response => {

          // hide UI loader
          hideLoader();

          // console.log(response);

          if(response.success){

              _this.state.productsSuggestions = response.products;

              let options = ``;
              response.products.forEach((product, index) => {

                  // options += `<option class="pso" data-id="${ product._id }" data-title="${ product.title }" data-index="${ index }" value="${ product.title }">${ product.title }</option>`; 
                  options += `<li class="s-list-item py-1" data-id="${ product._id }" data-title="${ product.title }" data-index="${ index }"  data-display="true" data-highlight="false">${ product.title }</li>`; 
              });
              document.querySelector('.s-list').innerHTML = options;
              document.querySelector('.s-list').dataset.toggle = true;

              // suggestion click listener 
              onClick('.s-list-item', (e) => {

                  let index = e.currentTarget.dataset.index;

                  // console.log(index);
                  // console.log(_this.state.productsSuggestions[index]);
                  
                  document.querySelector('.edit-item').dataset.index = index;   
                  document.querySelector('.edit-item').dataset.id = _this.state.productsSuggestions[index]._id;   
                  document.querySelector('.edit-item').value = _this.state.productsSuggestions[index].title;   
                  document.querySelector('.edit-qty').value = 1;
                  document.querySelector('.edit-qty').dataset.price = _this.state.productsSuggestions[index].price;
                  document.querySelector('.edit-tp').value = _this.state.productsSuggestions[index].price;
                  document.querySelector('.edit-tp').dataset.price = _this.state.productsSuggestions[index].price;
                  document.querySelector('.s-list').dataset.toggle = false;

                  let calcItemTotal = () => {

                      let total = parseFloat(document.querySelector('.edit-qty').value) * parseFloat(document.querySelector('.edit-qty').dataset.price);
                      if(isNaN(total)) total = "";
                      document.querySelector('.edit-tp').value = total;
                  }

                  // auto update price when quantity is changed
                  document.querySelector('.edit-qty').addEventListener('keypress', (e)=>{

                      // console.log(e.which);
                      if(e.which != 8 && isNaN(String.fromCharCode(e.which))){

                          e.preventDefault(); // stop character from entering input
                          return false;
                      }

                  });

                  document.querySelector('.edit-qty').addEventListener('keydown', (e)=>{

                      // console.log('keydown');
                      setTimeout(() => { calcItemTotal(); }, 300);

                  });

                  // price can be float number only
                  document.querySelector('.edit-tp').addEventListener('keypress', (e)=>{

                      // console.log(e.which);
                      if(e.which != 8 && e.which != 46 && isNaN(String.fromCharCode(e.which))){

                          e.preventDefault(); // stop character from entering input
                          return false;
                      }
                  });

                  // focus on quantity field
                  document.querySelector('.edit-qty').focus();
                  document.querySelector('.edit-qty').select();   
                  
                  // parse selected product variations
                  // console.log('parseVariations');
                  document.querySelector('.item-vars-input').innerHTML = parseVariations(_this, _this.state.productsSuggestions[index]);

              });

          }else{

              parseApiError(response);
          }
      })
      .catch(error => { console.log(error); parseApiError(error); });

    });
  },
  tableApplicationItemListeners: (e) => {

    // make note field visible below the order item
    onClick('.edit-item-note', (e) => {

        e.preventDefault();

        let noteEl = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.item-note');
        console.log(noteEl);
        noteEl.classList.remove('d-none');
        noteEl.focus();
    });

    // remove order item
    onClick('.remove-item', (e) => {

        e.preventDefault();

        e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

        // if(preview._this.state.applicationSingle._id == 'new') 
        preview.refreshTotals();
    });
  },
  refreshTotals: () => {

    // clear previous calculations
    if(document.querySelector('.order-total')) document.querySelector('.order-total').remove();
    if(document.querySelector('.keyx-total')) document.querySelector('.keyx-total').remove();
    if(document.querySelector('.keyx-total_tax')) document.querySelector('.keyx-total_tax').remove();
    if(document.querySelector('.keyx-total_with_tax')) document.querySelector('.keyx-total_with_tax').remove();

    let html = "", totals = { total: { title: __('Total'), amount: 0 }, total_with_tax: { title: __('Paid'), amount: 0 } };
    for(let price of document.querySelectorAll('.item-total')){

        let tax = makeNumber(price.dataset.value) * 0.09;
        totals['total'].amount += makeNumber(price.dataset.value);
        // totals['total_tax'].amount += tax
        // totals['total_with_tax'].amount += (makeNumber(price.dataset.value) + tax);
    };

    for(let i in totals){

        let display = totals[i].title;
        if(i == 'total_tax') display = preview._this.state.settings.tax_display + " (" + preview._this.state.settings.tax_rate + "%):";

        html += `
        <div class="mb-3 mt-3 order-row elipsized keyx-${i}">
            <b>${ display }</b><div class="order-form ms-2 d-inline-block" data-id="${ i }" data-type="key-number" data-value="${ totals[i].amount }">${ priceFormat(preview._this, totals[i].amount) }</div>
        </div>`;
    }

    html = `<div class="order-total">${ html }</div>`;

    document.querySelector('.modal-body-cont').insertAdjacentHTML("beforeend", html);

    // return html;
  },
  structGeneralListRow: (_this, index, items, tf) => {

    console.log(el);

    let el = items[index];

    return `
    <tr>
        <td>${ parseInt(index) + 1 }</td>
        <td>CHVD20201234</td>
        <td>${ el.Name }</td>
        <td>${ el.Quantity }</td>
        <td>${ el.Weight + '' + el.WeightUnit }</td>
        <td>${ el.Value }</td>
        <td>${ el.Origin }</td>
        <td></td>
    </tr>`;
  },
  addApplicationItem: (_this) => {

    onClick('.add-item', (e) => {

      let x = 0, itemArr = [], item = {};

      item.id = document.querySelector('.edit-item').dataset.id;   
      item.title = document.querySelector('.edit-item').value;   
      item.total = parseFloat(document.querySelector('.edit-tp').value);
      item.price = parseInt(document.querySelector('.edit-tp').dataset.price);
      item.qty = parseInt(document.querySelector('.edit-qty').value);
      item.note = "";
      item.variations = [];

      // working
      let count = 0;
      let list = document.querySelectorAll(".item-vars-input input");
      for(const inp of list){

            // console.log(v.checked);
            // let v = parseInt(inp.dataset.indexv);

            let v = count;
            if(inp.checked){

                if(!item.variations[v]) item.variations[v] = {};

                if(!item.variations[v].list) item.variations[v].list = {};

                if(!item.variations[v].title) item.variations[v].title = inp.dataset.titlev;

                // cache selected variations
                item.variations[v].list["_"+inp.dataset.index] = { title: inp.dataset.title, price: parseFloat(inp.dataset.price) }; 

                item.total += item.qty * parseFloat(inp.dataset.price);
                
                count +=1;
            }
      }

      // console.log(item.variations);

      // handle variations
    //   let count = 0;
    //   for(const cbg of document.querySelectorAll(".item-vars-input .kp-check input[type=checkbox][data-indexv='"+v+"']")){

    //       // checks if this block is required and allows checkout
    //       if(cb.dataset.required=="1"){ if(count) item.variations[v].allow = true; }else{ cart.state.product.variations[v].allow = true; }

    //       // cache selected variations
    //       if(cbg.checked){ cart.state.product.variations[v].list["_"+cbg.dataset.index] = {title: cbg.dataset.title, price: parseFloat(cbg.dataset.price) }; count +=1; }
    //   }

    //   // let count = 0;
    //   for(const rag of document.querySelectorAll(".item-vars-input .kp-radio input[type=radio][data-indexv='"+v+"']")){
      
    //       // console.log(rag.dataset.price);

    //       // cache selected variations
    //       if(rag.checked){ cart.state.product.variations[v].list["_"+rag.dataset.index] = {title: rag.dataset.title, price: parseFloat(rag.dataset.price) }; count +=1; }
          
    //       // checks if this block is required and allows checkout
    //       if(cb.dataset.required=="1"){ if(count) cart.state.product.variations[v].allow = true; }else{ cart.state.product.variations[v].allow = true; }
    //   }


      if(item.title.length<2){ alert(__('Incorrect product data')); return; }

      itemArr.push(item);

      let itemRow = preview.structGeneralListRow(_this, x, itemArr, true);

      document.querySelector('.new-item-row').insertAdjacentHTML("beforebegin", itemRow);

      preview.tableApplicationItemListeners();

      // calculate totals for new orders only
      // if(_this.state.applicationSingle._id == 'new') 
      preview.refreshTotals();

      // clear fields
      document.querySelector('.edit-item').value = "";   
      document.querySelector('.edit-tp').value = "";
      document.querySelector('.edit-qty').value = "";
      document.querySelector(".item-vars-input").innerHTML = "";

      // focus back to the input field
      setTimeout(() => { document.querySelector('.edit-item').focus(); }, 300);
    });
  },
}