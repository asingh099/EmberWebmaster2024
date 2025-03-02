window.addEventListener('scroll', () => {
    const title = document.querySelector('.name');
    const scrollY = window.scrollY; 
    const fadePoint = 250; 
    let opacity = 1 - scrollY / fadePoint;
    opacity = Math.max(opacity, 0);
    title.style.opacity = opacity;
});

window.addEventListener('scroll', () => {
    const title = document.querySelector('.undername');
    const scrollY = window.scrollY; 
    const fadePoint = 250; 
    let opacity = 1 - scrollY / fadePoint;
    opacity = Math.max(opacity, 0);
    title.style.opacity = opacity;
});