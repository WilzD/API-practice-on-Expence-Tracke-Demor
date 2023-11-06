function Showdata() {
    //generate some id
    let idCode = "ET"
    let idNum = 202300

    axios.get('https://crudcrud.com/api/51c1634a2c4c42f5b2bedfaaba1fdda6/ApiExpencetracker')
        .then((response) => {
            // console.log(response.data)
            let html = ''
            let id = ''
            response.data.forEach((element, index) => {
                console.log(`${element.Expence}`)
                html += "<tr>"
                html += `<td>${idCode}${++idNum}</td>`
                html += `<td>${element.Expence}</td>`
                html += `<td>${element.Cateagory}</td>`
                html += `<td>${element.Desc}</td>`
                // console.log(`${element._id}`)
                html += `<td><button onclick="EditExpence('${element._id}')" class="btn btn-warning"> Edit </button></td>`
                html += `<td><button onclick=DeleteExpence('${element._id}') class="btn btn-danger"> X </button></td>`
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
        axios.post('https://crudcrud.com/api/51c1634a2c4c42f5b2bedfaaba1fdda6/ApiExpencetracker', obj)
            .then(() => {
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
    axios.get(`https://crudcrud.com/api/51c1634a2c4c42f5b2bedfaaba1fdda6/ApiExpencetracker/${id}`)
        .then((response) => {
            console.log(response)
            document.querySelector('#Price').value = response.data.Expence
            document.querySelector('select').value = response.data.Cateagory
            document.querySelector('#desc').value = response.data.Desc
        })
        .catch(err => console.log(err))

    //here we are using put method because patch method is showing error , and our web is working very fine with put method
    document.getElementById('UpdateBtn').onclick = () => {
        axios.put(`https://crudcrud.com/api/51c1634a2c4c42f5b2bedfaaba1fdda6/ApiExpencetracker/${id}`,{
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
    axios.delete(`https://crudcrud.com/api/51c1634a2c4c42f5b2bedfaaba1fdda6/ApiExpencetracker/${id}`)
        .then(() => {
            console.log('deleted succesfully')
            Showdata()
        })
        .catch(err => console.log(err))
}

