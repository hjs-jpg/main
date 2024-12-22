function gotoLoginPage() {
    window.location.href ="6.loginPage.html";
}

document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault(); //입력없는 제출 방지
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username ===""||password ===""){
        alert("입력이 안되었습니다. 입력해주세요");
        return;
    }
    console.log("로그인 정보:", {username, password});
    alert("로그인 성공!");
    window.location.href="1.onlineSellPage.html";//로그인 완료 후 첫 페이지로 이동
});
