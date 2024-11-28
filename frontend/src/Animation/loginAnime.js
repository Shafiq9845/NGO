import {gsap} from 'gsap';

export const fadeIn=(element)=>{
    gsap.from(element,{
        opacity:0,
        duration:2
    });
}
export const flipIn = (element) => {
    gsap.fromTo(element, 
      { rotationY: 180, opacity: 0 },
      { rotationY: 0, opacity: 1, duration: 0.5, ease:'back.out' }
    );
  };