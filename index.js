const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const genres = [{
    id: 1,
    name: "Romance"
},
{
    id: 2,
    name: "Thriller"
},
{
    id: 3,
    name: "Comedy"
}
]

app.post('/api/genres', (req, res) =>{
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.data[0].message); 

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genres);
});

app.get('/api/genres', (req, res) =>{
return res.send(genres);
});

app.get('/api/genres/:id', (req, res) =>{

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    return res.send(genre);
    });
    

app.put('/api/genres/:id', (req, res)=> {
    
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.deta[0].message); 

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    
    if (!genre) return res.status(404).send('Genre not found');
    
    genre.name = req.body.name;

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('Genre not found');

    const genreIndex = genres.indexOf(genre);

    genres.splice(genreIndex, 1);

    res.send(genres);
});


function validateGenre(genre)
{
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);

}

let newPort = process.env.port || 3000;
app.listen(newPort, ()=> {console.log(`listen at port ${newPort}`)});