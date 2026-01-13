//     Задание  1
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const youtubeInp = document.querySelector(".youtubeInp");
const youtubeBtn = document.querySelector(".youtubeBtn");
const youtubeForm = document.querySelector(".youtubeForm");

youtubeBtn.addEventListener('click', () => {
  const text = youtubeInp.value.trim()
  searchVideo(text)
})

youtubeForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const text = youtubeInp.value.trim()
  searchVideo(text)
})

function searchVideo(text){
  fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB5nX8yZf5VQi0g7V7FWwpJ6YSrOTK8b10&q=${text}&type=video`)
    .then(response => response.json())
    .then(data => {
      const items = data.items

      setVideo(items[0].id.videoId)
      footer.innerHTML = ''

      for (let i = 0; i < 5; i++) {
        const img = document.createElement('img')
        img.src = items[i].snippet.thumbnails.default.url

        img.addEventListener('click', () => {
          setVideo(items[i].id.videoId)
        });

        footer.append(img)
      }
  });
}

function setVideo(videoId){
      main.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
};

//     Задание  2
const users = document.querySelector(".users");
const usersText = document.querySelector(".usersText");
const getUsers = async () => {
  usersText.innerText = ''
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok){
      usersText.innerText = "Ошибка"
    }
    const data = await response.json();

    for(let i = 0; i < data.length; i++){
      usersText.innerText += `${data[i].name}  |  ${data[i].email}
      `
    }

    } catch (error){
      usersText.innerText = "Ошибка: " + error
  }
}

getUsers()

//     Задание  3
const githubWrapper = document.querySelector(".github");
const githubInp = document.querySelector(".githubInp");
const githubBtn = document.querySelector(".githubBtn");
const githubText = document.querySelector(".githubText");
const githubInfo = document.querySelector(".githubInfo");
const githubForm = document.querySelector(".githubForm");

githubBtn.addEventListener('click', () => {
  const text = githubInp.value.trim()
  getGithubUser(text)
})

githubForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
})

const getGithubUser = async (userName) => {
  githubText.innerText = ''
  try{
    const response = await fetch(`https://api.github.com/users/${userName}`);
    if(!response.ok){
      githubText.innerText = "Пользователь не найден"
      githubInfo.innerHTML = ``
    }
    else{
      const data = await response.json();
      let avatarUrl = data.avatar_url;
      let creationDate = data.created_at;
      let repos = data.public_repos;
      let url = data.html_url;

      githubText.innerText = ``
      githubInfo.innerHTML = `
      <div class="mainInfo">
        <img src="${avatarUrl}" alt="">
        <h3>${userName}</h3>
      </div>
      <p class="link">Ссылка - <a href="${url}">${url.slice(8)}</a></p>
      <p>Дата регистрации - ${creationDate}</p>
      <p>Кол-во репозиториев - ${repos}</p>`
    }

    } catch (error){
      githubText.innerText = "Ошибка: " + error
      githubInfo.innerHTML = ``
  }
}