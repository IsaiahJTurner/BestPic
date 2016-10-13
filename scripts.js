function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function showError(message) {
    // alert(message)
    $('#error').html(message.replace(/\n/g, '<br>'));
}

$(document).ready(function() {
    var albumId = getQueryVariable('a');
    if (albumId) {
        $('#responder').toggle(true);
        if (albumId.length > 10) {
            showError('Invalid album ID in url.');
            return;
        }
        var el = document.getElementById('image-sorter');
        var sortable = Sortable.create(el);
        return;
        $.ajax({
                dataType: "json",
                url: 'https://api.imgur.com/3/album/' + albumId,
                headers: {
                    Authorization: 'Client-ID 94c54bcc4763ba5'
                }
            })
            .then(function(album) {
                console.log(album);
            })
    } else {
        $('#link-creator').toggle(true);
    }
});


$('#form').submit(function(e) {
    e.preventDefault();
    var urlPrefix = document.location.origin + document.location.pathname + '?'
    if (document.location.protocol !== 'file:') {
        urlPrefix = urlPrefix.replace('index.html', '');
    }
    var queryString = $(this).serialize();
    var imgurPrefix = 'http%3A%2F%2Fimgur.com%2Fa%2F';
    if (queryString.indexOf(imgurPrefix) === -1) {
        showError('Your album url must start with http://imgur.com/a/');
        return;
    }
    queryString = queryString.replace(imgurPrefix, '');
    var url = urlPrefix + queryString;
    var urlLength = url.length;
    if (url.length > 2000) {
        showError('Due to a browser limitation, you must shorten your bios.\nCurrent Length: ' + urlLength + '\nMax Length: 2000');
        return;
    }
    document.location = url;
});
