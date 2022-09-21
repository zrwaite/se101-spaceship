"use strict";
const galaxies = document.querySelectorAll('td[id^=galaxy]');
document.querySelector('#Galaxy > table').addEventListener('dblclick', function (e) {
    var _a;
    if (((_a = document.querySelector('figure.active')) === null || _a === void 0 ? void 0 : _a.id) === 'Red Dwarf') {
        const rect = galaxies[0].getBoundingClientRect();
        const boxL = rect.left + rect.width, boxT = rect.top + rect.height;
        const rect2 = galaxies[3].getBoundingClientRect();
        const boxR = rect2.left, boxB = rect2.top;
        if (e.clientX >= boxL && e.clientX <= boxR && e.clientY >= boxT && e.clientY <= boxB)
            window.open('https://diep.io', '_blank');
    }
});
