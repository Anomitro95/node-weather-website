console.log('client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//             console.log(data)
//     })

// })

// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//             if(data.errorMessage) { 
//                 console.log(data.errorMessage)
//             }else{
//             console.log(data.location)
//             console.log(data.forecast)
//             }
//     })    
 
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

//messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const location = search.value

        messageOne.textContent='Loading...'
        //messageTwo.textContent=''

        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
            if(data.error) { 
                messageOne.textContent=data.error
                //messageOne.textContent=''
            }else{
                messageOne.textContent='The temperature for the location ' + data.location + ' is : ' + data.forecast.temperature + ' but feels like : ' + data.forecast.feelslike
            }
    })    

})

})