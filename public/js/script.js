const update = document.querySelector('#update-button');

update.addEventListener('click',_=>{
    fetch('/signin', {
        method : 'put',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({
            email : 'new@gmail.com',
            password : 'newPass'

        })
    }) .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        console.log(response)
      })
});

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', _=>{
    fetch('/signin', {
        method : 'delete',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({
            email : 'new@gmail.com',
        })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        window.location.reload()
    })
    
})
