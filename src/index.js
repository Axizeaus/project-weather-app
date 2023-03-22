import './style.css'

console.log('hello from the other side.')

let div = document.createElement('div')
div.innerHTML = 'hello there';
document.body.append(div);