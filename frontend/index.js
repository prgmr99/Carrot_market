const calcTime = (timestamp) => {
  // 한국시간으로 받음
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  if (h > 0) return `${h}시간 전`;
  else if (m > 0) return `${m}분 전`;
  else if (s >= 0) return `${s}초 전`;
  else return "퇴근 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data.reverse().forEach(async (obj) => {
    const mainItemDiv = document.createElement("div");
    mainItemDiv.className = "main-items";

    const imgDiv = document.createElement("div");
    imgDiv.className = "main-items__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    img.src = url;

    const mainItemInfoDiv = document.createElement("div");
    mainItemInfoDiv.className = "main-items__info";

    const mainItemInfoTitleDiv = document.createElement("div");
    mainItemInfoTitleDiv.className = "main-items__info-title";
    mainItemInfoTitleDiv.innerText = obj.title;

    const mainItemInfoMetaDiv = document.createElement("div");
    mainItemInfoMetaDiv.className = "main-items__info-meta";
    mainItemInfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const mainItemInfoPriceDiv = document.createElement("div");
    mainItemInfoPriceDiv.className = "main-items__info-price";
    mainItemInfoPriceDiv.innerText = obj.price;

    imgDiv.appendChild(img);
    mainItemInfoDiv.appendChild(mainItemInfoTitleDiv);
    mainItemInfoDiv.appendChild(mainItemInfoMetaDiv);
    mainItemInfoDiv.appendChild(mainItemInfoPriceDiv);
    mainItemDiv.appendChild(imgDiv);
    mainItemDiv.appendChild(mainItemInfoDiv);
    main.appendChild(mainItemDiv);
  });
};

// server로부터 데이터 받아오기
const fetchList = async () => {
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    alert("로그인이 필요합니다.");
    window.location.pathname = "/login.html";
    return;
  }
  const json = await res.json();
  renderData(json);
  console.log(json);
};

const handleChat = () => {
  window.location.pathname = "/chat.html";
};

fetchList();
