// confirmation.js
document.addEventListener('DOMContentLoaded', function() {
    const selectedColorsContainer = document.querySelector('.selected-colors');

    // 선택된 이미지 리스트와 이름, 색상 정보
    const selectedColors = [
        { src: 'image/model/Nudeit.jpg', name: "Nude'it", color: '#f9cdcd' },
        { src: 'image/model/Scene.jpg', name: 'Scene', color: '#c69e91' },
        { src: 'image/model/Carriere.jpg', name: 'Carriére', color: '#b54d77' }
        // 추가된 이미지 경로를 여기에 추가
    ];

    // 이미지와 이름을 배열
    selectedColors.forEach(color => {
        const colorItem = document.createElement('div');
        colorItem.classList.add('color-item');

        const img = document.createElement('img');
        img.src = color.src;
        colorItem.appendChild(img);

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('color-name');
        
        const dot = document.createElement('span');
        dot.classList.add('color-dot');
        dot.style.backgroundColor = color.color;
        
        const name = document.createElement('span');
        name.textContent = color.name;
        
        nameContainer.appendChild(dot);
        nameContainer.appendChild(name);
        colorItem.appendChild(nameContainer);

        selectedColorsContainer.appendChild(colorItem);
    });

    // 컬러 다시 보기 버튼 클릭 시 test.html로 이동
    document.querySelector('.back-button').addEventListener('click', function() {
        window.location.href = 'test.html';
    });

    // 투표 하기 버튼 클릭 시 로직
    document.querySelector('.confirm-button').addEventListener('click', function() {
        window.location.href = 'complete.html';
    });
});
