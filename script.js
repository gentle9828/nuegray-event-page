document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const overlay = document.querySelector('.overlay'); 
    const cards = document.querySelectorAll('.card');
    const confirmButton = document.getElementById('confirmButton');
    const colorAlertModal = document.getElementById('colorAlertModal');
    const maxPicks = 3;
    let currentPicks = 0;
    let currentIndex = -3;
    let selectedCards = [];

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 20; 
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

        cards.forEach((card, index) => {
            const dots = card.querySelectorAll('.dot'); 
            if (index - 3 === currentIndex) {
                card.classList.add('active');
                card.classList.remove('inactive');
                setTimeout(() => {
                    requestAnimationFrame(() => {
                        overlay.style.backgroundImage = `url(${card.dataset.background})`; 
                    });
                }, 0);
                dots.forEach((dot, dotIndex) => {
                    if (dotIndex === currentIndex + 3) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                if (card.querySelector('.name').textContent === '#11 Pansy') {
                    confirmButton.style.display = 'block';
                } else {
                    confirmButton.style.display = 'none';
                }
            } else {
                card.classList.add('inactive');
                card.classList.remove('active');
                dots.forEach(dot => dot.classList.remove('active'));
            }
        });
    }

    function scrollToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    window.addEventListener('load', () => {
        scrollToIndex(-3); 
    });

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX;
        scrollLeft = carousel.scrollLeft;
        carousel.style.transition = 'none'; 
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        carousel.style.transition = 'transform 0.3s ease-in-out';
        const cardWidth = cards[0].offsetWidth + 20;
        const movedBy = startX - e.pageX;
        if (movedBy > cardWidth / 3 && currentIndex < cards.length - 4) { 
            currentIndex++;
        } else if (movedBy < -cardWidth / 3 && currentIndex > -3) { 
            currentIndex--;
        }
        updateCarousel();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 3;
        carousel.scrollLeft = scrollLeft - walk;
    });

    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].clientX;
        scrollLeft = carousel.scrollLeft;
        carousel.style.transition = 'none'; 
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDown) return;
        isDown = false;
        carousel.style.transition = 'transform 0.3s ease-in-out'; 
        const cardWidth = cards[0].offsetWidth + 20;
        const movedBy = startX - e.changedTouches[0].clientX;
        if (movedBy > cardWidth / 3 && currentIndex < cards.length - 4) { 
            currentIndex++;
        } else if (movedBy < -cardWidth / 3 && currentIndex > -3) { 
            currentIndex--;
        }
        updateCarousel();
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].clientX;
        const walk = (x - startX) * 3;
        carousel.scrollLeft = scrollLeft - walk;
    });

    updateCarousel(); 

    const imageModal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    cards.forEach(card => {
        const img = card.querySelector('.profile-image');
        img.onclick = function() {
            imageModal.style.display = "flex";
            modalImg.src = this.src;
        }

        const pickButton = card.querySelector('.pick-button');
        pickButton.addEventListener('click', function() {
            if (pickButton.classList.contains('clicked')) {
                pickButton.classList.remove('clicked');
                pickButton.textContent = "PICK";
                pickButton.style.backgroundColor = "#514C48"; 
                currentPicks--;
                selectedCards = selectedCards.filter(c => c.name !== card.querySelector('.name').textContent);
            } else {
                if (currentPicks < maxPicks) {
                    pickButton.classList.add('clicked');
                    pickButton.textContent = "PICKED";
                    currentPicks++;
                    switch (card.querySelector('.name').textContent) {
                        case '#5 Som':
                            pickButton.style.backgroundColor = "#f9cdcd";
                            break;
                        case '#6 Scene':
                            pickButton.style.backgroundColor = "#c69e91";
                            break;
                        case '#7 Slit':
                            pickButton.style.backgroundColor = "#e9938d";
                            break;
                        case '#8 Nude\'it':
                            pickButton.style.backgroundColor = "#c88e8a";
                            break;
                        case '#9 Ish':
                            pickButton.style.backgroundColor = "#ecb8d3";
                            break;
                        case '#10 Carriére':
                            pickButton.style.backgroundColor = "#aa819f";
                            break;
                        case '#11 Pansy':
                            pickButton.style.backgroundColor = "#b54d77";
                            break;
                    }

                    const cardData = {
                        imgSrc: card.querySelector('.profile-image').src,
                        name: card.querySelector('.name').textContent,
                        color: pickButton.style.backgroundColor
                    };

                    selectedCards.push(cardData);
                } else {
                    alert("최대 3개까지 선택 가능합니다.");
                }
            }

            localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
        });

        // Dot 클릭 이벤트 추가
        const dots = card.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(dot.getAttribute('data-index'), 10);
                scrollToIndex(index - 3);
            });
        });
    });
    

    imageModal.onclick = function(event) {
        if (event.target == imageModal) {
            imageModal.style.display = "none";
        }
    }

    confirmButton.onclick = function() {
        const pickedButtons = document.querySelectorAll('.pick-button.clicked');
        if (pickedButtons.length === 0) {
            confirmButton.style.display = 'none';  
            colorAlertModal.style.display = "flex";
        } else {
            localStorage.setItem('selectedCards', JSON.stringify(selectedCards));
            window.location.href = "./confirmation.html";
        }
    }

    colorAlertModal.onclick = function(event) {
        if (event.target == colorAlertModal) {
            colorAlertModal.style.display = 'none';
            confirmButton.style.display = 'flex';  
        }
    }
});
