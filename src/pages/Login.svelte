<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };
</script>

<div>
  {#if $user$}
    <div>{$user$?.displayName}</div>
  {/if}
  <div>로그인하기</div>
  <button class="login-btn" on:click={loginWithGoogle}>
    <img
      id="google-img"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
      alt=""
    />
    <div>Google로 시작하기</div>
  </button>
</div>

<style>
  .login-btn {
    width: 180px;
    height: 35px;
    display: flex;
    border: 1px solid gray;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  #google-img {
    width: 20px;
  }
</style>
