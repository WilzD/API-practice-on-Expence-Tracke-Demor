function Showdata() {
    //generate some id
    let idCode="ET"
    let idNum=202300

    axios.get('https://crudcrud.com/api/299e03d80a7644918ab109ee57abc43f/ApiExpencetracker')
    .then((response)=>{
        // console.log(response.data)
        let html=''
        let id=''
        response.data.forEach((element,index) => {
        console.log(`${element.Expence}`)
        html += "<tr>"
        html += `<td>${idCode}${++idNum}</td>`
        html += `<td>${element.Expence}</td>`
        html += `<td>${element.Cateagory}</td>`
        html += `<td>${element.Desc}</td>`
        // console.log(`${element._id}`)
        html += `<td><button onclick="EditExpence('${element._id}')" class="btn btn-warning"> Edit </button></td>`
        html +=`<td><button onclick=DeleteExpence('${element._id}') class="btn btn-danger"> X </button></td>`
        html += "</tr>"
        });
        document.querySelector('#crudTable tbody').innerHTML = html
    })
    .catch(err=>console.log(err))
}
// load date when refresh
document.onload = Showdata()


function AddExpence() {
    let btn = document.getElementById('AddBtn')
    btn.addEventListener('click', function Add() {
        let Expence = document.querySelector('#Price').value
        let Cateagory = document.querySelector('select').value
        let Desc = document.querySelector('#desc').value
        
        const obj={
            Expence,
            Cateagory,
            Desc
        }
      axios.post('https://crudcrud.com/api/299e03d80a7644918ab109ee57abc43f/ApiExpencetracker',obj)
      .then(()=>{
        document.onload=Showdata()
    })
      .catch(err=>console.log(err))

    })
}
AddExpence()

function EditExpence(index){
       //add bitton will hide and update button display
       document.getElementById('UpdateBtn').style.display='block'
       document.getElementById('AddBtn').style.display='none'
       let expencelist

       if (localStorage.getItem('expencelist') == null) {
           expencelist = []
       }
       else {
           expencelist = JSON.parse(localStorage.getItem('expencelist'))
       }
       document.querySelector('#Price').value=expencelist[index].Expence
       document.querySelector('select').value=expencelist[index].Cateagory
       document.querySelector('#desc').value=expencelist[index].Desc

        document.getElementById('UpdateBtn').onclick=function (){
        expencelist[index].Expence= document.querySelector('#Price').value
        expencelist[index].Cateagory=document.querySelector('select').value
        expencelist[index].Desc=document.querySelector('#desc').value

        
       document.querySelector('#desc').value=""
       document.querySelector('select').value=""
       document.querySelector('#Price').value=""

        document.getElementById('UpdateBtn').style.display='none'
        document.getElementById('AddBtn').style.display='block'

        localStorage.setItem('expencelist',JSON.stringify(expencelist))
        Showdata()
       }
}



function DeleteExpence(id) {
    // console.log(id)
    axios.delete(`https://crudcrud.com/api/299e03d80a7644918ab109ee57abc43f/ApiExpencetracker/${id}`)
    .then(()=>{
        console.log('deleted succesfully')
        document.onload=Showdata()
    })
    .catch(err=>console.log(err))
}

