var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl=gsap.timeline();

    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut 
    })
    .to(".boundingelem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        stagger:0.2,
        delay:-1
    })
    .from("#heroFooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut,
    });
}
 
function circleChaptaKro(){
    var xScale = 1;
    var yScale = 1;
    var xPrev = 0;
    var yPrev = 0;

    const clamp = gsap.utils.clamp(0.8, 1.2);

    window.addEventListener("mousemove", function(dets){
        xScale = clamp(dets.clientX - xPrev);
        yScale = clamp(dets.clientY - yPrev);

        xPrev = dets.clientX;
        yPrev = dets.clientY;

        document.querySelector("#miniCircle").style.transform = 
            `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`;

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            document.querySelector("#miniCircle").style.transform = 
                `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}



function circleMouseFollower(xScale,yScale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#miniCircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
    });
}
circleChaptaKro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){

    var rotate=0;
    var diffrot=0;
     
    elem.addEventListener("mouseleave",function(dets){

  
       

        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
            duration:0.5,
         
        });
    });
    elem.addEventListener("mousemove", function(dets) {
  const img = elem.querySelector("img");
  const diff = dets.clientY - elem.getBoundingClientRect().top;
  diffrot = dets.clientX - rotate;
  rotate = dets.clientX;

  gsap.to(img, {
    opacity: 1,
    ease: Power3.easeOut,
    top: diff,
    left: dets.clientX - elem.getBoundingClientRect().left,
    rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
  });
});


//     elem.addEventListener("mousemove",function(dets){

//     var diff=dets.clientY-elem.getBoundingClientRect().top;
//         diffrot=dets.clientX-rotate;
//         rotate=dets.clientX;
       

//         gsap.to(elem.querySelector("img"),{
//             opacity:1,
//             ease:Power3,
//             top: `${diff}px`,
// left: `${dets.clientX}px`,

//              rotate: gsap.utils.clamp(-20,20,diffrot*0.5),
//         });
//     });
});