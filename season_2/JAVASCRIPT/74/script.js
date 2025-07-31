let button = document.getElementById('myButton');


button.addEventListener('click', ()=> {
    document.querySelector(".box").innerHTML = 'Button Clicked!';
    // alert('Button was clicked!');
});

button.addEventListener('contextmenu', ()=> {
    // document.querySelector(".box").innerHTML = 'Button Clicked!';
    alert('Dont right click me!')
});

document.addEventListener('keydown', (e)=> {
    console.log(e , e.key,e.keyCode);
    if (e.key === 'Enter') {
        document.querySelector(".box").innerHTML = 'Enter Key Pressed!';
    }
    if (e.key === 'Escape') {
        document.querySelector(".box").innerHTML = 'Escape Key Pressed!';
    }
    if (e.key === 'ArrowUp') {
        document.querySelector(".box").innerHTML = 'Arrow Up Key Pressed!';
    }
    if (e.key === 'ArrowDown') {
        document.querySelector(".box").innerHTML = 'Arrow Down Key Pressed!';
    }
    if (e.key === 'ArrowLeft') {
        document.querySelector(".box").innerHTML = 'Arrow Left Key Pressed!';
    }
    
})