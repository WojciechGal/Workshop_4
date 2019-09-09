$(function () {

    $.ajax(
        {
            url: "http://date.jsontest.com/",
            method: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        console.log(response)

        // response.forEach(function (item) {
        //     console.log(item)
        // })
        let main = $("div")

        let resp = $(`<p>${response.date}</p><p>${response.time}</p>`)

        main.append(resp)

    })

})