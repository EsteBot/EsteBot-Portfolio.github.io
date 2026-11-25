(() => {
    const aliases = {
        'github.com/estebot': 'git push',
        'resumepage.html': 'e.info ( )',
        'publicationpage.html': 'H₁ = p < .05',
        'accomplishmentspage.html': 'R² → 1.0',
        'myjourneypage.html': 'e.path ∑dx',
        'labnotespage.html': 'e.log ∫ dx',
        'contactpage.html': 'e.ping ( )'
    };

    document.querySelectorAll('#navbar a.nav-link').forEach((link) => {
        if (link.classList.contains('nav-morph-link')) return;
        const href = (link.getAttribute('href') || '').toLowerCase();
        const alias = Object.entries(aliases).find(([destination]) => href.includes(destination))?.[1];
        if (!alias) return;

        const label = link.textContent.trim();
        link.classList.add('nav-morph-link');
        link.textContent = '';
        link.insertAdjacentHTML('afterbegin',
            `<span class="nav-ghost" aria-hidden="true">${alias}</span>` +
            `<span class="nav-text-default" aria-hidden="true">${label}</span>` +
            `<span class="nav-text-hover" aria-hidden="true">${alias}</span>`
        );
    });
})();
