
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import {useContext} from 'react'; 

//import webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import { InsertInvitation } from '@material-ui/icons';
import {useState,useEffect} from 'react';
import {PredectionsContext} from './SmartGroceryProject/LandingPage/components/Contexts/PredectionsContext';
  export default function Webcamtrial1(){
    const { predectionname, setPredectionName } = useContext(PredectionsContext);
const[modelpredection_result,setModelPredectionResult]=useState('');

    const URL = "https://teachablemachine.withgoogle.com/models/NQjNf69lg/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
      
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
      //  window.document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
           // labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        var array_predictions=[];
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
           // labelContainer.childNodes[i].innerHTML = classPrediction;
            const l1=prediction[i].className;
            const l2 = prediction[i].probability.toFixed(2);
            //const jsontoadd={i:l2};
            array_predictions.push({name:l1,value:l2});
          //  setModelPredectionResult(classPrediction);
            
        }
       //now array_predections need to be sorted to get the hightest probabilty to our state and check if its
       //above our threshold or not;

       array_predictions.sort(function(a,b){
        return a.value - b.value;

        }
    );
array_predictions.reverse();


        console.log("array ss holding prdections is",(array_predictions));
       // setPredectionName(array_predictions);
        console.log('predections context',array_predictions[0].name);
        setModelPredectionResult(array_predictions[0].name);
    }

    useEffect(() => {
      // init();
      }, []);
      
function getstarted(){
    init();
}




      return (<div>

<Button

            fullWidth
            variant="contained"
            color="primary"

            onClick={getstarted}
          >
            Start predecting
          </Button>


      </div>);
  }
    // window.document.body.removeChild(document.getElementById('webcam-container'));