import React, { Component,Fragment } from 'react'

class LazyImage extends Component {
  // the following 2 lines will be used to solve the race condition problem
  loadTimer;
  image = new Image();

  componentDidMount() {
    const { loaderIcon } = this.props;

    // the following 2 lines to solve the "race condition" problem
    this.image.src = loaderIcon
      ? loaderIcon
      : "https://www.eliananunes.com/images/lazy_loader.gif";
    this.image.addEventListener("load", this.onImgLoaded);

    // add the lazyLoad method onscroll
    window.onscroll = 
    window.addEventListener("scroll", this.lazyLoad);
  }

  componentWillUnmount() {
    // remove the lazyLoad method
    window.removeEventListener("scroll", this.lazyLoad);
  }

  onImgLoaded = () => {
    if (this.loadTimer !== null) {
      clearTimeout(this.loadTimer);
    }

    if (!this.image.complete) {
      this.loadTimer = setTimeout(() => {
        this.onImgLoaded();
      }, 3);
    } else {
      this.lazyLoad();
    }
  };

  lazyLoad = e => {
    Object.values(this.refs).forEach(el => {
      if (this.elementInViewPort(el)) {
        el.setAttribute("src", el.getAttribute("data-src"));
      }
    });
  };

  elementInViewPort(el) {
    // getBoundingClientRect => returns the size of the given element and the position of it in relation to the view port
    const clientRect = el.getBoundingClientRect();

    return (
      clientRect.top >= 0 &&
      clientRect.left >= 0 &&
      clientRect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      clientRect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  render() {
    const { images, loaderIcon } = this.props;

    return (
      <Fragment>
        {images.map((el, i) => {
          return (
            <img
              ref={"image" + i}
              src={
                loaderIcon
                  ? loaderIcon
                  : "https://www.eliananunes.com/images/lazy_loader.gif"
              }
              data-src={el}
              key={i}
            />
          );
        })}
      </Fragment>
    );
  }
}
export default LazyImage;