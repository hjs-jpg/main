document.getElementById("signupForm").addEventListener("submit", function(event){
    event.preventDefault(); //입력없는 제출 방지
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const userInfo ={
        username: username,
        email: email,
        password: password
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    alert('회원가입이 완료되었습니다.');
    window.location.href='6.loginPage.html';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 로그인 폼에서 입력된 값 가져오기
    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;

    // 로컬 스토리지에서 저장된 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);

        // 입력한 이름과 비밀번호가 저장된 값과 일치하는지 확인
        if (userInfo.username === loginUsername && userInfo.password === loginPassword) {
            alert('로그인 성공!');
        } else {
            alert('이름 또는 비밀번호가 잘못되었습니다.');
        }
    } else {
        alert('회원가입 먼저 해주세요.');
    }
});