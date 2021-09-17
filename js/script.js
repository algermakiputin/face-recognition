const video = document.getElementById('video')
const base_url = 'https://7thgrocery.com/payroll/' ;
const token = 123123;
const employees = [
    {
        "id": 5,
        "created_at": "2021-04-09T03:43:42.000000Z",
        "updated_at": "2021-06-20T11:57:24.000000Z",
        "name": "PHOEBE CAZAR",
        "position": "SUPERVISOR",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09068609908",
        "status": "MARRIED TO JOSEPH",
        "timein": ""
    },
    {
        "id": 6,
        "created_at": "2021-04-09T03:46:41.000000Z",
        "updated_at": "2021-04-09T03:46:41.000000Z",
        "name": "JOSEPH OMAY",
        "position": "CASHIER",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09061741687",
        "status": "MARRIED TO PHOEBE",
        "timein": ""
    },
    {
        "id": 7,
        "created_at": "2021-04-09T03:50:01.000000Z",
        "updated_at": "2021-04-10T16:29:53.000000Z",
        "name": "ELDEN TORRES",
        "position": "CASHIER",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09513885428",
        "status": "SINGLE",
        "timein": ""
    },
    {
        "id": 8,
        "created_at": "2021-04-09T03:53:20.000000Z",
        "updated_at": "2021-04-09T03:53:20.000000Z",
        "name": "EMMANUEL TORRES",
        "position": "SUB",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09760030203",
        "status": "SINGLE",
        "timein": ""
    },
    {
        "id": 9,
        "created_at": "2021-04-09T03:54:40.000000Z",
        "updated_at": "2021-04-09T03:54:40.000000Z",
        "name": "NORHANIE AKBAR",
        "position": "SUB",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09366780563",
        "status": "MARRIED",
        "timein": ""
    },
    {
        "id": 10,
        "created_at": "2021-04-09T03:55:44.000000Z",
        "updated_at": "2021-04-09T03:57:55.000000Z",
        "name": "JOHANIE TALIB",
        "position": "B2 CASHIER",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09121437901",
        "status": "MARRIED",
        "timein": ""
    },
    {
        "id": 11,
        "created_at": "2021-04-09T03:57:36.000000Z",
        "updated_at": "2021-04-09T03:57:36.000000Z",
        "name": "BULKEA SULAIMAN",
        "position": "B2 SUB",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09354987345",
        "status": "MARRIED",
        "timein": ""
    },
    {
        "id": 14,
        "created_at": "2021-04-09T04:12:49.000000Z",
        "updated_at": "2021-04-09T04:12:49.000000Z",
        "name": "IVAN JADE LAUSA",
        "position": "TRAINEE",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09353803966",
        "status": "SINGLE",
        "timein": ""
    },
    {
        "id": 17,
        "created_at": "2021-04-11T02:15:51.000000Z",
        "updated_at": "2021-04-11T02:16:04.000000Z",
        "name": "RODOLF CREENCIA",
        "position": "SUB",
        "ratePerHour": "20",
        "address": "PIKIT",
        "contact": "09518121361",
        "status": "SINGLE",
        "timein": ""
    },
    {
        "id": 23,
        "created_at": "2021-07-29T12:08:52.000000Z",
        "updated_at": "2021-07-29T12:08:52.000000Z",
        "name": "FERNAND DINAMPO",
        "position": "LECHONAN",
        "ratePerHour": "30",
        "address": "PIKIT",
        "contact": "NA",
        "status": "MARRIED",
        "timein": ""
    },
    {
        "id": 24,
        "created_at": "2021-08-10T08:19:09.000000Z",
        "updated_at": "2021-08-10T08:19:09.000000Z",
        "name": "test employee",
        "position": "test",
        "ratePerHour": "20",
        "address": "test",
        "contact": "test",
        "status": "test",
        "timein": ""
    },
    {
        "id": 25,
        "created_at": "2021-08-15T11:47:35.000000Z",
        "updated_at": "2021-08-18T01:21:35.000000Z",
        "name": "SHIELA DINAMPO TORRES",
        "position": "STAFF",
        "ratePerHour": "15",
        "address": "PIKIT",
        "contact": "NA",
        "status": "MARRIED TO ELDEN",
        "timein": ""
    },
    {
        "id": 30,
        "created_at": "2021-09-12T05:56:16.000000Z",
        "updated_at": "2021-09-12T05:56:16.000000Z",
        "name": "alger",
        "position": "12039",
        "ratePerHour": "12093091",
        "address": "1239",
        "contact": "12093",
        "status": "1231",
        "timein": "08:55:54 AM"
    }
];
var recorded = false;
var type = "";
console.log(employees);
// loadFingerprint();
timeType();
 
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri( '/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri( '/models') //heavier/accurate version of tiny face detector
]).then(start)

