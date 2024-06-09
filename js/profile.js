const host = "http://127.0.0.1:8000";

const guestsContainer = document.getElementById('guest-messages');

function getGuests() {
    axios.get(`${host}/guest`)
    .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data.guest)) {
            renderGuests(response.data.guest.reverse());  // 최신순으로 정렬
        } else {
            console.error('Unexpected response format:', response.data);
        }
    })
    .catch(error => {
        console.error('Error fetching guests: ', error);
    });
}
// 방명록 렌더링
function renderGuests(guests) {
    guestsContainer.innerHTML = '';
    guests.forEach(guest => {
        const guestDiv = document.createElement('div');
        guestDiv.classList.add('guest-message');

        const name = document.createElement('h3');
        name.textContent = guest.name;
        guestDiv.appendChild(name);

        const message = document.createElement('p');
        message.textContent = guest.message;
        guestDiv.appendChild(message);

        const timestamp = document.createElement('time');
        timestamp.textContent = new Date(guest.timestamp).toLocaleString();
        guestDiv.appendChild(timestamp);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteGuest(guest.id);
        };
        guestDiv.appendChild(deleteButton);

        guestsContainer.appendChild(guestDiv);
    });
}
//방명록 삭제
function deleteGuest(id) {
    axios.delete(`${host}/guest/${id}`)
    .then(response => {
        console.log(response.data);
        getGuests();
    })
    .catch(error => {
        console.error('Error deleting guest: ', error);
    });
}
// 방명록 폼 제출
function submitGuestForm(event) {
    event.preventDefault();
    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');

    const newGuest = {
        name: nameInput.value,
        message: messageInput.value
    };

    axios.post(`${host}/guest`, newGuest)
    .then(response => {
        console.log(response.data);
        getGuests();
        nameInput.value = '';
        messageInput.value = '';
    })
    .catch(error => {
        console.error('Error adding guest: ', error);
    });
}

window.addEventListener('DOMContentLoaded', function(){
    getGuests();
    const guestForm = document.getElementById('guest-form');
    guestForm.addEventListener('submit', submitGuestForm);

    // 엔터키 입력 시 폼 제출
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            guestForm.requestSubmit();
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');
  
    for (const link of links) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      });
    }
  
    function moveToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    const content = "Hello, I'm YuJin";
    const text = document.querySelector(".home-content h1");
    let textIdx = 0;

    function typing(){
      if (textIdx < content.length) {
        let txt = content[textIdx++];
        text.innerHTML += txt;
        setTimeout(typing, 150);
      }
    }

    typing();

    // 마우스 오버 시 p 요소 내용 변경
    const aboutText = document.querySelector('#about-text');
    const originalText = aboutText.innerHTML;
    const tooltipText = "Hello, my name is Ko Yujin :) <br>I've been interested in design and decorating since I was young, <br> and I've dreamed of becoming a front-end developer<br> because I'm having fun checking the code I wrote right on the screen.";

    aboutText.addEventListener('mouseenter', function() {
        aboutText.innerHTML = tooltipText;
    });

    aboutText.addEventListener('mouseleave', function() {
        aboutText.innerHTML = originalText;
    });

    // 슬라이더 구현
    const slides = document.querySelectorAll('.love-slide');
    let currentIndex = 0;
    let isTransitioning = false;

    function updateSlidePosition(offset = 0) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.transform = `translateX(calc(-${currentIndex * 100}% + ${offset}px))`;
        }
    }

    function nextSlide(auto = false) {
        if (isTransitioning) return;
        isTransitioning = true;
        if (auto) {
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
        }
        updateSlidePosition();
        setTimeout(() => { isTransitioning = false; }, 500);
    }
    //이전 슬라이드
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        updateSlidePosition();
        setTimeout(() => { isTransitioning = false; }, 500);
    }

    document.getElementById('next-slide').addEventListener('click', function () {
        nextSlide();
        resetAutoSlide();
    });

    document.getElementById('prev-slide').addEventListener('click', function () {
        prevSlide();
        resetAutoSlide();
    });

    // 자동 슬라이드 구현
    let autoSlideInterval = setInterval(() => nextSlide(true), 3000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => nextSlide(true), 3000);
    }
});
