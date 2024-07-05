var requestUrl = "https://randomuser.me/api/?results=5";

fetch(requestUrl)
.then(function(response){
    return response.json();
})
.then(function (data) {
    console.log(data);
});