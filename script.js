// 画像ファイルのURLリスト
const imageList = [
    'images/image1.png',
    'images/image2.png',
    'images/image3.png',
    'images/image4.png',
];

let currentImageIndex = 0; // 初期状態で最初の画像を表示する
let startTime;
let elapsedTime = 0;
let timerInterval;

// ストップウォッチの開始
function startStopwatch() {
    startTime = Date.now() - elapsedTime; // 現在の時間から経過時間を引く
    timerInterval = setInterval(updateStopwatch, 10); // 10ミリ秒ごとに更新
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('stopButton').classList.remove('hidden');
    document.getElementById('passButton').classList.remove('hidden');
    document.getElementById('inputContainer').classList.remove('hidden'); // 入力欄と画像を表示
}

// ストップウォッチの更新
function updateStopwatch() {
    elapsedTime = Date.now() - startTime; // 経過時間を計算
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('stopwatch').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

// ストップウォッチの停止
function stopStopwatch() {
    clearInterval(timerInterval);
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('resetButton').classList.remove('hidden');
}

// ストップウォッチのリセット
function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    document.getElementById('stopwatch').textContent = '00:00:00.00';
    document.getElementById('stopwatch-container').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden');
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('resetButton').classList.add('hidden');
    document.getElementById('passButton').classList.add('hidden');
    document.getElementById('inputContainer').classList.add('hidden'); // 入力欄と画像を非表示
}

// 次の画像を表示する
function showNextImage() {
    const image = document.getElementById('dynamicImage');
    currentImageIndex = (currentImageIndex + 1) % imageList.length; // インデックスを次に進める
    image.src = imageList[currentImageIndex]; // 次の画像に切り替える
}

// パスボタンのカウント
function incrementPass() {
    let passCounter = document.getElementById('passCounter');
    let currentCount = parseInt(passCounter.textContent.split(': ')[1], 10);
    passCounter.textContent = `パス: ${currentCount + 1}`;
    // 次の画像を表示
    showNextImage(); // 次の画像を表示
}

// 解答ボタンの処理
function submitAnswer() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();

    // 現在表示されている画像に基づく入力の検証
    if (currentImageIndex === 0 && userInput === '1') {
        showNextImage();
    } else if (currentImageIndex === 1 && userInput === '2') {
        showNextImage();
    } else if (currentImageIndex === 2 && userInput === '3') {
        showNextImage();
    } else if (currentImageIndex === 3 && userInput === '4') {
        showNextImage();
    }
    document.getElementById('userInput').value = ''; // 入力欄をクリア
}

// ページ読み込み時の初期化処理
window.onload = function() {
    // 初期状態で入力欄と画像を非表示
    document.getElementById('inputContainer').classList.add('hidden');

    // パスボタンのクリックイベントを設定
    const passButton = document.getElementById('passButton');
    if (passButton) {
        // 既存のリスナーを削除してから追加
        passButton.removeEventListener('click', incrementPass);
    }
};
