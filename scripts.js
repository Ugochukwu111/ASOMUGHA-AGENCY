const radius = 54;
const circumference = 2 * Math.PI * radius;

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const container = entry.target;
      const val = parseInt(container.dataset.value);
      const suffix = container.querySelector('.text').textContent.includes('+') ? '+' : (container.dataset.suffix || '%');

      const circle = container.querySelector('.circle');
      const text = container.querySelector('.text');

      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;

      let progress = 0;
      const updateProgress = () => {
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        text.textContent = `${progress}${suffix}`;

        if (progress < val) {
          progress++;
          requestAnimationFrame(updateProgress);
        }
      };

      setTimeout(updateProgress, 300); // optional small delay
      statsObserver .unobserve(container); // run once
    }
  });
}, { threshold: 0.3 }); // adjust threshold if needed

document.querySelectorAll('.progress-container').forEach(container => {
  statsObserver .observe(container);
});

const sideBar = document.getElementById('sidebar');
const sideBarBtn = document.getElementById('sidebar-btn');
console.log(sideBar, sideBarBtn)
sideBarBtn.addEventListener('click', ()=>{
 let isSidebarClosed = sideBar.getAttribute('aria-label');
    if (isSidebarClosed == 'sidebar closed'){
          sideBar.classList.add('show');
          isSidebarClosed = sideBar.setAttribute('aria-label', 'sidebar open');
    }else if(isSidebarClosed == 'sidebar open'){
        sideBar.classList.remove('show');
          isSidebarClosed = sideBar.setAttribute('aria-label', 'sidebar closed');
    }
});



const services = document.querySelectorAll('.service');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Delay each item based on its index
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 800); // 200ms delay between items
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, {
      threshold: 0.5, // Adjust to trigger earlier/later
    });

    services.forEach(service => {
      observer.observe(service);
    });
