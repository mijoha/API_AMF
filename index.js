var protocol = ""

$( document ).ready(function() {
    /*
    $.ajax({
        url: "http://api.arbetsformedlingen.se/af/v0/platsannonser/soklista/lan",
        success: function( result ) {
            console.log(result);
            var data = result.soklista.sokdata
            for (var i in data) {
                if (data[i].id == 14) {
                    $('.nrplaces').html(data[i].antal_ledigajobb);
                }
            }
        }
    });
    */

    var prot = location.protocol;
    console.log("Protocol: ", prot);
    if (prot == 'https:') {
        protocol = prot;
    } else {
        protocol = 'http:';
    }

    $('.yglist').on('click', 'span', function(e) {
        //console.log($(this).data('id'));
        getYrkesId($(this).data('id'));
    })        

    $('.yolist').on('click', 'span', function(e) {
        //console.log($(this).data('id'));
        getMatchning($(this).data('id'));
    })        

    getYrkesOmraden();
});

var getYrkesOmraden = function() {
    $.ajax({
        url: protocol + "//api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesomraden",
        success: function( result ) {
            var data = result.soklista.sokdata
            var yrkesOmradenList = [];
            for (var i in data) {
                yrkesOmradenList.push(data[i].id);
                getYrkesGrupper(data[i].id)
            }
        }
    });    
}

var getYrkesGrupper = function(yOId) {
    
    $.ajax({
        url: protocol + "//api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrkesgrupper?yrkesomradeid=" + Number(yOId),
        success: function( result ) {
            var data = result.soklista.sokdata
            for (var i in data) {
                $('.yglist ul').append('<li><span data-id=' + data[i].id + '>' + data[i].namn + '</span></li>');
                //getYrkesId(data[i].id);
            }
        }
    });
}


var getYrkesId = function(yGId) {
    $.ajax({
        url: protocol + "//api.arbetsformedlingen.se/af/v0/platsannonser/soklista/yrken?yrkesgruppid=" + Number(yGId),
        success: function( result ) {
            var data = result.soklista.sokdata
            for (var i in data) {
                $('.yolist ul').append('<li><span data-id=' + data[i].id + '>' + data[i].namn + '</span></li>');
                //getMatchning(data[i].id);
            }
        }
    });

}

var getMatchning = function(yId) {
    $.ajax({
        url: protocol + "//api.arbetsformedlingen.se/af/v0/platsannonser/matchning?lanid=14&kommunid=1480&yrkesid=" + yId + "&nyckelord=",
        success: function( result ) {
            var data = result.matchningslista.matchningdata
            for (var i in data) {
                if (data[i].antalplatser > 1) {
                    $('.ylist ul').append('<li><a href=' + data[i].annonsurl + ' data-id=' + data[i].id + '>' + data[i].antalplatser + ' - ' + data[i].annonsrubrik + '</a></li>');
                }
            }
        }
    });

}