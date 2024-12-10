class SnowflakeCursor {
    constructor({ element } = {}) {
      const canvasRef = document.createElement('canvas');
      const particles = [];
      const canvImages = [];
      const animationFrame = null;
      const possibleEmoji = ['⭐'];
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const targetElement = element || document.body;
  
      const context = canvasRef.getContext('2d');
      if (!context) return;
  
      canvasRef.style.position = element ? 'absolute' : 'fixed';
      canvasRef.style.top = '0';
      canvasRef.style.left = '0';
      canvasRef.style.pointerEvents = 'none';
      targetElement.appendChild(canvasRef);
  
      const setCanvasSize = () => {
        canvasRef.width = element ? targetElement.clientWidth : window.innerWidth;
        canvasRef.height = element ? targetElement.clientHeight : window.innerHeight;
      };
  
      const createEmojiImages = () => {
        context.font = '12px serif';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        possibleEmoji.forEach((emoji) => {
          const measurements = context.measureText(emoji);
          const bgCanvas = document.createElement('canvas');
          const bgContext = bgCanvas.getContext('2d');
          bgCanvas.width = measurements.width;
          bgCanvas.height = measurements.actualBoundingBoxAscent * 2;
          bgContext.textAlign = 'center';
          bgContext.font = '12px serif';
          bgContext.textBaseline = 'middle';
          bgContext.fillText(emoji, bgCanvas.width / 2, measurements.actualBoundingBoxAscent);
          canvImages.push(bgCanvas);
        });
      };
  
      const addParticle = (x, y) => {
        const randomImage = canvImages[Math.floor(Math.random() * canvImages.length)];
        particles.push(new Particle(x, y, randomImage));
      };
  
      const onMouseMove = (e) => {
        const x = element ? e.clientX - targetElement.getBoundingClientRect().left : e.clientX;
        const y = element ? e.clientY - targetElement.getBoundingClientRect().top : e.clientY;
        addParticle(x, y);
      };
  
      const updateParticles = () => {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height);
        particles.forEach((particle, index) => {
          particle.update(context);
          if (particle.lifeSpan < 0) particles.splice(index, 1);
        });
      };
  
      const animationLoop = () => {
        updateParticles();
        requestAnimationFrame(animationLoop);
      };
  
      const init = () => {
        if (prefersReducedMotion.matches) return;
        setCanvasSize();
        createEmojiImages();
        targetElement.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', setCanvasSize);
        animationLoop();
      };
  
      class Particle {
        constructor(x, y, canvasItem) {
          this.position = { x, y };
          this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1 + Math.random(),
          };
          this.lifeSpan = Math.floor(Math.random() * 60 + 80);
          this.initialLifeSpan = this.lifeSpan;
          this.canv = canvasItem;
        }
        update(context) {
          this.position.x += this.velocity.x;
          this.position.y += this.velocity.y;
          this.lifeSpan--;
          this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
          this.velocity.y -= Math.random() / 300;
          const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
          context.save();
          context.translate(this.position.x, this.position.y);
          context.scale(scale, scale);
          context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
          context.restore();
        }
      }
  
      if (!prefersReducedMotion.matches) init();
      prefersReducedMotion.onchange = () => {
        if (prefersReducedMotion.matches) {
          canvasRef.remove();
          cancelAnimationFrame(animationFrame);
          targetElement.removeEventListener('mousemove', onMouseMove);
        } else init();
      };
    }
  }
  