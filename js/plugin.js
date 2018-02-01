//listen for form submit
var form = document.getElementById('form');
form.addEventListener('submit', SaveBookMark);

// Save book mark
function SaveBookMark(e) {
    // Get Values
    var siteName = document.getElementById('siteName').value,
        siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }
    var bookMark = {
            name: siteName,
            URL: siteUrl
        };

    if (localStorage.getItem('bookMarks') === null) { // Check if the array if existing or not 
        // creat a new array (Not existing)
        var bookMarks = [];
        // add book markes
        bookMarks.push(bookMark);
        // set to local storage
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    } else { // Already existing
        // get book markes from local storage
        var bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        // add new book mark to an array
        bookMarks.push(bookMark);
        // Re-set back to local storage
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    }
    // clear the form
    document.getElementById('form').reset();
    // Re fetch bookmark
    fetchBookMarks();
    // prevent form from submitting
    e.preventDefault();
}

// Delete bookMark
function deleteBookMark(URL) {
    // get book marks from local storage
    var bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
    // loop through bookmark
    for(var i = 0; i < bookMarks.length; i++){
        if (bookMarks[i].URL == URL) {
            // Remove from array
            bookMarks.splice(i,1);
        }
    }
    // Re-set back to local storage
    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));

    // Re fetch bookmark
    fetchBookMarks();
}

// fetch bookmark
function fetchBookMarks() {
    // get book markes from local storage
    var bookMarks = JSON.parse(localStorage.getItem('bookMarks')),
    // get output id
        bookMarkResults = document.getElementById('bookMarkResults');

    // Build output
    bookMarkResults.innerHTML = '';
    // build loop for an array
    for(var i = 0; i < bookMarks.length; i++){
        var name = bookMarks[i].name,
            URL = bookMarks[i].URL;
        
        bookMarkResults.innerHTML += '<div class="row">' +
                                        '<div class="card bg-light col-sm-12">' +
                                            '<div class="card-body">' +
                                                '<h3 class="card-title float-left">' + name + '</h3>' +
                                                '<div class="links float-right">'+
                                                    '<a class="btn btn-success" href="'+ URL +'" target="_blank">VISIT</a>' +
                                                    '<a onclick="deleteBookMark(\''+URL+'\')" class="btn btn-danger" href="javascript:void(0)">DELETE</a>' +
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'
    };

};

// validate the form
function validateForm(siteName, siteUrl) {

    if (!siteName || !siteUrl) {
        alert('please fill site name and site URL');
        return false;
    }

    // validate URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('please use a valid URL');
        return false;
    }   

    return true;
}