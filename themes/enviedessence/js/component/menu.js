const initMenu = () => {
    document.querySelector('header span.icon-arrow').addEventListener('click', () => {
        document.querySelector('header').classList.toggle('active');
    });
};

document.querySelector('header') && initMenu();
