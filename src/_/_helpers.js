// import { getCookie, getSiteId } from '@kenzap/k-cloud';
export const CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';
export const appID = '66432108790002';
export const API_KEY = 'myinbftomKGcEJckjy9gTEiFyRWWZRxl5QELkPqsOdSMeSpTqTdIY88H4EUwG4oR';
export const spaceID = 1001964;

/**
 * @name setCookie
 * @description Set cookie by its name to all .kenzap.com subdomains
 * @param {string} name - Cookie name.
 * @param {string} value - Cookie value.
 * @param {string} days - Number of days when cookie expires.
 */
 export const setCookie = (name, value, days) => {

    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = ";expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (escape(value) || "") + expires + ";path=/"; 
}

/**
 * @name getCookie
 * @description Read cookie by its name.
 * @param {string} cname - Cookie name.
 * 
 * @returns {string} value - Cookie value.
 */
export const getCookie = (cname) => {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * @name onClick
 * @description One row click event listener declaration. Works with one or many HTML selectors.
 * @param {string} sel - HTML selector, id, class, etc.
 * @param {string} fn - callback function fired on click event.
 */
 export const onClick = (sel, fn) => {

    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('click', fn, true);
        e.addEventListener('click', fn, true);
    }
}

/**
 * @name onKeyUp
 * @description One row key up event listener declaration. Works with one or many HTML selectors.
 * @param {string} sel - HTML selector, id, class, etc.
 * @param {string} fn - callback function fired on click event.
 */
export const onKeyUp = (sel, fn) => {

    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('keyup', fn, true);
        e.addEventListener('keyup', fn, true);
    }
}

/**
 * @name onChange
 * @description One row change event listener declaration. Works with one or many HTML selectors.
 * @param {string} sel - HTML selector, id, class, etc.
 * @param {string} fn - callback function fired on click event.
 */
export const onChange = (sel, fn) => {

    if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

        e.removeEventListener('change', fn, true);
        e.addEventListener('change', fn, true);
    }
}

/**
 * Show small toast notification
 * @public
 */
 export const toast = function(msg){

    // Get the snackbar DIV
    let t = document.querySelector(".kUNwHA .snackbar");
    t.innerHTML = msg;
    t.classList.add("show");

    // After 3 seconds, remove the show class from div
    setTimeout(function(){ t.className = t.className.replace("show", ""); }, 2200);
}

/**
 * Localize string
 * @public
 */
export const __ = (text, ...p) => {

    let match = (input, pa) => {

        pa.forEach((p, i) => { input = input.replace('%'+(i+1)+'$', p); }); 
        
        return input;
    }

    if(i18n.state.locale.values[text] === undefined) return match(text, p);

    return match(i18n.state.locale.values[text], p);
}

export const mt = (val) => {

    return (""+val).length < 2 ? "0"+val : val;
}

export const getProductId = () => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id') ? urlParams.get('id') : "";
    return id;
}

export const getProductIdFromLink = () => {
    
    let url = new URL(window.location.href);
    let id = url.pathname.trim().split('/').slice(-2)[0];
    return id;
}

