$(function () {
    let table = $('#tableBooks')

    downloadBooks(table)

    let form = $('#form')

    form.find('thead tr th').eq(5).find('button').on('click', function (e) {
        sendBook(form, table)
    })



})

function downloadBooks(table) {
    table.html("")

    $.ajax(
        {
            //to jest do serwera z warsztatu 4 z forka - rest_api -> url: "http://localhost:8282/books",
            url: "http://localhost:8282/books",
            type: "GET",
            // jsonpCallback: 'jsonCallback',
            // contentType: "application/json",
            dataType: "json"
        }
    ).done(function (response) {
        //console.log(response)

        response.forEach(function (item) {
            showBook(table, item)
        })
    })
}


function showBook(table, book) {
    //console.log(book)
    let row = $(`<tr>
        <td scope="row">${book.id}</td>
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-info show">Szczegóły</button></td>
        <td><button class="btn btn-warning put" data-id="${book.id}">Edytuj</button></td>
        <td><button class="btn btn-danger delete" data-id="${book.id}">Usuń</button></td>
        </tr>`)

    let row2 = $(`<tr><td colspan="6"></td></tr>`).css("display", "none")
    row2.css("text-align", "center")

    let row3 = $(`<tr>
                            <td>
                                <input style="width: 150px" name="title" placeholder="Tytuł"/>
                            </td>
                            <td>
                                <input style="width: 150px" name="isbn" placeholder="ISBN"/>
                            </td>
                            <td>
                                <input style="width: 150px" name="author" placeholder="Autor"/>
                            </td>
                            <td>
                                <input style="width: 150px" name="publisher" placeholder="Wydawca"/>
                            </td>
                            <td>
                                <input style="width: 150px" name="type" placeholder="Typ"/>
                            </td>
                            <td><button class="btn btn-warning">Edytuj</button></td>
                        </tr>`).css("display", "none")
    row2.css("text-align", "center")


    table.append(row)
    table.append(row2)
    table.append(row3)

    $(row).find('.show').on('click', function () {
        downloadDetailsAndSlide(book.id, row2)
    })

    $(row).find('.put').on('click', function () {
        editBook(book.id, row3, table)
    })

    $(row).find('.delete').on('click', function(){
        deleteBook(book.id, row, row2, row3)
    })


}

function downloadDetailsAndSlide(id, row2) {

    $.ajax(
        {
            url: `http://localhost:8282/books/${id}`,
            type: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        console.log(response)

        $(row2).find('td').text(`${response.author}, ${response.publisher}, ${response.type}`)

        $(row2).css("display", "")
    })

}

function deleteBook(id, row, row2, row3) {

    $.ajax(
        {
            url: `http://localhost:8282/books/${id}`,
            type: "DELETE"
        }
    ).done(function() {
        row.remove()
        row2.remove()
        row3.remove()
    })
}

function sendBook(form, table) {

    let inputs = form.find('thead tr th')

    let title = inputs.eq(0).find('input').val()
    let isbn = inputs.eq(1).find('input').val()
    let author = inputs.eq(2).find('input').val()
    let publisher = inputs.eq(3).find('input').val()
    let type = inputs.eq(4).find('input').val()

    $.ajax(
        {
            url: `http://localhost:8282/books`,
            data: `{"title": "${title}", "isbn":"${isbn}", "author":"${author}", "publisher":"${publisher}", "type":"${type}"}`,
            contentType: "application/json",
            type: "POST"
        }
    ).done(function (response) {
        console.log(response)
        console.log('book added')
        showBook(table, response)
        inputs.find('input').val('')
    })

}

function editBook(id, row3, table) {

    $.ajax(
        {
            url: `http://localhost:8282/books/${id}`,
            type: "GET",
            dataType: "json"
        }
    ).done(function (response) {
        console.log(response)

        $(row3).find('td').eq(0).find('input').val(`${response.title}`)
        $(row3).find('td').eq(1).find('input').val(`${response.isbn}`)
        $(row3).find('td').eq(2).find('input').val(`${response.author}`)
        $(row3).find('td').eq(3).find('input').val(`${response.publisher}`)
        $(row3).find('td').eq(4).find('input').val(`${response.type}`)

        $(row3).css("display", "")
    })

    row3.find('td').eq(5).find('button').on('click', function () {

        $.ajax({
            url: `http://localhost:8282/books/${id}`,
            data: `{"title": "${row3.find('td').eq(0).find('input').val()}",
             "isbn":"${row3.find('td').eq(1).find('input').val()}",
              "author":"${row3.find('td').eq(2).find('input').val()}",
               "publisher":"${row3.find('td').eq(3).find('input').val()}",
                "type":"${row3.find('td').eq(4).find('input').val()}",
                "id":"${id}"}`,
            contentType: "application/json",
            method: "PUT"
        }).done(function () {
            console.log('edit complete')
            downloadBooks(table)
        });
    })

}