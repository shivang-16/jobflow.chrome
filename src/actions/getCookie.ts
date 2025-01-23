export default function getTokenFromBackground() {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ action: 'getToken' }, (response) => {
        if (response && response.token) {
          resolve(response.token);
        } else {
          reject(response.error || 'Token not found.');
        }
      });
    });
  }