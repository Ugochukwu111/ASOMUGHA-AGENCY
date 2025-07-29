const radius = 54;
  const circumference = 2 * Math.PI * radius;

  document.querySelectorAll('.progress-container').forEach(container => {
    const val = parseInt(container.dataset.value);
    const suffix = container.dataset.suffix || '%';
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

    setTimeout(updateProgress, 300);
  });