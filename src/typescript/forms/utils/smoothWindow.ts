export default function smooth() {
    const scroller = document.querySelector(".main");
    scroller?.scrollTo({
        top: scroller.scrollHeight - window.innerHeight + 220,
        behavior: "smooth",
    });
}
