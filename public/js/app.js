
const weatherForm = document.querySelector('form');
const serach = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = serach.value;
    console.log(location)

    msg1.textContent = 'Loading..';
    msg2.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data)=> {
        if(data.error){
            console.log(data.error);
            msg1.textContent = '';
            msg2.textContent = data.error;
        } else {
            console.log(data.address);
            console.log(data.latitude);
            console.log(data.loc);

            msg1.textContent = data.address + '<br/>' + data.latitude   + '<br/>' + data.loc ;
            msg2.textContent ='';
        }     
    });
});
})