const cv = require('opencv4nodejs');
const path = require('path');
const fs = require('fs');


const getDataset = datasetPath => fs.readdirSync(datasetPath)
    .map((image) => cv.imread(path.resolve(datasetPath, image)).bgrToGray().resize(80, 80))

const runPrediction = (recognizer, images) => {
  images.forEach((img) => {
    const result = recognizer.predict(img);
    console.log(result);
  });
};


const t34images = getDataset('./dataset/t34');
const at1images = getDataset('./dataset/at1');

const allImages = [...t34images, ...at1images];

const eigen = new cv.EigenFaceRecognizer();
eigen.train(allImages, [0,0,0,0,1,1,1,1]);

const testImages = getDataset('./testDataset/t34');

runPrediction(eigen, testImages)
