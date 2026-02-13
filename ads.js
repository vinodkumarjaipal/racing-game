let score = 0;

export function showAd() {
    const adContainer = document.getElementById('ad-container');
    adContainer.innerHTML = '<iframe src="https://ads.example.com"></iframe>';
    setTimeout(() => adContainer.innerHTML = '', 5000);
}

export function checkUnlocks() {
    if (score >= 100) showAd();
}
