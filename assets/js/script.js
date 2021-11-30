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

    // check gender function
    function checkGender(g, obj) {
        var i = $('.genderErr')
        var radio = $("input[name='gender']:checked").val();
        if(!radio) {
            var msg = 'Gender is required';
            displayError(i, msg);
        } else {
            displaySuccess(i)
            g.g = true;
            obj.gender = radio
        }
    }

    // check address function
    function checkAddress(a, obj) {
        var i = $('.add')
        if($('textarea').val() == '') {
            var msg = 'Address field is required';
            displayError(i, msg);
        } else {
            displaySuccess(i)
            a.a = true
            obj.address = $('textarea').val()
        }
    }

    // check terms function
    function checkTerms(t, obj) {
        var i = $('.term')
        var value = $("input[type='checkbox']")
        if(!value.prop('checked')) {
            var msg = 'Terms is not checked';
            displayError(i, msg);
        } else {
            displaySuccess(i)
            t.t = true
        }
    }

    // display error function
    function displayError(i, msg) {
        i.text(msg)
        i.show();
    }

    // display success function
    function displaySuccess(i) {
        i.empty()
        i.hide()
    }

    // check all function
    function checkAll(obj, newData, myData=false, edit=false) {
        var value = Object.values(obj).every((v) => v === true)
        if(myData && value && edit) {
            var myId;
            data.find((elem) => { if(elem.firstName == myData.firstName) myId = elem.id; })
            $(data).each(function(index, e) { if(e.id == myId) data.splice(index, 1) });
            data.unshift(newData)
            displayData(data)
            $('form').trigger('reset')
        } else if (value) {
            data.unshift(newData)
            displayData(data)
            $('form').trigger('reset');
        } else {
            return null
        }
    }

    // calling display data
    displayData(data)
})