const form = document.querySelector("#signup-form");

const checkPassword = () => {
  const formData = new FormData(form);
  const pw1 = formData.get("password");
  const pw2 = formData.get("password2");

  if (pw1 === pw2) return true;
  else return false;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256PW = sha256(formData.get("password"));
  const div = document.querySelector("#info");
  formData.set("password", sha256PW);

  if (checkPassword()) {
    const res = await fetch("/signup", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data === "200") {
      alert("회원 가입에 성공했습니다.");
      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 다릅니다.";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
