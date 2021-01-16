document.addEventListener("click", (e) => {
    let target = e.target
    if(target.matches("#myDoggos")) {
       Dog.get_dogs()
    }}
    
) 

document.addEventListener("DOMContentLoaded", (e) => {
    console.log()
    Dog.get_dogs().then(() => ServiceRequest.get_service_requests())
    
})

document.addEventListener("submit", (e) => {
    let target = e.target
    if(target.matches("#newService")) {
        e.preventDefault()
    ServiceRequest.post_service_requests()
    }}
    
) 

