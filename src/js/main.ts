"use strict";
import "../sass/style.scss";
import { sliderM } from "./slider";

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Mobile event vs desktop event.
    const mediaEvt: "touchend" | "click" =
      "ontouchend" in window ? "touchend" : "click";
    // Slider.
    sliderM();
    
    // Cart.
    const cart: { price: number; quantity: number } = {
      price: 125,
      quantity: 0,
    };
    // DOM.
    const cartEl = document.getElementById("cart")! as HTMLDivElement;
    const dom = {
      // Menu.
      burger: document.querySelector(".burger-container")! as HTMLElement,
      mainMenu: document.querySelector(
        ".main-menu.display-mobile"
      )! as HTMLElement,
      ctaQty: document.querySelector(
        ".secondary-menu__cta-cart-qty"
      )! as HTMLElement,
      secondaryMenu: document.querySelector(".secondary-menu")! as HTMLElement,
      basket: document.querySelector(".basket")! as HTMLElement,
      account: document.querySelector(
        ".secondary-menu__cta-account"
      )! as HTMLElement,
      // Add to cart.
      minus: document.querySelector(".basket__minus")! as HTMLElement,
      plus: document.querySelector(".basket__plus")! as HTMLElement,
      addToCart: document.querySelector(".basket__add")! as HTMLElement,
      // Cart.
      cart: cartEl,
      empty: cartEl.querySelector(".cart__empty")! as HTMLElement,
      filled: cartEl.querySelector(".cart__filled")! as HTMLElement,
      priceDescription: cartEl.querySelector(
        ".cart__description-price"
      )! as HTMLElement,
      deleteProduct: cartEl.querySelector(
        ".cart__description-delete"
      )! as HTMLElement,
    };
    // DOM Control.
    for (const [key, value] of Object.entries(dom)) {
      if (!value) {
        console.error(`Unknown element : ${key} is ${value}`);
      }
    }
    // Menu.
    dom.burger.addEventListener(mediaEvt, () => {
      dom.mainMenu.classList.remove("closed");
      dom.mainMenu.classList.add("opened");
    });
    dom.mainMenu.addEventListener(mediaEvt, (e: Event): void => {
      const target = e.target as HTMLElement | null;
      const id = target?.getAttribute("id");
      if (id && (id === "path-icon-close" || id === "main-menu-mobile-close")) {
        dom.mainMenu.classList.remove("opened");
        dom.mainMenu.classList.add("closed");
      }
    });
    // Show Hide cart.
    dom.secondaryMenu.addEventListener(mediaEvt, (e: Event): void => {
      const target = e.target as HTMLElement | null;
      if (target === dom.account) {
        if (dom.cart.classList.contains("hidden")) {
          dom.account.classList.add("active");
        } else {
          dom.account.classList.remove("active");
        }
      } else {
        dom.account.classList.remove("active");
      }
      dom.cart.classList.toggle("hidden");
    });
    // Cart.
    function updatePriceDescription(): void {
      dom.priceDescription.innerHTML = `$${cart.price} x ${
        cart.quantity
      } <b>$${getTotalPrice()}</b>`;
    }
    function getTotalPrice(): number {
      return cart.price * cart.quantity;
    }
    // Delete product.
    dom.deleteProduct.addEventListener(mediaEvt, (): void => {
      cart.quantity = 0;
      updateBasket();
      updateCart();
    });
    function updateCtaQty(): void {
      if (cart.quantity === 0) {
        dom.ctaQty.classList.add("hidden");
      } else {
        dom.ctaQty.classList.remove("hidden");
        dom.ctaQty.textContent = String(cart.quantity);
      }
    }
    function updateCart(): void {
      if (cart.quantity > 0) {
        updatePriceDescription();
        // Show description.
        dom.empty.classList.add("hidden");
        dom.filled.classList.remove("hidden");
      } else {
        // Hide description.
        dom.empty.classList.remove("hidden");
        dom.filled.classList.add("hidden");
      }
    }
    // Add to cart.
    function updateBasket(): void {
      dom.basket.innerHTML = "<b>" + cart.quantity + "</b>";
    }
    // Add to cart > Update cart quantity.
    dom.minus.addEventListener(mediaEvt, (): void => {
      if (cart.quantity === 0) {
        return;
      }
      cart.quantity--;
      updateBasket();
    });
    dom.plus.addEventListener(mediaEvt, (): void => {
      cart.quantity++;
      updateBasket();
    });
    dom.addToCart.addEventListener(mediaEvt, (): void => {
      updateCart();
      updateCtaQty();
    });
  });
})();
