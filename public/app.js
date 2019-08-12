console.log("app.js")

window.onload = function(){
    var contactLink = document.getElementsByClassName('contact')[0];
    var contactList = document.getElementsByClassName('contact-links')[0];
    var projectsLink = document.getElementsByClassName('projects')[0];
    var projectsLink1 = document.getElementsByClassName('projects')[1];
    var projectsLink2 = document.getElementsByClassName('projects')[2];
    var projectsList = document.getElementsByClassName('projects-list')[0];
    var content = document.getElementsByClassName('content')[0];
    var navLinks = document.getElementsByClassName('nav-links')[0];
    contactList.style.display = "none";
    projectsList.style.display = "none";
    function moveNav(activeLink,nonActiveLink,activeList,nonActiveList) {
      activeLink.children[0].style.color = 'white';
      nonActiveLink.children[0].style.color = 'rgba(255, 255, 255, 0.7)';
      content.classList.add('move');
      nonActiveList.style.display = 'none';
      activeList.style.display = 'block';
      activeList.style.animation = 'backcolor 2000ms forwards';
    }
    contactLink.addEventListener('click',function(){
      moveNav(contactLink,projectsLink,contactList,projectsList)
    });
    projectsLink.addEventListener('click',function(){
      moveNav(projectsLink,contactLink,projectsList,contactList)
    });
    projectsLink1.addEventListener('click',function(){
      moveNav(projectsLink,contactLink,projectsList,contactList)
    });
    navLinks.style.animation = "backcolor 2000ms"
    navLinks.style['animation-fill-mode'] = "forwards"
    navLinks.style['animation-delay'] = "500ms"

    document.getElementById("email").children[0].href = "mailto:"+window.location.hostname.split(".")[1]+"@"+"gmail.com"
}
