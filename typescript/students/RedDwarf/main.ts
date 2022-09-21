const galaxies = document.querySelectorAll('td[id^=galaxy]');
(document.querySelector('#Galaxy > table') as HTMLTableElement).addEventListener('dblclick', function(this: HTMLElement, e: MouseEvent){
    if (document.querySelector('figure.active')?.id === 'Red Dwarf') {
        const rect = galaxies[0].getBoundingClientRect();
        const boxL = rect.left + rect.width, boxT = rect.top + rect.height;
        const rect2 = galaxies[3].getBoundingClientRect();
        const boxR = rect2.left, boxB = rect2.top;
        if (e.pageX >= boxL && e.pageX <= boxR && e.pageY >= boxT && e.pageY <= boxB)
            window.open('https://diep.io', '_blank');
    }
});