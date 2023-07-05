const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256PW = sha256(formData.get("password"));
  const div = document.querySelector("#info");
  formData.set("password", sha256PW);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);
  alert("로그인되었습니다.");
  window.location.pathname = "/";
  /* const infoDiv = document.querySelector("#info");
  infoDiv.innerText = "로그인되었습니다!"; */

  /*const btn = document.createElement("button");
  btn.innerText = "상품 가져오기";
  btn.addEventListener("click", async () => {
    const res = await fetch("/items", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
  });
  infoDiv.appendChild(btn);*/
};

form.addEventListener("submit", handleSubmit);
