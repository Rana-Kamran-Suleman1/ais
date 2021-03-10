$(document).ready(function () {
    output = document.querySelector('#teleprompter')
    URL = `/rundown/ajax-prompter/${$(output).data('id')}/`
    getPromt();
    setInterval(getPromt(), 2000)
    function getPromt() {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                const results = document.querySelector("#teleprompter");
                results.innerHTML = "";
                data.map(art => {
                    results.innerHTML += `
                <p>${art.fields.content}</p>
                 <p style="text-align: center; font-size: 20px;">
                <<<=================>>>
                </p>
                `
                })
            });
    };
})


