$(document).ready(function() {
    // data array
    var data = [];

    // new data object
    var newData;
    var myData;
    var edit;

    // checkout first name function
    function checkFName(f, obj) {
        var i = $('.fName')
        var regex = /[^a-zA-z]/g;
        if($('#firstName').val() == '') {
            var msg = 'First name field is required';
            displayError(i, msg)
            return false;
        } else if (regex.test($('#firstName').val())){
            var msg = 'Please enter valid first name';
            displayError(i, msg);
        } else {
            displaySuccess(i)
            f.f = true
            obj.firstName = $('#firstName').val()
        }
    }

    // check last name function
    function checkLName(l, obj) {
        var i = $('.lName')
        var regex = /[^a-zA-z]/g;
        if($('#lastName').val() == '') {
            var msg = 'Last name field is required';
            displayError(i, msg)
            return false;
        } else if (regex.test($('#lastName').val())){
            var msg = 'Please enter valid last name';
            displayError(i, msg);
        } else {
            displaySuccess(i)
            l.l = true
            obj.lastName = $('#lastName').val()
        }
    }
})