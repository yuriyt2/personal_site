console.log("app.js")

window.onload = function(){
    var contactLink = document.getElementsByClassName('contact')[0];
    var contactList = document.getElementsByClassName('contact-links')[0];
    var projectsLink = document.getElementsByClassName('projects')[0];
    var projectsList = document.getElementsByClassName('projects-list')[0];
    var content = document.getElementsByClassName('content')[0];
    contactLink.addEventListener('click',function(e){
      e.preventDefault();
      content.classList.remove('move')
      projectsList.style.display = 'none';
      contactList.style.display = 'block';
      contactList.style.animation = 'backcolor 3000ms forwards';
    });
    projectsLink.addEventListener('click',function(e){
      e.preventDefault();
      content.classList.add('move')
      contactList.style.display = 'none';
      projectsList.style.display = 'block';
      projectsList.style.animation = 'backcolor 3000ms forwards';
      content.style.transfomationDelay = '2s'
    })
}
