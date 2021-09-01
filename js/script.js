const video = document.getElementById('video')

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('http://localhost:8000/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('http://localhost:8000/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('http://localhost:8000/models') //heavier/accurate version of tiny face detector
]).then(start)

function start() {
    document.body.append('Models Loaded')
    
    // navigator.getUserMedia(
    //     { video:{} },
    //     stream => video.srcObject = stream,
    //     err => console.error(err)
    // )
    
    video.src = '../videos/speech.mp4' 
    recognizeFaces()
}

async function recognizeFaces() {

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


            
        },100);
    });
}

function loadLabeledImages() {
    const labels = ['Black Widow', 'Captain America', 'Hawkeye', 'Iron Man', 'Jim Rhodes', 'Thor'];

    return Promise.all(
        labels.map(async(label) => {
            const descriptions = [];
            for (let i = 1; i <=2; i++) {
                const img = await faceapi.fetchImage(`https://localhost:8000/labeled_images/${label}/${i}.jpg`);
                const detections = await faceapi.detectSingleFaces(img).withFaceLandmarks().withFaceDescriptors();
                descriptions.push(detections.descriptor);
            }

            document.body.append('Faces Loaded');
        })
    );

}