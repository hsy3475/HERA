"use strict";

/*=== 전체 섹션 스크롤 페이드인 ===*/
const scrollFadeEls = document.querySelectorAll(".scroll-fade");

const scrollFadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); /* 화면에 보이면 등장 */
      } else {
        entry.target.classList.remove("visible"); /* 올라가면 다시 숨김 */
      }
    });
  },
  { threshold: 0.1 },
); /* 10%만 보여도 실행 */

scrollFadeEls.forEach((el) => scrollFadeObserver.observe(el));

/* ===메인배너 슬라이드===*/
const slides = document.querySelectorAll(".banner-slide-item");

/* 하단 슬라이드 바 */
const indicators = document.querySelectorAll(".indicator");

/* 이전/다음 버튼 */
const btnPrev = document.querySelector(".banner-btn-prev");
const btnNext = document.querySelector(".banner-btn-next");

let currentSlide = 0;
let autoTimer = null; // 자동재생 타이머 저장용

/* 특정 슬라이드로 전환*/
function goToSlide(index) {
  slides[currentSlide].classList.remove("active"); // 현재 슬라이드 숨김
  indicators[currentSlide].classList.remove("active"); // 현재 슬라이더 비활성화

  currentSlide = (index + slides.length) % slides.length; // 범위 벗어나면 슬라이드

  slides[currentSlide].classList.add("active"); // 새 슬라이드 보이기
  indicators[currentSlide].classList.add("active"); // 새 슬라이더 활성화
}

/* 다음 슬라이드로 이동 */
function nextSlide() {
  goToSlide(currentSlide + 1);
}

/* 이전 슬라이드로 이동 */
function prevSlide() {
  goToSlide(currentSlide - 1);
}

/* 자동 재생 */
function startAuto() {
  autoTimer = setInterval(nextSlide, 5000); // 5초마다 자동 전환
}

/*자동 재생 다시 (버튼 클릭 시 타이머 다시) */
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

/* 다음 버튼  */
btnNext.addEventListener("click", () => {
  nextSlide();
  resetAuto(); // 클릭하면 타이머 5초 다시
});

/* 이전 버튼 */
btnPrev.addEventListener("click", () => {
  prevSlide();
  resetAuto();
});

/* 슬라이드 바 클릭으로 직접 이동 */
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToSlide(index);
    resetAuto();
  });
});

/* 자동 재생 */
startAuto();

/*=== 블랙쿠션 페이드인 ===*/
const fadeEls = document.querySelectorAll(".fade-in-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // 화면에 보이면 visible 추가
      } else {
        entry.target.classList.remove("visible"); // ✅ 화면에서 벗어나면 visible 제거
      }
    });
  },
  { threshold: 0.2 },
);

fadeEls.forEach((el) => observer.observe(el));

/* === 검색창 토글 ===*/
const searchIcon = document.getElementById("searchIcon");
const searchInput = document.querySelector(".search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("open");
  if (searchInput.classList.contains("open")) {
    searchInput.focus(); // 열리면 바로 포커스
  }
});

/*  검색창 바깥 클릭하면 닫힘 */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search")) {
    searchInput.classList.remove("open");
  }
});

/*===  서브메뉴 아코디언 ===*/
const navSection = document.querySelector(".nav-section");
const menu2 = document.querySelector(".menu-2");

navSection.addEventListener("mouseenter", () => {
  menu2.classList.add("open");
});

navSection.addEventListener("mouseleave", () => {
  menu2.classList.remove("open");
});

/* == 쇼핑백 & 하트 아이콘 클릭 ===*/
document.querySelectorAll(".product-icons a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault(); // 링크 이동 방지
    const icon = a.querySelector("i");

    /* 쇼핑백 토글 */
    if (icon.classList.contains("ri-shopping-bag-line")) {
      icon.classList.replace("ri-shopping-bag-line", "ri-shopping-bag-fill"); // 꽉 찬 아이콘으로 교체
      icon.classList.add("active");
    } else if (icon.classList.contains("ri-shopping-bag-fill")) {
      icon.classList.replace("ri-shopping-bag-fill", "ri-shopping-bag-line"); // 빈 아이콘으로 교체
      icon.classList.remove("active");

      /* 하트 토글 */
    } else if (icon.classList.contains("ri-heart-line")) {
      icon.classList.replace("ri-heart-line", "ri-heart-fill"); // 꽉 찬 아이콘으로 교체
      icon.classList.add("active");
    } else if (icon.classList.contains("ri-heart-fill")) {
      icon.classList.replace("ri-heart-fill", "ri-heart-line"); // 빈 아이콘으로 교체
      icon.classList.remove("active");
    }
  });
});

/* === 헤라 모멘츠 이미지 호버 효과 ===*/
const momentsContainer = document.querySelector(".share-moments-container");
const momentsImg2 = document.querySelector(".img-2");
const momentsImgLinks = document.querySelectorAll(".img-box > a");

/* img-2 호버 */
momentsImg2.addEventListener("mouseenter", () => {
  momentsContainer.classList.add("hovered");
  momentsImg2.classList.add("focused");
});
momentsImg2.addEventListener("mouseleave", () => {
  momentsContainer.classList.remove("hovered");
  momentsImg2.classList.remove("focused");
});

/* img-box 이미지 호버 */
momentsImgLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    momentsContainer.classList.add("hovered");
    link.classList.add("focused");
  });
  link.addEventListener("mouseleave", () => {
    momentsContainer.classList.remove("hovered");
    link.classList.remove("focused");
  });
});
