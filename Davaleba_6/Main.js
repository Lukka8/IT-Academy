const Url = "https://jsonplaceholder.typicode.com/posts/"

fetch(Url, {
    method: "GET",
}).then(Response => {
    Response.json().then(JSON => {
        console.log(JSON);
    })
})