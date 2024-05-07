const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  butInstall.style.display = 'none';
  deferredPrompt.prompt();
  const choiceResult = await deferredPrompt.userChoice;
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed.', event);
});
