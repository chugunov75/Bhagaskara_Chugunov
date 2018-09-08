'use strict';

function slideMembers(){
  var count=document.querySelector(".our_team").querySelectorAll(".slide-item").length;
  var index=0;
  var step=(parseInt(getComputedStyle(document.querySelector(".our_team").querySelector(".slide-item")).width));
  var left_arrow=document.querySelector(".our_team").querySelector(".arrow-left");
  var right_arrow=document.querySelector(".our_team").querySelector(".arrow-right");
  var ribbon=document.querySelector(".our_team").querySelector(".slide-ribbon");
  var frame_width=(parseInt(getComputedStyle(document.querySelector(".our_team").querySelector(".slide-frame")).width));
  var positionX=200;
  var slids_in_frame=1;
  if(frame_width>500){
    positionX=600;
    slids_in_frame=3;
  }
  right_arrow.classList.add('arrow-right-disabled');

  window.addEventListener('resize',function(){
    frame_width=(parseInt(getComputedStyle(document.querySelector(".our_team").querySelector(".slide-frame")).width));
    if(frame_width>500){
      positionX=600;
      slids_in_frame=3;
    }
    else{
      slids_in_frame=1;
      positionX=200;
    }
    index=0;
    step=(parseInt(getComputedStyle(document.querySelector(".our_team").querySelector(".slide-item")).width));
    ribbon.style.transform='translateX('+(-positionX)+'px)';
  });

  right_arrow.onclick=function(event){
    event = event || window.event;
    if(index>0){
      positionX-=step;
      ribbon.style.transform='translateX('+(-positionX)+'px)';
      index--;
      if(left_arrow.classList.contains('arrow-left-disabled')){
        left_arrow.classList.remove('arrow-left-disabled');
      }
    }
    if(index===0){
      right_arrow.classList.add('arrow-right-disabled');
    }
  };
  left_arrow.onclick=function(event){
    event = event || window.event;
    if(index<count-slids_in_frame){
      positionX+=step;
      ribbon.style.transform='translateX('+(-positionX)+'px)';
      index++;
      if(right_arrow.classList.contains('arrow-right-disabled')){
        right_arrow.classList.remove('arrow-right-disabled');
      }
    }
    if(index===count-slids_in_frame){
      left_arrow.classList.add('arrow-left-disabled');
    }
  };
}
function showHideMenu(menu_list, menu_container, onlyCollapse=false){
    if(menu_list.classList.contains("menu_stack_expanded")){
      menu_list.classList.remove("menu_stack_expanded");
      setTimeout(function(){
        menu_container.classList.remove("visible");
      },500);
    }
    else if(!onlyCollapse){
      menu_container.classList.add("visible");
      setTimeout(function(){
        menu_list.classList.add("menu_stack_expanded");
      },10);
    }
}
function menuEventHandler(){
  var menu=document.querySelector(".menu");
  var logo=menu.querySelector(".logo");
  var menu_list=menu.querySelector("ul");
  var menu_list_container=menu.querySelector('.list-container');
  var toggle=menu.querySelector(".toggle");

  var footer_home=document.querySelector("footer .footer-home");

  var nav_services=document.querySelector(".navigation .services");
  var nav_team=document.querySelector(".navigation .team");
  var nav_about=document.querySelector(".navigation .about");
  var nav_portfolio=document.querySelector(".navigation .portfolio");
  var nav_blog=document.querySelector(".navigation .blog");
  var nav_contact=document.querySelector(".navigation .contact");

  var submit=document.querySelector('.contact_section [type="submit"]');

  nav_services.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-services"));
  }
  nav_team.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-team"));
  }
  nav_about.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-about"));
  }
  nav_portfolio.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-portfolio"));
  }
  nav_blog.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-blog"));
  }
  nav_contact.onclick=function(){
    setCurrent(menu_list.querySelector(".menu .menu-contact"));
  }

  function setCurrent(current){
    current=(current.tagName.match(/a/i))? current: current.querySelector('a');
    if(menu_list.querySelector(".kara")){
      if(menu_list.querySelector(".kara")!==current){
        menu_list.querySelector(".kara").classList.remove("kara");
        current.classList.add("kara");
      }
    }
    else{
      current.classList.add("kara");
    }
  }
  toggle.onclick=function(){
    showHideMenu(menu_list, menu_list_container);
  };
  menu_list.onclick=function(event){
    event = event || window.event;
    showHideMenu(menu_list, menu_list_container);
    if(event.target.matches("a") || event.target.matches("li")){
      if(menu_list.querySelector(".kara")){
        event.currentTarget.querySelector(".kara").classList.remove("kara");
      }
      setCurrent(event.target);
    }
  };
  logo.onclick=function(){
    showHideMenu(menu_list, menu_list_container,true);
    setCurrent(menu_list.querySelector(".menu-home"));
  };
  footer_home.onclick=function(){
    setCurrent(menu_list.querySelector(".menu-home"));
  };
  submit.addEventListener('click', function(event){
    event = event || window.event;
    event.preventDefault();
    setCurrent(menu_list.querySelector(".menu-home"));
  });
}
/*-----------------portfolio------------------------------*/
function removeClearNotClear(elem){
  if(elem.closest('.col').classList.contains('clear')){
    elem.closest('.col').classList.remove('clear');
  }
  if(elem.closest('.col').classList.contains('not-clear')){
    elem.closest('.col').classList.remove('not-clear');
  }
}
function setClear(elementsCollection){
  var controlPointSM=500;
  var controlPointMD=960;
  var columnCount=1;
  var currentWidth=window.innerWidth;
  if(currentWidth>=controlPointSM && currentWidth < controlPointMD){
    columnCount=2;
  }
  else if(currentWidth >= controlPointMD){
    columnCount=3;
  }
  for(var i=0; i< elementsCollection.length; i++){
    if(i % columnCount===0){
      if(elementsCollection[i].closest('.col').classList.contains('not-clear')){
        elementsCollection[i].closest('.col').classList.remove('not-clear');
      }
      elementsCollection[i].closest('.col').classList.add('clear');

    }
    else{
      if(elementsCollection[i].closest('.col').classList.contains('clear')){
        elementsCollection[i].closest('.col').classList.remove('clear');
      }
      elementsCollection[i].closest('.col').classList.add('not-clear');
    }
  }
}
function showPortfolio(){
  var portfolio=document.querySelector(".portfolio_section");
  function portfolioHandler(event){
    event = event || window.event;
    if(event.target.matches(".btn-toggle") && !event.target.matches(".btn-toggle-current")){
      var container=event.target.closest(".button_container");
      for(var i=0; i<container.children.length; i++){
        if(container.children[i].matches(".btn-toggle-current")){
          container.children[i].classList.remove("btn-toggle-current");
          break;
        }
      }
      event.target.classList.add("btn-toggle-current");
      var itemsAll=event.currentTarget.querySelectorAll(".portfolio-item");
      var visibleItems=[];
      if(event.target.hasAttribute("data-category")){
        for(var j=0; j<itemsAll.length; j++){
          if(itemsAll[j].getAttribute("data-category")!=event.target.getAttribute("data-category")){
            itemsAll[j].closest('.col').classList.add("hidden");
          }
          else{
            if(itemsAll[j].closest('.col').classList.contains("hidden")){
              itemsAll[j].closest('.col').classList.remove("hidden");
            }
            visibleItems.push(itemsAll[j]);
          }
        }
        setClear(visibleItems);
      }
      else{
        for(var j=0; j<itemsAll.length; j++){
          if(itemsAll[j].closest('.col').classList.contains("hidden")){
            itemsAll[j].closest('.col').classList.remove("hidden");
          }
          removeClearNotClear(itemsAll[j]);
        }
      }
    }
  }
  portfolio.onclick=portfolioHandler;

  window.addEventListener('resize', function(){
    var currentBtn=portfolio.querySelector('.btn-toggle-current');
    if(currentBtn.hasAttribute('data-category')){
      var visibleItems=portfolio.querySelectorAll('.col:not(.hidden) .portfolio-item');
      setClear(visibleItems);
    }
  });
}
/*-----------------end of portfolio------------------------------*/
/*------------------progress-----------------------*/
function progressHandler(elem){
  var percentage=parseInt(elem.getAttribute('data-percentage'));
  percentage=(isNaN(percentage))? 0 : percentage;
  var indicator=elem.querySelector('.progress-indicator');
  var progressValue=elem.querySelector('.percentage');
  var progressWidth=(isNaN(parseInt(progressValue.textContent)) || parseInt(progressValue.textContent)>=100)? 0 : parseInt(progressValue.textContent);
  var interval=1;
  var timerId=null;
  if(progressWidth<percentage){
    indicator.style.width=progressWidth+'%';
    if(elem.getBoundingClientRect().bottom<=window.innerHeight && elem.getBoundingClientRect().top>0){
      timerId= setTimeout(function tick(){
        interval=Math.ceil(((1+progressWidth)*50/percentage));
        progressWidth++;
        indicator.style.width=progressWidth+'%';
        progressValue.textContent=progressWidth+'%';
        if(progressWidth<percentage){
          timerId=setTimeout(tick,interval);
        }
        else{
          clearTimeout(timerId);
        }
      },interval);
    }
  }
}
function runProgress(elem){
  progressHandler(elem);
  window.addEventListener('scroll',function(){
    progressHandler(elem);
  });
   

}
function setProgress(){
  var progress_views=document.querySelectorAll('.progress-view');
  for(var i=0; i<progress_views.length;i++){
    runProgress(progress_views[i]);
  }
}
/*------------------end of progress-----------------------*/