export const replaceQueryParam = (param, newval, search) => {

    let regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    let query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

export const getPageNumberOld = () => {

    let url = window.location.href.split('/');
    let page = url[url.length-1];
    let pageN = 1;
    if(page.indexOf('page')==0){
      pageN = page.replace('page', '').replace('#', '');
    }
    // console.log(pageN);
    return parseInt(pageN);
}

export const getPageNumber = () => {

    let urlParams = new URLSearchParams(window.location.search);
    let page = urlParams.get('page') ? urlParams.get('page') : 1;

    return parseInt(page);
}

export const getPagination = (__, meta, cb) => {

    if(typeof(meta) === 'undefined'){ document.querySelector("#listing_info").innerHTML = __('no records to display'); return; }

    let offset = meta.limit+meta.offset;
    if(offset>meta.total_records) offset = meta.total_records;

    document.querySelector("#listing_info").innerHTML = __("Showing %1$ to %2$ of %3$ entries", (1+meta.offset), (offset), meta.total_records);
    //  "Showing "+(1+meta.offset)+" to "+(offset)+" of "+meta.total_records+" entries";

    let pbc = Math.ceil(meta.total_records / meta.limit);
    document.querySelector("#listing_paginate").style.display = (pbc < 2) ? "none" : "block";

    let page = getPageNumber(); 
    let html = '<ul class="pagination d-flex justify-content-end pagination-flat mb-0">';
    html += '<li class="paginate_button page-item previous" id="listing_previous"><a href="#" aria-controls="order-listing" data-type="prev" data-page="0" tabindex="0" class="page-link"><span aria-hidden="true">&laquo;</span></li>';
    let i = 0;
    while(i<pbc){

        i++; 
        if(((i >= page-3) && (i <= page)) || ((i <= page+3) && (i >=page))){

            html += '<li class="paginate_button page-item '+((page==i)?'active':'')+'"><a href="#" aria-controls="order-listing" data-type="page" data-page="'+i+'" tabindex="0" class="page-link">'+(page==i?i:i)+'</a></li>';      
        }
    }  
    html += '<li class="paginate_button page-item next" id="order-listing_next"><a href="#" aria-controls="order-listing" data-type="next" data-page="2" tabindex="0" class="page-link"><span aria-hidden="true">&raquo;</span></a></li>';
    html += '</ul>'

    document.querySelector("#listing_paginate").innerHTML = html;

    let page_link = document.querySelectorAll(".page-link");
    for (const l of page_link) {
        l.addEventListener('click', function(e) {

            let p = parseInt(getPageNumber());
            let ps = p;
            switch(l.dataset.type){ 
                case 'prev': p-=1; if(p<1) p = 1; break;
                case 'page': p=l.dataset.page; break;
                case 'next': p+=1; if(p>pbc) p = pbc; break;
            }
            
            // update url
            if (window.history.replaceState) {

                // let url = window.location.href.split('/page');
                // let urlF = (url[0]+'/page'+p).replace('//page', '/page');

                let str = window.location.search;
                str = replaceQueryParam('page', p, str);
                // window.location = window.location.pathname + str

                // prevents browser from storing history with each change:
                window.history.replaceState("kenzap-cloud", document.title, window.location.pathname + str);
            }

            // only refresh if page differs
            if(ps!=p) cb();
            
            e.preventDefault();
            return false;
        });
    }
}

export const formatStatus = (__, st) => {

    // st = parseInt(st); 
    switch(st){ 
      case 'Verified': return '<div class="badge bg-dark text-light fw-light">' + __('Verified') + '</div>';
      case 'Paid': return '<div class="badge bg-primary text-light fw-light">' + __('Paid') + '</div>';
      case 'Draft': return '<div class="badge bg-secondary text-light fw-light">' + __('Draft') + '</div>';
      case 'Issued': return '<div class="badge bg-primary text-light fw-light">' + __('Issued') + '</div>';
      case 'Activated': return '<div class="badge bg-success text-light fw-light">' + __('Activated') + '</div>';
      case 'Returned': return '<div class="badge bg-success text-light fw-light">' + __('Returned') + '</div>';
      case 'Canceled': return '<div class="badge bg-secondary text-light fw-light">' + __('Canceled') + '</div>';
      case 'Blocked': return '<div class="badge bg-danger text-light fw-light">' + __('Blocked') + '</div>';
      case 'Expired': return '<div class="badge bg-danger text-light fw-light">' + __('Expired') + '</div>';
      case 'Archived': return '<div class="badge bg-secondary text-dark fw-light">' + __('Archived') + '</div>';
      // case 'Draft': return '<div class="badge bg-warning text-dark fw-light">' + __('Draft') + '</div>';
      default: return '<div class="badge bg-warning text-dark fw-light">' + __('New') + '</div>';
    }
}

/**
    * Render price
    * @public
    */
export const priceFormat = function(_this, price) {

    price = makeNumber(price);

    price = (Math.round(parseFloat(price) * 100)/100).toFixed(2);
    
    switch(_this.state.settings.currency_symb_loc){
        case 'left': price = _this.state.settings.currency_symb + price; break;
        case 'right': price = price + _this.state.settings.currency_symb; break;
    }

    return price;
}

export const makeNumber = function(price) {

    price = price ? price : 0;
    price = parseFloat(price);
    return price;
}

export const formatTime = (__, timestamp) => {
	
    const d = new Date(parseInt(timestamp) * 1000);
    return d.toLocaleDateString();

    let a = new Date(timestamp * 1000);
    let months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// nums only validation
export const numsOnly = (e, max) => {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (e.which) ? e.which : e.keyCode 
    if (ASCIICode > 31 && ASCIICode != 46 && (ASCIICode < 48 || ASCIICode > 57)) 
    return false; 

    if(parseFloat(e.target.value)>max) 
    return false; 

    let dec = e.target.value.split('.');
    if(dec.length>1)
    if(dec[1].length>1)
        return false;
    
    return true; 
}

// time elapsed since creation 
export const timeConverterAgo = (__, now, time) => {

    // console.log(now + " " + time);

    now = parseInt(now);
    time = parseInt(time);

    // console.log(now + " " + time);

    // parse as elapsed time
    let past = now - time;
    if(past < 60) return __('moments ago');
    if(past < 3600) return parseInt(past / 60) + __(' minutes ago');
    if(past < 86400) return parseInt(past / 60 / 24) + __(' hours ago');

    // process as normal date
    var a = new Date(time * 1000);
    var months = [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export const parseVariations = (_this, product) => {

    let html_vars = '';
    if(typeof(product.variations !== 'undefined'))
    for(let v in product.variations){

        // variation type
        let type = '';	
        if(product.variations[v].type=='checkbox') type = 'check';
        if(product.variations[v].type=='radio')    type = 'radio';

        // struct variation
        html_vars += '\
        <b>' + __(product.variations[v].title) + (product.variations[v].required == '1' ? ' <span class="tag">'+__('required')+'</span>':'')+'</b>\
        <div class="kp-'+type+'" >';

        // variation labels
        for(let d in product.variations[v].data){

            let checked = false;
            // for public qr feed
            // if(typeof(cart.state.product.variations[v]) !== 'undefined' && typeof(cart.state.product.variations[v].list) !== 'undefined' && typeof(cart.state.product.variations[v].list["_"+d]) !== 'undefined'){ checked = true; }
            
            // verify variation price validity
            product.variations[v].data[d]['price'] = makeNumber(product.variations[v].data[d]['price']);

            switch(type){
                case 'check':

                html_vars += '\
                    <label>\
                        <input type="checkbox" data-required="'+product.variations[v].required+'" data-indexv="'+v+'" data-index="'+d+'" data-title="'+product.variations[v].data[d]['title']+'" data-titlev="'+__(product.variations[v].title)+'" data-price="'+product.variations[v].data[d]['price']+'" '+(checked?'checked="checked"':'')+'>\
                        <div class="checkbox">\
                            <svg width="20px" height="20px" viewBox="0 0 20 20">\
                                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>\
                                <polyline points="4 11 8 15 16 6"></polyline>\
                            </svg>\
                        </div>\
                        <span>'+__(product.variations[v].data[d]['title'])+'</span>\
                        <div class="price">+ '+priceFormat(_this, product.variations[v].data[d]['price'])+'</div>\
                    </label>';
                
                break;
                case 'radio':

                html_vars += '\
                    <label>\
                        <input type="radio" data-required="'+product.variations[v].required+'" data-indexv="'+v+'" name="radio'+v+'" data-index="'+d+'" data-title="'+product.variations[v].data[d]['title']+'" data-titlev="'+__(product.variations[v].title)+'" data-price="'+product.variations[v].data[d]['price']+'" '+(checked?'checked="checked"':'')+' />\
                        <span>'+__(product.variations[v].data[d]['title'])+'</span>\
                        <div class="price">+ '+priceFormat(_this, product.variations[v].data[d]['price'])+'</div>\
                    </label>';
                
                break;
            }
        }

        html_vars += '</div>';
    }

    return html_vars;
}

export const escape = (htmlStr) => {

    return htmlStr.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");        
 
}

export const unescape = (htmlStr) => {

    htmlStr = htmlStr.replace(/&lt;/g , "<");	 
    htmlStr = htmlStr.replace(/&gt;/g , ">");     
    htmlStr = htmlStr.replace(/&quot;/g , "\"");  
    htmlStr = htmlStr.replace(/&#39;/g , "\'");   
    htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;
}

export const printReceipt = (_this, order) => {

    // vars
    let o = order, data = {}, date = new Date();

    // 58mm wide thermal printers are best to display 32 chars per line
    let row = (txt, end_ofst) => {

        let output = '', max_char = 32 - end_ofst, max_ofst = 4, ofst_prev = 0, ofst = 0, ci = 0;
        // console.log(max_char);
        for(let i = 0; i < Math.ceil(txt.length / max_char); i++){

            // add new line print from second loop only
            if(i>0) output += '\n[L]';

            // ofst store first available whitespace break in words
            ofst = ci = 0;
            for(let e = max_ofst; e > -1 * max_ofst; e--){

                ci = ((max_char + ofst_prev) * i) + max_char + e; if(txt[ci] == ' ' || ci == txt.length){ ofst += e; break; }
            }

            // add line row
            output += txt.substr((max_char + ofst_prev) * i, max_char + ofst);

            // line ends earlier than expected, skip loop
            if(ci == txt.length) break;

            ofst_prev = ofst;
        }

        return output;
    };

    // debug vs actual print
    data.debug = false;

    // get receipt template
    data.print = _this.state.settings.receipt_template;

    // order id
    data.print = data.print.replace(/{{order_id}}/g, o.id);

    // current time
    data.print = data.print.replace(/{{date_time}}/g, date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short', }));

    // order items
    let items = '';
    for(let i in o.items){

        let total = priceFormat(_this, o.items[i].total);
        let end_ofst = (o.items[i].qty+"").length + (total+"").length + 3;
        items += `[L]<b>${ o.items[i].qty } X ${ row(o.items[i].title, end_ofst) }</b>[R]${ total }\n`;
        for(let v in o.items[i].variations){

            items += `[L] ${ row(o.items[i].variations[v].title, 1) }:`;
            for(let l in  o.items[i].variations[v].list) items += ` ${ o.items[i].variations[v].list[l].title },`;

            if(items.endsWith(',')) items = items.substring(0, items.length - 1) + '\n';

            // parse variation list
            // let list = ''; for(let l in item[x].variations[v].list) list += item[x].variations[v].list[l].title + " ";
            // vars += '<div><b>' + item[x].variations[v].title + "</b> <span>" + list + "</span></div> ";
    
            // // meal note
            // if(item[x].variations[v].note !== undefined && item[x].variations[v].note.length > 0) vars += "<div><b>" + __('Note') + "</b> " + item[x].variations[v].note + "</div> ";
        }
    }
    if(items.endsWith('\n')) items = items.substring(0, items.length - 2);
    data.print = data.print.replace(/{{order_items}}/g, items);

    // order note
    let note = o.note.length == 0 || o.note == '<br>' ? '' : o.note;
    if(note.length>0){
        //  data.print += '[C]================================';
        data.print = data.print.replace(/{{order_note}}/g, '[C]================================\n' + note + '\n[C]================================\n');
    }
    // if(note.length>0) data.print += '[C]================================';

    // order totals
    data.print = data.print.replace(/{{total}}/g, priceFormat(_this, o.total));
    data.print = data.print.replace(/{{total_tax}}/g, priceFormat(_this, o.total_tax));
    data.print = data.print.replace(/{{total_with_tax}}/g, priceFormat(_this, o.total_with_tax));
    


    // let click = document.querySelector(".print-order[data-id='"+e.currentTarget.dataset.id+"']");

    // click.setAttribute('href', 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data)));

    // e.currentTarget.setAttribute('href', 'kenzapprint://kenzapprint.app?data='+JSON.stringify(data));

    let str = 'kenzapprint://kenzapprint.app?data='+encodeURIComponent(JSON.stringify(data));
    
    if(data.debug) { console.log(data.print); console.log(str); }

    return str;
}

/**
    * Generates a random string
    * 
    * @param int length_
    * @return string
    */
export const randomString = function(length_) {

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    var str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

export const getCountries = (__) => {
    
    return [ 
        {name: 'Afghanistan', code: 'AF', ata: false}, 
        {name: 'Åland Islands', code: 'AX', ata: false}, 
        {name: 'Albania', code: 'AL', ata: true}, 
        {name: 'Algeria', code: 'DZ', ata: true}, 
        {name: 'American Samoa', code: 'AS', ata: false}, 
        {name: 'Andorra', code: 'AD', ata: true}, 
        {name: 'Angola', code: 'AO', ata: false}, 
        {name: 'Anguilla', code: 'AI', ata: false}, 
        {name: 'Antarctica', code: 'AQ', ata: false}, 
        {name: 'Antigua and Barbuda', code: 'AG', ata: false}, 
        {name: 'Argentina', code: 'AR', ata: false}, 
        {name: 'Armenia', code: 'AM', ata: false}, 
        {name: 'Aruba', code: 'AW', ata: false}, 
        {name: 'Australia', code: 'AU', ata: true}, 
        {name: 'Austria', code: 'AT', ata: true}, 
        {name: 'Azerbaijan', code: 'AZ', ata: false}, 
        {name: 'Bahamas', code: 'BS', ata: false}, 
        {name: 'Bahrain', code: 'BH', ata: true}, 
        {name: 'Bangladesh', code: 'BD', ata: false}, 
        {name: 'Barbados', code: 'BB', ata: false}, 
        {name: 'Belarus', code: 'BY', ata: true}, 
        {name: 'Belgium', code: 'BE', ata: true}, 
        {name: 'Belize', code: 'BZ', ata: false}, 
        {name: 'Benin', code: 'BJ', ata: false}, 
        {name: 'Bermuda', code: 'BM', ata: false}, 
        {name: 'Bhutan', code: 'BT', ata: false}, 
        {name: 'Bolivia', code: 'BO', ata: false}, 
        {name: 'Bosnia and Herzegovina', code: 'BA', ata: true}, 
        {name: 'Botswana', code: 'BW', ata: false}, 
        {name: 'Bouvet Island', code: 'BV', ata: false}, 
        {name: 'Brazil', code: 'BR', ata: true}, 
        {name: 'British Indian Ocean Territory', code: 'IO', ata: false}, 
        {name: 'Brunei Darussalam', code: 'BN', ata: false}, 
        {name: 'Bulgaria', code: 'BG', ata: true}, 
        {name: 'Burkina Faso', code: 'BF', ata: false}, 
        {name: 'Burundi', code: 'BI', ata: false}, 
        {name: 'Cambodia', code: 'KH', ata: false}, 
        {name: 'Cameroon', code: 'CM', ata: false}, 
        {name: 'Canada', code: 'CA', ata: true}, 
        {name: 'Cape Verde', code: 'CV', ata: false}, 
        {name: 'Cayman Islands', code: 'KY', ata: false}, 
        {name: 'Central African Republic', code: 'CF', ata: false}, 
        {name: 'Chad', code: 'TD', ata: false}, 
        {name: 'Chile', code: 'CL', ata: true}, 
        {name: 'China', code: 'CN', ata: true}, 
        {name: 'Christmas Island', code: 'CX', ata: false}, 
        {name: 'Cocos (Keeling) Islands', code: 'CC', ata: false}, 
        {name: 'Colombia', code: 'CO', ata: false}, 
        {name: 'Comoros', code: 'KM', ata: false}, 
        {name: 'Congo', code: 'CG', ata: false}, 
        {name: 'Congo, The Democratic Republic of the', code: 'CD', ata: false}, 
        {name: 'Cook Islands', code: 'CK', ata: false}, 
        {name: 'Costa Rica', code: 'CR', ata: false}, 
        {name: 'Cote D\'Ivoire', code: 'CI', ata: true}, 
        {name: 'Croatia', code: 'HR', ata: true}, 
        {name: 'Cuba', code: 'CU', ata: false}, 
        {name: 'Cyprus', code: 'CY', ata: true}, 
        {name: 'Czech Republic', code: 'CZ', ata: true}, 
        {name: 'Denmark', code: 'DK', ata: true}, 
        {name: 'Djibouti', code: 'DJ', ata: false}, 
        {name: 'Dominica', code: 'DM', ata: false}, 
        {name: 'Dominican Republic', code: 'DO', ata: false}, 
        {name: 'Ecuador', code: 'EC', ata: false}, 
        {name: 'Egypt', code: 'EG', ata: false}, 
        {name: 'El Salvador', code: 'SV', ata: false}, 
        {name: 'Equatorial Guinea', code: 'GQ', ata: false}, 
        {name: 'Eritrea', code: 'ER', ata: false}, 
        {name: 'Estonia', code: 'EE', ata: true}, 
        {name: 'Ethiopia', code: 'ET', ata: false}, 
        {name: 'Falkland Islands (Malvinas)', code: 'FK', ata: false}, 
        {name: 'Faroe Islands', code: 'FO', ata: false}, 
        {name: 'Fiji', code: 'FJ', ata: false}, 
        {name: 'Finland', code: 'FI', ata: true}, 
        {name: 'France', code: 'FR', ata: true}, 
        {name: 'French Guiana', code: 'GF', ata: false}, 
        {name: 'French Polynesia', code: 'PF', ata: false}, 
        {name: 'French Southern Territories', code: 'TF', ata: false}, 
        {name: 'Gabon', code: 'GA', ata: false}, 
        {name: 'Gambia', code: 'GM', ata: false}, 
        {name: 'Georgia', code: 'GE', ata: false}, 
        {name: 'Germany', code: 'DE', ata: true}, 
        {name: 'Ghana', code: 'GH', ata: false}, 
        {name: 'Gibraltar', code: 'GI', ata: false}, 
        {name: 'Greece', code: 'GR', ata: true}, 
        {name: 'Greenland', code: 'GL', ata: false}, 
        {name: 'Grenada', code: 'GD', ata: false}, 
        {name: 'Guadeloupe', code: 'GP', ata: false}, 
        {name: 'Guam', code: 'GU', ata: false}, 
        {name: 'Guatemala', code: 'GT', ata: false}, 
        {name: 'Guernsey', code: 'GG', ata: false}, 
        {name: 'Guinea', code: 'GN', ata: false}, 
        {name: 'Guinea-Bissau', code: 'GW', ata: false}, 
        {name: 'Guyana', code: 'GY', ata: false}, 
        {name: 'Haiti', code: 'HT', ata: false}, 
        {name: 'Heard Island and Mcdonald Islands', code: 'HM', ata: false}, 
        {name: 'Holy See (Vatican City State)', code: 'VA', ata: false}, 
        {name: 'Honduras', code: 'HN', ata: false}, 
        {name: 'Hong Kong', code: 'HK', ata: true}, 
        {name: 'Hungary', code: 'HU', ata: true}, 
        {name: 'Iceland', code: 'IS', ata: true}, 
        {name: 'India', code: 'IN', ata: true}, 
        {name: 'Indonesia', code: 'ID', ata: true}, 
        {name: 'Iran, Islamic Republic Of', code: 'IR', ata: true}, 
        {name: 'Iraq', code: 'IQ', ata: false}, 
        {name: 'Ireland', code: 'IE', ata: true}, 
        {name: 'Isle of Man', code: 'IM', ata: false}, 
        {name: 'Israel', code: 'IL', ata: true}, 
        {name: 'Italy', code: 'IT', ata: true}, 
        {name: 'Jamaica', code: 'JM', ata: false}, 
        {name: 'Japan', code: 'JP', ata: true}, 
        {name: 'Jersey', code: 'JE', ata: false}, 
        {name: 'Jordan', code: 'JO', ata: false}, 
        {name: 'Kazakhstan', code: 'KZ', ata: true}, 
        {name: 'Kenya', code: 'KE', ata: false}, 
        {name: 'Kiribati', code: 'KI', ata: false}, 
        {name: 'Korea, Democratic People\'S Republic of', code: 'KP', ata: false}, 
        {name: 'South Korea', code: 'KR', ata: true}, 
        {name: 'Kuwait', code: 'KW', ata: false}, 
        {name: 'Kyrgyzstan', code: 'KG', ata: false}, 
        {name: 'Lao People\'S Democratic Republic', code: 'LA', ata: false}, 
        {name: 'Latvia', code: 'LV', ata: true}, 
        {name: 'Lebanon', code: 'LB', ata: true}, 
        {name: 'Lesotho', code: 'LS', ata: false}, 
        {name: 'Liberia', code: 'LR', ata: false}, 
        {name: 'Libyan Arab Jamahiriya', code: 'LY', ata: false}, 
        {name: 'Liechtenstein', code: 'LI', ata: false}, 
        {name: 'Lithuania', code: 'LT', ata: true}, 
        {name: 'Luxembourg', code: 'LU', ata: false}, 
        {name: 'Macao', code: 'MO', ata: true}, 
        {name: 'Macedonia', code: 'MK', ata: true}, 
        {name: 'Madagascar', code: 'MG', ata: false}, 
        {name: 'Malawi', code: 'MW', ata: false}, 
        {name: 'Malaysia', code: 'MY', ata: true}, 
        {name: 'Maldives', code: 'MV', ata: true}, 
        {name: 'Mali', code: 'ML', ata: false}, 
        {name: 'Malta', code: 'MT', ata: true}, 
        {name: 'Marshall Islands', code: 'MH', ata: false}, 
        {name: 'Martinique', code: 'MQ', ata: false}, 
        {name: 'Mauritania', code: 'MR', ata: false}, 
        {name: 'Mauritius', code: 'MU', ata: true}, 
        {name: 'Mayotte', code: 'YT', ata: false}, 
        {name: 'Mexico', code: 'MX', ata: true}, 
        {name: 'Micronesia, Federated States of', code: 'FM', ata: false}, 
        {name: 'Moldova', code: 'MD', ata: true}, 
        {name: 'Monaco', code: 'MC', ata: false}, 
        {name: 'Mongolia', code: 'MN', ata: true}, 
        {name: 'Montserrat', code: 'MS', ata: false}, 
        {name: 'Morocco', code: 'MA', ata: true}, 
        {name: 'Mozambique', code: 'MZ', ata: false}, 
        {name: 'Myanmar', code: 'MM', ata: false}, 
        {name: 'Namibia', code: 'NA', ata: false}, 
        {name: 'Nauru', code: 'NR', ata: false}, 
        {name: 'Nepal', code: 'NP', ata: false}, 
        {name: 'Netherlands', code: 'NL', ata: false}, 
        {name: 'Netherlands Antilles', code: 'AN', ata: false}, 
        {name: 'New Caledonia', code: 'NC', ata: false}, 
        {name: 'New Zealand', code: 'NZ', ata: false}, 
        {name: 'Nicaragua', code: 'NI', ata: true}, 
        {name: 'Niger', code: 'NE', ata: false}, 
        {name: 'Nigeria', code: 'NG', ata: false}, 
        {name: 'Niue', code: 'NU', ata: false}, 
        {name: 'Norfolk Island', code: 'NF', ata: false}, 
        {name: 'Northern Mariana Islands', code: 'MP', ata: false}, 
        {name: 'Norway', code: 'NO', ata: true}, 
        {name: 'Oman', code: 'OM', ata: false}, 
        {name: 'Pakistan', code: 'PK', ata: false}, 
        {name: 'Palau', code: 'PW', ata: false}, 
        {name: 'Palestinian Territory, Occupied', code: 'PS', ata: false}, 
        {name: 'Panama', code: 'PA', ata: false}, 
        {name: 'Papua New Guinea', code: 'PG', ata: false}, 
        {name: 'Paraguay', code: 'PY', ata: false}, 
        {name: 'Peru', code: 'PE', ata: false}, 
        {name: 'Philippines', code: 'PH', ata: false}, 
        {name: 'Pitcairn', code: 'PN', ata: false}, 
        {name: 'Poland', code: 'PL', ata: true}, 
        {name: 'Portugal', code: 'PT', ata: true}, 
        {name: 'Puerto Rico', code: 'PR', ata: false}, 
        {name: 'Qatar', code: 'QA', ata: true}, 
        {name: 'Reunion', code: 'RE', ata: false}, 
        {name: 'Romania', code: 'RO', ata: true}, 
        {name: 'Russian Federation', code: 'RU', ata: true}, 
        {name: 'RWANDA', code: 'RW', ata: false}, 
        {name: 'Saint Helena', code: 'SH', ata: false}, 
        {name: 'Saint Kitts and Nevis', code: 'KN', ata: false}, 
        {name: 'Saint Lucia', code: 'LC', ata: false}, 
        {name: 'Saint Pierre and Miquelon', code: 'PM', ata: false}, 
        {name: 'Saint Vincent and the Grenadines', code: 'VC', ata: false}, 
        {name: 'Samoa', code: 'WS', ata: false}, 
        {name: 'San Marino', code: 'SM', ata: false}, 
        {name: 'Sao Tome and Principe', code: 'ST', ata: false}, 
        {name: 'Saudi Arabia', code: 'SA', ata: false}, 
        {name: 'Senegal', code: 'SN', ata: false}, 
        {name: 'Serbia and Montenegro', code: 'CS', ata: true}, 
        {name: 'Seychelles', code: 'SC', ata: false}, 
        {name: 'Sierra Leone', code: 'SL', ata: false}, 
        {name: 'Singapore', code: 'SG', ata: true}, 
        {name: 'Slovakia', code: 'SK', ata: true}, 
        {name: 'Slovenia', code: 'SI', ata: true}, 
        {name: 'Solomon Islands', code: 'SB', ata: false}, 
        {name: 'Somalia', code: 'SO', ata: false}, 
        {name: 'South Africa', code: 'ZA', ata: true}, 
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS', ata: false}, 
        {name: 'Spain', code: 'ES', ata: true}, 
        {name: 'Sri Lanka', code: 'LK', ata: true}, 
        {name: 'Sudan', code: 'SD', ata: false}, 
        {name: 'Suriname', code: 'SR', ata: false}, 
        {name: 'Svalbard and Jan Mayen', code: 'SJ', ata: false}, 
        {name: 'Swaziland', code: 'SZ', ata: false}, 
        {name: 'Sweden', code: 'SE', ata: true}, 
        {name: 'Switzerland', code: 'CH', ata: true}, 
        {name: 'Syrian Arab Republic', code: 'SY', ata: false}, 
        {name: 'Taiwan, Province of China', code: 'TW', ata: true}, 
        {name: 'Tajikistan', code: 'TJ', ata: false}, 
        {name: 'Tanzania, United Republic of', code: 'TZ', ata: false}, 
        {name: 'Thailand', code: 'TH', ata: true}, 
        {name: 'Timor-Leste', code: 'TL', ata: false}, 
        {name: 'Togo', code: 'TG', ata: false}, 
        {name: 'Tokelau', code: 'TK', ata: false}, 
        {name: 'Tonga', code: 'TO', ata: false}, 
        {name: 'Trinidad and Tobago', code: 'TT', ata: false}, 
        {name: 'Tunisia', code: 'TN', ata: true}, 
        {name: 'Turkey', code: 'TR', ata: true}, 
        {name: 'Turkmenistan', code: 'TM'}, 
        {name: 'Turks and Caicos Islands', code: 'TC'}, 
        {name: 'Tuvalu', code: 'TV', ata: false}, 
        {name: 'Uganda', code: 'UG', ata: false}, 
        {name: 'Ukraine', code: 'UA', ata: true}, 
        {name: 'United Arab Emirates', code: 'AE', ata: true}, 
        {name: 'United Kingdom', code: 'GB', ata: true}, 
        {name: 'United States', code: 'US', ata: true}, 
        {name: 'United States Minor Outlying Islands', code: 'UM', ata: false}, 
        {name: 'Uruguay', code: 'UY', ata: false}, 
        {name: 'Uzbekistan', code: 'UZ', ata: false}, 
        {name: 'Vanuatu', code: 'VU', ata: false}, 
        {name: 'Venezuela', code: 'VE', ata: false}, 
        {name: 'Vietnam', code: 'VN', ata: false}, 
        {name: 'Virgin Islands, British', code: 'VG', ata: false}, 
        {name: 'Virgin Islands, U.S.', code: 'VI', ata: false}, 
        {name: 'Wallis and Futuna', code: 'WF', ata: false}, 
        {name: 'Western Sahara', code: 'EH', ata: false}, 
        {name: 'Yemen', code: 'YE', ata: false}, 
        {name: 'Zambia', code: 'ZM', ata: false}, 
        {name: 'Zimbabwe', code: 'ZW', ata: false} 
      ]

}

export const getCurrencies = () => {

    // length 164
    return [
        {"name":"Afghan Afghani","code":"AFA","symbol":"؋"},
        {"name":"Albanian Lek","code":"ALL","symbol":"Lek"},
        {"name":"Algerian Dinar","code":"DZD","symbol":"دج"},
        {"name":"Angolan Kwanza","code":"AOA","symbol":"Kz"},
        {"name":"Argentine Peso","code":"ARS","symbol":"$"},
        {"name":"Armenian Dram","code":"AMD","symbol":"֏"},
        {"name":"Aruban Florin","code":"AWG","symbol":"ƒ"},
        {"name":"Australian Dollar","code":"AUD","symbol":"$"},
        {"name":"Azerbaijani Manat","code":"AZN","symbol":"m"},
        {"name":"Bahamian Dollar","code":"BSD","symbol":"B$"},
        {"name":"Bahraini Dinar","code":"BHD","symbol":".د.ب"},
        {"name":"Bangladeshi Taka","code":"BDT","symbol":"৳"},
        {"name":"Barbadian Dollar","code":"BBD","symbol":"Bds$"},
        {"name":"Belarusian Ruble","code":"BYR","symbol":"Br"},
        {"name":"Belgian Franc","code":"BEF","symbol":"fr"},
        {"name":"Belize Dollar","code":"BZD","symbol":"$"},
        {"name":"Bermudan Dollar","code":"BMD","symbol":"$"},
        {"name":"Bhutanese Ngultrum","code":"BTN","symbol":"Nu."},
        {"name":"Bitcoin","code":"BTC","symbol":"฿"},
        {"name":"Bolivian Boliviano","code":"BOB","symbol":"Bs."},
        {"name":"Bosnia-Herzegovina Convertible Mark","code":"BAM","symbol":"KM"},
        {"name":"Botswanan Pula","code":"BWP","symbol":"P"},
        {"name":"Brazilian Real","code":"BRL","symbol":"R$"},
        {"name":"British Pound Sterling","code":"GBP","symbol":"£"},
        {"name":"Brunei Dollar","code":"BND","symbol":"B$"},
        {"name":"Bulgarian Lev","code":"BGN","symbol":"Лв."},
        {"name":"Burundian Franc","code":"BIF","symbol":"FBu"},
        {"name":"Cambodian Riel","code":"KHR","symbol":"KHR"},
        {"name":"Canadian Dollar","code":"CAD","symbol":"$"},
        {"name":"Cape Verdean Escudo","code":"CVE","symbol":"$"},
        {"name":"Cayman Islands Dollar","code":"KYD","symbol":"$"},
        {"name":"CFA Franc BCEAO","code":"XOF","symbol":"CFA"},
        {"name":"CFA Franc BEAC","code":"XAF","symbol":"FCFA"},
        {"name":"CFP Franc","code":"XPF","symbol":"₣"},
        {"name":"Chilean Peso","code":"CLP","symbol":"$"},
        {"name":"Chinese Yuan","code":"CNY","symbol":"¥"},
        {"name":"Colombian Peso","code":"COP","symbol":"$"},
        {"name":"Comorian Franc","code":"KMF","symbol":"CF"},
        {"name":"Congolese Franc","code":"CDF","symbol":"FC"},
        {"name":"Costa Rican Colón","code":"CRC","symbol":"₡"},
        {"name":"Croatian Kuna","code":"HRK","symbol":"kn"},
        {"name":"Cuban Convertible Peso","code":"CUC","symbol":"$, CUC"},
        {"name":"Czech Republic Koruna","code":"CZK","symbol":"Kč"},
        {"name":"Danish Krone","code":"DKK","symbol":"Kr."},
        {"name":"Djiboutian Franc","code":"DJF","symbol":"Fdj"},
        {"name":"Dominican Peso","code":"DOP","symbol":"$"},
        {"name":"East Caribbean Dollar","code":"XCD","symbol":"$"},
        {"name":"Egyptian Pound","code":"EGP","symbol":"ج.م"},
        {"name":"Eritrean Nakfa","code":"ERN","symbol":"Nfk"},
        {"name":"Estonian Kroon","code":"EEK","symbol":"kr"},
        {"name":"Ethiopian Birr","code":"ETB","symbol":"Nkf"},
        {"name":"Euro","code":"EUR","symbol":"€"},
        {"name":"Falkland Islands Pound","code":"FKP","symbol":"£"},
        {"name":"Fijian Dollar","code":"FJD","symbol":"FJ$"},
        {"name":"Gambian Dalasi","code":"GMD","symbol":"D"},
        {"name":"Georgian Lari","code":"GEL","symbol":"ლ"},
        {"name":"German Mark","code":"DEM","symbol":"DM"},
        {"name":"Ghanaian Cedi","code":"GHS","symbol":"GH₵"},
        {"name":"Gibraltar Pound","code":"GIP","symbol":"£"},
        {"name":"Greek Drachma","code":"GRD","symbol":"₯, Δρχ, Δρ"},
        {"name":"Guatemalan Quetzal","code":"GTQ","symbol":"Q"},
        {"name":"Guinean Franc","code":"GNF","symbol":"FG"},
        {"name":"Guyanaese Dollar","code":"GYD","symbol":"$"},
        {"name":"Haitian Gourde","code":"HTG","symbol":"G"},
        {"name":"Honduran Lempira","code":"HNL","symbol":"L"},
        {"name":"Hong Kong Dollar","code":"HKD","symbol":"$"},
        {"name":"Hungarian Forint","code":"HUF","symbol":"Ft"},
        {"name":"Icelandic króna","code":"ISK","symbol":"kr"},
        {"name":"Indian Rupee","code":"INR","symbol":"₹"},
        {"name":"Indonesian Rupiah","code":"IDR","symbol":"Rp"},
        {"name":"Iranian Rial","code":"IRR","symbol":"﷼"},
        {"name":"Iraqi Dinar","code":"IQD","symbol":"د.ع"},
        {"name":"Israeli New Sheqel","code":"ILS","symbol":"₪"},
        {"name":"Italian Lira","code":"ITL","symbol":"L,£"},
        {"name":"Jamaican Dollar","code":"JMD","symbol":"J$"},
        {"name":"Japanese Yen","code":"JPY","symbol":"¥"},
        {"name":"Jordanian Dinar","code":"JOD","symbol":"ا.د"},
        {"name":"Kazakhstani Tenge","code":"KZT","symbol":"лв"},
        {"name":"Kenyan Shilling","code":"KES","symbol":"KSh"},
        {"name":"Kuwaiti Dinar","code":"KWD","symbol":"ك.د"},
        {"name":"Kyrgystani Som","code":"KGS","symbol":"лв"},
        {"name":"Laotian Kip","code":"LAK","symbol":"₭"},
        {"name":"Latvian Lats","code":"LVL","symbol":"Ls"},
        {"name":"Lebanese Pound","code":"LBP","symbol":"£"},
        {"name":"Lesotho Loti","code":"LSL","symbol":"L"},
        {"name":"Liberian Dollar","code":"LRD","symbol":"$"},
        {"name":"Libyan Dinar","code":"LYD","symbol":"د.ل"},
        {"name":"Lithuanian Litas","code":"LTL","symbol":"Lt"},
        {"name":"Macanese Pataca","code":"MOP","symbol":"$"},
        {"name":"Macedonian Denar","code":"MKD","symbol":"ден"},
        {"name":"Malagasy Ariary","code":"MGA","symbol":"Ar"},
        {"name":"Malawian Kwacha","code":"MWK","symbol":"MK"},
        {"name":"Malaysian Ringgit","code":"MYR","symbol":"RM"},
        {"name":"Maldivian Rufiyaa","code":"MVR","symbol":"Rf"},
        {"name":"Mauritanian Ouguiya","code":"MRO","symbol":"MRU"},
        {"name":"Mauritian Rupee","code":"MUR","symbol":"₨"},
        {"name":"Mexican Peso","code":"MXN","symbol":"$"},
        {"name":"Moldovan Leu","code":"MDL","symbol":"L"},
        {"name":"Mongolian Tugrik","code":"MNT","symbol":"₮"},
        {"name":"Moroccan Dirham","code":"MAD","symbol":"MAD"},
        {"name":"Mozambican Metical","code":"MZM","symbol":"MT"},
        {"name":"Myanmar Kyat","code":"MMK","symbol":"K"},
        {"name":"Namibian Dollar","code":"NAD","symbol":"$"},
        {"name":"Nepalese Rupee","code":"NPR","symbol":"₨"},
        {"name":"Netherlands Antillean Guilder","code":"ANG","symbol":"ƒ"},
        {"name":"New Taiwan Dollar","code":"TWD","symbol":"$"},
        {"name":"New Zealand Dollar","code":"NZD","symbol":"$"},
        {"name":"Nicaraguan Córdoba","code":"NIO","symbol":"C$"},
        {"name":"Nigerian Naira","code":"NGN","symbol":"₦"},
        {"name":"North Korean Won","code":"KPW","symbol":"₩"},
        {"name":"Norwegian Krone","code":"NOK","symbol":"kr"},
        {"name":"Omani Rial","code":"OMR","symbol":".ع.ر"},
        {"name":"Pakistani Rupee","code":"PKR","symbol":"₨"},
        {"name":"Panamanian Balboa","code":"PAB","symbol":"B/."},
        {"name":"Papua New Guinean Kina","code":"PGK","symbol":"K"},
        {"name":"Paraguayan Guarani","code":"PYG","symbol":"₲"},
        {"name":"Peruvian Nuevo Sol","code":"PEN","symbol":"S/."},
        {"name":"Philippine Peso","code":"PHP","symbol":"₱"},
        {"name":"Polish Zloty","code":"PLN","symbol":"zł"},
        {"name":"Qatari Rial","code":"QAR","symbol":"ق.ر"},
        {"name":"Romanian Leu","code":"RON","symbol":"lei"},
        {"name":"Russian Ruble","code":"RUB","symbol":"₽"},
        {"name":"Rwandan Franc","code":"RWF","symbol":"FRw"},
        {"name":"Salvadoran Colón","code":"SVC","symbol":"₡"},
        {"name":"Samoan Tala","code":"WST","symbol":"SAT"},
        {"name":"Saudi Riyal","code":"SAR","symbol":"﷼"},
        {"name":"Serbian Dinar","code":"RSD","symbol":"din"},
        {"name":"Seychellois Rupee","code":"SCR","symbol":"SRe"},
        {"name":"Sierra Leonean Leone","code":"SLL","symbol":"Le"},
        {"name":"Singapore Dollar","code":"SGD","symbol":"$"},
        {"name":"Slovak Koruna","code":"SKK","symbol":"Sk"},
        {"name":"Solomon Islands Dollar","code":"SBD","symbol":"Si$"},
        {"name":"Somali Shilling","code":"SOS","symbol":"Sh.so."},
        {"name":"South African Rand","code":"ZAR","symbol":"R"},
        {"name":"South Korean Won","code":"KRW","symbol":"₩"},
        {"name":"Special Drawing Rights","code":"XDR","symbol":"SDR"},
        {"name":"Sri Lankan Rupee","code":"LKR","symbol":"Rs"},
        {"name":"St. Helena Pound","code":"SHP","symbol":"£"},
        {"name":"Sudanese Pound","code":"SDG","symbol":".س.ج"},
        {"name":"Surinamese Dollar","code":"SRD","symbol":"$"},
        {"name":"Swazi Lilangeni","code":"SZL","symbol":"E"},
        {"name":"Swedish Krona","code":"SEK","symbol":"kr"},
        {"name":"Swiss Franc","code":"CHF","symbol":"CHf"},
        {"name":"Syrian Pound","code":"SYP","symbol":"LS"},
        {"name":"São Tomé and Príncipe Dobra","code":"STD","symbol":"Db"},
        {"name":"Tajikistani Somoni","code":"TJS","symbol":"SM"},
        {"name":"Tanzanian Shilling","code":"TZS","symbol":"TSh"},
        {"name":"Thai Baht","code":"THB","symbol":"฿"},
        {"name":"Tongan Pa'anga","code":"TOP","symbol":"$"},
        {"name":"Trinidad & Tobago Dollar","code":"TTD","symbol":"$"},
        {"name":"Tunisian Dinar","code":"TND","symbol":"ت.د"},
        {"name":"Turkish Lira","code":"TRY","symbol":"₺"},
        {"name":"Turkmenistani Manat","code":"TMT","symbol":"T"},
        {"name":"Ugandan Shilling","code":"UGX","symbol":"USh"},
        {"name":"Ukrainian Hryvnia","code":"UAH","symbol":"₴"},
        {"name":"United Arab Emirates Dirham","code":"AED","symbol":"إ.د"},
        {"name":"Uruguayan Peso","code":"UYU","symbol":"$"},
        {"name":"US Dollar","code":"USD","symbol":"$"},
        {"name":"Uzbekistan Som","code":"UZS","symbol":"лв"},
        {"name":"Vanuatu Vatu","code":"VUV","symbol":"VT"},
        {"name":"Venezuelan  Bolívar","code":"VEF","symbol":"Bs"},
        {"name":"Vietnamese Dong","code":"VND","symbol":"₫"},
        {"name":"Yemeni Rial","code":"YER","symbol":"﷼"},
        {"name":"Zambian Kwacha","code":"ZMK","symbol":"ZK"}
    ];
}