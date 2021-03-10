$(document).ready(function () {
    new Sortable(drag, {
        group: 'sortables',
        animation: 150,
        onChange: function (e, tr) {
            checkFields();
            addArray();
        },
    });

    new Sortable(drop, {
        group: "sortables",
        animation: 150,
        onChange: function (event, tr) {
            checkFields();
            addArray();
            Sorting();
        },
    });

    function addArray() {
        let articles = [];
        let options = '';
        const table = document.getElementById("drop");

        for (var i = 0; i < table.rows.length; i++) { // push ID to articles Array
            articles.push(table.rows[i].cells[0].innerHTML);
        };
        let uniqueArray = articles.filter((item, index, array) => { // filter Duplicate ID
            return array.indexOf(item) === index
        })
        $.each(uniqueArray, function (index, value) { // Create Option Element using Each ID form Array
            options += `<option value="${value}" selected=""></option>`;
        });
        $('#id_articles').html(options);
    };

    function Sorting() {
        sort = [];
        $('#drop').children().each(function () {
            sort.push({ 'pk': $(this).data('pk'), 'order': $(this).index() })
        });
        let crf_token = $('[name="csrfmiddlewaretoken"]').attr('value') // csrf token
        $.ajax({
            url: "/rundown/sorts/",
            type: "post",
            headers: { "X-CSRFToken": crf_token },
            datatype: 'json',
            data: {
                'sort': JSON.stringify(sort),
            },
            success: function () {
                console.log('success')
            }
        });
    };

    function checkFields() {
        if ($('#drop tr').length >= 1) {
            $('#drop').find('#blank_row').remove();
        } else {
            $('#drop').append($("<tr>").attr("id", "blank_row")
                .append($('<td>').attr("colspan", '4')
                    .text('Drop here...')));
        }
    };

});
