const emojis = [
    '🦄', '😂', '😋', '😍', '💩',
    '👻', '👍', '🤘', '💋', '❤️', '🐷',
    '🐛', '🐥', '🐇', '🐀', '🐈', '🐶',
    '🍓', '🍕', '🍔', '🏀', '🤸‍♀️', '🎸',
    '💸', '💎', '🗡', '🦠', '🧸', '🏎'
];

emojis.forEach((emoji) => {
    document.querySelector('.btn-grid').innerHTML += `
        <div class="btn" data-emoji='${emoji}'>${emoji}</div>
    `;
});

const btns = document.querySelectorAll('.btn');
let isEmojiChanged = false;

function init() {
    getEmojiFromStorage();
}

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn')) {
        setUniEmoji(e.target.getAttribute('data-emoji'));
        btns.forEach((btn) => btn.classList.remove('selected'));
        e.target.classList.add('selected');
    }
});

function getEmojiFromStorage() {
    chrome.storage.sync.get(['isEmojiChanged'], function(result) {
        isEmojiChanged = !!result.isEmojiChanged;
        if(isEmojiChanged) {
            chrome.storage.sync.get(['ClicksOfUnicornsEmoji'], function(result) {
                setEmojiSelectedUI(result.ClicksOfUnicornsEmoji);
            });  
        }
        else {
            setEmojiSelectedUI('🦄');
        }
    });    
}

function setEmojiSelectedUI(emoji) {
    btns.forEach((btn) => {
        if(btn.getAttribute('data-emoji') === emoji) {
            btn.classList.add('selected')
        }
        else {
            btn.classList.remove('selected')
        }
    });
}

function handleSendMessage(emoji) {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {emoji: emoji});
    });
}

function setUniEmoji(emoji) {
    chrome.storage.sync.set({ClicksOfUnicornsEmoji: emoji, isEmojiChanged: true}, function() {
        console.log('Value is set to: ' + emoji);
    });

    handleSendMessage(emoji);
}

init();
