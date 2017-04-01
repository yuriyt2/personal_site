console.log("app.js")

window.onload = function(){
    var contactLink = document.getElementsByClassName('contact')[0];
    var contactList = document.getElementsByClassName('contact-links')[0];
    var projectsLink = document.getElementsByClassName('projects')[0];
    var projectsList = document.getElementsByClassName('projects-list')[0];
    var content = document.getElementsByClassName('content')[0];
    contactList.style.display = "none";
    projectsList.style.display = "none";
    contactLink.addEventListener('click',function(e){
      e.preventDefault();
      contactLink.children[0].style.color = 'white';
      projectsLink.children[0].style.color = 'rgba(255, 255, 255, 0.7)';
      content.classList.add('move')
      projectsList.style.display = 'none';
      contactList.style.display = 'block';
      contactList.style.animation = 'backcolor 3000ms forwards';
    });
    projectsLink.addEventListener('click',function(e){
      e.preventDefault();
      projectsLink.children[0].style.color = 'white';
      contactLink.children[0].style.color = 'rgba(255, 255, 255, 0.7)';
      content.classList.add('move');
      contactList.style.display = 'none';
      projectsList.style.display = 'block';
      projectsList.style.animation = 'backcolor 3000ms forwards';
    })
}
