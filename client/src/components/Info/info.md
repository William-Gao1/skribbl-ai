## Models

There are two models that the user can choose, CNN and LSTM. They are both neural networks trained on the Google Quick, Draw! [dataset](https://quickdraw.withgoogle.com/data).

The format of the raw data (both during training and inference) is:

```
[
  [  // First stroke
    [x0, x1, x2, x3, ...],
    [y0, y1, y2, y3, ...],
    [t0, t1, t2, t3, ...]
  ],
  [  // Second stroke
    [x0, x1, x2, x3, ...],
    [y0, y1, y2, y3, ...],
    [t0, t1, t2, t3, ...]
  ],
  ... // Additional strokes
]
```

After training, the models are compressed and simplified before deployment using [TensorFlow Lite](https://www.tensorflow.org/lite) and inference is run using the TF-Lite [interpreter](https://www.tensorflow.org/lite/guide/inference).

### LSTM:

Work in progress

_The GitHub repository for the LSTM training can be found [here](https://github.com/William-Gao1/skribbl-ai)._

### CNN:

A [Convolutional Neural Network (CNN)](https://en.wikipedia.org/wiki/Convolutional_neural_network) was trained on images in the following way.

    1. Converts strokes to a greyscale image
    2. Normalize image and crop it to its bounding box
    3. Rescale to a 64 x 64 bitmap

The same process happens at inference. The resulting image looks like:

![Crown](crown.png)

The entire process including inference is quite fast, taking an average of 5ms.

_The GitHub repository for the CNN training can be found [here](https://github.com/William-Gao1/skribbl-ai-cnn)._

## Web Application:

The web application was built with a [React.js](https://react.dev/) frontend, a [Node.js](https://nodejs.org/en) backend, and deployed using [Heroku](https://www.heroku.com/). Since Heroku is a paid service, we plan to migrate to [UWaterloo's CS Club's](https://csclub.uwaterloo.ca/resources/services/) free virtual machine services sometime in the Winter 2024 term.

Real-time data is sent to players using [Socket.io](https://socket.io/).

_The GitHub repository for the web application can be found [here](https://github.com/William-Gao1/skribbl-ai)._

## The Authors

[William Gao](https://www.linkedin.com/in/william-gao-459b75171/) and [Charlie Liu](https://www.linkedin.com/in/charlie-liu-a5b585204/) are 4th year Computer Science and Finance students at the University of Waterloo.
