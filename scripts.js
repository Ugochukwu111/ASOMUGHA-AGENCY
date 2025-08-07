
  
 document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('aERXRL1Z_Z7aNsp00');
});
 
 function PopUpContainer(containerElement, open) {
  if (containerElement) {
    if (open === 'show') {
      containerElement.classList.remove('hide');
      containerElement.classList.add('show');
    } else if (open === 'hide') {
      containerElement.classList.remove('show');
      containerElement.classList.add('hide');
    } else {
      console.error('Invalid action. Use "show" or "hide".');
    }
  } else {
    console.error(`Container not found: ${containerElement}`);
  }
}


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

    function createRegisterform(){
      return  `
       <form  id="register-form">

       <button type = "button" class = "close-register-form-btn">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
       </button>
  <!-- Name Input -->
  <label for="name">Name</label>
  <input
    id="name"
    autocomplete="name"
    name="name"
    type="text"
    placeholder="Enter your name"
    required
  />

  <!-- Message Textarea -->
  <label for="message">Message</label>
  <textarea
    id="message"
    name="message"
    placeholder="Enter your message"
    rows="5"
    required
  ></textarea>

      <!-- Subscription Plan (Radio Buttons) -->
      <fieldset>
        <legend>Select a Subscription Plan</legend>

        <label>
          <input type="radio" name="plan" value="standard" checked />
          Standard Package
        </label><br/>

        <label>
          <input type="radio" name="plan" value="premium"  />
          Premium Package
        </label>
      </fieldset>

      <p>
            <a href= "#first-package" class = "see-plan-link">click</a> to see subscription plan details
      </p>

      <!-- Submit Button -->
      <button id="register-submit-btn" type="submit">Submit</button>
</form>
      `
    }


    const popUpContainerEl = document.querySelector('.pop-up-container');
    const registerBtn = document.querySelector('.js-register-btn');
    registerBtn.addEventListener('click', ()=>{
      PopUpContainer(popUpContainerEl, 'show');
      popUpContainerEl.innerHTML = createRegisterform();

      const closeFormBtn = document.querySelector('.close-register-form-btn');
      const registerForm = document.getElementById('register-form');
      const registerBtn = document.getElementById('register-submit-btn');
      const seePlansLink = document.querySelector('.see-plan-link'); 

      closeFormBtn.addEventListener('click',()=>{
             PopUpContainer(popUpContainerEl, 'hide');
              popUpContainerEl.innerHTML = '';
      });

      registerForm.addEventListener('submit', function (e) {
          e.preventDefault();
      
          registerBtn.disabled = true;
          registerBtn.textContent = 'Sending...';
          emailjs.sendForm('service_0xakceu', 'template_g41cb2s', this, 'aERXRL1Z_Z7aNsp00')
              .then(() => {
                registerBtn.disabled = false;
                registerBtn.textContent = 'Message sent!';
                registerBtn.style.backgroundColor = 'green';

                setTimeout(()=>{
                      PopUpContainer(popUpContainerEl, 'hide');
              popUpContainerEl.innerHTML = '';
                }, 1000);
          
            })
                .catch((error) => {
                  registerBtn.disabled = false;
                registerBtn.textContent = 'Message not Sent';
                registerBtn.style.backgroundColor = 'red';

                setTimeout(()=>{
                      PopUpContainer(popUpContainerEl, 'hide');
              popUpContainerEl.innerHTML = '';
                }, 1000);
                });
            });

            seePlansLink.addEventListener('click', ()=>{
              console.log('wait 2 secs')
              setTimeout(()=>{
                       PopUpContainer(popUpContainerEl, 'hide');
              popUpContainerEl.innerHTML = '';
              }, 800);
            });
    });


  
