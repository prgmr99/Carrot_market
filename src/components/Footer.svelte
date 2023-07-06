<script>
  export let location;
  const movetoHome = () => {
    window.location.hash = "/";
  };
</script>

<footer>
  <div class="nav-bar">
    <button class="footer-icons" on:click={movetoHome}>
      {#if location === "home"}
        <img src="assets/svg/home2.svg" alt="" />
      {:else}
        <img src="assets/svg/home.svg" alt="" />
      {/if}
      <span class="footer-icon__text">홈</span>
    </button>
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
