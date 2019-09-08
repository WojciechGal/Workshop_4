$(function(){
    let table = $('#tableBooks')

    downloadBooks(table)




})

function downloadBooks(table){
    //table.html("") i jeszcze ten button odswiez u Adama

    $.ajax(
        {
            url:"http://localhost:8282/books",
            method:"GET",
            dataType:"json"
        }
    ).done(function(response){
        console.log(response)

        response.forEach(function(item){
            showBook(table, item)
        })
    })
}


function showBook(table, book){
    console.log(book)
    let row = $(`<tr>
        <th scope="row">${book.id}</th>
        <th>${book.title}</th>
        <th>${book.isbn}</th>
        <th><button class="btn btn-info" data-id="${book.id}">Usuń</button></th>
        </tr>`)
    table.append(row)
}