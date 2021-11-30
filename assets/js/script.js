$(document).ready(function() {
    // data array
    var data = [];

    // new data object
    var newData;
    var myData;
    var edit;
    var regexName = /[^a-zA-z]/g;

    // checkout first name function
    function checkFName(f, obj) {
        var i = $('.fName')
        if($('#firstName').val() == '') {
            var msg = 'First name field is required';
            displayError(i, msg)
        } else if (regexName.test($('#firstName').val())){
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
        if($('#lastName').val() == '') {
            var msg = 'Last name field is required';
            displayError(i, msg)
        } else if (regexName.test($('#lastName').val())){
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

    // display data functionality
    function displayData(data) {
        var info;
        $('.table table tbody').html('')
        for(var i in data) {
            info += `
                <tr>
                    <td>${data[i].firstName}</td>
                    <td>${data[i].lastName}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].address}</td>
                    <td><button class="edit">Edit</td>
                    <td><button class="delete">Delete</button></td>
                </tr>
            `;   
            $('.table table tbody').html(info)
        }

        // delete button functionality
        $('.delete').each(function(i, elem) {
            $(elem).click(e => {
                e.preventDefault();
                var myId;
                var btnName = $(this).parents().find('td:first-child').text();
                data.find((elem) => { if(elem.firstName == btnName) myId = elem.id; })
                $(data).each(function(index, value) { if(value.id == myId) data.splice(index, 1) });
                displayData(data)
            })
        })

        // edit button functionality
        $('.edit').each(function(i, elem) {
            $(this).click(e => {
                e.preventDefault();
                edit = true;
                var myId
                var btnName = $(this).parents().find('td:first-child').text();
                data.find((elem) => { if(elem.firstName == btnName) myId = elem.id; })
                myData = data.find(e => e.id === myId)

                $('#firstName').val(myData.firstName)
                $('#lastName').val(myData.lastName)
                $(`#${myData.gender.toLowerCase()}`).attr('checked', true)
                $('#address').val(myData.address)
            })
        })

    }

    // calling display data
    displayData(data)

    // reset button trigger
    $('.reset').click(e => {
        e.preventDefault();
        $('form').trigger('reset')
        $('input[name="gender"]').attr('checked', false);
    })

    // submit form function
    $("form").submit((e) => {
        e.preventDefault();

        var successRate = { f: '', l: '', g: '', a: '', t: '' }
        newData = {
            id: Math.round(Math.random() * 10000),
            firstName: '',
            lastName: '',
            gender: '',
            address: ''
        }

        checkFName(successRate, newData)
        checkLName(successRate, newData)
        checkGender(successRate, newData)
        checkAddress(successRate, newData)
        checkTerms(successRate, newData)
        checkAll(successRate, newData, myData, edit)
        edit = false;
    })
})