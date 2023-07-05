<script>
  let hour = new Date().getHours().toString().padStart(2, "0");
  let min = new Date().getMinutes().toString().padStart(2, "0");
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
  <a class="wrBtn" href="#/write">글쓰기</a>
</main>

<footer>
  <div class="nav-bar">
    <div class="footer-icons">
      <img src="assets/svg/home.svg" alt="" />
      <span class="footer-icon__text">홈</span>
    </div>
    <div class="footer-icons">
      <img src="assets/svg/document.svg" alt="" />
      <span class="footer-icon__text">동네현황</span>
    </div>
    <div class="footer-icons">
      <img src="assets/svg/map-pin.svg" alt="" />
      <span class="footer-icon__text">내 위치</span>
    </div>
    <div class="footer-icons">
      <a id="footer-chat" href="./chat.html">
        <img src="assets/svg/chat.svg" alt="" />
        <span class="footer-icon__text">대화 목록</span>
      </a>
    </div>
    <div class="footer-icons">
      <img src="assets/svg/user.svg" alt="" />
      <span class="footer-icon__text">내 정보</span>
    </div>
  </div>
</footer>
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
</style>
