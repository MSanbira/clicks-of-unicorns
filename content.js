
const ClicksOfUnicorns = {};
ClicksOfUnicorns.emoji = '🦄';

ClicksOfUnicorns.uniStyle = document.querySelector('#clicksOfUnicorns');
if (!ClicksOfUnicorns.uniStyle) {
    ClicksOfUnicorns.uniStyle = document.createElement("style");
    ClicksOfUnicorns.uniStyle.setAttribute('id', 'clicksOfUnicorns');
    document.head.appendChild(ClicksOfUnicorns.uniStyle);
}

ClicksOfUnicorns.uniStyle.innerHTML = `
    @keyframes uniPlop {
        0% {
            offset-distance: 0%;
            opacity: 1;
        }
        100% {
            offset-distance: 100%;
            opacity: 0;
        }
    }
`;

document.addEventListener("click", (e) => {
    if(ClicksOfUnicorns.emoji) {
        const uniCount = parseInt(Math.random() * 3 + 1);
        [...Array(uniCount)].forEach((_, i) => createNewUnicorn(e.pageX, e.pageY - 14)); 
    }
});

function createNewUnicorn(uniX, uniY) {
    const clicksOfUnicornDiv = document.createElement("div");
    clicksOfUnicornDiv.innerHTML = ClicksOfUnicorns.emoji;

    ClicksOfUnicorns.rndYStart = parseInt(Math.random() * -100 - 70);
    ClicksOfUnicorns.rndYEnd = Math.min(parseInt(Math.random() * 100 + 500), document.body.clientHeight - uniY - 14);
    ClicksOfUnicorns.xSign = Math.random() < 0.5 ? -1 : 1;
    ClicksOfUnicorns.rndXStart = parseInt(Math.random() * 50 + 20) * ClicksOfUnicorns.xSign;
    ClicksOfUnicorns.rndXEnd = parseInt(Math.random() * (50 * ClicksOfUnicorns.xSign) + ClicksOfUnicorns.rndXStart);
    ClicksOfUnicorns.uniPath = `M${uniX},${uniY} q${ClicksOfUnicorns.rndXStart},${ClicksOfUnicorns.rndYStart} ${ClicksOfUnicorns.rndXEnd},${ClicksOfUnicorns.rndYEnd}`;
    ClicksOfUnicorns.uniSpeed = parseInt(Math.random() * 200 + (ClicksOfUnicorns.rndYEnd < 400 ? 500 + ClicksOfUnicorns.rndYEnd : 900));

    clicksOfUnicornDiv.style = `
        curser: default;
        user-select: none;
        position: absolute;
        z-index: 999999999999;
        font-size: 14px;
        top: 0;
        left: 0;
        transform: rotate(90deg);
        offset-path: path('${ClicksOfUnicorns.uniPath}');
        animation: uniPlop ${ClicksOfUnicorns.uniSpeed + 10}ms ease-in;
    `;

    document.body.appendChild(clicksOfUnicornDiv);

    setTimeout(() => {
        clicksOfUnicornDiv.remove();
    }, ClicksOfUnicorns.uniSpeed);
}

chrome.runtime.onMessage.addListener((req, _sender) => {
    ClicksOfUnicorns.emoji = req.emoji;
});

chrome.storage.sync.get(['isEmojiChanged'], function(result) {
    if(!!result.isEmojiChanged) {
        chrome.storage.sync.get(['ClicksOfUnicornsEmoji'], function(result) {
            ClicksOfUnicorns.emoji = result.ClicksOfUnicornsEmoji;
        });  
    }
}); 