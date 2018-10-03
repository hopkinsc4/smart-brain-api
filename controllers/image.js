const Clarifai = require('clarifai');

// For Clarify
const app = new Clarifai.App({ apiKey: 'b1a733ba88bb423c85896932c954a630' });
const handleApiCall = (req, res) => {
    // Clarifai API submition
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input) // API call is made with the input image url
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}



const handleImageSubmit = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch (err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImageSubmit: handleImageSubmit,
    handleApiCall: handleApiCall
}