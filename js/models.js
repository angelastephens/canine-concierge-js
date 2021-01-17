class Dog{
    constructor(attributes){
       let whitelist = ["id","name", "age", "sex"] 
       whitelist.forEach(attr =>this[attr] = attributes[attr])
       //Dog.collection().push(this)
    }

    static get_dogs(){
        if (Dog.dogs){
            return 
        }
       return fetch("http://localhost:3000/dogs")
       .then(response => {
           if(response.ok){
               return response.json()
           } else {
               return response.text().then(error => Promise.reject(error))
           }
       })
       .then(dogObjects => {
           this.dogs = dogObjects.map(dogAttributes => new Dog(dogAttributes))
           let dogs = this.dogs.map(dog => dog.display())
           this.dogs.map(dog => dog.displayOptions())
           return this.dogs
           
       })


    }

    //static collection(){
        //return this.collection ||=[]
        
    //}

    static findById(id){
        return Dog.dogs.find(dog => dog.id == id)
    }

    display(){
        this.title = document.createElement("p")
        this.title.textContent = this.name
        this.title.id = this.id
        document.getElementById("myDoggos").appendChild(this.title)

    }

    displayOptions(){
        this.option ||= document.createElement("option")
        this.option.value = this.id
        this.option.id = this.id
        this.option.textContent = this.name
        document.getElementById("dog_choices").appendChild(this.option)

    }

    static create(formData) {
        return fetch("http://localhost:3000/dogs", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({dog: formData})
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }   else {
                    return res.text().then(error => Promise.reject(error)) 
                }
            })
            .then(dogAttributes => {
                let dog = new Dog(dogAttributes);
                this.get_dogs.push(dog);
                this.collection().appendChild(dog.display());
                new FlashMessage({type: 'WoofWoof!', message: "New pup added successfully"})
                return dog;
            }) 
            .catch(error => {
                new FlashMessage({type: 'error', message: error});
            })
    }

    
}

class ServiceRequest{
    constructor(attributes){
        let whitelist = ["id", "dog_id","service_type", "pick_up_location", "pick_up_time"] 
        whitelist.forEach(attr =>this[attr] = attributes[attr])
     }
     static get_service_requests(){
         
        return fetch("http://localhost:3000/service_requests", {
            headers:{
                "Accept": "application/json",
                 "Content-Type": "application/json"

            }
            
        })
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                return response.text().then(error => Promise.reject(error))
            }
           
        })
        .then(serviceRequestObjects => {
           
            this.collection = serviceRequestObjects.map(attrs => new ServiceRequest(attrs))
            let servicerequests = this.collection.map(request => request.display())
            return this.collection
        //how does this work in my browser
        })
       
    }

    display(){
        this.title = document.createElement("p")
        this.title.innerHTML= `
            <hr>
            <p> <strong> Name: </strong> ${Dog.findById(this.dog_id).name}</p> 
            <p> Service Type: ${this.service_type}</p> 
            <p> Pick up date and time:${this.pick_up_time}</p> 
            <p> Pick up location: ${this.pick_up_location}</p> 
            <hr> `
        document.getElementById("serviceContainer").appendChild(this.title)

    }
    
    

    static post_service_requests(){
        return fetch("http://localhost:3000/service_requests", {
            method: "Post",
            headers:{
                "Accept": "application/json",
                 "Content-Type": "application/json"

            },
            body: JSON.stringify({
                "dog_id": document.getElementById("dog_choices").value,
                "service_type": document.getElementById("service").value,
                "pick_up_time": document.getElementById("pick_up_time").value,
                "pick_up_location": document.getElementById("pick_up_location").value


            })
        })
            
           
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    return response.text().then(error => Promise.reject(error))
                }
            })
            .then(serviceRequestObjects => {
                let servicerequest = new ServiceRequest(serviceRequestObjects)
                this.collection.push(servicerequest)
                servicerequest.display()

            })
        
        }

    
       

}

class Modal {
    static init() {
      this.body ||= document.body;
      this.modal ||= document.querySelector('.modal');
      this.title ||= document.querySelector('#modal-title');
      this.content ||= document.querySelector('#modal-content');
    }
  
    static populate({title, content}) {
      this.title.innerText = title;
      this.content.innerHTML = ""; 
      this.content.append(content);
    }
  
    static toggle() {
      this.modal.classList.toggle('opacity-0');
      this.modal.classList.toggle('pointer-events-none');
      this.body.classList.toggle('modal-active');
    }
}
