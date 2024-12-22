document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 서버로 데이터 전송
    fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("회원 가입이 완료되었습니다!");
                window.location.href = "6.loginPage.html";
            } else {
                alert("회원 가입 실패: " + data.message);
            }
        })
        .catch((error) => {
            console.error("회원 가입 오류:", error);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
        });
});

//브라우저에서 다른 도메인(예: http://localhost:3000)으로 요청을 보내면
//  CORS(Cross-Origin Resource Sharing) 문제가 발생할 수 있습니다.
//  이를 해결하기 위해 서버에 CORS 미들웨어를 추가했습니다. 
// 무슨 소리지;

const cors = require("cors");
app.use(cors());
/**cmd에서
 *  npm install --save mysql2
 */
//데이터 베이스 연결 
// MySQL: 관계형 데이터베이스로 사용자 정보를 테이블 형태로 저장.
// MongoDB: NoSQL 데이터베이스로 JSON 형태로 데이터를 저장.
const mysql = require("mysql2");

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "signup_db",
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) throw err;
    console.log("MySQL 연결 성공!");
});

// 회원 가입 엔드포인트 수정
app.post("/api/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: "모든 필드를 입력하세요." });
    }

    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "서버 오류 발생." });
        }
        res.status(201).json({ success: true, message: "회원 가입 성공!" });
    });
});
//전체 통합 요약-----------
// 서버 설정

// Node.js와 Express로 서버 생성.
// CORS와 body-parser 설정.
// MySQL 등 데이터베이스 연동.
// API 엔드포인트

// POST /api/signup: 회원 정보를 서버로 전송.
// 클라이언트

// fetch를 사용해 서버로 데이터 전송.
// 응답에 따라 성공 또는 실패 처리.

// 추가 구현-----------
// **JWT (JSON Web Token)**를 사용해 인증 시스템 추가.
// 비밀번호 암호화: bcrypt 라이브러리를 사용.
// 회원 가입 데이터 유효성 검증 강화.