(() => {
  const root = document.documentElement;
  const min = 16;
  const max = 26;
  const initial = 18;
  const storedSize = Number(localStorage.getItem('acesso-font-size'));
  const storedContrast = localStorage.getItem('acesso-high-contrast') === 'true';

  function setSize(size) {
    const bounded = Math.min(max, Math.max(min, size));
    root.style.fontSize = `${bounded}px`;
    localStorage.setItem('acesso-font-size', String(bounded));
  }

  if (storedSize >= min && storedSize <= max) setSize(storedSize);
  const contrastButton = document.querySelector('[data-contrast]');
  function setContrast(enabled) {
    document.body.classList.toggle('contrast', enabled);
    contrastButton.setAttribute('aria-pressed', String(enabled));
    localStorage.setItem('acesso-high-contrast', String(enabled));
  }
  setContrast(storedContrast);

  document.querySelectorAll('[data-font]').forEach((button) => {
    button.addEventListener('click', () => {
      const current = parseFloat(getComputedStyle(root).fontSize) || initial;
      const action = button.dataset.font;
      setSize(action === 'increase' ? current + 2 : action === 'decrease' ? current - 2 : initial);
    });
  });
  contrastButton.addEventListener('click', () => {
    setContrast(contrastButton.getAttribute('aria-pressed') !== 'true');
  });
})();
