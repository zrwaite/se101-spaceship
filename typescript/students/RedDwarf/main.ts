(document.querySelector('#Galaxy > table') as HTMLTableElement).addEventListener('dblclick', function(this: HTMLElement, e: MouseEvent){
    if (document.querySelector('figure.active')?.id === 'Red Dwarf' && !(e.target as HTMLElement).matches('td'))
        window.open('https://diep.io', '_blank');
});