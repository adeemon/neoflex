@import '../../../assets/styles/mixins';
@import '../../../assets/styles//vars';
.news {
    width: 100 % ;
    @include flexCenter;
    flex - direction: column;
    gap: 48 px; &
    __buttons {
        width: 100 % ;
        @include flexCenter;
        justify - content: flex - end;
        flex - direction: row;
        gap: 30 px;
    } &
    __button {
        @include flexCenter;
        padding: 8 px;
        width: 64 px;
        height: 64 px;
        border - radius: 50 px;
        border: 1 px solid $button - active - color;
        background: white;
        background - color: $button - active - color;
        svg {
            stroke: white;
        } &
        : disabled {
            background - color: white;;
            svg {
                stroke: $black - letters - color;
            }
        } &
        : hover, &
        : focus {
            border: 3 px solid $link - hover - color
        }
    } &
    __articles - wrapper {
        @include flexCenter;
        flex - direction: row;
        flex - wrap: wrap;
        justify - content: space - between;
        gap: 30 px;
    }
}
}
else if (this.currentItem + this.amountsToShow === this.elementsArray.length) {
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