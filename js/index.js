/**
 * 
 * Bind event listeners on load.
 * 
 */

 //Globals
 var ham, nav_list;


// Triggers when the window is loaded.
window.addEventListener('load', function () {

    // Adds hover effect to buttons. 
    var site_name = document.getElementsByClassName('site-name')[0];
    site_name.addEventListener('click', function () {
        window.location.href = "./index.html";
    });

    var navigate = document.getElementsByClassName('navigate');
    for (let i = 0; i < navigate.length; i ++) {
        let nav = navigate[i];
        let param = ['yin', 'yang'];
        // hover effects
        nav.addEventListener('mouseover', function () {
            buttonEffects(nav, param);
        });
        nav.addEventListener('mouseleave', function () {
            buttonEffects(nav, param)
        });
        nav.addEventListener('touchend', function () {
            buttonEffects(nav, param)
        });
        // scroll effects
        addScrollEvent(nav, click, 'data-scroll');
    }

    // Adds scroll capability to each of the navbar links.
    nav_list = document.getElementById('nav-control-list');
    var nav_children = nav_list.children;
    for (let i = 0; i < nav_children.length; i++) {
        let child = nav_children[i];
        addScrollEvent(child, 'click', 'data-scroll', true);
    }

    // Makes hamburger to show and hide nav bar link list.
    ham = document.getElementsByClassName('ham')[0];
    ham.addEventListener('click', function () {
        slideNavList();
    });

    // Adds event for out-of hamburger and on body click event to hide nav list.
    var root = document.getElementsByClassName('root')[0];
    root.addEventListener('click', function (){
        if (nav_list.classList.contains('open')) {
            nav_list.classList.remove('open');
            nav_list.classList.add('close');
            toggleHam();
        }
    });

    // Adds event on the top scroll button.
    var uptop = document.getElementById('top');
    uptop.addEventListener('click', function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    // Scroll effect to contact button.
    var contact = document.getElementById('to-contact');
    addScrollEvent(contact, 'click', 'data-scroll');

});

/***End***/

/*
 * 
 * Function Definitions 
 *
 */

// Toggles nav list visibility.
function slideNavList() {
    toggleHam();
    if (nav_list.classList.contains('close') || nav_list.classList.length == 0) {
        nav_list.classList.remove('close');
        nav_list.classList.add('open');
    }
    else {
        nav_list.classList.remove('open');
        nav_list.classList.add('close');
    }
}

// Toggles hamburger icon images.
function toggleHam () {
    let img = ham.children[0];
    if (img.getAttribute('src') == './img/ham-white.svg') {
        ham.children[0].setAttribute('src', './img/cross-white.svg');
    }
    else {
        ham.children[0].setAttribute('src', './img/ham-white.svg');
    }
}

// Adds effects to button.
function buttonEffects(nav, param) {
    if (nav.classList.contains(param[0])){
            nav.classList.remove(param[0]);
            nav.classList.add(param[1])
        }
    else {
        nav.classList.remove(param[1]);
        nav.classList.add(param[0]);
    }
}

// Adds scroll effects. Call the function below.
function addScrollEvent(element, event, tag_name, slide=false) {
    element.addEventListener(event, function () {
        var tag = element.getAttribute(tag_name);
        scrollToElement(tag);
        if (slide){
            slideNavList();
        }

        if (tag == 'contact') {
            let handle_container = document.getElementsByClassName('handle-container')[0];
            setTimeout(function () {
                handle_container.classList.remove('shadow');
            }, 800);
            handle_container.classList.add('shadow');
        }
    });
}

// A beautiful function for smooth scrolling.
// with adjustable x and y positions.
function scrollToElement(tag) {
    var positionX = 0,         
        positionY = 0;    
    if (tag != 'logo') {
        positionY -= 80;
    }
    let pageElement = document.getElementById(tag);

    while(pageElement != null){       
        positionX += pageElement.offsetLeft;        
        positionY += pageElement.offsetTop;        
        pageElement = pageElement.offsetParent;        
    }

    window.scroll({
        top: positionY,
        left: positionX,
        behavior: 'smooth'
    });
}

// Accepts a tag and move the window in view range.
// Yet unused. Substituted by scrollToElement().
function scrollToView (tag) {
    let scrollTo = document.getElementById(tag);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

/***End***/
