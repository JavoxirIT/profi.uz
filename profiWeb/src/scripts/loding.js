export default function loding() {
  if (typeof window !== "undefined") {
    window.onload = function () {
      document.body.classList.add("loaded_hiding");
      window.setTimeout(function () {
        document.body.classList.add("loaded");
        document.body.classList.remove("loaded_hiding");
      }, 2000);
    };
  }
}
loding();
