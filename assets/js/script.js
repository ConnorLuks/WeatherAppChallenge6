var requestUrl = "https://randomuser.me/api/?results=9";

fetch(requestUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});