const video = document.getElementById('video')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('http://localhost:8000/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('http://localhost:8000/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('http://localhost:8000/models') //heavier/accurate version of tiny face detector
]).then(start)

function start() {
    document.body.append('Models Loaded')
    
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    
    // video.src = '../videos/speech.mp4' 
    recognizeFaces()
}

async function recognizeFaces() {
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

    video.addEventListener('play', async() => {
        console.log("playing");
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        
        // Create Canvas for displaying info later
        const displaySize = {width: video.width, height: video.height};
        faceapi.matchDimensions(canvas, displaySize);

        //Detect faces in the video
        setInterval(async() => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);

            const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
            
            results.forEach((result, i) => {
              
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            });
        },100);
    });
}

function loadLabeledImages() {
    const labels = ['Black Widow', 'Captain America', 'Alger Makiputin', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/algermakiputin/face-recognition/main/labeled_images/${label}/${i}.jpg`)
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
          descriptions.push(detections.descriptor)
        }
  
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
  }