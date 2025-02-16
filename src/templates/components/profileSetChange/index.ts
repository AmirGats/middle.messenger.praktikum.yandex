import './profileSetChange.css';
import '../modalContainer/modalContainer.css'
export { default as profileSetChange } from './profileSetChange.hbs?raw';

document.addEventListener('DOMContentLoaded', ()=>{
    const modalBtnImg = document.getElementById("modalBtnImg");
    modalBtnImg?.addEventListener("click", () => {
        document.querySelector(".modal")?.classList.toggle('active');
    });
})
