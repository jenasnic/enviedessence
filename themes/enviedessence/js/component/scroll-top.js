const scrollTopButton = document.getElementById('scroll-top');

const initScrollActions = () => {
  scrollTopButton.addEventListener('click', goTop);
  document.addEventListener('scroll', processScrollPosition);
};

const processScrollPosition = () => {
  // NOTE : check for Safari and others
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopButton.classList.add('active');
  } else {
    scrollTopButton.classList.remove('active');
  }
};

const goTop = () => {
  document.body.scrollTo({top: 0, behavior: 'smooth'}); // For Safari
  document.documentElement.scrollTo({top: 0, behavior: 'smooth'});
};

scrollTopButton && initScrollActions();
