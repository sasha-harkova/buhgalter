const screenWidth = window.screen.width;
const tableSection = document.querySelector('.table')
const contentContainerTableSection = tableSection.querySelector('.tabs__contents');
const linksContainerTableSection = tableSection.querySelector('.tabs__links');
const linksTableSection = linksContainerTableSection.querySelectorAll('.tabs__link');

const mechanismSection = document.querySelector('.mechanism');
const expressTab = mechanismSection.querySelector('#express-tab');
const linksContainerExpress = expressTab.querySelector('.tabs__links');
const linksExpress = linksContainerExpress.querySelectorAll('.tabs__link');
const contentContainerExpress = expressTab.querySelector('.tabs__contents');
const auditTab = mechanismSection.querySelector('#audit-tab');
const linksContainerAudit = auditTab.querySelector('.tabs__links');
const linksAudit = linksContainerAudit.querySelectorAll('.tabs__link');
const contentContainerAudit = auditTab.querySelector('.tabs__contents');
const recoveryTab = mechanismSection.querySelector('#recovery-tab');
const linksContainerRecovery = recoveryTab.querySelector('.tabs__links');
const linksRecovery = linksContainerRecovery.querySelectorAll('.tabs__link');
const contentContainerRecovery = recoveryTab.querySelector('.tabs__contents');
const optimizationTab = mechanismSection.querySelector('#optimization-tab');
const linksContainerOptimization = optimizationTab.querySelector('.tabs__links');
const linksOptimization = linksContainerOptimization.querySelectorAll('.tabs__link');
const contentContainerOptimization = optimizationTab.querySelector('.tabs__contents');
const arrowLinks = mechanismSection.querySelectorAll('.mechanism__title');

const tabsMechanismSection = Array.from(mechanismSection.querySelectorAll('.tabs'));
const contents = Array.from(document.querySelectorAll('.tabs__content'));

function res(){
  let heightImgAbout = $('.about__image').height();
  let widthImgAbout = $('.about__image').width();
  $(".about__logo").css({
    width: widthImgAbout * 0.29 + "px",
    bottom: heightImgAbout / 2.3 + "px",
  })

  let expressHelpSectionWidth = $('.express-help').width();
  if (window.matchMedia("(max-width: 960px)")) {
    $(".express-help__photo").css({
      width: expressHelpSectionWidth + "px",
      height: expressHelpSectionWidth * 0.67 + "px",
    })
  }

  let circleWidth = $('.scheme__circle').width();
  $(".scheme__circle").css({
    height: circleWidth + "px",
  })
}

res();
$( window ).resize(res);


function openArticleByAccordeon(contentContainer) {
  const accordionItems = contentContainer.querySelectorAll('.accordion__item');

  accordionItems.forEach((item) => {
    const heading = item.querySelector('.accordion__heading');
    const hiddenBlock = item.querySelector('.accordion__hide-block');
    const arrow = item.querySelector('.accordion__arrow');

    $(document).ready(function () {
      $(heading).click(function () {
        $(hiddenBlock).slideToggle("slow");
        $(arrow).toggleClass('accordion__arrow_rotated');
        return false;
      });
    });
  })
}

function getContent(link, linksContainer, contentContainer) {  
  const content = linksContainer.querySelector(`#${link.id}-con`);
  contentContainer.prepend(content.cloneNode(true));  
  contentContainer.querySelector(`#${link.id}-con`).classList.add('tabs__content_visible');
}

function deleteActiveClass(links, className) {
  links.forEach((link) => link.classList.remove(`${className}_active`))
}

function addContentIntoContentContainer(links, linksContainer, contentContainer) {
  links.forEach((link) => {    
    if(link.classList.contains('tabs__link_active')) {
      getContent(link, linksContainer, contentContainer);
    }

    link.addEventListener('click', () => {      
      deleteActiveClass(links, 'tabs__link');      
      contentContainer.innerHTML = "";   
      link.classList.add('tabs__link_active');   
      getContent(link, linksContainer, contentContainer);
      openArticleByAccordeon(contentContainer);
    })
  })
}

function openVerticalArticleFromMechanismSection(links) {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.toggle('tabs__link_active');
      link.querySelector(".tabs__button").classList.toggle("tabs__button_type_rorate");
    });
  });
}

function openVerticalArticleFromTableSection(links){
  links.forEach((link) => {
    link.classList.add("tabs__link_active");
    link.addEventListener("click", () => {
      link.querySelector(".tabs__button").classList.toggle("tabs__button_type_rorate");
    });
  });
}

function getTable(link) {
  tabsMechanismSection.forEach((tab) => {
    tab.classList.remove('tabs_active');
    if(tab.id === link.id + '-tab') {
      tab.classList.add('tabs_active');
    }
  })
}

function openTableByArrow(links) {
  links.forEach((link) => {
    if(link.classList.contains('mechanism__title_active')) {
      getTable(link);
    } 
    link.addEventListener('click', () => {      
      deleteActiveClass(links, 'mechanism__title');
      link.classList.add('mechanism__title_active');   
      getTable(link);
    })
  })
}

function deleteFirstActiveLink(links) {
  links[0].classList.remove('tabs__link_active');
}

if (screenWidth > 960) {

  addContentIntoContentContainer(linksTableSection, linksContainerTableSection, contentContainerTableSection);
  addContentIntoContentContainer(linksExpress, linksContainerExpress, contentContainerExpress);
  addContentIntoContentContainer(linksAudit, linksContainerAudit, contentContainerAudit);
  addContentIntoContentContainer(linksRecovery, linksContainerRecovery, contentContainerRecovery);
  addContentIntoContentContainer(linksOptimization, linksContainerOptimization, contentContainerOptimization);  
  openTableByArrow(arrowLinks);

} else if (screenWidth <= 960) {

  contentContainerTableSection.remove();
  contentContainerExpress.remove();
  contentContainerAudit.remove();
  contentContainerRecovery.remove();
  contentContainerOptimization.remove();

  deleteFirstActiveLink(linksExpress)
  deleteFirstActiveLink(linksAudit)
  deleteFirstActiveLink(linksRecovery)
  deleteFirstActiveLink(linksOptimization)

  openVerticalArticleFromTableSection(linksTableSection);
  openVerticalArticleFromMechanismSection(linksExpress);
  openVerticalArticleFromMechanismSection(linksAudit); 
  openVerticalArticleFromMechanismSection(linksRecovery); 
  openVerticalArticleFromMechanismSection(linksOptimization);

  contents.forEach((con) => openArticleByAccordeon(con));

    $(document).ready(function () {
      $(".tabs__link").each(function () {
        $(this).click(function () {
          $(`#${$(this).attr("id")}-con`).slideToggle("slow");
          return false;
        });
      });
    });
}

const navLinks = document.querySelectorAll('.menu__list-item');
navLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    navLinks.forEach((link) => link.classList.remove('menu__list-item_active'));
    evt.target.classList.add('menu__list-item_active');
  });
});
  

  







