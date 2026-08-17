const links=[...document.querySelectorAll(".nav a")];
const sections=[...document.querySelectorAll("main section[id]")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-40% 0px -50% 0px"});
sections.forEach(section=>observer.observe(section));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const target=document.querySelector(a.getAttribute("href"));
  if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"});}
}));
