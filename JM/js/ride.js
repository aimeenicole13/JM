/*global JanMichaels _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });
    function requestEvent(pickupLocation) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/ride',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                                 "TableName": "Events", "Item": {"EventDistance": "10K"}
            }),
            contentType: 'application/json',
               success: function(data){
               alert("You have Registered");
               console.log('Response received from API: ', data);
               },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting event: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your event:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        var unicorn;
        var pronoun;
        console.log('Response received from API: ', result);
        unicorn = result.Unicorn;
        $('#request1').prop('disabled', 'disabled');
        $('#request1').text('Disabled');
        $('#request2').prop('disabled', 'disabled');
        $('#request2').text('Disabled');
        $('#request3').prop('disabled', 'disabled');
        $('#request3').text('Disabled');
        $('#request4').prop('disabled', 'disabled');
        $('#request4').text('Disabled');
        $('#request5').prop('disabled', 'disabled');
        $('#request5').text('Disabled');
        $('#request6').prop('disabled', 'disabled');
        $('#request6').text('Disabled');
        $('#request7').prop('disabled', 'disabled');
        $('#request7').text('Disabled');
        $('#request8').prop('disabled', 'disabled');
        $('#request8').text('Disabled');
    }

    // Register click handler for #request buttons
    $(function onDocReady() {
        $('#request1').prop('disabled', false);
        $('#request1').click(handleRequestClick);
        $('#request2').prop('disabled', false);
        $('#request2').click(handleRequestClick);
        $('#request3').prop('disabled', false);
        $('#request3').click(handleRequestClick);
        $('#request4').prop('disabled', false);
        $('#request4').click(handleRequestClick);
        $('#request5').prop('disabled', false);
        $('#request5').click(handleRequestClick);
        $('#request6').prop('disabled', false);
        $('#request6').click(handleRequestClick);
        $('#request7').prop('disabled', false);
        $('#request7').click(handleRequestClick);
        $('#request8').prop('disabled', false);
        $('#request8').click(handleRequestClick);
        $('#signOut').click(function() {
            WildRydes.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        if (!_config.api.invokeUrl) {
            $('#noApiMessage').show();
        }
    });

    function handlePickupChanged() {
        var requestButton = $('#request1');
        requestButton.text('Done');
        requestButton.prop('disabled', false);
        var requestButton2 = $('#request2');
        requestButton2.text('Done');
        requestButton2.prop('disabled', false);
        var requestButton3 = $('#request3');
        requestButton3.text('Done');
        requestButton3.prop('disabled', false);
        var requestButton4 = $('#request4');
        requestButton4.text('Done');
        requestButton4.prop('disabled', false);
        var requestButton5 = $('#request5');
        requestButton5.text('Done');
        requestButton5.prop('disabled', false);
        var requestButton6 = $('#request6');
        requestButton6.text('Done');
        requestButton6.prop('disabled', false);
        var requestButton7 = $('#request7');
        requestButton7.text('Done');
        requestButton7.prop('disabled', false);
        var requestButton8 = $('#request8');
        requestButton8.text('Done');
        requestButton8.prop('disabled', false);
    }

    function handleRequestClick(event) {
        var pickupLocation = WildRydes.map.selectedPoint;
        event.preventDefault();
        requestEvent(pickupLocation);
    }
}(jQuery));
