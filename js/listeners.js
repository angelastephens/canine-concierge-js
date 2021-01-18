document.addEventListener("click", (e) => {
    let target = e.target
    if(target.matches("#myDoggos")) {
       Dog.get_dogs()
    } else if(target.matches("#addDog")) {
        Modal.populate({title: "Add New Dog", content: "New Dog"})
        Modal.toggle()    
    }
    else if(target.matches(".modal-close") || target.matches(".modal-overlay")) {
        e.preventDefault();
        Modal.toggle();
        document.getElementById("newDog").reset()
      } 
})

    
 

document.addEventListener("DOMContentLoaded", (e) => {
    //console.log()
    Dog.get_dogs().then(() => ServiceRequest.get_service_requests())
    Modal.init();
    
})

document.addEventListener("submit", (e) => {
    let target = e.target
    if(target.matches("#newService")) {
        e.preventDefault()
    ServiceRequest.post_service_requests()
    }  if(target.matches("#newDog")) {     
        Dog.create()
    }
})


document.addEventListener('keydown', function(evt) {
  evt = evt || window.event
  var isEscape = false
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc")
  } else {
    isEscape = (evt.keyCode === 27)
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
    Modal.toggle()
    document.getElementById("newDog").reset()
  }
});
