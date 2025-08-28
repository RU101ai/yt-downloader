function downloadVideo() {
  const url = document.getElementById('videoUrl').value;
  const status = document.getElementById('status');

  if (!url) {
    status.textContent = '❌ Please enter a valid URL.';
    return;
  }

  status.textContent = '⏳ Sending request...';

  fetch('/download', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  })
  .then(res => res.blob())
  .then(blob => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'video.mp4';
    link.click();
    status.textContent = '✅ Download started!';
  })
  .catch(err => {
    status.textContent = '❌ Error downloading video.';
    console.error(err);
  });
}