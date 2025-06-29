export const projectSlider = (projects) => ({
  perPage: 1,
  perMove: 1,
  gap: "1rem",
  pagination: true,
  arrows: false,
  width: "100%",
  height: "auto",
  breakpoints: {
    320: {
      perPage: 1,
      focus: "center",
      arrows: false,
      pagination: true,
      width: "100%",
      height: "auto",
    },
    375: {
      perPage: 1.1,
      focus: "center",
      arrows: false,
      pagination: true,
      width: "100%",
      height: "auto",
      gap: "0.5rem",
    },
    425: {
      perPage: 1.1,
      focus: "center",
      arrows: false,
      pagination: true,
      width: "100%",
      height: "auto",
    },
    640: {
      perPage: 1.1,
      arrows: false,
      focus: "center",
      pagination: true,
      width: "100%",
      height: "auto",
    },
    768: {
      perPage: 2.1,
      arrows: false,
    },
    1024: {
      perPage: 3,
      arrows: false,
    },
    1280: {
      perPage: 3,
      arrows: false,
    },
    1880: {
      perPage: 3,
      arrows: false,
    },
    2560: {
      perPage: 3,
      arrows: false,
    },
    // 2560: {
    //   perPage: 3,
    //   arrows: projects?.length > 3 ? true : false,
    // },
  },
});
export const featuredLogoSlider = (logos) => ({
  perPage: 1,
  perMove: 1,
  gap: "1rem",
  pagination: false,
  arrows: false,
  width: "100%",
  height: "auto",
  type: "loop",
  autoplay: true,
  speed: 500,
  focus: "center",
  breakpoints: {
    320: {
      perPage: 2.5,
      arrows: false,
    },
    375: {
      perPage: 2.5,
      arrows: false,
      gap: "0.5rem",
    },
    425: {
      perPage: 2.5,
      arrows: false,
    },
    640: {
      perPage: 2.5,
      arrows: false,
    },
    768: {
      perPage: 2.5,
      arrows: false,
    },
    1024: {
      perPage: 6,
      arrows: false,
    },
    1280: {
      perPage: 6,
      arrows: false,
    },
    1880: {
      perPage: 6,
      arrows: false,
    },
    2560: {
      perPage: 6,
      arrows: false,
    },
  },
});
