function Showdata() {
    //generate some id
    let idCode = "ET"
    let idNum = 202300

    axios.get('http://localhost:3000/expences')
        .then((response) => {
            console.log(response)
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
        })
        .catch(err => console.log(err))
}
// load date when refresh
document.onload = Showdata()


function AddExpence() {
    let btn = document.getElementById('AddBtn')
    btn.addEventListener('click', function Add() {
        let Expence = document.querySelector('#Price').value
        let Cateagory = document.querySelector('select').value
        let Desc = document.querySelector('#desc').value

        const obj = {
            Expence,
            Cateagory,
            Desc
        }
        axios.post('http://localhost:3000/add-expence', obj)
            .then(() => {
            document.querySelector('#Price').value=""
            document.querySelector('#desc').value=""
            Showdata()
            })
            .catch(err => console.log(err))

    })
}
AddExpence()

function EditExpence(id) {
    //add bitton will hide and update button display
    document.getElementById('UpdateBtn').style.display = 'block'
    document.getElementById('AddBtn').style.display = 'none'
    axios.get(`http://localhost:3000/edit-expence/${id}`)
        .then((response) => {
            console.log(response)
            document.querySelector('#Price').value = response.data.price
            document.querySelector('select').value = response.data.category
            document.querySelector('#desc').value = response.data.description
        })
        .catch(err => console.log(err))

    //here we are using put method because patch method is showing error , and our web is working very fine with put method
    document.getElementById('UpdateBtn').onclick = () => {
        axios.put(`http://localhost:3000/update-expence/${id}`,{
            Expence:document.querySelector('#Price').value,
            Cateagory:document.querySelector('select').value,
            Desc:document.querySelector('#desc').value
        })
        .then((response)=>{
          Showdata()
        //  console.log(response)
        })
        .catch(err=>console.log(err))

        //add bitton will hide and update button display
        document.getElementById('UpdateBtn').style.display = 'none'
        document.getElementById('AddBtn').style.display = 'block'
    }

}



function DeleteExpence(id) {
    // console.log(id)
    axios.delete(`http://localhost:3000/delete/${id}`)
        .then(() => {
            console.log('deleted succesfully')
            Showdata()
        })
        .catch(err => console.log(err))
}

