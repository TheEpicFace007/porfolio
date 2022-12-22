function importCss(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    console.log('📤 Imported CSS: ' + url);
}

class ImageGallery {
    /**
     * @param {HTMLDivElement} container
     * @param {string[]} imagesUrls
     */
    constructor(container, imagesUrls) {
        this.container = container;
        this.imagesUrls = [this.container.querySelector('img').src, ...imagesUrls];
        this.currentImageIndex = 0;
        this._createGallery();
        this.animation = null;
    }

    _createGallery() {
        // add over the container an left and right arrow
        let leftArrow = document.createElement('div');
        leftArrow.innerText = '<';
        leftArrow.classList.add('arrow', 'arrow__left')
        leftArrow.addEventListener('click', () => this._moveLeft());

        let rightArrow = document.createElement('div');
        rightArrow.innerText = '>';
        rightArrow.classList.add('arrow', 'arrow__right')
        rightArrow.addEventListener('click', () => this._moveRight());

        leftArrow = this.container.insertBefore(leftArrow, this.container.firstChild);
        rightArrow = this.container.appendChild(rightArrow);

        let counterContainer = document.createElement('div');
        counterContainer.classList.add('counter-container');
        counterContainer = this.container.appendChild(counterContainer);
        this._counter = document.createElement('p');
        this._counter.classList.add('counter');
        this._counter.innerText = `${this.currentImageIndex + 1}/${this.imagesUrls.length}`;
        counterContainer.appendChild(this._counter);
        
        this.container.classList.add('image-gallery');

    }

    _moveLeft() {
        if (this.currentImageIndex === 0) {
            return;
        }
        this.currentImageIndex--;
        this._updateImage();
    }

    _moveRight() {
        if (this.currentImageIndex === this.imagesUrls.length - 1) {
            return;
        }
        this.currentImageIndex++;
        this._updateImage();
    }

    _updateImage() {
        if (this.animation == 'fade') {
            const img = this.container.querySelector('img');
            let opacity = 1;
            const interval = setInterval(() => {
                opacity -= 0.05;
                img.style.opacity = opacity;
                if (opacity <= 0) {
                    img.src = this.imagesUrls[this.currentImageIndex];
                    clearInterval(interval);
                    let opacity = 0;
                    const interval2 = setInterval(() => {
                        opacity += 0.05;
                        img.style.opacity = opacity;
                        if (opacity >= 1) {
                            clearInterval(interval2);
                        }
                    }, 50);
                }
            }, 50);
        } else if (this.animation == 'flip') {
            this.container.classList.add('flip');
            setTimeout(() => {
                this.container.querySelector('img').src = this.imagesUrls[this.currentImageIndex];
                this.container.classList.remove('flip');
            }, 1000);
        } else if (this.animation == 'rotate-downscale'){
            this.container.classList.add('rotate-downscale');
            setTimeout(() => {
                this.container.classList.remove('rotate-downscale');
                this.container.querySelector('img').src = this.imagesUrls[this.currentImageIndex];
            }, 1000);
        } else {
            this.container.querySelector('img').src = this.imagesUrls[this.currentImageIndex];
        }
        this._counter.innerText = `${this.currentImageIndex + 1}/${this.imagesUrls.length}`;
    }
}