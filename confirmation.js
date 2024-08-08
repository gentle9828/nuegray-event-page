document.addEventListener('DOMContentLoaded', function() {
    const selectedColorsContainer = document.getElementById('selectedColorsContainer');
    const selectedCards = JSON.parse(localStorage.getItem('selectedCards'));


    if (selectedCards && selectedCards.length > 0) {
        selectedCards.forEach(card => {
            const colorItem = document.createElement('div');
            colorItem.classList.add('color-item');

            const img = document.createElement('img');
            img.src = card.imgSrc;
            colorItem.appendChild(img);

            const nameContainer = document.createElement('div');
            nameContainer.classList.add('color-name');
            
            const dot = document.createElement('span');
            dot.classList.add('color-dot');
            dot.style.backgroundColor = card.color;
            
            const name = document.createElement('span');
            name.textContent = card.name;
            
            nameContainer.appendChild(dot);
            nameContainer.appendChild(name);
            colorItem.appendChild(nameContainer);

            selectedColorsContainer.appendChild(colorItem);
        });
    }

    // 컬러 다시 보기 버튼 클릭 시 index로 이동
    document.querySelector('.back-button').addEventListener('click', function() {
        window.location.href = './index.html';
    });

    // 투표 하기 버튼 클릭 시 로직
    document.querySelector('.confirm-button').addEventListener('click', function() {
        window.location.href = './complete.html';
    });
});
