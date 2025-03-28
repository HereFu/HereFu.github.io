document.addEventListener('click', (e) => {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000); // ลบอนุภาคหลัง 1 วินาที
});