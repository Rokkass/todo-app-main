(function () {
    let darkMode = localStorage.getItem("darkMode");
    const darkModeToggle = document.querySelector("#dark-mode-toggle");

    const enableDarkMode = () => {
        document.body.classList.add("darkMode");
        localStorage.setItem("darkMode", "enabled");
    };

    const disableDarkMode = () => {
        document.body.classList.remove("darkMode");
        localStorage.setItem("darkMode", null);
    };

    darkModeToggle.addEventListener("click", () => {
        darkMode = localStorage.getItem("darkMode");
        if (darkMode !== "enabled") {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    if (darkMode === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})();
