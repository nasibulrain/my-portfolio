// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', ()=>{ 
  header.classList.toggle('scrolled', window.scrollY>50); 
});

// Skills animation
const progressBars = document.querySelectorAll('.progress');
const percents = document.querySelectorAll('.percent');
function animateBars(){
  progressBars.forEach((bar,index)=>{
    const target=parseInt(bar.getAttribute('data-progress'));
    const rect=bar.getBoundingClientRect();
    const inView=rect.top<=window.innerHeight && rect.bottom>=0;
    if(inView && !bar.classList.contains('filled')){
      bar.classList.add('filled');
      bar.style.width=target+"%";
      let count=0;
      const interval=setInterval(()=>{
        if(count>=target){clearInterval(interval);}
        else{count++;percents[index].textContent=count+"%";}
      },20);
    }
  });
}
window.addEventListener('scroll',animateBars);
window.addEventListener('load',animateBars);

// Scroll animation
const sections=document.querySelectorAll('.box,.edu-card');
function showOnScroll(){
  sections.forEach(sec=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<window.innerHeight-60){sec.classList.add('visible');}
  });
}
window.addEventListener('scroll',showOnScroll);
window.addEventListener('load',showOnScroll);

// Hamburger
const hamburger=document.getElementById('hamburger');
const mobileNav=document.querySelector('ul.mobile');
const overlay=document.querySelector('.mobile-overlay');
hamburger.addEventListener('click', ()=>{
  mobileNav.classList.toggle('active');
  overlay.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});
overlay.addEventListener('click', ()=>{
  mobileNav.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('toggle');
});
document.querySelectorAll('ul.mobile a').forEach(link=>{
  link.addEventListener('click', ()=>{
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.classList.remove('toggle');
  });
});

// Smooth scroll & Active link
const navLinks=document.querySelectorAll('.nav-link');
const sectionsArray=Array.from(document.querySelectorAll('section'));
function setActiveLink(){
  let scrollPos=window.scrollY+window.innerHeight/2;
  sectionsArray.forEach(sec=>{
    if(scrollPos>=sec.offsetTop && scrollPos<sec.offsetTop+sec.offsetHeight){
      navLinks.forEach(link=>link.classList.remove('active'));
      document.querySelectorAll(`.nav-link[href="#${sec.id}"]`).forEach(link=>link.classList.add('active'));
    }
  });
}
navLinks.forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Typing effect with subtitle slide-up
const typingEl=document.querySelector('.typing');
const textToType=typingEl.getAttribute('data-text');
let charIndex=0;
function typeEffect(){
  if(charIndex<=textToType.length){
    typingEl.textContent=textToType.substring(0,charIndex);
    charIndex++;
    setTimeout(typeEffect,120);
  }else{
    setTimeout(() => {
      typingEl.style.borderRight='none'; // remove cursor
      document.querySelectorAll('.slide-up').forEach(el=>el.classList.add('visible'));
    },500);
  }
}
typeEffect();
