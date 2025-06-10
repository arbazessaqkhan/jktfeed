// Security utilities for the website
export function initializeSecurity() {
  // Disable text selection globally
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  
  // Disable drag and drop
  document.addEventListener('dragstart', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());
  
  // Disable image saving
  document.addEventListener('contextmenu', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
  
  // Disable print screen and other shortcuts
  document.addEventListener('keydown', (e) => {
    // F12, Ctrl+Shift+I, Ctrl+U, etc.
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u') ||
        e.key === 'PrintScreen') {
      e.preventDefault();
      return false;
    }
  });
  
  // Disable console access detection
  let devtools = false;
  const threshold = 160;
  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools) {
        devtools = true;
        console.clear();
        console.log('%cAccess Denied', 'color: red; font-size: 50px; font-weight: bold;');
      }
    } else {
      devtools = false;
    }
  }, 500);
}

// Hide admin routes from URL discovery
export function isAdminRoute(path: string): boolean {
  return path.includes('/admin') && !path.includes('/admin/login');
}