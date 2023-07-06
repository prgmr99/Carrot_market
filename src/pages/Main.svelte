<script>
  import { onMount } from "svelte";
  import Footer from "../components/Footer.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";

  let hour = new Date().getHours().toString().padStart(2, "0");
  let min = new Date().getMinutes().toString().padStart(2, "0");

  $: items = [];

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  onMount(() => {
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
      console.log(data);
    });
  });
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
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/svg/chart-bar.svg" alt="chart-bar" />
      <img src="assets/svg/wifi.svg" alt="wifi" />
      <img src="assets/svg/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <img src="assets/svg/arrow-down.svg" alt="arrow-down" />
    </div>
    <div class="menu-bar__icons">
      <img src="assets/svg/glass.svg" alt="glass" />
      <img src="assets/svg/bar.svg" alt="bar" />
      <img src="assets/svg/bell.svg" alt="bell" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="main-items">
      <div class="main-items__img">
        <img src={item.imgUrl} alt={item.title} />
      </div>
      <div class="main-items__info">
        <div class="main-items__info-title">{item.title}</div>
        <div class="main-items__info-price">{item.price}</div>
        <div class="main-items__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="wrBtn" href="#/write">글쓰기</a>
</main>

<Footer location="home" />
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
</style>
