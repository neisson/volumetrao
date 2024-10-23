/* PARSE QUERY URL */
function parseQuery(qstr) {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}

function encodeQuery(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function addQueryParameterToDomain(key, value) {
    var links = document.querySelectorAll('a[href]'),
        linksLength = links.length,
        index,
        queryIndex,
        hashIndex,
        queryString,
        query,
        url,
        domain,
        colonSlashSlash;

    for (index = 0; index < linksLength; ++index) {
        url = links[index].href,
            queryIndex = url.indexOf('?'),
            hashIndex = url.indexOf('#'),
            colonSlashSlash = url.indexOf('://');
        
        domain = url.substring(colonSlashSlash + 3);
        domain = domain.substring(0, domain.indexOf('/'));
        
        var newUrl = new URL(url);
        var hash = newUrl.hash;
        url = newUrl.origin + newUrl.pathname + newUrl.search;

        if (queryIndex === -1) {
            url += '?' + key + '=' + value;
        } else if (hashIndex === -1) {
            queryString = url.substring(queryIndex);
            url = url.substring(0, queryIndex);
            query = parseQuery(queryString);

            if (query[key] != null && query[key] != undefined && key != 'split' && key != 'bol') {
                if (query[key] !== value) {
                    query[key] = value;
                }
            } else {
                query[key] = value;
            }
            
            
            url += '?' + encodeQuery(query);
        } else {
            url = '';
        }
        
        links[index].href = url + hash;
    }
}

function addQuery(item) {
    var arr = item.split('=');
    if (arr[0] != null && arr[1] != undefined) {
        addQueryParameterToDomain(arr[0], arr[1]);
    }
}

var url = window.location.search.replace("?", "");
var itens = url.split('&');
itens.forEach(addQuery);
/* END PARSE QUERY URL */
