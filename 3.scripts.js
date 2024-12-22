// 장바구니에 담을 항목들을 관리할 배열
let cart = []; //장바구니 목록
let totalPrice = 0; //총가격
// 장바구니에 상품 추가 함수
function addToCart(productName, productPrice) {
    let productIndex = cart.findIndex(item => item.name === productName);
    // 상품을 장바구니에 추가
    if (productIndex === -1){
        cart.push({ name: productName, price: productPrice, quantity: 1 }); // 이름과 가격(딕셔너리형식으로 추가)
    } else {
        cart[productIndex].quantity++;
    }
    // 장바구니 목록에 추가된 항목을 표시
    updateCartDisplay();
}

// 장바구니 항목과 총 합계를 화면에 업데이트하는 함수
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');//id로 한개 선택

    // 장바구니 항목들 리셋
    cartItemsElement.innerHTML = '';
    totalPrice = 0;//총 가격 초기화

    // 장바구니 항목을 화면에 추가
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} ${item.quantity}개 
            <button onclick="changeQuantity('${item.name}', 'plus')">+</button>
            <button onclick="changeQuantity('${item.name}', 'minus')">-</button>
            (가격: ${item.price.toLocaleString()}원)
        `;
        cartItemsElement.appendChild(li);
        totalPrice += item.price * item.quantity;
    });

    // 총 합계 업데이트
    document.getElementById('total-price').textContent=`총 합계: ${totalPrice.toLocaleString()}원`;
}

function changeQuantity(productName, action) {
    let productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1){
        if (action === 'plus') {
            cart[productIndex].quantity++;
        } else if (action === 'minus'&&cart[productIndex].quantity >1){
            cart[productIndex].quantity--;
        }
        updateCartDisplay();
    }
}

// 결제 페이지로 이동하는 함수
function gotoPaymentPage() {
    if (cart.length === 0) {
        alert('장바구니에 상품이 없습니다. 상품을 담아주세요.');
        return;
    }

    // 결제 페이지로 이동 (가상의 페이지로 이동)
    window.location.href = '4.paymentPage.html';  // 실제 결제 페이지의 URL로 변경 가능

    // 결제 페이지에서 결제 완료 알람을 띄울 준비
    localStorage.setItem('totalPrice', totalPrice);
}
let currentIndex = 0; // 현재 슬라이드 인덱스
const slides = document.querySelectorAll('.slide'); // 모든 슬라이드 요소
const totalSlides = slides.length; // 슬라이드 개수

function showSlide(index) {
    // 모든 슬라이드를 숨김
    slides.forEach(slide => slide.classList.remove('active'));
    
    // 현재 인덱스의 슬라이드만 표시
    slides[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; // 마지막 슬라이드에서 첫 번째로 순환
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // 첫 번째 슬라이드에서 마지막으로 순환
    showSlide(currentIndex);
}

// 초기 슬라이드 표시
window.addEventListener('load', () => {
    showSlide(currentIndex);
});

// 자동 슬라이드 (3초마다)
setInterval(nextSlide, 3000);




//카테고리
document.getElementById("toggle-menu").addEventListener("click", function() {
    var categories = document.getElementById("categories");
    var menuIcon = document.getElementById("menu-icon");

    // 카테고리의 보이기/숨기기
    categories.classList.toggle("show");

    // 이모티콘 변경
    if (categories.classList.contains("show")) {
        menuIcon.textContent = "*"; // 카테고리 표시 시 이모티콘 변경
    } else {
        menuIcon.textContent = "="; // 카테고리 숨길 때 이모티콘 원래대로
    }
});


// 샘플 데이터
// const items = [
//     { id: 'item1', name: '항목 1', description: '첫 번째 항목에 대한 설명입니다.' },
//     { id: 'item2', name: '항목 2', description: '두 번째 항목에 대한 설명입니다.' },
//     { id: 'item3', name: '항목 3', description: '세 번째 항목에 대한 설명입니다.' },
//     { id: 'item4', name: '항목 4', description: '네 번째 항목에 대한 설명입니다.' },
//     { id: 'item5', name: '항목 5', description: '다섯 번째 항목에 대한 설명입니다.' },
//     { id: 'item6', name: '항목 6', description: '여섯 번째 항목에 대한 설명입니다.' },
//     { id: 'item7', name: '항목 7', description: '일곱 번째 항목에 대한 설명입니다.' },
//     { id: 'item8', name: '항목 8', description: '여덟 번째 항목에 대한 설명입니다.' },
//     { id: 'item9', name: '항목 9', description: '아홉 번째 항목에 대한 설명입니다.' },
//     { id: 'item10', name: '항목 10', description: '열 번째 항목에 대한 설명입니다.' },
// ];
// 실제 사용을 위해서는 items 배열의 데이터를 실제 데이터로 교체하시면 됩니다. 
// 또한 필요에 따라 검색 로직이나 표시 방식을 수정하실 수 있습니다.
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const searchResults = document.querySelector('.search-results');

function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                searchResults.style.display = 'none';
                return;
            }

            const results = items.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );

            displayResults(results, searchTerm);
        }

        function displayResults(results, searchTerm) {
            searchResults.style.display = 'block';
            
            if (results.length === 0) {
                searchResults.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
                return;
            }

            const resultsHTML = results.map(item => {
                const highlightedName = highlightText(item.name, searchTerm);
                const highlightedDescription = highlightText(item.description, searchTerm);
                
                return `
                    <div class="result-item">
                        <h3>${highlightedName}</h3>
                        <p>${highlightedDescription}</p>
                    </div>
                `;
            }).join('');

            searchResults.innerHTML = resultsHTML;
        }

        function highlightText(text, searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<span class="highlight">$1</span>');
        }

        // 이벤트 리스너 등록
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 실시간 검색 구현 (옵션)
        searchInput.addEventListener('input', performSearch);