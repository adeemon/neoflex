export class GigachadSlider {
    constructor(elementsArray, amountsToShow, previousButtonId, nextButtonId, contentWrapperId, scrollStep) {
        this.elementsArray = elementsArray;
        this.amountsToShow = amountsToShow;
        this.previousButton = document.querySelector(previousButtonId);
        this.nextButton = document.querySelector(nextButtonId);
        this.contentWrapper = document.querySelector(contentWrapperId);
        this.currentItem = 0;
        this.onNextHandler = this.onNext.bind(this);
        this.onPreviousHandler = this.onPrevious.bind(this);
        this.nextButton.addEventListener('click', this.onNextHandler);
        this.previousButton.addEventListener('click', this.onPreviousHandler);
        this.scrollStep = scrollStep;
        this.contentWrapper.onscroll = this.checkButtons.bind(this);
    }
    render() {
        try {
            this.checkButtons();
            this.contentWrapper.innerHTML = this.elementsArray;
        } catch {
            console.error('Ошибка слайдера. Невзоможно отрендерить элементы.')
        }
    }

    onPrevious() {
        try {
            this.contentWrapper.scrollLeft -= this.scrollStep;
            console.log(this.contentWrapper.scrollLeft);
            console.log(this.contentWrapper.scrollLeft + this.scrollStep);
            console.log(this.maxScroll);
            this.checkButtons();
        } catch (error) {
            console.error('Невозможно выполнить промотку назад.')
        }
    }

    onNext() {
        try {
            this.contentWrapper.scrollLeft += this.scrollStep;
            console.log(this.contentWrapper.scrollLeft);
            console.log(this.contentWrapper.scrollLeft + this.scrollStep);
            console.log(this.maxScroll);
            console.log(this.contentWrapper.scrollWidth);
            console.log(this.contentWrapper.clientWidth)
            this.checkButtons();
        } catch (error) {
            console.error('Невозможно выполнить промотку вперед')
        }
    }

    checkButtons() {
        const maxScroll = this.contentWrapper.scrollWidth - this.contentWrapper.clientWidth;
        if (this.contentWrapper.scrollLeft === 0) {
            this.previousButton.disabled = true;
        } else if (this.contentWrapper.scrollLeft >= maxScroll) {
            this.nextButton.disabled = true;
        } else {
            this.previousButton.disabled = false;
            this.nextButton.disabled = false;
        }
    }
    setNewAmountToShow(newAmount) {
        this.amountsToShow = newAmount;
    }
}