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
var bioMapper = ['w', 'x', 'y', 'z'];
$(document).ready(function() {
    var imageComments = getQueryVariable('c');
    var imageOrder = getQueryVariable('i');
    var albumId = getQueryVariable('a');
    var bios = [];
    bioMapper.forEach(function(bioName) {
        var bio = getQueryVariable(bioName);
        if (bio) {
            bios.push(bio);
        }
    });

    if (bios.length !== 0) {
        $('#bio-feedback').toggle(true);
        var $bioOptions = $('#bio-options')
        for (var i = 0; i < bios.length; i++) {
            var bio = bios[i]
            $bioOptions.append('<li>' + bio.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</li>')
        }
    }
    var hasImageOrder = ((typeof imageOrder) === 'string');
    if (albumId && !hasImageOrder) {
        $('#responder').toggle(true);
        if (albumId.length > 10) {
            showError('Invalid album ID in url.');
            return;
        }
        var el = document.getElementById('image-sorter');
        var sortable = Sortable.create(el);
        var albumId = getQueryVariable('a');

        $.ajax({
                dataType: "json",
                url: 'https://api.imgur.com/3/album/' + albumId,
                headers: {
                    Authorization: 'Client-ID 94c54bcc4763ba5'
                }
            })
            .then(function(album) {
                var images = album["data"]["images"]
                for (var i = 0; i < images.length; i++) {
                    var image = images[i]
                    $('#image-sorter').append('<li><div class="image" data-id=' + image['id'] + ' style="background-image: url(\'' + image['link'] + '\')"></div></li>')
                }
            })
    } else if (hasImageOrder) {
        $('#response').toggle(true);
        var imageIds = imageOrder.split(',');
        for (var i = 0; i < imageIds.length; i++) {
            var imageId = imageIds[i];
            $('#option-' + (i + 1)).css('background-image', "url('http://i.imgur.com/" + imageId + ".png')");
        }
        $('#comments').text(imageComments);
        $('#bio-view').text(getQueryVariable('b'));
    } else {
        $('#link-creator').toggle(true);
    }
});

$('#responder-form').submit(function(e) {
    e.preventDefault();
    var urlPrefix = document.location.origin + document.location.pathname + '?'
    if (document.location.protocol !== 'file:') {
        urlPrefix = urlPrefix.replace('index.html', '');
    }
    var queryString = $(this).serialize();
    var url = urlPrefix + queryString;
    url += '&a=' + getQueryVariable('a')

    var urlLength = url.length;
    var imageIds = '';
    var foundAll = false;
    $('#image-sorter').children().each(function(index, li) {
        var $li = $(li);
        if ($li.attr('id') === 'delete-line') {
            foundAll = true;
        } else if (foundAll) {
            return;
        } else {
            console.log($li, $li.find('.image'), $li.find('.image').first(), $li.find('.image').first().data("id"))
            var imageId = $li.find('.image').first().data("id");
            if (imageIds) {
                imageIds += ',' + imageId;
            } else {
                imageIds = imageId;
            }
        }
    })
    var bio = $('#bio').val()
    var bioNumber = parseInt(bio, 10)
    if (bioNumber > 0) {
        var $lis = $('#bio-options').children('li')
        var $li = $($lis[bioNumber - 1])
        if ($li) {
            bio = $li.text();
        }
    }
    url += '&b=' + encodeURIComponent(bio);
    url += '&i=' + imageIds;
    var selectedImagesLength = imageIds.split(',').length
    if (selectedImagesLength > 6) {
        showError('Profiles can only have up to six photos, move some below the black line.');
        return;
    }
    if (url.length > 2000) {
        showError('Due to a browser limitation, you must shorten your bio.\nCurrent Length: ' + urlLength + '\nMax Length: 2000');
        return;
    }
    document.location = url;
})

$('#link-creator-form').submit(function(e) {
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
