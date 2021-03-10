$(document).ready(function () {
    "use strict";
    Waves.init(); Waves.attach(".nav-menu:not(.js-waves-off) a, .btn:not(.js-waves-off):not(.btn-switch), .js-waves-on", ["waves-themed"])
    // var table = $('#TABLE_1').DataTable({
    //     "bInfo": false,
    //     // "destroy": true,
    //     // rowReorder: true,
    //     select: true,
    //     order: false,
    //     language: {
    //         "lengthMenu": '_MENU_',
    //         "search": '_INPUT_',
    //         searchPlaceholder: "Search records",
    //         "paginate": {
    //             "previous": '<i class="fa fa-angle-left"></i>',
    //             "next": '<i class="fa fa-angle-right"></i>'
    //         }
    //     },
    // });


    // $(document).ready(function () {
    //     let title = document.querySelector('.modal-title')
    //     let body = document.querySelector('.modal-body p')
    //     $('tbody #click-able').click(function () {
    //         var this_html = $(this);
    //         var pk = this_html.parent().children().first().text();

    //         $.ajax({
    //             type: 'GET',
    //             url: `/assignment/detail/${pk}/`,
    //             success: function (res) {
    //                 title.innerHTML = res.fields.place
    //                 body.innerHTML = res.fields.desc
    //                 console.log(res.fields.place)
    //             }
    //         });
    //     });
    // });
    $("#form_2").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            username: {
                required: true,
                minlength: 5
            },
            url: {
                required: true,
                url: true
            },
            number: {
                required: true,
                number: true
            },
            last_name: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            number: {
                required: "(Please enter your phone number)",
                number: "(Please enter valid phone number)"
            },
            last_name: {
                required: "This is custom message for required",
                minlength: "This is custom message for min length"
            }
        },
        submitHandler: function (form) {
            form.submit();
        },
        errorPlacement: function (error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .append(error);
        },
        errorElement: "span",
    });

    // home page js file
    // player for windows control
    function isInView(el) {
        var rect = el.getBoundingClientRect();           // absolute position of video element
        return !(rect.top > $(window).height() || rect.bottom < 0);   // visible?
    }

    $("video").each(function () {
        if (isInView($(this)[0])) {                    // visible?
            if ($(this)[0].paused) $(this)[0].pause();    // play if not playing
        }
        else {
            if (!$(this)[0].paused) $(this)[0].pause();  // pause if not paused
        }
    });
    $(".blog-box .title").filter((i, ele) => {
        return $("h4", ele).text().trim().match(/^[A-Za-z0-9]/);
    }).css({
        'text-align': 'left',
        'direction': 'ltr',
        'font-family': 'Open Sans',
        'margin-bottom': '10px'
    })
    // endhome page
});


