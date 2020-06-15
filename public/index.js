const f1 = document.querySelector('form')
const id = document.querySelector('#id')
const name = document.querySelector('#name')
const age = document.querySelector('#age')
const pno = document.querySelector('#pno')
const del_id = document.querySelector('#del_id')
const message = document.querySelector('#message')
const updatebtn = document.querySelector('#update')
const subbtn = document.querySelector('#sub')
const dltbtn = document.querySelector('#dltbtn')
const rdbtn = document.querySelector('#rdbtn')
const table_data = document.querySelector('#table_data')

subbtn.addEventListener('click' , (e) => {
    
    e.preventDefault()

    if(id.value == '' || name.value == '' || age.value == '' || pno.value == '')
            return message.textContent = "All fields are mandatory !"

            fetch('/create' , {
                method : "POST" , 
        
                body : JSON.stringify({ id : id.value , name : name.value , age : age.value , pno : pno.value }) , 
        
                headers : {
                    "Content-type" : "application/json; charset=UTF-8" 
                }
            }).then((res) => {
                res.json().then((data) => {
                    if(data.exist === true)
                        return message.textContent = " This Id already exists !"
                })
                return message.textContent = "Data Stored Successfully !"
            })
    
    id.value = ''
    name.value = ''
    age.value = ''
    pno.value = ''
})


updatebtn.addEventListener('click' , (e) => {

    e.preventDefault()

    if(id.value == '')
        return message.textContent = "Id field is mandatory !"


    fetch('/update' , {
        method: "PATCH" ,

        body: JSON.stringify({ id : id.value , name : name.value, age : age.value, pno : pno.value }) ,

        headers : {
            "Content-type" : "application/json; charset=UTF-8"
        }
    }).then((res) => {
        console.log(res)
        res.json().then((data) => {
            if(data.exist === false)
                return message.textContent = " User not found check details !"
        })
        message.textContent = "Data Updated successfullly !"
    }).catch((e) => {
        console.log(e)
        message.textContent = "Error updating data !"
    })

    id.value = ''
    name.value = ''
    age.value = ''
    pno.value = ''
})

dltbtn.addEventListener('click' , (e) => {

    e.preventDefault()

    if(del_id.value == '')
        return message.textContent = "Id field is mandatory to delete!"

    fetch('/delete' , {

        method : 'DELETE' ,

        body : JSON.stringify({ id : del_id.value }) ,

        headers : {
            "Content-type" : "application/json; charset=UTF-8"
        }
    }).then( (res) => {
        console.log(res)
        res.json().then((data) => {
            if(data.exist === false)
                return message.textContent = "User not found check details"
        })
        return message.textContent = "Data has been successfully deleted !"
    }).catch( (error) => {
        console.log(error)
        return message.textContent = "Error deleting data !"
    })

    del_id.value = ''
})

rdbtn.addEventListener('click' , (e) => {

    e.preventDefault()

    var table = "<table><th>ID</th><th>NAME</th><th>AGE</th><th>PNO</th>"

    fetch('/read').then( (res) => {
        res.json().then( (data) => {
            
            var result = []
            for(var i in data){
                result.push(data[i])
            }
            console.log(result)
            result.forEach( user => { table = table + "<tr><td>" + user.Id + "</td><td>" + user.Name + "</td><td>" + user.Age + "</td><td>" + user.pno + "</td></tr>" })
            table = table + "</table>"
            table_data.innerHTML = table
        })
    })
})

