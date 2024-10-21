export default function smooth() {
    const scroller = document.querySelector(".container");
    scroller?.scrollTo({
        top: scroller.scrollHeight - window.innerHeight + 220,
        behavior: "smooth",
    });
}
