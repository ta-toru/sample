// 画像ファイルのURLリスト
const imageList = [
    'images/image1.png',
    'images/image2.png',
    'images/image3.png',
    'images/image4.png',
    'images/image5.png',
    'images/image6.png',
    'images/image7.png',
    'images/image8.png',
    'images/image9.png',
    'images/image10.png',
    'images/image11.png',
];

let currentImageIndex = 0; // 初期状態で最初の画像を表示する
let startTime;
let elapsedTime = 0;
let timerInterval;
let countdownInterval;

// ストップウォッチの開始
function startStopwatch() {
    // カウントダウンを開始
    startCountdown();
}

// 3秒間のカウントダウンを開始
function startCountdown() {
    document.getElementById('startButton').classList.add('hidden');
    let countdown = 3; // カウントダウン秒数
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = countdown;
    countdownElement.style.display = 'flex'; // カウントダウンを表示

    countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none'; // カウントダウンを非表示
            startStopwatchTimer(); // ストップウォッチを開始
        }
    }, 1000); // 1秒ごとに更新
}

// ストップウォッチのタイマー開始
function startStopwatchTimer() {
    startTime = Date.now() - elapsedTime; // 現在の時間から経過時間を引く
    timerInterval = setInterval(updateStopwatch, 10); // 10ミリ秒ごとに更新
    document.getElementById('startButton').classList.add('hidden');
    //document.getElementById('stopButton').classList.remove('hidden'); 
    document.getElementById('passButton').classList.remove('hidden');
    document.getElementById('inputContainer').classList.remove('hidden');
    document.getElementById('intro').classList.add('hidden'); 
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
    //document.getElementById('resetButton').classList.remove('hidden');
}

// 最後の処理
function finalprocess() {
    stopStopwatch();
    document.getElementById('stopButton').classList.add('hidden');
    document.getElementById('passButton').classList.add('hidden');
    document.getElementById('inputContainer').classList.add('hidden');
    document.getElementById('linkButton').classList.remove('hidden');
    document.getElementById('YourResult').classList.remove('hidden');
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
    document.getElementById('linkButton').classList.add('hidden');
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
    
    // 5分 (300秒) を追加
    const additionalMilliseconds = 5 * 60 * 1000; // 5分をミリ秒に変換
    elapsedTime += additionalMilliseconds; // 現在の経過時間に追加
    startTime = Date.now() - elapsedTime; // スタート時間を調整
    updateStopwatch(); // ストップウォッチを更新

    showNextImage(); // 次の画像を表示

    // メッセージを表示
    showMessage('+5分');
    
    if (currentImageIndex === 10) {
        finalprocess();
    }
}

// メッセージを表示する
function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.opacity = 1; // メッセージを表示
    setTimeout(() => {
        messageElement.style.opacity = 0; // 1秒後にメッセージを非表示
    }, 1000);
}

// 解答ボタンの処理
function submitAnswer() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();

    // 現在表示されている画像に基づく入力の検証
    if (currentImageIndex === 0 && userInput === 'なぞなぞ') {
        showNextImage();
    } else if (currentImageIndex === 1 && userInput === 'みしん') {
        showNextImage();
    } else if (currentImageIndex === 2 && userInput === 'さんらん') {
        showNextImage();
    } else if (currentImageIndex === 3 && userInput === 'かつじ') {
        showNextImage();
    } else if (currentImageIndex === 4 && userInput === 'らんたん') {
        showNextImage();
    } else if (currentImageIndex === 5 && userInput === 'ぷれい') {
        showNextImage();
    } else if (currentImageIndex === 6 && userInput === 'ななもんめ') {
        showNextImage();
    } else if (currentImageIndex === 7 && userInput === 'しゅぎょう') {
        showNextImage();
    } else if (currentImageIndex === 8 && userInput === 'じんしゅ') {
        showNextImage();
    } else if (currentImageIndex === 9 && userInput === 'しーる') {
        finalprocess();
    }
    document.getElementById('userInput').value = ''; // 入力欄をクリア
}

// 送信用リンクのボタン
function jamptolink() {
    document.getElementById('linkButton').addEventListener('click', function() {
        // ここに遷移したいURLを指定
        window.open('https://   ', '_blank');
    });
}

// ページ読み込み時の初期化処理
window.onload = function() {
    // 初期状態で入力欄と画像を非表示
    document.getElementById('inputContainer').classList.add('hidden');

    // パスボタンのクリックイベントを設定
    const passButton = document.getElementById('passButton');
    if (passButton) {
        passButton.removeEventListener('click', incrementPass); // 既存のリスナーを削除
        //passButton.addEventListener('click', incrementPass); // 新しいリスナーを追加
    }

    // スタートボタンのクリックイベントを設定
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.removeEventListener('click', startStopwatch); // 既存のリスナーを削除
        //startButton.addEventListener('click', startStopwatch); // 新しいリスナーを追加
    }
};
