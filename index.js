const images = document.querySelectorAll('.img-container');

images.forEach(img => {
  img.addEventListener('click', () => {
    const textEl = img.nextElementSibling;
    
    if (textEl && textEl.classList.contains('scrl-text')) {
      
      // Remove 'show' from any other open .scrl-text
      document.querySelectorAll('.scrl-text.show').forEach(otherText => {
        if (otherText !== textEl) {
          otherText.classList.remove('show');
        }
      });

      // Toggle 'show' on the clicked one
      textEl.classList.toggle('show');
    }
  });
});

