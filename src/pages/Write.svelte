<script>
  import { getDatabase, ref, set, push } from "firebase/database";

  let title;
  let price;
  let description;
  let place;

  function writeUserData(event) {
    const db = getDatabase();
    push(ref(db, "items/"), {
      title, //title: title과 동일
      price,
      description,
      place,
    });
  }
</script>

<form id="write-form" on:submit|preventDefault={writeUserData}>
  <!--<div>
    <label for="image">이미지</label>
    <input type="file" id="image" name="image" />
  </div>-->
  <div>
    <label for="">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>
  <div>
    <label for="">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>
  <div>
    <label for="">설명 </label>
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>
  <div>
    <label for="">장소 </label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>
  <div>
    <button type="submit">글쓰기</button>
  </div>
</form>
