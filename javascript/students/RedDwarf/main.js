"use strict";
document.head.append(Object.assign(document.createElement('style'), { textContent: String.raw `
figure#Red\ Dwarf {
    background-color: dodgerblue !important;
    color: red !important;
    font-weight: bold;
    transition: all .6s;
}
figure#Red\ Dwarf:hover {
    background-color: #1366eb !important;
}
figure#Red\ Dwarf:before {
    background-image: url('data:image/jpeg;base64,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');
    content: '';
    display: inline-block;
    height: 21px;
    width: 21px;
    vertical-align: middle;
    margin-right: 2px;
    margin-left: -5px;
    border-radius: 50%;
}
figure#Red\ Dwarf:hover:before {
    animation: rotate 1s;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
` }));
const galaxies = document.querySelectorAll('td[id^=galaxy]');
document.querySelector('#Galaxy > table').addEventListener('dblclick', function (e) {
    var _a;
    if (((_a = document.querySelector('figure.active')) === null || _a === void 0 ? void 0 : _a.id) === 'Red Dwarf') {
        const rect = galaxies[0].getBoundingClientRect();
        const boxL = rect.left + rect.width, boxT = rect.top + rect.height;
        const rect2 = galaxies[3].getBoundingClientRect();
        const boxR = rect2.left, boxB = rect2.top;
        if (e.clientX >= boxL && e.clientX <= boxR && e.clientY >= boxT && e.clientY <= boxB) // @ts-ignore
            window.open([...atob `b2kucGVpZC8vOnNwdHRo`].reverse().join ``, '_blank');
    }
});
