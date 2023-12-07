

async function Showdata() {
    try {

        const response = await axios.get('http://localhost:3000/expences')
        //generate some id
        let idCode = "ET"
        let idNum = 202300
        let html = ''
        response.data.forEach((element, index) => {
            html += "<tr>"
            html += `<td>${idCode}${++idNum}</td>`
            html += `<td>${element.price}</td>`
            html += `<td>${element.category}</td>`
            html += `<td>${element.description}</td>`
            // console.log(`${element._id}`)
            html += `<td><button onclick="EditExpence('${element.id}')" class="btn btn-warning"> Edit </button></td>`
            html += `<td><button onclick=DeleteExpence('${element.id}') class="btn btn-danger"> X </button></td>`
            html += "</tr>"
        });
        document.querySelector('#crudTable tbody').innerHTML = html
    } catch (error) {
        console.log(error)
    }
}
// load date when refresh
document.onload = Showdata()


function AddExpence() {
    let btn = document.getElementById('AddBtn')
    btn.addEventListener('click', async function Add() {
        try {
            let Expence = document.querySelector('#Price').value
            let Cateagory = document.querySelector('select').value
            let Desc = document.querySelector('#desc').value

            const obj = {
                Expence,
                Cateagory,
                Desc
            }
            await axios.post('http://localhost:3000/add-expence', obj)
            document.querySelector('#Price').value = ""
            document.querySelector('#desc').value = ""
            Showdata()

        } catch (error) {
            console.log(error)
        }
    })
}
AddExpence()

async function EditExpence(id) {
    try {
        //add bitton will hide and update button display
        document.getElementById('UpdateBtn').style.display = 'block'
        document.getElementById('AddBtn').style.display = 'none'
        const response = await axios.get(`http://localhost:3000/edit-expence/${id}`)
        console.log(response)
        document.querySelector('#Price').value = response.data.price
        document.querySelector('select').value = response.data.category
        document.querySelector('#desc').value = response.data.description
    } catch (error) {
        console.log(err)
    }
    try {
        //here we are using put method because patch method is showing error , and our web is working very fine with put method
        document.getElementById('UpdateBtn').onclick = async () => {
            await axios.put(`http://localhost:3000/update-expence/${id}`, {
                Expence: document.querySelector('#Price').value,
                Cateagory: document.querySelector('select').value,
                Desc: document.querySelector('#desc').value
            })
            Showdata()
            //add bitton will hide and update button display
            document.querySelector('#Price').value = ''
            document.querySelector('#desc').value = ''
            document.getElementById('UpdateBtn').style.display = 'none'
            document.getElementById('AddBtn').style.display = 'block'

        }

    } catch (error) {
        console.log(error)
    }
}



async function DeleteExpence(id) {
    try {
        await axios.delete(`http://localhost:3000/delete/${id}`)
        Showdata()
    } catch (error) {
        console.log(error)
    }
}

async function addUser() {

    try {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        let obj = {
            name: name,
            email: email,
            password: password
        }
        const data = await axios.post('http://localhost:3000/user', obj)
        console.log(data)
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${data.data.message}</h2>`
        setTimeout(() => {
            window.location.href = "login.html";
            msg.innerHTML = ''
        }, 2000)
    } catch (error) {
        console.log(error)
        let msg = document.getElementById('msg')
        console.log(error)
        msg.innerHTML = `<h2>${error.response.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)

    }
}

async function loginUser() {
    try {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        let obj = {
            name: name,
            email: email,
            password: password
        }
        let data = await axios.post('http://localhost:3000/user-login', obj)

        console.log(data.data.message)
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${data.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
            window.location.href = 'index.html'
        }, 2000)
    }
    catch (error) {
        console.log(error.response.data.message)
        let msg = document.getElementById('msg')
        msg.innerHTML = `<h2>${error.response.data.message}</h2>`
        setTimeout(() => {
            msg.innerHTML = ''
        }, 2000)
    }


}
