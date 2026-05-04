const express = require("express");
const app = express();

app.use(express.json());



let livros = [];
let proximoId = 1;



// GET (listar livros)
app.get("/livros", (req, res) => {
    const { genero } = req.query;

    if (genero) {
        const filtrados = livros.filter(l => l.genero === genero);
        return res.json(friltrados);
    }

    res.json(livros);
})

// POST (criar livro)
app.post("/livros", (req, res) => {
    const {titulo, autor, ano, genero} = req.body;

    if (!titulo || !autor || !ano || !genero) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const novoLivro = {
        id: proximoId++,
        titulo,
        autor,
        ano,
        genero
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});



app.get("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const livro = livros.find(l => l.id === id);

    if(!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    res.json(livro);
});



app.put("/livros/:id", (req, res) => {
    const id = Number(req.params.id);
    const {titulo, autor, ano, genero} = req.body;

    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    livros[index] = {
        id,
        titulo,
        autor,
        ano,
        genero
    };

    res.json(livros[index]);
})


app.patch("/livros/:id", (req, res) => {
    const id = Number(req.params.id);
    const { titulo, autor, ano, genero } = req.body

    const livro = livros.find(l => l.id === id);


    if (!livro) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    if (titulo !== undefined) livro.titulo = titulo;
    if (autor !== undefined) livro.autor = autor;
    if (ano !== undefined) livro.ano = ano;
    if (genero !== undefined) livro.genero = genero;

    res.json(livro);
})


app.delete("/livros/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado" });
    }

    livros.splice(index, 1);

    res.sendStatus(204);
})



const PORT = 3000;

// servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});