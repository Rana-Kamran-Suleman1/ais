// output Html
const Story = document.querySelector('#approvedList');
const pagination = document.querySelector('.pagination');

$(function ($) {
    var page = 1,
        records = 10,
        totalRecords = 0,
        search = '';

    // Run on page load
    setInterval(fetchData(), 2000)

    // data filtering
    $("#search-input").keyup(function (e) {
        let value = e.target.value
        fetchData(search = value);

    });

    // Show Records limits
    $("#records").click(function (e) {
        let value = e.target.value
        fetchData(records = value);
    });
    // Previous Page
    $('[aria-label="Previous"]').click(function () {
        if (page > 1) {
            page--;
        }
        fetchData();
    });

    // Next page 
    $('[aria-label="Next"]').click(function () {
        if (page * records < totalRecords) {
            page++;
        }
        fetchData();
    });

    // data fetching from API
    function fetchData() {
        $.ajax({
            url: "/api/approved/",
            type: "GET",
            data: {
                page: page,
                records: records,
                search: search
            },
            success: function (res) {
                console.log(res.results)
                totalRecords = res.count
                Story.innerHTML = '';
                res.results.map((object) => {
                    let storyStatus = ('Story not finish');
                    let colorClassName = ("badge-danger");

                    if (object.story_status === "sf") {
                        colorClassName = "badge-success";
                        storyStatus = "Story finish"
                    }

                    if (object.story_status === "fr") {
                        colorClassName = "badge-success";
                        storyStatus = "Approved"
                    }
                    Story.innerHTML +=
                        `<tr>
                            <td> ` + object.id + `</td>           
                            <td><a href="${'/'}${object.id}" class="detaillink"> ` + object.title + `</a></td>           
                            <td> ` + object.author + `</td>           
                            <td> ` + moment(object.created_on).fromNow() + `</td>           
                            <td><span class="badge ${colorClassName} id="story-status">${storyStatus}</span></td>
                            <td>
                                <div class="table-btns">
                                    <a href="${'/'}update/${object.id}" class="table-btn table-btn--edit">
                                        <i class="icon ion-ios-create"></i>
                                    </a>
                                    <a href="#" class="table-btn table-btn--delete">
                                        <i class="icon ion-ios-trash"></i>
                                    </a>
                                </div>
                            </td>           
                        </tr>`;
                })
                deletePost();
                Pagination();
            }
        })
    }

    function Pagination() {
        let pagesNumbers = Math.ceil(totalRecords / records);
        document.getElementById('corrunt-page').textContent = `${'Page ' + page + ' of ' + pagesNumbers}`

        // $('.page-item-numbers').remove();

        // for (let i = 1; i <= pagesNumbers; i++) {
        //     $(`.pagination > li:nth-child(${i})`).after(`<li class="page-item page-item-numbers ${i == page ? 'active' : ''}" ><a class="page-link" href="#">${i}</a></li>`);
        // }
        // SelicePaginator();
    }

    function deletePost() {
        $('.table-btn--delete').click(function () {
            var this_html = $(this);
            var pk = this_html.parent().parent().parent().children().first().text();
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this story!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        $.ajax({
                            url: '/ajax_delete/',
                            type: 'POST',
                            data: { pk: pk },
                            success: function () {
                                swal("Story has been deleted!", {
                                    icon: "success",
                                });
                                this_html.parent().parent().parent().remove();
                            }
                        });
                    } else { swal("Story is safe"); }
                });
        });
    }
})