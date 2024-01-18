const containerVideos = document.querySelector(".videos__container");

async function buscar_mostrar_videos() {
    try {
        const busca_api = await fetch("http://localhost:3000/videos");
        const videos = await busca_api.json();

        videos.forEach(video => {
            if(video.categoria == ""){
                throw new Error('Video não tem categoria');
            }
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt= "Logo do Canal">
                    <h3 class = "titulo-video"> ${video.titulo}</h3>
                    <p class ="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p>
                </div>
            </li>   
            `
        })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscar_mostrar_videos();

const searchBar = document.querySelector(".pesquisar__input");

searchBar.addEventListener("input", filtrarPesquisa);

async function filtrarPesquisa(){
    const videos = await document.querySelectorAll(".videos__item")
    if(searchBar.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            let valorFiltro = searchBar.value.toLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            }else{
                video.style.display = "block";
            }
        }
    }else{
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item")

botaoCategoria.forEach((botao)=>{
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click",()=> filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item")
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro)&& valorFiltro != 'tudo'){
            video.style.display = "none";
        }else{
            video.style.display = "block";
        }
    }
}
