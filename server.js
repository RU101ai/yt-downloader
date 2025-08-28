const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.post('/download', (req, res) => {
  const videoURL = req.body.url;
  const outputPath = path.join(__dirname, 'video.mp4');

  if (!videoURL) {
    return res.status(400).send('❌ No URL provided');
  }

  // Delete old file if it exists
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
  }

const command = `yt-dlp -f "bv*[height<=1080]+ba/best" -o "${outputPath}" "${videoURL}"`;


  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ yt-dlp error: ${stderr}`);
      return res.status(500).send('Download failed');
    }

    // Send the downloaded file to the browser
    res.download(outputPath, 'video.mp4', err => {
      if (err) {
        console.error('❌ File send error:', err);
      } else {
        console.log('✅ Download sent to client');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