function start() { 
    recognizeFaces()
    startVideo();
}

 

function getHours() {

    var currentdate = new Date(); 
    var hour = currentdate.getHours();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var minutes = currentdate.getMinutes();
    var seconds = currentdate.getSeconds();
 
    return sprintf(hour) + ":" + sprintf(minutes) + ":" + sprintf(seconds)  + ' ' + ampm; 

}
function sprintf(val) {
    if (parseInt(val) <= 9) 
        return '0' + val;
    return val;
}
function submitTimeForm(employee_id) {
    
    // var currentdate = new Date(); 
    // var date = currentdate.getFullYear() + '-' + this.sprintf(currentdate.getMonth() + 1) + '-' + this.sprintf(currentdate.getDate());
    // var time = getHours(); 

    // $.ajax({
    //     method: "POST",
    //     url: base_url + '/api/attendance/store',
    //     data: {
    //         _token: token,
    //         id: employee_id,
    //         date: date,
    //         time: time,
    //         type: type
    //     },
    //     success: function(data) {
    //         alert("Attendance saved successfully");
    //     },
    //     error: function() {
    //         alert("Opps something went wrong please try again later");
    //     }
    // });

}

async function recognizeFaces() {
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
   
    video.addEventListener('play', async(event) => {
        console.log("playing");  
        const canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        
        // Create Canvas for displaying info later
        const displaySize = {width: video.width, height: video.height};
        faceapi.matchDimensions(canvas, displaySize);

        //Detect faces in the video
        
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)
        
    });
} 
function loadLabeledImages() {
    const labels = ['Alger Makiputin','Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
 
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=2; i++) {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/algermakiputin/face-recognition/main/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                descriptions.push(detections.descriptor)
            }
            document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function loadFingerprint() {
 
  // Initialize the agent at application startup.
    const fingerprint = document.getElementsByName('fingerprint')[0].getAttribute('content');

    if (!fingerprint) {

        const password = window.prompt("Enter password to save browser fingerprint");
        
        if (password == "alger123") {

            const fpPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.onload = resolve
                script.onerror = () => reject('Failed to load the script')
                script.async = true
                script.src = 'https://cdn.jsdelivr.net/npm/'
                + '@fingerprintjs/fingerprintjs@3/dist/fp.min.js'
                document.head.appendChild(script)
            })
            .then(() => FingerprintJS.load()) 
            // Get the visitor identifier when you need it.
            fpPromise
            .then(fp => fp.get())
            .then(result => {
            // This is the visitor identifier:
                const visitorId = result.visitorId
                $.ajax({
                    method:"POST",
                    url: base_url + '/updateFingerprint',
                    data: {
                        fingerprint: visitorId,
                        _token: token
                    },
                    success: function(data) {
                        alert("Fingerprint saved successfully");
                    }
                })
            })
            .catch(error => console.error(error))
        }
        
    }
 
}

function timeType() {

    // $("#timein").click(function() {
    //     type = "in";
    //     $("#menu").hide();
    //     $("#faceid").show();
    //     recorded = false;
    //     startVideo();
        
    // });

    // $("#timeout").click(function() {
    //     type = "out";
    //     $("#menu").hide();
    //     $("#faceid").show();
    //     recorded = false;
    //     startVideo();
    // })

}

function startVideo() {
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)
    ) 
}