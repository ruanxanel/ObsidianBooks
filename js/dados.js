const livros = [
    {
        "id": 1,
        "titulo": "Haunting Adeline",
        "autor": "H. D. Carlton",
        "genero": "Dark Romance",
        "imagem": "assets/images/haunting.webp",
        "gratuito": false,
        "destaque": true,
        "linkCompra": "https://www.amazon.com.br/Haunting-Adeline-H-D-Carlton/dp/1957635002",
        "linkGratuito": null
    },
    {
        "id": 2,
        "titulo": "Icebreaker",
        "autor": "Hannah Grace",
        "genero": "Romance contemporâneo",
        "imagem": "assets/images/Icebreak.webp",
        "gratuito": false,
        "destaque": true,
        "linkCompra": "https://www.amazon.com.br/Icebreaker-Hannah-Grace/dp/1398525685",
        "linkGratuito": null
    },
    {
        "id": 3,
        "titulo": "Carmilla",
        "autor": "Sheridan Le Fanu",
        "genero": "Romance Gótico",
        "imagem": "assets/images/carmilla.webp",
        "gratuito": true,
        "destaque": true,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/10007/pg10007-images.html"
    },
    {
        "id": 4,
        "titulo": "Corrupt",
        "autor": "Penelope Douglas",
        "genero": "Dark Romance",
        "imagem": "assets/images/corrupt.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com.br/Corrupt-Devils-Night-Livro-1-ebook/dp/B087D796ND",
        "linkGratuito": null
    },
    {
        "id": 5,
        "titulo": "The Ritual",
        "autor": "Shantel Tessier",
        "genero": "Dark Romance",
        "imagem": "assets/images/ritual.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com/Ritual-Shantel-Tessier/dp/B0C44DVSQV",
        "linkGratuito": null
    },
    {
        "id": 6,
        "titulo": "God of Malice",
        "autor": "Rina Kent",
        "genero": "Dark Romance",
        "imagem": "assets/images/malice.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com/God-Malice-College-Romance-Legacy-ebook/dp/B09Z9K12P2",
        "linkGratuito": null
    },
    {
        "id": 7,
        "titulo": "Does It Hurt?",
        "autor": "H. D. Carlton",
        "genero": "Dark Romance",
        "imagem": "assets/images/does.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com.br/Does-Hurt-H-D-Carlton/dp/1957635037",
        "linkGratuito": null
    },
    {
        "id": 8,
        "titulo": "O Morro dos Ventos Uivantes",
        "autor": "Emily Brontë",
        "genero": "Romance Gótico",
        "imagem": "assets/images/morro.webp",
        "gratuito": true,
        "destaque": true,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/768/pg768-images.html"
    },
    {
        "id": 9,
        "titulo": "O Fantasma da Ópera",
        "autor": "Gaston Leroux",
        "genero": "Romance Gótico",
        "imagem": "assets/images/phantom.webp",
        "gratuito": true,
        "destaque": false,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/175/pg175-images.html"
    },
    {
        "id": 10,
        "titulo": "Jane Eyre",
        "autor": "Charlotte Brontë",
        "genero": "Romance Gótico",
        "imagem": "assets/images/jane.webp",
        "gratuito": true,
        "destaque": false,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/1260/pg1260-images.html"
    },
    {
        "id": 11,
        "titulo": "O Retrato de Dorian Gray",
        "autor": "Oscar Wilde",
        "genero": "Romance Gótico",
        "imagem": "assets/images/retrato.webp",
        "gratuito": true,
        "destaque": false,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/174/pg174-images.html"
    },
    {
        "id": 12,
        "titulo": "Drácula",
        "autor": "Bram Stoker",
        "genero": "Romance Gótico",
        "imagem": "assets/images/dracula.webp",
        "gratuito": true,
        "destaque": false,
        "linkCompra": null,
        "linkGratuito": "https://www.gutenberg.org/cache/epub/345/pg345-images.html"
    },
    {
        "id": 13,
        "titulo": "Mexican Gothic",
        "autor": "Silvia Moreno-Garcia",
        "genero": "Romance Gótico",
        "imagem": "assets/images/mexican.webp",
        "gratuito": false,
        "destaque": true,
        "linkCompra": "https://www.amazon.com.br/Mexican-Gothic-Silvia-Moreno-Garcia/dp/0525620788",
        "linkGratuito": null
    },
    {
        "id": 14,
        "titulo": "Rebecca",
        "autor": "Daphne du Maurier",
        "genero": "Romance Gótico",
        "imagem": "assets/images/rebecca.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com.br/Rebecca-Daphne-Du-Maurier/dp/0349006571",
        "linkGratuito": null
    },
    {
        "id": 15,
        "titulo": "A Casa no Mar Cerúleo",
        "autor": "T. J. Klune",
        "genero": "Fantasia Contemporânea",
        "imagem": "assets/images/casa.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com.br/casa-no-mar-cer%C3%BAleo-ebook/dp/B0B46KKHF6",
        "linkGratuito": null
    },
    {
        "id": 16,
        "titulo": "Gallant",
        "autor": "V. E. Schwab",
        "genero": "Romance Gótico",
        "imagem": "assets/images/gallant.webp",
        "gratuito": false,
        "destaque": false,
        "linkCompra": "https://www.amazon.com.br/Gallant-V-Schwab/dp/B09FC6C1K8",
        "linkGratuito": null
    }
];