function createProgressCircle(
  id,
  options = { animate: false, hide: false, controls: false }
) {
  const container = document.getElementById(id);
  if (!container) return console.error('Progress container not found');

  container.classList.add('progress');

  const progress = document.createElement('div');
  progress.classList.add('progress-bar');
  // progress.classList.add('ratate-bar');
  container.appendChild(progress);

  const controller = document.createElement('div');
  controller.classList.add('progress-controls');
  container.appendChild(controller);

  progress.style.display = options.hide ? 'none' : 'flex';

  const input = document.createElement('input');
  input.type = 'number';
  input.min = 0;
  input.max = 100;
  input.value = 0;

  // Хранит текущее значение 
  let currentValue = 0;
  //   Глобальное состояние интервала
  let interval;
  let isIntervalStart = false;

  // создаём элементы управления
  const toggleAnimate = document.createElement('input');
  toggleAnimate.type = 'checkbox';
  toggleAnimate.checked = options.animate;

  const toggleHide = document.createElement('input');
  toggleHide.type = 'checkbox';
  toggleHide.checked = options.hide;

  const labelValue = document.createElement('label');
  labelValue.textContent = 'Value';
  const labelAnimate = document.createElement('label');
  labelAnimate.textContent = 'Animate';
  const labelHide = document.createElement('label');
  labelHide.textContent = 'Hide';

  controller.appendChild(input);
  controller.appendChild(labelValue);
  controller.appendChild(toggleAnimate);
  controller.appendChild(labelAnimate);
  controller.appendChild(toggleHide);
  controller.appendChild(labelHide);

  // событие на изменение значения
  input.addEventListener('input', () => {
    let value = parseInt(input.value);
    if (value > 100) {
      value = 100;
    } else if (value < 0) {
      value = 0;
    }
    input.value = value;
    // const animate = toggleAnimate.checked;
    if (isIntervalStart) clearInterval(interval);
    animateProgress(progress, value);
  });

  // let currentAngle =0;

  toggleAnimate.addEventListener('change', () => {
    if (toggleAnimate.checked) {
      const currentRotation = getComputedStyle(progress).transform;
      progress.style.transform = currentRotation;
      progress.classList.add('ratate-bar');
    } else {
      const currentRotation = getComputedStyle(progress).transform;
      progress.classList.remove('ratate-bar');
      progress.style.transform = currentRotation;
    }
  });

  toggleHide.addEventListener('change', () => {
    progress.style.display = toggleHide.checked ? 'none' : 'flex';
  });

  // Функция для обновления прогресса
  function updateProgress(progress, value) {
    // value = Math.max(0, Math.min(100, value));
    const progressValue = value / 100;
    progress.style.background = `conic-gradient(#005BFE 0% ${
      progressValue * 100
    }%, #eef2f5 ${progressValue * 100}% 100%)`;
  }

  // Функция для анимации прогресса
  function animateProgress(progress, newValue) {
    const step = newValue > currentValue ? 1 : -1;
    if (currentValue === newValue) {
      return;
    }
    // let currentValue = 0;
    isIntervalStart = true;
    interval = setInterval(() => {
      currentValue += step;
      updateProgress(progress, currentValue);
      if (currentValue === newValue || currentValue === 100) {
        isIntervalStart = false;
        clearInterval(interval);
      }
    }, 20);
  }

  // Устанавливаем значение прогресса
  function setValue(value) {
    input.value = value;
    if (toggleAnimate.checked) {
      animateProgress(progress, value);
    } else {
      updateProgress(progress, value);
    }
  }

  return { setValue };
}
