async function getUser(){
  try{
    const res = await axios.get('/users');
    const users = res.data;
    const list = document.getElementById('list');
    const modified = document.getElementById('modified');
    modified.innerHTML = '';
    list.innerHTML = '';
    console.log(res);

    Object.keys(users).map( (key) => {
      const userDiv = document.createElement('div');
      const modifiedDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];
      const edit = document.createElement('button');
      const nameInput = document.createElement('input')
      nameInput.placeholder = '바꿀 이름을 입력하세요!';
      edit.className = 'edit'
      edit.textContent = '수정';
      edit.addEventListener('click',  () => {
        const send = document.createElement('button');
        send.className = `send-${key}`;
        send.textContent = '입력';
        nameInput.className = `input`;
        modifiedDiv.appendChild(nameInput)
        modifiedDiv.appendChild(send);
        modified.appendChild(modifiedDiv);

        send.addEventListener('click', async (e) => {
          e.preventDefault();
          const name = nameInput.value;
          // console.log(name);          
          if (!name) {
            return alert('이름을 반드시 입력해야 합니다.');
          }
          try {
            await axios.put(`/user/${key}`, { name });
            getUser();
          } catch (err) {
            console.error(err);
          }

        })
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => {
        try {
          await axios.delete(`/user/${key}`);
          getUser();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err){
    console.error(err);
  }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
// form submit
document.getElementById('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert('이름을 입력하세요')
  }
  try {
    await axios.post('/user', { name });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = '';
})