/*------------------counter-----------------------*/
function setSeparator(number,separator){
  if(number>999){
    var result='';
    number=''+number;
    var i=0;
    var j=0;
    for(i=number.length; number.length>3 && i>0; i--, j++){
      if(j%3==0 && j>0){
        result=separator+result;
      }
      result=number[i-1]+result;
    }
    return result;
  }
  else{
    return number;
  }
}
function removeSeparator(number,separator){
  if(number.indexOf(separator)!=-1){
    var result='';
    for(var i=0; i<number.length; i++){
      if(number[i]!==separator){
        result=result+number[i];
      }
    }
    return result;
  }
  else{
    return number;
  }
}
function counterHandler(elem){
  var counterValue=parseInt(elem.getAttribute('data-num'));
  counterValue=(isNaN(counterValue))? 0 : counterValue;
  var unit=elem.getAttribute('data-unit');
  var currentVal=parseInt(removeSeparator(elem.textContent,','));
  currentVal=(isNaN(currentVal))? 0 : currentVal;
  var interval=1;
  var timerId=null;
  if(currentVal<counterValue){
    if(elem.getBoundingClientRect().bottom<=window.innerHeight && elem.getBoundingClientRect().top>0){
      timerId= setTimeout(function tick(){
        interval=Math.ceil(((1+currentVal)*50/counterValue));
        if(counterValue-currentVal>1000){
          currentVal+=100;
        }
        else if(counterValue-currentVal>100){
          currentVal+=10;
        }
        else{
          currentVal++;
        }
        elem.textContent=setSeparator(currentVal,',')+unit;
        if(currentVal<counterValue){
          timerId=setTimeout(tick,interval);
        }
        else{
          clearTimeout(timerId);
        }
      },interval);
    }
  }
}
function runCounter(elem){
  counterHandler(elem);
  window.addEventListener('scroll',function(){
    counterHandler(elem);
  });
}
function setCounter(){
  var counters=document.querySelectorAll('.value');
  for(var i=0; i<counters.length;i++){
    runCounter(counters[i]);
  }
}
/*------------------end of counter-----------------------*/

(function (){
  menuEventHandler();
  showPortfolio();
  slideMembers();
  setProgress();
  setCounter();
})();
