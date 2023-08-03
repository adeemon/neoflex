export class GigachadSlider {
    constructor(elementsArray, amountsToShow, previousButtonId, nextButtonId, contentWrapperId) {
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
    }
    render() {
        try {
            this.checkButtons();
            const itemsToRender = this.elementsArray.slice(this.currentItem, this.currentItem + this.amountsToShow).join('');
            this.contentWrapper.innerHTML = itemsToRender;

        } catch {
            console.error('Ошибка слайдера. Невзоможно отрендерить элементы.')
        }
    }

    onPrevious() {
        try {
            this.currentItem--;
            this.render();
        } catch (error) {
            console.error('Невозможно выполнить промотку назад.')
        }
    }

    onNext() {
        try {
            this.currentItem++;
            this.render();
        } catch (error) {
            console.error('Невозможно выполнить промотку вперед')
        }
    }

    checkButtons() {
        if (this.currentItem === 0) {
            this.previousButton.disabled = true;
        } else if (this.currentItem + this.amountsToShow === this.elementsArray.length) {
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