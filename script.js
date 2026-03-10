const button = document.getElementById('uploadBtn');
const canvas = document.getElementById('riveCanvas');

const riveFile = new rive.Rive({
  src: './rocket-ship-animation.riv',
  canvas: canvas,
  autoplay: true,
  stateMachines: 'State Machine 1',
  fit: rive.Fit.contain,
  onLoad: () => {
    riveFile.resizeDrawingSurfaceToCanvas();

    const inputs = riveFile.stateMachineInputs('State Machine 1');
    const trigger = inputs.find((input) => input.name === 'Trigger 2');

    if (!trigger) {
      button.textContent = 'Trigger not found';
      return;
    }

    button.addEventListener('click', () => {
      trigger.fire();
    });
  },
  onStateChange: (event) => {
    const state = event?.data?.[0];
    if (!state) return;

    if (state === 'Fireup' || state === 'Flying') {
      button.textContent = 'Uploading...';
      button.style.background = 'rgba(255,255,255,.6)';
      document.body.style.background = '#8cbdff';
    }

    if (state === 'Firedown') {
      button.textContent = 'Finished!';

      setTimeout(() => {
        button.textContent = 'Upload File';
        button.style.background = 'white';
        document.body.style.background = 'rgb(0, 110, 255)';
      }, 1000);
    }
  },
});

window.addEventListener('resize', () => {
  riveFile.resizeDrawingSurfaceToCanvas();
});
