

for (const eachKey in WebKeys) {
    var key=eachKey.toLocaleLowerCase();
    if(key.endsWith('image') && !key.endsWith('backgroundimage')){
        let words = eachKey.split('');
        words = words.slice(0, -5);
        refKey=words.join(''); 
        var ele  = document.getElementById(refKey.toLocaleLowerCase());
        
        ele.innerHTML=`<img alt="${WebKeys[refKey]}" width="${ele.offsetWidth-20}" height="${ele.offsetHeight+30}" src="${WebKeys[eachKey]}"></img>` 
    }
    else if(key.endsWith('backgroundimage')){
        let words = eachKey.split('');
        words = words.slice(0, -15);
        refKey=words.join(''); 
        var ele  = document.getElementById(refKey.toLocaleLowerCase());
        
        //ele.innerHTML=`<img alt="${WebKeys[refKey]}" width="${ele.offsetWidth-20}" height="${ele.offsetHeight+30}" src="${WebKeys[eachKey]}"></img>` 
        ele.style.backgroundImage = `url('${WebKeys[eachKey]}')`;

        ele.style.backgroundSize = 'cover'; // Adjusts how the image fits
        ele.style.backgroundPosition = 'center';
        ele.style.backgroundRepeat = 'no-repeat'; 
        
    }
    else if(key.endsWith('html')){
        let words = eachKey.split('');
        words = words.slice(0, -4);
        refKey=words.join(''); 
        var ele  = document.getElementById(refKey.toLocaleLowerCase());
        
        //ele.innerHTML=`<img alt="${WebKeys[refKey]}" width="${ele.offsetWidth-20}" height="${ele.offsetHeight+30}" src="${WebKeys[eachKey]}"></img>` 
        ele.innerHTML=WebKeys[eachKey]
    }
    else{
        var ele  = document.getElementById(key);
        
        if(ele!=null && ele!=undefined){
            switch (ele.tagName.toLocaleLowerCase()) {
                case 'div':
                    ele.textContent = WebKeys[eachKey]
                    break;
                case 'input':
                    ele.value = WebKeys[eachKey]
                default:
                    ele.textContent = WebKeys[eachKey]
                    break;
            }
        }
    }
    
}

var navElements = document.getElementsByClassName('nav-links')

NavigationItems.forEach(element => {
    navElements[0].innerHTML += `<li><a href="#${element.toLocaleLowerCase()}">${element}</a></li>`;
});

var aboutSectionElements = document.getElementById('aboutsections')

AboutSections.forEach(element => {
    aboutSectionElements.innerHTML = `
        <section class="img-flex" 
        style="background:url('${element.imgUrl}');background-size:contain;background-position: center; background-repeat: no-repeat; ">
        </section>
        <section class="content-flex" id="${element.sectionId}">
            <h2>${element.title}</h2>
            <p>${element.content}</p>
        </section>`;
});


var practiseAreasElements = document.getElementsByClassName('practice-areas')

PractiseAreas.forEach(element => {
    practiseAreasElements[0].innerHTML += `<div class="practice-box" id="${element.sectionId}">
                <h2>${element.title}</h2>
                <p>${element.brief}</p>
                <button onclick="showDetails(this,'${element.sectionId}')">Learn More</button>
            </div>`;
});



// Function to show/hide details and rotate the box when clicked
function showDetails(element,selectedId) {
    const selectedFlex = PractiseAreas.filter(x=>x.sectionId==selectedId)[0];
    if((selectedFlex!=null && selectedFlex!=undefined) && selectedFlex.details!='' && selectedFlex.details!=undefined ){
        var selectedEle = findParentById(element,selectedId)
        selectedEle.innerHTML=`<h5>${selectedFlex.title}</h5><p style="text-align:left;">${selectedFlex.details}</p><button onclick="contactFn()">Contact Us for More</button>`
    }
    
}


function findParentById(element, id) {
    let parent = element.parentElement;
    while (parent) {
        if (parent.id === id) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return null; 
}

function contactFn(){
    window.location.href='#contact'
}


var contactArea = document.getElementById('contact-area');
if(contactArea!=null && contactArea!=undefined){
    contactArea.innerHTML=`
        <table>
         <tbody>
           <tr>
           <th>Phone </th> <td>${WebKeys.phoneNumber}</td>
           </tr>
           <tr>
           <th>Email </th> <td>${WebKeys.email}</td>
           </tr>
           <tr>
           <th>Address </th> <td>${WebKeys.address}</td>
           </tr>
           
         </tbody>
        </table>
        <div style="padding:5px;">${WebKeys.embedMap} </div>
         `
}



// JavaScript to toggle the menu visibility on mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


gapi.load('auth2', () => {
    gapi.auth2.init({
        client_id: '928578840505-e3220cbqsctgcadvjm68r9c5scft8unf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin', // Ensures proper handling of cookies
    }).then(() => {
        console.log("Google API initialized");
    }).catch(error => {
        console.error("Initialization error:", error);
    });
});

