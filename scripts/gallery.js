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
        this.container.querySelector('img').src = this.imagesUrls[this.currentImageIndex];
    }
}