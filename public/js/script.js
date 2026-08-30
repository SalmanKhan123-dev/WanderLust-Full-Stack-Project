 //Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
// Auto-hide navbar on scroll down, show on scroll up
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.transform = 'translateY(0)';
    return;
  }

  if (currentScroll > lastScroll) {
    // scrolling down
    navbar.style.transform = 'translateY(-100%)';
  } else {
    // scrolling up
    navbar.style.transform = 'translateY(0)';
  }

  lastScroll = currentScroll;
});
