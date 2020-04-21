export function SidebarOn() {
    let sidebar = document.querySelector('.left-sidebar');
    sidebar.style.display ="flex";

}

export function Close() {
    let sidebar = document.querySelector('.left-sidebar');
    sidebar.style.display ="none";
}

export function CloseTask() {
    let sidebar = document.querySelector('.right-sidebar');
    sidebar.style.display ="none";
}
