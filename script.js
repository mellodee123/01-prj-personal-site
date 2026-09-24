const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!prefersReducedMotion && !isTouchDevice) {
  const cursorGlow = document.querySelector('.cursor-glow');
  const cursorTrail = document.querySelector('.cursor-trail');

  if (cursorGlow && cursorTrail) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const setCursorPosition = (x, y) => {
      cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
      cursorTrail.style.transform = `translate(${x}px, ${y}px)`;
    };

    const createSparkle = (x, y) => {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty('--size', `${(Math.random() * 7 + 6).toFixed(2)}px`);
      sparkle.style.setProperty('--angle', `${Math.random() * 360}deg`);
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 850);
    };

    document.addEventListener('pointermove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      setCursorPosition(mouseX, mouseY);

      if (Math.random() > 0.2) {
        createSparkle(mouseX + (Math.random() * 20 - 10), mouseY + (Math.random() * 20 - 10));
      }
    });

    document.addEventListener('pointerdown', (event) => {
      const burstX = event.clientX;
      const burstY = event.clientY;

      for (let i = 0; i < 6; i += 1) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle sparkle-burst';
        sparkle.style.left = `${burstX}px`;
        sparkle.style.top = `${burstY}px`;
        sparkle.style.setProperty('--size', `${(Math.random() * 8 + 6).toFixed(2)}px`);
        sparkle.style.setProperty('--offset-x', `${(Math.random() - 0.5) * 26}px`);
        sparkle.style.setProperty('--offset-y', `${(Math.random() - 0.5) * 26}px`);
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 900);
      }
    });

    setCursorPosition(mouseX, mouseY);
  }
}
