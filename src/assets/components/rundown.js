$(function ($) {
    let page = 1,
        records = 5,
        totalRecords = 0,
        search = '';

    // Run on page load
    fetchData();
    setInterval(fetchData, 10000);

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
        const Story = document.getElementById('rundown-list');
        $.ajax({
            url: "/rundown/rundown-list-api/",
            type: "GET",
            data: {
                page: page,
                records: records,
                search: search
            },
            success: function (res) {
                totalRecords = res.count
                Story.innerHTML = '';
                res.results.map((object) => {
                    Story.innerHTML +=
                        `<tr>          
                            <td> ` + object.id + `</td>           
                            <td><a href="${'/' + `rundown/detail/` + object.id}" class="detaillink"> ` + object.pool_title + `</a></td>           
                            <td> ` + object.set_by + `</td>           
                            <td> ` + object.time_pool + `</td>           
                            <td> ` + moment(object.created_on).fromNow() + `</td>           
                            <td class="text-center"><a class="btn btn-sm" href="${'/rundown/prompter/' + object.id}">Prompter view</a>
                            </td>    
                        </tr>`;
                })
                Pagination();
            }
        })
    }

    function Pagination() {
        let pagesNumbers = Math.ceil(totalRecords / records);
        document.getElementById('corrunt-page').textContent = `${'Page ' + page + ' of ' + pagesNumbers}`
    }
})