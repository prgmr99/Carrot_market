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
  console.log(data);
  if (res.status === 200) {
    alert("로그인에 성공했습니다!");
  } else if (res.status === 401) {
    alert("ID 혹은 password가 틀렸습니다ㅋ");
  }
};

form.addEventListener("submit", handleSubmit);
